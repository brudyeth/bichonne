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
    const safeDate = preferredDate?.trim() ? escapeHtml(preferredDate.trim()) : "Non sélectionnée";
    const safeTimeSlot = timeSlot?.trim() ? escapeHtml(timeSlot.trim()) : "Flexible";
    const safeMessage = message?.trim()
      ? escapeHtml(message.trim()).replace(/\n/g, "<br>")
      : "Aucun message complémentaire.";

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
      `Déplacement : Offert jusqu'à 15 km autour de Lille (au-delà : 0,50 €/km supp. A/R)`,
      ``,
      `Formule : ${formulaName?.trim() || "À définir ensemble"} (${typeof formulaPrice === "number" ? `${formulaPrice} €` : "—"})`,
      `Soins ciblés : ${selectedCares?.length ? selectedCares.join(", ") : "Aucun"}`,
      `Véhicule particulièrement sale : ${isVeryDirty ? "Oui (+15 €)" : "Non"}`,
      `Présence de poils d'animaux : ${hasPetHair ? "Oui (+15 €)" : "Non"}`,
      ``,
      `Rendez-vous : ${dateChoice === "date" ? `Date souhaitée : ${preferredDate || "Non sélectionnée"}` : "À convenir ensemble"}`,
      `Créneau horaire : ${timeSlot || "Flexible"}`,
      ``,
      `Tarif estimé : ${typeof estimatedTotal === "number" ? `${estimatedTotal} €` : "À définir"}${
        utilitySurcharge ? ` (dont supplément utilitaire +${utilitySurcharge} €)` : ""
      } (hors éventuels frais kilométriques au-delà de 15 km)`,
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
      <p><strong>Déplacement :</strong> Offert jusqu'à 15 km autour de Lille (au-delà : 0,50 €/km supp. A/R selon itinéraire routier)</p>

      <h3>Prestations & État</h3>
      <p><strong>Formule :</strong> ${safeFormula} ${typeof formulaPrice === "number" ? `(${formulaPrice} €)` : ""}</p>
      <p><strong>Soins ciblés :</strong> ${safeCares}</p>
      <p><strong>Particulièrement sale :</strong> ${isVeryDirty ? "Oui (+15 €)" : "Non"}</p>
      <p><strong>Poils d'animaux :</strong> ${hasPetHair ? "Oui (+15 €)" : "Non"}</p>

      <h3>Disponibilité</h3>
      <p><strong>Date :</strong> ${dateChoice === "date" ? `Date souhaitée : ${safeDate}` : "À convenir ensemble"}</p>
      <p><strong>Créneau :</strong> ${safeTimeSlot}</p>

      <h3>Tarif estimé</h3>
      <p style="font-size: 1.25rem; font-weight: bold; color: #ea580c;">${typeof estimatedTotal === "number" ? `${estimatedTotal} €` : "À définir"}${
        utilitySurcharge ? ` (dont utilitaire +${utilitySurcharge} €)` : ""
      }</p>

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

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/contact") {
        return await handleContactApi(request, env);
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
