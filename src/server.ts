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

async function handleContactApi(request: Request, env?: unknown): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = (await request.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      vehicle?: string;
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
    };

    const {
      name,
      phone,
      email,
      vehicle,
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
    } = data ?? {};

    if (!name?.trim() || !phone?.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Le nom et le numéro de téléphone sont obligatoires.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const resendApiKey = getEnvValue("RESEND_API_KEY", env);
    const recipientEmail = getEnvValue("CONTACT_RECIPIENT_EMAIL", env) || "rudyboudene93@gmail.com";
    const senderEmail =
      getEnvValue("CONTACT_SENDER_EMAIL", env) || "reservation@bichonnetacaisse.fr";

    if (!resendApiKey) {
      // Configuration backend non encore renseignée sur Cloudflare
      return new Response(
        JSON.stringify({
          success: false,
          configured: false,
          message:
            "Le service d'envoi d'e-mail direct n'est pas encore configuré sur le serveur (clé API RESEND_API_KEY requise). Veuillez transmettre votre demande via WhatsApp en un clic ou par téléphone au 06 59 14 09 39.",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const textLines = [
      `Nouvelle demande de devis - Bichonne ta Caisse`,
      `----------------------------------------------`,
      `Client : ${name}`,
      `Téléphone : ${phone}`,
      `E-mail : ${email || "Non renseigné"}`,
      ``,
      `Véhicule : ${vehicle || "Non précisé"}`,
      `Adresse d'intervention : ${address || "Non précisée"}`,
      `Ville d'intervention : ${city || "Non précisée"}`,
      `Lieu de stationnement : ${parking || "Non précisé"}`,
      `Accès à l'eau : ${waterAccess ? "Oui" : "Non"}`,
      `Prise électrique : ${electricityAccess ? "Oui" : "Non"}`,
      `Déplacement : Offert jusqu'à 15 km autour de Lille (au-delà : 0,50 €/km supp. A/R)`,
      ``,
      `Formule : ${formulaName || "À définir ensemble"} (${formulaPrice ? `${formulaPrice} €` : "—"})`,
      `Soins ciblés : ${selectedCares?.length ? selectedCares.join(", ") : "Aucun"}`,
      `Véhicule particulièrement sale : ${isVeryDirty ? "Oui (+15 €)" : "Non"}`,
      `Présence de poils d'animaux : ${hasPetHair ? "Oui (+15 €)" : "Non"}`,
      ``,
      `Rendez-vous : ${dateChoice === "date" ? `Date souhaitée : ${preferredDate || "Non sélectionnée"}` : "À convenir ensemble"}`,
      `Créneau horaire : ${timeSlot || "Flexible"}`,
      ``,
      `Tarif estimé : ${estimatedTotal ? `${estimatedTotal} €` : "À définir"} (hors éventuels frais kilométriques au-delà de 15 km)`,
      ``,
      `Message complémentaire :`,
      message || "Aucun message complémentaire.",
    ];

    const htmlBody = `
      <h2>Nouvelle demande de devis - Bichonne ta Caisse</h2>
      <h3>Coordonnées</h3>
      <p><strong>Nom et prénom :</strong> ${name}</p>
      <p><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></p>
      <p><strong>E-mail :</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : "Non renseigné"}</p>
      
      <h3>Véhicule & Intervention</h3>
      <p><strong>Marque et modèle :</strong> ${vehicle || "Non précisé"}</p>
      <p><strong>Adresse :</strong> ${address || "Non précisée"}</p>
      <p><strong>Ville :</strong> ${city || "Non précisée"}</p>
      <p><strong>Lieu de stationnement :</strong> ${parking || "Non précisé"}</p>
      <p><strong>Accès à l'eau :</strong> ${waterAccess ? "Oui" : "Non"}</p>
      <p><strong>Prise électrique :</strong> ${electricityAccess ? "Oui" : "Non"}</p>
      <p><strong>Déplacement :</strong> Offert jusqu'à 15 km autour de Lille (au-delà : 0,50 €/km supp. A/R selon itinéraire routier)</p>

      <h3>Prestations & État</h3>
      <p><strong>Formule :</strong> ${formulaName || "À définir ensemble"} ${formulaPrice ? `(${formulaPrice} €)` : ""}</p>
      <p><strong>Soins ciblés :</strong> ${selectedCares?.length ? selectedCares.join(", ") : "Aucun"}</p>
      <p><strong>Particulièrement sale :</strong> ${isVeryDirty ? "Oui (+15 €)" : "Non"}</p>
      <p><strong>Poils d'animaux :</strong> ${hasPetHair ? "Oui (+15 €)" : "Non"}</p>

      <h3>Disponibilité</h3>
      <p><strong>Date :</strong> ${dateChoice === "date" ? `Date souhaitée : ${preferredDate || "Non sélectionnée"}` : "À convenir ensemble"}</p>
      <p><strong>Créneau :</strong> ${timeSlot || "Flexible"}</p>

      <h3>Tarif estimé</h3>
      <p style="font-size: 1.25rem; font-weight: bold; color: #ea580c;">${estimatedTotal ? `${estimatedTotal} €` : "À définir"}</p>

      <h3>Message complémentaire</h3>
      <p>${message ? message.replace(/\n/g, "<br>") : "Aucun message complémentaire."}</p>
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
        reply_to: email?.trim() || undefined,
        subject: `Demande de devis - ${name} (${city || "Métropole lilloise"})`,
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
          headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
        headers: { "Content-Type": "application/json" },
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
