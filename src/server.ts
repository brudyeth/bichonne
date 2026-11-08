import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function getEnvValue(key: string, env?: unknown): string | undefined {
  // 1. Cloudflare Worker `env` object passed to fetch()
  if (env && typeof env === "object" && key in env) {
    const v = (env as Record<string, unknown>)[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  // 2. Nitro globalThis.__env__
  const globalEnv = (globalThis as unknown as { __env__?: Record<string, unknown> }).__env__;
  if (globalEnv && typeof globalEnv === "object" && key in globalEnv) {
    const v = globalEnv[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  // 3. process.env (Node / Vite / Cloudflare nodejs_compat)
  if (typeof process !== "undefined" && process?.env) {
    const v = process.env[key];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return undefined;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidFrenchPhoneNumber(input?: string): boolean {
  if (!input) return false;
  let cleaned = input.trim().replace(/[\s\u00A0.\-_/()]/g, "");

  if (cleaned.startsWith("+330")) {
    cleaned = "+33" + cleaned.slice(4);
  } else if (cleaned.startsWith("00330")) {
    cleaned = "0033" + cleaned.slice(5);
  }

  if (cleaned.startsWith("+33")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("0033")) {
    cleaned = "0" + cleaned.slice(4);
  }

  return /^0[1-9]\d{8}$/.test(cleaned);
}

function isValidEmail(input?: string): boolean {
  if (!input) return true;
  const trimmed = input.trim();
  if (!trimmed) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed);
}

function getCorsOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (!origin) return "https://bichonnetacaisse.fr";
  try {
    const url = new URL(origin);
    if (
      url.hostname === "bichonnetacaisse.fr" ||
      url.hostname.endsWith(".bichonnetacaisse.fr") ||
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".webcontainer-api.io") ||
      url.hostname.endsWith(".run.app")
    ) {
      return origin;
    }
  } catch {
    // fallback
  }
  return "https://bichonnetacaisse.fr";
}

// =============================================================================
// CALCULATEUR DE FRAIS DE DÉPLACEMENT
// Point de départ fixe : Place de la République, 59000 Lille
// Coordonnées GPS : 50.63185, 3.06074
// Règle tarifaire :
// - Déplacement gratuit jusqu'à 20 km de distance routière aller simple.
// - Au-delà, facturation des kilomètres supplémentaires aller-retour à 0,50 €/km.
// Formule : Math.max(0, distanceAllerKm - 20) * 2 * 0.50
// =============================================================================
export const LILLE_REPUBLIQUE = {
  name: "Place de la République, Lille",
  lat: 50.63185,
  lon: 3.06074,
};

export const FREE_RADIUS_KM = 20;
export const RATE_PER_KM_ROUND_TRIP = 0.5;

interface CachedDistance {
  distanceOneWayKm: number;
  fee: number;
  source: "osrm" | "fallback";
  timestamp: number;
}
const distanceCache = new Map<string, CachedDistance>();
const CACHE_MAX_ENTRIES = 500;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function haversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function calculateDistanceAndFee(
  lat: number,
  lon: number,
): Promise<{
  success: boolean;
  distanceOneWayKm: number;
  fee: number;
  source: "osrm" | "fallback";
  freeRadiusKm: number;
  ratePerKmRoundTrip: number;
  label: string;
}> {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    isNaN(lat) ||
    isNaN(lon) ||
    lat < -90 ||
    lat > 90 ||
    lon < -180 ||
    lon > 180
  ) {
    throw new Error("Coordonnées géographiques invalides");
  }

  const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
  const now = Date.now();
  const cached = distanceCache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return {
      success: true,
      distanceOneWayKm: cached.distanceOneWayKm,
      fee: cached.fee,
      source: cached.source,
      freeRadiusKm: FREE_RADIUS_KM,
      ratePerKmRoundTrip: RATE_PER_KM_ROUND_TRIP,
      label: "Distance routière estimée",
    };
  }

  // 1. Appel du moteur d'itinéraire routier (OSRM) avec timeout strict de 3.5s
  let distanceOneWayKm: number | null = null;
  let source: "osrm" | "fallback" = "osrm";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${LILLE_REPUBLIQUE.lon},${LILLE_REPUBLIQUE.lat};${lon},${lat}?overview=false`;
    const res = await fetch(osrmUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "BichonneTaCaisse-Routing/1.0",
      },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = (await res.json()) as {
        code?: string;
        routes?: Array<{ distance?: number }>;
      };
      if (data.code === "Ok" && Array.isArray(data.routes) && data.routes[0]?.distance) {
        const meters = data.routes[0].distance;
        distanceOneWayKm = Math.round((meters / 1000) * 10) / 10;
        source = "osrm";
      }
    }
  } catch {
    source = "fallback";
  }

  // 2. Solution de secours si OSRM est indisponible ou a expiré :
  // Calcul géodésique précis (Haversine) pondéré par le coefficient moyen de réseau routier périurbain français (~1.28)
  if (distanceOneWayKm === null) {
    const birdKm = haversineDistanceKm(LILLE_REPUBLIQUE.lat, LILLE_REPUBLIQUE.lon, lat, lon);
    distanceOneWayKm = Math.round(birdKm * 1.28 * 10) / 10;
    source = "fallback";
  }

  // Formule officielle arrondie au centime :
  // frais = Math.max(0, distanceAllerKm - 20) * 2 * 0.50
  const extraKm = Math.max(0, distanceOneWayKm - FREE_RADIUS_KM);
  const fee = Math.round(extraKm * 2 * RATE_PER_KM_ROUND_TRIP * 100) / 100;

  if (distanceCache.size >= CACHE_MAX_ENTRIES) {
    const oldestKey = distanceCache.keys().next().value;
    if (oldestKey) distanceCache.delete(oldestKey);
  }
  distanceCache.set(cacheKey, {
    distanceOneWayKm,
    fee,
    source,
    timestamp: now,
  });

  return {
    success: true,
    distanceOneWayKm,
    fee,
    source,
    freeRadiusKm: FREE_RADIUS_KM,
    ratePerKmRoundTrip: RATE_PER_KM_ROUND_TRIP,
    label: "Distance routière estimée",
  };
}

async function handleDistanceApi(request: Request): Promise<Response> {
  const allowedOrigin = getCorsOrigin(request);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    let lat: number | undefined;
    let lon: number | undefined;

    if (request.method === "GET") {
      const url = new URL(request.url);
      const latParam = url.searchParams.get("lat");
      const lonParam = url.searchParams.get("lon");
      if (latParam && lonParam) {
        lat = parseFloat(latParam);
        lon = parseFloat(lonParam);
      }
    } else if (request.method === "POST") {
      const body = (await request.json()) as { lat?: number; lon?: number };
      lat = body.lat;
      lon = body.lon;
    } else {
      return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      });
    }

    if (typeof lat !== "number" || typeof lon !== "number" || isNaN(lat) || isNaN(lon)) {
      return new Response(
        JSON.stringify({
          success: false,
          fee: null,
          error: "Coordonnées lat et lon obligatoires",
          message: "Frais de déplacement à confirmer",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    const result = await calculateDistanceAndFee(lat, lon);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Error in handleDistanceApi:", err);
    return new Response(
      JSON.stringify({
        success: false,
        fee: null,
        message: "Frais de déplacement à confirmer",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      },
    );
  }
}

async function handleContactApi(request: Request, env?: unknown): Promise<Response> {
  const allowedOrigin = getCorsOrigin(request);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    });
  }

  try {
    const data = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      vehicle?: string;
      vehicleCategory?: string;
      utilitySurcharge?: number;
      isGrandUtility?: boolean;
      address?: string;
      city?: string;
      travelDistanceKm?: number | null;
      travelFee?: number | null;
      travelLat?: number;
      travelLon?: number;
      parking?: string;
      waterAccess?: boolean;
      electricityAccess?: boolean;
      formulaName?: string;
      formulaPrice?: number;
      selectedCares?: string[];
      isVeryDirty?: boolean;
      hasPetHair?: boolean;
      dateChoice?: string;
      preferredDate?: string;
      timeSlot?: string;
      message?: string;
      estimatedTotal?: number;
      hp?: string;
      website?: string;
    };

    const {
      name,
      phone,
      email,
      vehicle,
      vehicleCategory,
      utilitySurcharge,
      isGrandUtility,
      address,
      city,
      travelDistanceKm,
      travelFee,
      travelLat,
      travelLon,
      parking,
      waterAccess,
      electricityAccess,
      formulaName,
      formulaPrice,
      selectedCares,
      isVeryDirty,
      hasPetHair,
      dateChoice,
      preferredDate,
      timeSlot,
      message,
      estimatedTotal,
      hp,
      website,
    } = data ?? {};

    // Piège antispam (honeypot) : rejet silencieux des robots
    if (hp || website) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Votre demande a bien été envoyée ! Nous vous recontacterons très rapidement.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!name?.trim() || !phone?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Le nom et le numéro de téléphone sont obligatoires.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!isValidFrenchPhoneNumber(phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Veuillez renseigner un numéro de téléphone valide (ex. : 06 12 34 56 78 ou +33 6 12 34 56 78).",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!city?.trim() && !address?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Veuillez renseigner votre ville ou adresse d'intervention dans la métropole lilloise.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (email?.trim() && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Veuillez renseigner une adresse e-mail valide (ex. : jean.dupont@email.fr) ou laisser le champ vide.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    // Contrôle anti-abus de taille de contenu
    if (
      name.length > 100 ||
      phone.length > 50 ||
      (email && email.length > 120) ||
      (vehicle && vehicle.length > 150) ||
      (address && address.length > 200) ||
      (city && city.length > 100) ||
      (message && message.length > 3000)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Certaines informations dépassent la longueur maximale autorisée.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    const resendApiKey = getEnvValue("RESEND_API_KEY", env);
    const recipientEmail = getEnvValue("CONTACT_RECIPIENT_EMAIL", env) || "rudyboudene93@gmail.com";
    const senderEmail =
      getEnvValue("CONTACT_SENDER_EMAIL", env) || "reservation@bichonnetacaisse.fr";

    if (!resendApiKey) {
      // Service e-mail direct non encore activé : notification claire et orientation WhatsApp
      return new Response(
        JSON.stringify({
          success: false,
          configured: false,
          message:
            "Le service d'envoi d'e-mail direct n'est pas encore configuré sur le serveur (clé API RESEND_API_KEY requise). Veuillez transmettre votre demande via WhatsApp en un clic ou par téléphone au 06 59 14 09 39.",
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = email?.trim() ? escapeHtml(email.trim()) : undefined;
    const safeVehicle = vehicle?.trim() ? escapeHtml(vehicle.trim()) : "Non précisé";
    const safeAddress = address?.trim() ? escapeHtml(address.trim()) : "Non précisée";
    const safeCity = city?.trim() ? escapeHtml(city.trim()) : "Non précisée";
    const safeParking = parking?.trim() ? escapeHtml(parking.trim()) : "Non précisé";
    const safeFormula = formulaName?.trim() ? escapeHtml(formulaName.trim()) : "À définir ensemble";
    const safeCares = selectedCares?.length
      ? selectedCares.map((c) => escapeHtml(String(c))).join(", ")
      : "Aucun";
    const safeMessage = message?.trim()
      ? escapeHtml(message.trim()).replace(/\n/g, "<br>")
      : "Aucun message complémentaire.";

    // Vérification et recalcul sécurisé des frais de déplacement côté serveur
    let verifiedDistanceKm: number | null = null;
    let verifiedTravelFee: number | null = null;
    let travelFeeText = "Frais de déplacement à confirmer";

    if (
      typeof travelLat === "number" &&
      typeof travelLon === "number" &&
      !isNaN(travelLat) &&
      !isNaN(travelLon)
    ) {
      try {
        const calc = await calculateDistanceAndFee(travelLat, travelLon);
        if (calc.success) {
          verifiedDistanceKm = calc.distanceOneWayKm;
          verifiedTravelFee = calc.fee;
        }
      } catch {
        // En cas d'erreur de calcul, non bloquant : verifiedTravelFee reste null
      }
    } else if (typeof travelFee === "number" && typeof travelDistanceKm === "number") {
      const extraKm = Math.max(0, travelDistanceKm - FREE_RADIUS_KM);
      verifiedDistanceKm = travelDistanceKm;
      verifiedTravelFee = Math.round(extraKm * 2 * RATE_PER_KM_ROUND_TRIP * 100) / 100;
    }

    if (verifiedTravelFee !== null && verifiedDistanceKm !== null) {
      if (verifiedTravelFee === 0) {
        travelFeeText = `0,00 € (Déplacement offert : ${verifiedDistanceKm} km aller depuis Place de la République, Lille)`;
      } else {
        const extraKm = Math.max(0, verifiedDistanceKm - FREE_RADIUS_KM);
        travelFeeText = `${verifiedTravelFee.toFixed(2).replace(".", ",")} € (Distance routière estimée : ${verifiedDistanceKm} km aller · ${extraKm.toFixed(1)} km supp. A/R à 0,50 €/km)`;
      }
    } else {
      travelFeeText =
        "Frais de déplacement à confirmer lors de notre rappel (selon l'itinéraire routier)";
    }

    // Récapitulatif du total estimé avec frais de déplacement vérifiés
    let finalTotalDisplay = "";
    if (typeof formulaPrice === "number") {
      const basePrestationTotal =
        formulaPrice + (utilitySurcharge || 0) + (isVeryDirty ? 15 : 0) + (hasPetHair ? 15 : 0);

      if (verifiedTravelFee !== null && verifiedTravelFee > 0) {
        const totalWithTravel = Math.round((basePrestationTotal + verifiedTravelFee) * 100) / 100;
        finalTotalDisplay = `${totalWithTravel.toFixed(2).replace(".00", "")} € (dont ${verifiedTravelFee.toFixed(2).replace(".", ",")} € de frais de déplacement)`;
      } else if (verifiedTravelFee === 0) {
        finalTotalDisplay = `${basePrestationTotal} € (déplacement offert inclus)`;
      } else {
        finalTotalDisplay = `${basePrestationTotal} € (+ frais de déplacement à confirmer)`;
      }
    } else {
      finalTotalDisplay = typeof estimatedTotal === "number" ? `${estimatedTotal} €` : "À définir";
    }

    const textLines = [
      `Nouvelle demande de devis - Bichonne ta Caisse`,
      `----------------------------------------------`,
      `Client : ${name.trim()}`,
      `Téléphone : ${phone.trim()}`,
      `E-mail : ${email?.trim() || "Non renseigné"}`,
      ``,
      `Véhicule : ${vehicle?.trim() || "Non précisé"}${
        vehicleCategory === "utilitaire"
          ? " (Utilitaire)"
          : vehicleCategory === "grand-utilitaire"
            ? " (Grand utilitaire)"
            : ""
      }`,
      `Catégorie : ${
        vehicleCategory === "utilitaire"
          ? "Véhicule utilitaire"
          : vehicleCategory === "grand-utilitaire"
            ? "Grand utilitaire"
            : "Véhicule particulier standard"
      }`,
      utilitySurcharge ? `Supplément utilitaire : +${utilitySurcharge} €` : null,
      `Adresse d'intervention : ${address?.trim() || "Non précisée"}`,
      `Ville d'intervention : ${city?.trim() || "Non précisée"}`,
      `Lieu de stationnement : ${parking?.trim() || "Non précisé"}`,
      `Accès à l'eau : ${waterAccess ? "Oui" : "Non"}`,
      `Prise électrique : ${electricityAccess ? "Oui" : "Non"}`,
      `Déplacement : ${travelFeeText}`,
      ``,
      `Formule : ${formulaName?.trim() || "À définir ensemble"} (${typeof formulaPrice === "number" ? `${formulaPrice} €` : "—"})`,
      `Soins ciblés : ${selectedCares?.length ? selectedCares.join(", ") : "Aucun"}`,
      `Véhicule particulièrement sale : ${isVeryDirty ? "Oui (+15 €)" : "Non"}`,
      `Présence de poils d'animaux : ${hasPetHair ? "Oui (+15 €)" : "Non"}`,
      ``,
      `Date et horaire d'intervention : À convenir ensemble lors du rappel`,
      ``,
      `Tarif estimé : ${finalTotalDisplay}`,
      ``,
      `Message complémentaire :`,
      message?.trim() || "Aucun message complémentaire.",
    ].filter((l): l is string => l !== null);

    const htmlBody = `
      <h2>Nouvelle demande de devis - Bichonne ta Caisse</h2>
      <h3>Coordonnées</h3>
      <p><strong>Nom et prénom :</strong> ${safeName}</p>
      <p><strong>Téléphone :</strong> <a href="tel:${safePhone}">${safePhone}</a></p>
      <p><strong>E-mail :</strong> ${safeEmail ? `<a href="mailto:${safeEmail}">${safeEmail}</a>` : "Non renseigné"}</p>
      
      <h3>Véhicule & Intervention</h3>
      <p><strong>Marque et modèle :</strong> ${safeVehicle}</p>
      <p><strong>Catégorie :</strong> ${
        vehicleCategory === "utilitaire"
          ? "Véhicule utilitaire"
          : vehicleCategory === "grand-utilitaire"
            ? "Grand utilitaire"
            : "Véhicule particulier standard"
      }</p>
      ${utilitySurcharge ? `<p><strong>Supplément utilitaire :</strong> +${utilitySurcharge} €</p>` : ""}
      <p><strong>Adresse :</strong> ${safeAddress}</p>
      <p><strong>Ville :</strong> ${safeCity}</p>
      <p><strong>Lieu de stationnement :</strong> ${safeParking}</p>
      <p><strong>Accès à l'eau :</strong> ${waterAccess ? "Oui" : "Non"}</p>
      <p><strong>Prise électrique :</strong> ${electricityAccess ? "Oui" : "Non"}</p>
      <p><strong>Déplacement :</strong> ${escapeHtml(travelFeeText)}</p>

      <h3>Prestations & État</h3>
      <p><strong>Formule :</strong> ${safeFormula} ${typeof formulaPrice === "number" ? `(${formulaPrice} €)` : ""}</p>
      <p><strong>Soins ciblés :</strong> ${safeCares}</p>
      <p><strong>Particulièrement sale :</strong> ${isVeryDirty ? "Oui (+15 €)" : "Non"}</p>
      <p><strong>Poils d'animaux :</strong> ${hasPetHair ? "Oui (+15 €)" : "Non"}</p>

      <h3>Date d'intervention</h3>
      <p><strong>Date &amp; horaire :</strong> À convenir ensemble lors de notre rappel téléphonique</p>

      <h3>Tarif estimé</h3>
      <p style="font-size: 1.25rem; font-weight: bold; color: #ea580c;">${escapeHtml(finalTotalDisplay)}</p>

      <h3>Message complémentaire</h3>
      <p>${safeMessage}</p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Bichonne ta Caisse <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: safeEmail && isValidEmail(email) ? safeEmail : undefined,
        subject: `Demande de devis - ${safeName} (${city?.trim() || "Métropole lilloise"})`,
        text: textLines.join("\n"),
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API error:", errText);
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Erreur lors de la transmission via le service e-mail. Veuillez utiliser WhatsApp ou nous appeler au 06 59 14 09 39.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Votre demande a bien été envoyée ! Nous vous recontactons rapidement pour fixer ensemble votre rendez-vous.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      },
    );
  } catch (err) {
    console.error("Error in /api/contact:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Une erreur inattendue est survenue lors de la transmission.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      },
    );
  }
}

async function handleContactProApi(request: Request, env?: unknown): Promise<Response> {
  const allowedOrigin = getCorsOrigin(request);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": allowedOrigin,
      },
    });
  }

  try {
    const data = (await request.json()) as {
      companyName?: string;
      contactName?: string;
      phone?: string;
      email?: string;
      vehicleCount?: string;
      description?: string;
      hp?: string;
      website?: string;
    };

    const { companyName, contactName, phone, email, vehicleCount, description, hp, website } =
      data ?? {};

    // Piège antispam (honeypot) : rejet silencieux des robots
    if (hp || website) {
      return new Response(
        JSON.stringify({
          success: true,
          message:
            "Merci pour votre demande ! Nous reviendrons vers vous pour échanger sur vos besoins et vous proposer une solution adaptée.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!companyName?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Le nom de l'entreprise est obligatoire.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!contactName?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Le nom et prénom du contact sont obligatoires.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!phone?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Le numéro de téléphone est obligatoire.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!isValidFrenchPhoneNumber(phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Veuillez renseigner un numéro de téléphone valide à 10 chiffres (ex. : 06 12 34 56 78 ou +33 6 12 34 56 78).",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!email?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "L'adresse e-mail professionnelle est obligatoire.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Veuillez renseigner une adresse e-mail valide (ex. : contact@entreprise.fr).",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    if (!vehicleCount?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Veuillez indiquer le nombre de véhicules concernés.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    // Contrôle anti-abus de longueur
    if (
      companyName.length > 150 ||
      contactName.length > 120 ||
      phone.length > 50 ||
      email.length > 120 ||
      vehicleCount.length > 60 ||
      (description && description.length > 4000)
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Certaines informations dépassent la longueur maximale autorisée.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    const resendApiKey = getEnvValue("RESEND_API_KEY", env);
    const recipientEmail = getEnvValue("CONTACT_RECIPIENT_EMAIL", env) || "rudyboudene93@gmail.com";
    const senderEmail =
      getEnvValue("CONTACT_SENDER_EMAIL", env) || "reservation@bichonnetacaisse.fr";

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          configured: false,
          message:
            "Le service d'envoi d'e-mail direct n'est pas encore configuré sur le serveur (clé API RESEND_API_KEY requise). Veuillez nous contacter par téléphone au 06 59 14 09 39 ou via WhatsApp.",
        }),
        {
          status: 503,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    const safeCompany = escapeHtml(companyName.trim());
    const safeContact = escapeHtml(contactName.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeVehicleCount = escapeHtml(vehicleCount.trim());
    const safeDescription = description?.trim()
      ? escapeHtml(description.trim()).replace(/\n/g, "<br>")
      : "Non précisée.";

    const textLines = [
      `Nouvelle demande professionnelle — Bichonne ta Caisse`,
      `====================================================`,
      `Entreprise : ${companyName.trim()}`,
      `Contact : ${contactName.trim()}`,
      `Téléphone : ${phone.trim()}`,
      `E-mail professionnel : ${email.trim()}`,
      `Nombre de véhicules concernés : ${vehicleCount.trim()}`,
      ``,
      `Description du besoin :`,
      description?.trim() || "Non précisée.",
      ``,
      `Origine : Formulaire B2B /entreprises`,
    ];

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #11114E;">
        <div style="background-color: #11114E; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 20px; color: #ffffff;">Nouvelle demande professionnelle — Bichonne ta Caisse</h2>
          <p style="margin: 5px 0 0 0; font-size: 13px; color: #F47721; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            Espace Entreprises &amp; Flottes
          </p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 40%; font-weight: bold;">Entreprise :</td>
              <td style="padding: 8px 0; font-weight: bold; color: #11114E; font-size: 15px;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Contact :</td>
              <td style="padding: 8px 0; font-weight: 600; color: #11114E;">${safeContact}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Téléphone :</td>
              <td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #F47721; font-weight: bold; text-decoration: none;">${safePhone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">E-mail professionnel :</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #11114E; text-decoration: underline;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Nombre de véhicules :</td>
              <td style="padding: 8px 0; font-weight: bold; color: #F47721;">${safeVehicleCount}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 6px; border-left: 4px solid #F47721;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; text-transform: uppercase; color: #64748b;">Description du besoin</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #334155;">${safeDescription}</p>
          </div>

          <p style="margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
            Message envoyé depuis le formulaire Entreprises de bichonnetacaisse.fr
          </p>
        </div>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Bichonne ta Caisse <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: safeEmail,
        subject: `Nouvelle demande professionnelle — Bichonne ta Caisse`,
        text: textLines.join("\n"),
        html: htmlBody,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend API error (Pro):", errText);
      return new Response(
        JSON.stringify({
          success: false,
          error:
            "Erreur lors de la transmission via le service e-mail. Veuillez nous contacter directement au 06 59 14 09 39 ou via WhatsApp.",
        }),
        {
          status: 502,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": allowedOrigin,
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message:
          "Merci pour votre demande ! Nous reviendrons vers vous pour échanger sur vos besoins et vous proposer une solution adaptée.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      },
    );
  } catch (err) {
    console.error("Error in /api/contact-pro:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Une erreur inattendue est survenue lors de la transmission de votre demande.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      },
    );
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/contact") {
        return await handleContactApi(request, env);
      }
      if (url.pathname === "/api/contact-pro") {
        return await handleContactProApi(request, env);
      }
      if (url.pathname === "/api/distance") {
        return await handleDistanceApi(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
  },
};
