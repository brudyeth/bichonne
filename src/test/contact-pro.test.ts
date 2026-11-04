import { describe, expect, it } from "vitest";

// Fonctions de validation utilisées pour le formulaire B2B et l'API
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
  if (!input) return false;
  const trimmed = input.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed);
}

const VEHICLE_COUNT_OPTIONS = [
  "1 véhicule",
  "2 à 5 véhicules",
  "6 à 10 véhicules",
  "Plus de 10 véhicules",
] as const;

function validateProQuoteSubmission(data: {
  companyName?: string;
  contactName?: string;
  phone?: string;
  email?: string;
  vehicleCount?: string;
  description?: string;
  hp?: string;
}): { valid: boolean; error?: string; isSpam?: boolean } {
  if (data.hp) {
    return { valid: true, isSpam: true };
  }

  if (!data.companyName?.trim()) {
    return { valid: false, error: "Le nom de l'entreprise est obligatoire." };
  }

  if (!data.contactName?.trim()) {
    return { valid: false, error: "Le nom et prénom du contact sont obligatoires." };
  }

  if (!data.phone?.trim()) {
    return { valid: false, error: "Le numéro de téléphone est obligatoire." };
  }

  if (!isValidFrenchPhoneNumber(data.phone)) {
    return {
      valid: false,
      error: "Veuillez renseigner un numéro de téléphone valide à 10 chiffres.",
    };
  }

  if (!data.email?.trim()) {
    return { valid: false, error: "L'adresse e-mail professionnelle est obligatoire." };
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: "Veuillez renseigner une adresse e-mail valide." };
  }

  if (
    !data.vehicleCount?.trim() ||
    !VEHICLE_COUNT_OPTIONS.includes(data.vehicleCount as (typeof VEHICLE_COUNT_OPTIONS)[number])
  ) {
    return { valid: false, error: "Veuillez sélectionner le nombre de véhicules concernés." };
  }

  return { valid: true };
}

describe("Pro Quote Form Validation", () => {
  it("accepts a completely valid B2B submission", () => {
    const result = validateProQuoteSubmission({
      companyName: "SARL Métropole Transport",
      contactName: "Claire Lefebvre",
      phone: "06 59 14 09 39",
      email: "contact@metropole-transport.fr",
      vehicleCount: "2 à 5 véhicules",
      description: "Nettoyage mensuel de 4 camionnettes sur notre parking à Wambrechies.",
    });

    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
    expect(result.isSpam).toBeUndefined();
  });

  it("accepts valid international format phone number (+33 6 12 34 56 78)", () => {
    const result = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "Thomas Leroy",
      phone: "+33 6 12 34 56 78",
      email: "t.leroy@cabinet.fr",
      vehicleCount: "1 véhicule",
    });

    expect(result.valid).toBe(true);
  });

  it("rejects missing company name", () => {
    const result = validateProQuoteSubmission({
      companyName: "   ",
      contactName: "Thomas Leroy",
      phone: "06 12 34 56 78",
      email: "t.leroy@cabinet.fr",
      vehicleCount: "1 véhicule",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toBe("Le nom de l'entreprise est obligatoire.");
  });

  it("rejects missing contact name", () => {
    const result = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "",
      phone: "06 12 34 56 78",
      email: "t.leroy@cabinet.fr",
      vehicleCount: "1 véhicule",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toBe("Le nom et prénom du contact sont obligatoires.");
  });

  it("rejects invalid phone number", () => {
    const result = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "Thomas Leroy",
      phone: "12345",
      email: "t.leroy@cabinet.fr",
      vehicleCount: "1 véhicule",
    });

    expect(result.valid).toBe(false);
    expect(result.error).toBe("Veuillez renseigner un numéro de téléphone valide à 10 chiffres.");
  });

  it("rejects missing or invalid email", () => {
    const resultEmpty = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "Thomas Leroy",
      phone: "06 12 34 56 78",
      email: "",
      vehicleCount: "1 véhicule",
    });
    expect(resultEmpty.valid).toBe(false);
    expect(resultEmpty.error).toBe("L'adresse e-mail professionnelle est obligatoire.");

    const resultInvalid = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "Thomas Leroy",
      phone: "06 12 34 56 78",
      email: "not-an-email",
      vehicleCount: "1 véhicule",
    });
    expect(resultInvalid.valid).toBe(false);
    expect(resultInvalid.error).toBe("Veuillez renseigner une adresse e-mail valide.");
  });

  it("validates allowed vehicle count choices", () => {
    for (const choice of VEHICLE_COUNT_OPTIONS) {
      const result = validateProQuoteSubmission({
        companyName: "Cabinet Conseil",
        contactName: "Thomas Leroy",
        phone: "06 12 34 56 78",
        email: "t.leroy@cabinet.fr",
        vehicleCount: choice,
      });
      expect(result.valid).toBe(true);
    }

    const invalidResult = validateProQuoteSubmission({
      companyName: "Cabinet Conseil",
      contactName: "Thomas Leroy",
      phone: "06 12 34 56 78",
      email: "t.leroy@cabinet.fr",
      vehicleCount: "Inconnu",
    });
    expect(invalidResult.valid).toBe(false);
  });

  it("detects spam bots silently via honeypot field", () => {
    const result = validateProQuoteSubmission({
      companyName: "Bot Spammer",
      contactName: "Bot",
      phone: "06 12 34 56 78",
      email: "bot@spam.com",
      vehicleCount: "1 véhicule",
      hp: "I am a robot",
    });

    expect(result.valid).toBe(true);
    expect(result.isSpam).toBe(true);
  });
});
