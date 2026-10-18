import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { BUSINESS, CARES, FORMULAS } from "@/lib/business";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches /formules and /contact routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/formules").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/contact").at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

describe("Business configuration & pricing", () => {
  it("has exact expected formula prices: 49 €, 69 €, 109 €", () => {
    const ext = FORMULAS.find((f) => f.id === "exterieur");
    const int = FORMULAS.find((f) => f.id === "interieur");
    const comp = FORMULAS.find((f) => f.id === "complet");

    expect(ext?.price).toBe(49);
    expect(ext?.short).toContain("Lavage professionnel et respectueux de la carrosserie");
    expect(ext?.short).toContain("Nettoyage des roues inclus");

    expect(int?.price).toBe(69);
    expect(int?.short).toContain("traitement vapeur si nécessaire, adapté aux matériaux");
    // Ensure no injecteur-extracteur is mentioned anywhere in the formulas
    expect(int?.short.toLowerCase()).not.toContain("injecteur");
    expect(int?.items.some((i) => i.toLowerCase().includes("injecteur"))).toBe(false);

    expect(comp?.price).toBe(109);
  });

  it("has the 5 exact care prestations, names, and prices", () => {
    expect(CARES).toHaveLength(5);

    const intPlast = CARES.find((c) => c.id === "plastiques-int");
    const extPlast = CARES.find((c) => c.id === "plastiques-ext");
    const odeur = CARES.find((c) => c.id === "anti-odeurs");
    const cuir = CARES.find((c) => c.id === "soin-cuir");
    const depoil = CARES.find((c) => c.id === "depoilage");

    expect(intPlast?.name).toBe("Rénovation des plastiques intérieurs");
    expect(intPlast?.price).toBe(20);
    expect(intPlast?.short).toBe("Redonnez profondeur et éclat aux surfaces intérieures.");

    expect(extPlast?.name).toBe("Rénovation des plastiques extérieurs");
    expect(extPlast?.price).toBe(20);
    expect(extPlast?.short).toBe("Ravivez les plastiques ternis pour une finition soignée.");

    expect(odeur?.name).toBe("Traitement anti-odeurs");
    expect(odeur?.price).toBe(15);
    expect(odeur?.short).toBe("Ciblez les odeurs persistantes dans l'habitacle.");

    expect(cuir?.name).toBe("Soin du cuir");
    expect(cuir?.price).toBe(15);
    expect(cuir?.short).toBe(
      "Nourrissez et ravivez l'éclat du cuir pour lui redonner une apparence soignée.",
    );

    expect(depoil?.name).toBe("Dépoilage intensif");
    expect(depoil?.price).toBe(15);
    expect(depoil?.short).toBe(
      "Éliminez les poils d'animaux en quantité sur les sièges et moquettes.",
    );
  });

  it("has exact contact phone number and valid links", () => {
    expect(BUSINESS.phoneDisplay).toBe("06 59 14 09 39");
    expect(BUSINESS.phoneTel).toBe("tel:+33659140939");
    expect(BUSINESS.whatsappNumber).toBe("33659140939");
    expect(BUSINESS.facebookUrl).toBe("https://www.facebook.com/profile.php?id=61595404295972");
    expect(BUSINESS.instagramUrl).toBe("https://www.instagram.com/bicho.nnetacaisse/");
  });
});
