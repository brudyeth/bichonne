import { describe, expect, it } from "vitest";

// Re-test the exact validation rules implemented across client and server
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

describe("Contact form phone validation", () => {
  it("accepts valid French standard mobile and landline numbers", () => {
    expect(isValidFrenchPhoneNumber("06 59 14 09 39")).toBe(true);
    expect(isValidFrenchPhoneNumber("0659140939")).toBe(true);
    expect(isValidFrenchPhoneNumber("07.12.34.56.78")).toBe(true);
    expect(isValidFrenchPhoneNumber("03-20-12-34-56")).toBe(true);
  });

  it("accepts international prefix formats (+33, 0033, +33(0))", () => {
    expect(isValidFrenchPhoneNumber("+33 6 59 14 09 39")).toBe(true);
    expect(isValidFrenchPhoneNumber("+33659140939")).toBe(true);
    expect(isValidFrenchPhoneNumber("0033 6 59 14 09 39")).toBe(true);
    expect(isValidFrenchPhoneNumber("+33(0)6 59 14 09 39")).toBe(true);
  });

  it("rejects invalid or incomplete phone numbers", () => {
    expect(isValidFrenchPhoneNumber("")).toBe(false);
    expect(isValidFrenchPhoneNumber("06 12 34")).toBe(false);
    expect(isValidFrenchPhoneNumber("00 12 34 56 78")).toBe(false);
    expect(isValidFrenchPhoneNumber("012345678901234")).toBe(false);
    expect(isValidFrenchPhoneNumber("telephone-invalide")).toBe(false);
    expect(isValidFrenchPhoneNumber("0000000000")).toBe(false);
  });
});

describe("Contact form email validation (optional field)", () => {
  it("considers empty or whitespace-only email as valid (optional)", () => {
    expect(isValidEmail("")).toBe(true);
    expect(isValidEmail("   ")).toBe(true);
    expect(isValidEmail(undefined)).toBe(true);
  });

  it("accepts correctly formatted email addresses", () => {
    expect(isValidEmail("jean.dupont@gmail.com")).toBe(true);
    expect(isValidEmail("client@domaine.fr")).toBe(true);
    expect(isValidEmail("rudyboudene93@gmail.com")).toBe(true);
    expect(isValidEmail("marie+test@bichonnetacaisse.fr")).toBe(true);
  });

  it("rejects malformed email addresses that would fail in Resend", () => {
    expect(isValidEmail("jean.dupont")).toBe(false);
    expect(isValidEmail("jean.dupont@")).toBe(false);
    expect(isValidEmail("@domaine.fr")).toBe(false);
    expect(isValidEmail("jean@domaine")).toBe(false);
    expect(isValidEmail("jean dupont@gmail.com")).toBe(false);
  });
});

describe("Intervention location requirement", () => {
  function hasValidLocation(address?: string, city?: string): boolean {
    return Boolean(address?.trim() || city?.trim());
  }

  it("accepts when address or city is provided", () => {
    expect(hasValidLocation("12 rue de la Paix", "")).toBe(true);
    expect(hasValidLocation("", "Lille")).toBe(true);
    expect(hasValidLocation("12 rue de la Paix", "Wambrechies")).toBe(true);
  });

  it("rejects when both address and city are empty", () => {
    expect(hasValidLocation("", "")).toBe(false);
    expect(hasValidLocation("   ", "  ")).toBe(false);
    expect(hasValidLocation(undefined, undefined)).toBe(false);
  });
});
