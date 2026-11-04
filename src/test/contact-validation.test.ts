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

describe("Utility vehicle pricing rules", () => {
  function calculateTotal(
    formulaPrice: number,
    vehicleCategory: "standard" | "utilitaire" | "grand-utilitaire",
    caresPrices: number[] = [],
  ): number {
    const isUtilityVehicle =
      vehicleCategory === "utilitaire" || vehicleCategory === "grand-utilitaire";
    let total = formulaPrice;
    total += caresPrices.reduce((acc, p) => acc + p, 0);
    if (isUtilityVehicle) {
      total += 20;
    }
    return total;
  }

  it("calculates Intérieur Express (49 €) correctly for all vehicle types", () => {
    expect(calculateTotal(49, "standard")).toBe(49);
    expect(calculateTotal(49, "utilitaire")).toBe(69);
    expect(calculateTotal(49, "grand-utilitaire")).toBe(69);
  });

  it("calculates Intérieur Premium (69 €) correctly for all vehicle types", () => {
    expect(calculateTotal(69, "standard")).toBe(69);
    expect(calculateTotal(69, "utilitaire")).toBe(89);
    expect(calculateTotal(69, "grand-utilitaire")).toBe(89);
  });

  it("calculates Formule Complète (109 €) correctly for all vehicle types, including utilitaires (+20 € = 129 €)", () => {
    expect(calculateTotal(109, "standard")).toBe(109);
    expect(calculateTotal(109, "utilitaire")).toBe(129);
    expect(calculateTotal(109, "grand-utilitaire")).toBe(129);
  });

  it("correctly combines utility surcharge (+20 €) with care options", () => {
    // Formule Complète 109 € + Utilitaire 20 € + Soin cuir 15 € = 144 €
    expect(calculateTotal(109, "utilitaire", [15])).toBe(144);
    // Formule Complète 109 € + Grand utilitaire 20 € + Poils 15 € + Cuir 15 € = 159 €
    expect(calculateTotal(109, "grand-utilitaire", [15, 15])).toBe(159);
    // Intérieur Premium 69 € + Utilitaire 20 € + Poils 15 € = 104 €
    expect(calculateTotal(69, "utilitaire", [15])).toBe(104);
  });
});

describe("Travel fee calculation rules (Place de la République, Lille)", () => {
  function calculateTravelFee(distanceOneWayKm: number): number {
    const freeRadiusKm = 20;
    const ratePerKmRoundTrip = 0.5;
    const billableExcessOneWay = Math.max(0, distanceOneWayKm - freeRadiusKm);
    return Math.round(billableExcessOneWay * 2 * ratePerKmRoundTrip * 100) / 100;
  }

  it("is free up to 20 km one-way from Place de la République", () => {
    expect(calculateTravelFee(0)).toBe(0);
    expect(calculateTravelFee(5)).toBe(0);
    expect(calculateTravelFee(10.5)).toBe(0);
    expect(calculateTravelFee(19.9)).toBe(0);
    expect(calculateTravelFee(20)).toBe(0);
  });

  it("bills 0.50 €/km round-trip for kilometers beyond 20 km", () => {
    // 25 km: 5 km excess * 2 * 0.50 = 5 €
    expect(calculateTravelFee(25)).toBe(5);
    // 30 km: 10 km excess * 2 * 0.50 = 10 €
    expect(calculateTravelFee(30)).toBe(10);
    // 35 km: 15 km excess * 2 * 0.50 = 15 €
    expect(calculateTravelFee(35)).toBe(15);
    // 37.3 km: 17.3 * 2 * 0.50 = 17.30 €
    expect(calculateTravelFee(37.3)).toBe(17.3);
  });

  it("calculates total with formula, utility surcharge and travel fee", () => {
    // Formule Complète (109 €) + Utilitaire (+20 €) + 30 km travel (+10 €) = 139 €
    const baseFormula = 109;
    const utility = 20;
    const travel = calculateTravelFee(30);
    expect(baseFormula + utility + travel).toBe(139);
  });
});
