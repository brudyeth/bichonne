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
  it("has exact expected formula prices: 49 €, 69 €, 109 € and new descriptions", () => {
    const ext = FORMULAS.find((f) => f.id === "exterieur");
    const int = FORMULAS.find((f) => f.id === "interieur");
    const comp = FORMULAS.find((f) => f.id === "complet");

    expect(ext?.price).toBe(49);
    expect(ext?.duration).toBe("1 h à 1 h 30");
    expect(ext?.short).toContain(
      "Un nettoyage minutieux pour redonner éclat et propreté à votre carrosserie.",
    );
    expect(ext?.items).toContain("Prélavage à la mousse active");

    expect(int?.price).toBe(69);
    expect(int?.duration).toBe("2 à 3 h");
    expect(int?.short).toContain(
      "Un nettoyage en profondeur pour retrouver un habitacle propre, frais et soigné.",
    );
    expect(int?.items).toContain("Shampoing des sièges, tissus, tapis et moquettes");
    // Ensure no injecteur-extracteur is mentioned anywhere in the formulas
    expect(int?.short.toLowerCase()).not.toContain("injecteur");
    expect(int?.items.some((i) => i.toLowerCase().includes("injecteur"))).toBe(false);

    expect(comp?.price).toBe(109);
    expect(comp?.duration).toBe("3 à 5 h");
    expect(comp?.short).toContain(
      "La formule tout-en-un pour prendre soin de votre véhicule, à l'intérieur comme à l'extérieur.",
    );
  });

  it("has the 2 exact complementary prestations, names, and prices", () => {
    expect(CARES).toHaveLength(2);

    const poils = CARES.find((c) => c.id === "poils-sale");
    const cuir = CARES.find((c) => c.id === "soin-cuir");

    expect(poils?.name).toBe("Poils d'animaux / Véhicule très sale");
    expect(poils?.price).toBe(15);
    expect(poils?.short).toBe(
      "Supplément pour un nettoyage nécessitant une attention particulière.",
    );

    expect(cuir?.name).toBe("Soin nourrissant des cuirs");
    expect(cuir?.price).toBe(15);
    expect(cuir?.short).toBe(
      "Application d'un soin spécifique pour nourrir, assouplir et préserver les surfaces en cuir.",
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

describe("SEO metadata configuration", () => {
  it("has exact expected SEO title, description and canonical URL for homepage", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const indexRoute = router.routesById["/"];
    const headResult = (
      indexRoute.options as unknown as {
        head?: () => {
          meta?: Array<Record<string, string>>;
          links?: Array<Record<string, string>>;
        };
      }
    ).head?.();

    const titleMeta = headResult?.meta?.find((m) => "title" in m);
    const descMeta = headResult?.meta?.find((m) => m["name"] === "description");
    const canonicalLink = headResult?.links?.find((l) => l["rel"] === "canonical");

    expect(titleMeta?.title).toBe("Nettoyage voiture à domicile Lille | Bichonne ta Caisse");
    expect(descMeta?.content).toBe(
      "Nettoyage intérieur, extérieur et complet de votre véhicule à domicile à Lille, Wambrechies et dans la métropole lilloise. Découvrez nos formules dès 49 €.",
    );
    expect(canonicalLink?.href).toBe("https://bichonnetacaisse.fr/");
  });

  it("has canonical links for formules and contact routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const formulesRoute = router.routesById["/formules"];
    const formulesHead = (
      formulesRoute.options as unknown as {
        head?: () => {
          meta?: Array<Record<string, string>>;
          links?: Array<Record<string, string>>;
        };
      }
    ).head?.();
    const formulesCanonical = formulesHead?.links?.find((l) => l["rel"] === "canonical");
    expect(formulesCanonical?.href).toBe("https://bichonnetacaisse.fr/formules");

    const formulesTitle = formulesHead?.meta?.find((m) => "title" in m);
    expect(formulesTitle?.title).toBe(
      "Tarifs nettoyage auto à domicile Lille | Bichonne ta Caisse",
    );

    const formulesDesc = formulesHead?.meta?.find((m) => m["name"] === "description");
    expect(formulesDesc?.content).toBe(
      "Découvrez nos formules de nettoyage auto à domicile à Lille : extérieur 49 €, intérieur 69 € et complet 109 €. Intervention dans la métropole lilloise.",
    );

    const contactRoute = router.routesById["/contact"];
    const contactHead = (
      contactRoute.options as unknown as { head?: () => { links?: Array<Record<string, string>> } }
    ).head?.();
    const contactCanonical = contactHead?.links?.find((l) => l["rel"] === "canonical");
    expect(contactCanonical?.href).toBe("https://bichonnetacaisse.fr/contact");
  });
});
