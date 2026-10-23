// Cloudflare Pages Function pour POST /api/contact
// Permet la compatibilité directe si le projet est déployé en tant que Cloudflare Pages via GitHub

interface CloudflarePagesEnv {
  RESEND_API_KEY?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
  CONTACT_SENDER_EMAIL?: string;
  [key: string]: unknown;
}

interface EventContext {
  request: Request;
  env: CloudflarePagesEnv;
  params: Record<string, string>;
  data: Record<string, unknown>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost(context: EventContext): Promise<Response> {
  const { request, env } = context;

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

    const resendApiKey =
      (typeof env?.RESEND_API_KEY === "string" && env.RESEND_API_KEY.trim()) ||
      (typeof process !== "undefined" && process?.env?.RESEND_API_KEY) ||
      undefined;

    const recipientEmail =
      (typeof env?.CONTACT_RECIPIENT_EMAIL === "string" && env.CONTACT_RECIPIENT_EMAIL.trim()) ||
      (typeof process !== "undefined" && process?.env?.CONTACT_RECIPIENT_EMAIL) ||
      "rudyboudene93@gmail.com";

    const senderEmail =
      (typeof env?.CONTACT_SENDER_EMAIL === "string" && env.CONTACT_SENDER_EMAIL.trim()) ||
      (typeof process !== "undefined" && process?.env?.CONTACT_SENDER_EMAIL) ||
      "reservation@bichonnetacaisse.fr";

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          configured: false,
          message:
            "Le service d'envoi d'e-mail direct n'est pas encore configuré sur le serveur Cloudflare (clé API RESEND_API_KEY requise). Veuillez transmettre votre demande via WhatsApp en un clic ou par téléphone au 06 59 14 09 39.",
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
      ``,
      `Formule : ${formulaName || "À définir ensemble"} (${formulaPrice ? `${formulaPrice} €` : "—"})`,
      `Soins ciblés : ${selectedCares?.length ? selectedCares.join(", ") : "Aucun"}`,
      `Véhicule particulièrement sale : ${isVeryDirty ? "Oui (+15 €)" : "Non"}`,
      `Présence de poils d'animaux : ${hasPetHair ? "Oui (+15 €)" : "Non"}`,
      ``,
      `Rendez-vous : ${dateChoice === "date" ? `Date souhaitée : ${preferredDate || "Non sélectionnée"}` : "À convenir ensemble"}`,
      `Créneau horaire : ${timeSlot || "Flexible"}`,
      ``,
      `Tarif estimé : ${estimatedTotal ? `${estimatedTotal} €` : "À définir"}`,
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
    console.error("Error in Cloudflare Pages /api/contact:", err);
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
