import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { BUSINESS, CARES, FORMULAS, TRAVEL_CONDITIONS } from "@/lib/business";
import {
  TEXTILE_FIXED_PRESTATIONS,
  TEXTILE_HONEST_NOTICE,
  TEXTILE_OPTIONS,
  TEXTILE_PRESTATIONS,
  TEXTILE_QUOTE_PRESTATIONS,
  TEXTILE_STEAM_OPTION,
  calculateTextileEstimate,
} from "@/lib/textiles";
import {
  BOOKING_OPTIONS,
  NAV,
  HeaderBookingDropdown,
  Header,
  HeaderReservationButton,
} from "@/components/site/Layout";
import { INTERVENTION_ZONES } from "@/lib/zones";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches /formules, /canapes-textiles, /entreprises, /contact and /resultats routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/formules").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/canapes-textiles").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/entreprises").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/contact").at(-1)?.routeId).not.toBe(rootRouteId);
    expect(router.matchRoutes("/resultats").at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("displays Accueil, Nettoyage automobile and Canapés & textiles as direct top-level NAV links", () => {
    expect(NAV).toEqual([
      { to: "/", label: "Accueil" },
      { to: "/formules", label: "Nettoyage automobile" },
      { to: "/canapes-textiles", label: "Canapés & textiles" },
    ]);
  });

  it("provides Particulier and Professionnel options in the header booking dropdown", () => {
    expect(BOOKING_OPTIONS).toHaveLength(2);

    const particulier = BOOKING_OPTIONS.find((opt) => opt.id === "particulier");
    expect(particulier).toBeDefined();
    expect(particulier?.title).toBe("Particulier");
    expect(particulier?.subtitle).toBe("Réserver un nettoyage");
    expect(particulier?.to).toBe("/contact");

    const pro = BOOKING_OPTIONS.find((opt) => opt.id === "professionnel");
    expect(pro).toBeDefined();
    expect(pro?.title).toBe("Professionnel");
    expect(pro?.subtitle).toBe("Demander un devis");
    expect(pro?.to).toBe("/entreprises");
    expect(pro?.hash).toBe("devis");
    expect(`${pro?.to}#${pro?.hash}`).toBe("/entreprises#devis");
  });

  it("exports header navigation components and reservation helpers", () => {
    expect(typeof Header).toBe("function");
    expect(typeof HeaderBookingDropdown).toBe("function");
    expect(typeof HeaderReservationButton).toBe("function");
  });
});

describe("Business configuration & pricing", () => {
  it("has exact expected formula prices: 69 €, 99 €, 139 € and updated descriptions", () => {
    const express = FORMULAS.find((f) => f.id === "interieur-express");
    const premium = FORMULAS.find((f) => f.id === "interieur-premium");
    const comp = FORMULAS.find((f) => f.id === "complet");

    expect(express?.price).toBe(69);
    expect(express?.duration).toBe("1 h à 1 h 30");
    expect(express?.short).toBe("Nettoyage d'entretien rapide pour un habitacle net au quotidien.");
    expect(express?.items).toContain("Aspiration des tapis, moquettes et du coffre");
    expect(express?.items).toContain(
      "Dépoussiérage du tableau de bord et des surfaces accessibles",
    );
    expect(express?.items).toContain(
      "Nettoyage de l'écran, du rétroviseur intérieur et des plastiques courants",
    );
    expect(express?.items).toContain("Nettoyage de surface des sièges et tissus");

    expect(premium?.price).toBe(99);
    expect(premium?.duration).toBe("2 à 3 h");
    expect(premium?.short).toBe(
      "Prestations de l'Express + nettoyage approfondi, shampouinage des textiles et finitions détaillées.",
    );
    expect(premium?.highlight).toBe(true);
    expect(premium?.items).toContain("Toutes les prestations de l'Intérieur Express");
    expect(premium?.items).toContain(
      "Shampouinage des sièges, tapis et moquettes (injection-extraction)",
    );
    expect(premium?.items).toContain("Assainissement des moquettes et traitement anti-odeur");
    expect(premium?.items).toContain("Dépoussiérage des rails de sièges et bouches d'aération");
    expect(premium?.items).toContain(
      "Nettoyage des marchepieds, contours de portes et du pédalier",
    );
    expect(premium?.items).toContain("Protection anti-UV des plastiques intérieurs");

    expect(comp?.price).toBe(139);
    expect(comp?.duration).toBe("3 à 5 h");
    expect(comp?.short).toBe(
      "L'association complète de l'Intérieur Premium et du lavage extérieur.",
    );
    expect(comp?.items).toContain("Intégralité de la formule Intérieur Premium");
    expect(comp?.items).toContain("Prélavage à la mousse active");
    expect(comp?.items).toContain("Lavage manuel de la carrosserie");
    expect(comp?.items).toContain("Nettoyage des jantes");
    expect(comp?.items).toContain("Rinçage et séchage manuel à la microfibre");
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

  it("calculates travel fees correctly according to the 20 km free policy from Place de la République", () => {
    expect(TRAVEL_CONDITIONS.freeRadiusKm).toBe(20);
    expect(TRAVEL_CONDITIONS.ratePerKmRoundTrip).toBe(0.5);
    expect(TRAVEL_CONDITIONS.headline).toBe("Déplacement offert jusqu'à 20 km de Lille");
    expect(TRAVEL_CONDITIONS.departurePoint.name).toBe("Place de la République, Lille");
    expect(TRAVEL_CONDITIONS.subline).toBe("Au-delà : 0,50 €/km supplémentaire aller-retour.");

    // Test cases given in the prompt:
    // 20 km: gratuit
    expect(TRAVEL_CONDITIONS.calculateFee(15)).toBe(0);
    expect(TRAVEL_CONDITIONS.calculateFee(20)).toBe(0);
    // 25 km: 5 € ((25 - 20) * 2 * 0.5)
    expect(TRAVEL_CONDITIONS.calculateFee(25)).toBe(5);
    // 30 km: 10 € ((30 - 20) * 2 * 0.5)
    expect(TRAVEL_CONDITIONS.calculateFee(30)).toBe(10);
    // 35 km: 15 €
    expect(TRAVEL_CONDITIONS.calculateFee(35)).toBe(15);
    // 45 km: 25 €
    expect(TRAVEL_CONDITIONS.calculateFee(45)).toBe(25);
  });

  it("has exact contact phone number and valid links", () => {
    expect(BUSINESS.phoneDisplay).toBe("06 59 14 09 39");
    expect(BUSINESS.phoneTel).toBe("tel:+33659140939");
    expect(BUSINESS.whatsappNumber).toBe("33659140939");
    expect(BUSINESS.facebookUrl).toBe("https://www.facebook.com/profile.php?id=61595404295972");
    expect(BUSINESS.instagramUrl).toBe("https://www.instagram.com/bichonne.tacaisse/");
  });

  it("has the exact textile pricing grid, updated durations, no textile supplement, and honest non-disinfection wording", () => {
    const canape23 = TEXTILE_FIXED_PRESTATIONS.find((p) => p.id === "canape-2-3");
    const canape45 = TEXTILE_FIXED_PRESTATIONS.find((p) => p.id === "canape-4-5");
    const fauteuil = TEXTILE_FIXED_PRESTATIONS.find((p) => p.id === "fauteuil");
    const matelas1 = TEXTILE_FIXED_PRESTATIONS.find((p) => p.id === "matelas-1");
    const matelas2 = TEXTILE_FIXED_PRESTATIONS.find((p) => p.id === "matelas-2");

    expect(canape23?.price).toBe(69);
    expect(canape23?.duration).toBe("Environ 1 h");
    expect(canape45?.price).toBe(89);
    expect(canape45?.duration).toBe("Environ 1 h 30");
    expect(fauteuil?.price).toBe(39);
    expect(fauteuil?.duration).toBe("30 à 45 min");
    expect(matelas1?.price).toBe(39);
    expect(matelas1?.duration).toBe("30 à 45 min");
    expect(matelas2?.price).toBe(59);
    expect(matelas2?.duration).toBe("Environ 1 h");

    expect(TEXTILE_OPTIONS).toHaveLength(0);

    const angle = TEXTILE_QUOTE_PRESTATIONS.find((p) => p.id === "canape-angle-u");
    expect(angle?.price).toBeNull();
    expect(angle?.unitNote).toBe("selon ses dimensions");

    const tapis = TEXTILE_QUOTE_PRESTATIONS.find((p) => p.id === "tapis-moquette-chaises");
    expect(tapis?.price).toBeNull();
    expect(tapis?.unitNote).toBe("selon les dimensions ou la quantité");

    const serialized = JSON.stringify({
      TEXTILE_PRESTATIONS,
      TEXTILE_STEAM_OPTION,
      TEXTILE_HONEST_NOTICE,
    }).toLowerCase();
    expect(serialized).not.toMatch(/d[ée]sinfect/);
  });

  it("calculates optional Traitement vapeur (+10 € par élément traité) accurately across single and multi-item orders", () => {
    expect(TEXTILE_STEAM_OPTION.name).toBe("Traitement vapeur");
    expect(TEXTILE_STEAM_OPTION.pricePerItem).toBe(10);
    expect(TEXTILE_STEAM_OPTION.priceLabel).toBe("+10 €");
    expect(TEXTILE_STEAM_OPTION.unitLabel).toBe("par élément traité");
    expect(TEXTILE_STEAM_OPTION.short).toBe(
      "Un soin complémentaire à la vapeur pour une hygiène renforcée. La chaleur aide à réduire la présence d'acariens en surface, à décoller certaines salissures et à rafraîchir vos textiles.",
    );

    // Non sélectionné par défaut -> 0 € de supplément
    const disabled = calculateTextileEstimate({
      quantities: { "canape-2-3": 2 },
      steamEnabled: false,
      steamQuantities: { "canape-2-3": 2 },
    });
    expect(disabled.steamPiecesCount).toBe(0);
    expect(disabled.steamSurcharge).toBe(0);
    expect(disabled.baseTotal).toBe(138);

    // 1 canapé : +10 €
    const oneSofa = calculateTextileEstimate({
      quantities: { "canape-2-3": 1 },
      steamEnabled: true,
      steamQuantities: { "canape-2-3": 1 },
    });
    expect(oneSofa.fixedSubtotal).toBe(69);
    expect(oneSofa.steamSurcharge).toBe(10);
    expect(oneSofa.baseTotal).toBe(79);

    // 2 canapés : +20 €
    const twoSofas = calculateTextileEstimate({
      quantities: { "canape-2-3": 2 },
      steamEnabled: true,
      steamQuantities: { "canape-2-3": 2 },
    });
    expect(twoSofas.fixedSubtotal).toBe(138);
    expect(twoSofas.steamSurcharge).toBe(20);
    expect(twoSofas.baseTotal).toBe(158);

    // 5 fauteuils : +50 €
    const fiveArmchairs = calculateTextileEstimate({
      quantities: { fauteuil: 5 },
      steamEnabled: true,
      steamQuantities: { fauteuil: 5 },
    });
    expect(fiveArmchairs.fixedSubtotal).toBe(195);
    expect(fiveArmchairs.steamSurcharge).toBe(50);
    expect(fiveArmchairs.baseTotal).toBe(245);

    // Commande multi-pièces avec choix partiel des éléments traités à la vapeur
    const mixedPartial = calculateTextileEstimate({
      quantities: { "canape-2-3": 1, fauteuil: 2, "matelas-2": 1 },
      steamEnabled: true,
      steamQuantities: { "canape-2-3": 1, fauteuil: 1, "matelas-2": 0 },
    });
    expect(mixedPartial.totalFixedPieces).toBe(4);
    expect(mixedPartial.fixedSubtotal).toBe(69 + 78 + 59);
    expect(mixedPartial.steamPiecesCount).toBe(2);
    expect(mixedPartial.steamSurcharge).toBe(20);
    expect(mixedPartial.baseTotal).toBe(226);

    // Plafonnement : impossible de facturer plus de pièces vapeur que de pièces commandées
    const clamped = calculateTextileEstimate({
      quantities: { fauteuil: 2 },
      steamEnabled: true,
      steamQuantities: { fauteuil: 5 },
    });
    expect(clamped.steamPiecesCount).toBe(2);
    expect(clamped.steamSurcharge).toBe(20);
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

    expect(titleMeta?.["title"]).toBe("Nettoyage voiture à domicile Lille | Bichonne ta Caisse");
    expect(descMeta?.["content"]).toBe(
      "Nettoyage automobile à domicile à Lille et métropole lilloise dès 69 € : Intérieur Express, Intérieur Premium et Formule Complète. Déplacement offert jusqu'à 20 km.",
    );
    expect(canonicalLink?.["href"]).toBe("https://bichonnetacaisse.fr/");
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
    expect(formulesCanonical?.["href"]).toBe("https://bichonnetacaisse.fr/formules");

    const formulesTitle = formulesHead?.meta?.find((m) => "title" in m);
    expect(formulesTitle?.["title"]).toBe(
      "Tarifs nettoyage auto à domicile Lille | Bichonne ta Caisse",
    );

    const formulesDesc = formulesHead?.meta?.find((m) => m["name"] === "description");
    expect(formulesDesc?.["content"]).toBe(
      "Découvrez nos formules de nettoyage auto à domicile à Lille : Intérieur Express 69 €, Intérieur Premium 99 € et Formule Complète 139 €. Intervention dans la métropole lilloise.",
    );

    const contactRoute = router.routesById["/contact"];
    const contactHead = (
      contactRoute.options as unknown as { head?: () => { links?: Array<Record<string, string>> } }
    ).head?.();
    const contactCanonical = contactHead?.links?.find((l) => l["rel"] === "canonical");
    expect(contactCanonical?.["href"]).toBe("https://bichonnetacaisse.fr/contact");

    const resultatsRoute = router.routesById["/resultats"];
    const resultatsHead = (
      resultatsRoute.options as unknown as {
        head?: () => {
          meta?: Array<Record<string, string>>;
          links?: Array<Record<string, string>>;
        };
      }
    ).head?.();
    const resultatsCanonical = resultatsHead?.links?.find((l) => l["rel"] === "canonical");
    expect(resultatsCanonical?.["href"]).toBe("https://bichonnetacaisse.fr/resultats");
    const resultatsTitle = resultatsHead?.meta?.find((m) => "title" in m);
    expect(resultatsTitle?.["title"]).toContain("Résultats avant / après");
  });

  it("exports BeforeAfterSection component and organizes realizations by vehicle", async () => {
    const { BeforeAfterSection, REALIZATIONS } =
      await import("@/components/site/BeforeAfterSection");
    expect(BeforeAfterSection).toBeDefined();
    expect(typeof BeforeAfterSection).toBe("function");
    expect(REALIZATIONS).toHaveLength(2);

    const clio = REALIZATIONS.find((r) => r.id === 1);
    expect(clio).toBeDefined();
    expect(clio?.title).toBe("Renault Clio 5 – Nettoyage intérieur");
    expect(clio?.views).toHaveLength(2);
    expect(clio?.views.map((v) => v.label)).toEqual([
      "Pédalier & Moquette",
      "Plancher arrière & Seuil",
    ]);

    const p208 = REALIZATIONS.find((r) => r.id === 2);
    expect(p208).toBeDefined();
    expect(p208?.title).toBe("Peugeot 208 – Nettoyage intérieur");
    expect(p208?.views).toHaveLength(4);

    const labels = p208?.views.map((v) => v.label);
    expect(labels).toEqual([
      "Poste de conduite",
      "Tapis conducteur",
      "Banquette et sol arrière",
      "Habitacle côté passager",
    ]);

    // Check that each view of Peugeot 208 has valid avant and apres paths
    for (const view of p208?.views ?? []) {
      expect(view.beforeJpg).toContain("208-");
      expect(view.afterJpg).toContain("208-");
      expect(view.beforeWebp).toContain(".webp");
      expect(view.afterWebp).toContain(".webp");
      expect(view.altBefore).toContain("Peugeot 208");
      expect(view.altAfter).toContain("Peugeot 208");
    }

    // Check that each view of Clio 5 has valid avant and apres paths
    for (const view of clio?.views ?? []) {
      expect(view.beforeJpg).toBeTruthy();
      expect(view.afterJpg).toBeTruthy();
      expect(view.beforeWebp).toContain(".webp");
      expect(view.afterWebp).toContain(".webp");
      expect(view.altBefore).toContain("Renault Clio 5");
      expect(view.altAfter).toContain("Renault Clio 5");
    }
  });

  it("configures official square favicons including 512x512 and 48x48", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const rootRoute = router.routesById["__root__"];
    const headResult = (
      rootRoute.options as unknown as {
        head?: () => {
          links?: Array<Record<string, string>>;
          meta?: Array<Record<string, string>>;
        };
      }
    ).head?.();

    const iconLinks = headResult?.links?.filter((l) => l["rel"] === "icon");
    expect(iconLinks?.some((l) => l["sizes"] === "512x512" && l["href"] === "/favicon.png")).toBe(
      true,
    );
    expect(iconLinks?.some((l) => l["sizes"] === "48x48" && l["href"] === "/favicon-48.png")).toBe(
      true,
    );
    expect(
      iconLinks?.some((l) => l["sizes"] === "192x192" && l["href"] === "/favicon-192.png"),
    ).toBe(true);

    const ogImage = headResult?.meta?.find((m) => m["property"] === "og:image");
    expect(ogImage?.["content"]).toMatch(/^https:\/\/bichonnetacaisse\.fr\//);
  });

  it("configures /zones-intervention route, SEO metadata, indexability, and 15 priority communes without dead links", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/zones-intervention");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);

    const zonesRoute = router.routesById["/zones-intervention"];
    const zonesHead = (
      zonesRoute.options as unknown as {
        head?: () => {
          meta?: Array<Record<string, string>>;
          links?: Array<Record<string, string>>;
        };
      }
    ).head?.();

    const titleMeta = zonesHead?.meta?.find((m) => "title" in m);
    const descMeta = zonesHead?.meta?.find((m) => m["name"] === "description");
    const robotsMeta = zonesHead?.meta?.find((m) => m["name"] === "robots");
    const canonicalLink = zonesHead?.links?.find((l) => l["rel"] === "canonical");

    expect(titleMeta?.["title"]).toBe(
      "Zones d'intervention | Nettoyage auto à domicile Lille – Bichonne ta Caisse",
    );
    expect(descMeta?.["content"]).toBeTruthy();
    expect(descMeta?.["content"]?.length).toBeGreaterThanOrEqual(110);
    expect(descMeta?.["content"]?.length).toBeLessThanOrEqual(165);
    expect(robotsMeta?.["content"]).toBe("index, follow");
    expect(canonicalLink?.["href"]).toBe("https://bichonnetacaisse.fr/zones-intervention");

    const priorityNames = [
      "Lille",
      "Wambrechies",
      "Marcq-en-Barœul",
      "Lambersart",
      "La Madeleine",
      "Tourcoing",
      "Roubaix",
      "Wasquehal",
      "Bondues",
      "Mouvaux",
      "Saint-André-lez-Lille",
      "Marquette-lez-Lille",
      "Villeneuve-d'Ascq",
      "Roncq",
      "Croix",
    ];
    for (const city of priorityNames) {
      expect(INTERVENTION_ZONES.some((z) => z.name === city)).toBe(true);
    }

    // Verify every localPageSlug in INTERVENTION_ZONES resolves to an actual existing local page
    const serviceRoute = router.routesById["/services/$slug"];
    const loader = (
      serviceRoute.options as unknown as {
        loader?: (ctx: { params: { slug: string } }) => { slug: string; city: string };
      }
    ).loader;
    expect(typeof loader).toBe("function");

    const linkedZones = INTERVENTION_ZONES.filter((z) => Boolean(z.localPageSlug));
    expect(linkedZones).toHaveLength(7);
    for (const zone of linkedZones) {
      const loaded = loader?.({ params: { slug: zone.localPageSlug! } });
      expect(loaded?.slug).toBe(zone.localPageSlug);
    }

    // Verify /zones-intervention is never added to header NAV
    expect(NAV.some((item) => item.to === ("/zones-intervention" as string))).toBe(false);
  });

  it("configures /canapes-textiles, /nettoyage-canape-lille and /nettoyage-matelas-lille routes and SEO metadata", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const expectedPages = [
      {
        path: "/canapes-textiles" as const,
        title: "Nettoyage canapé et matelas à Lille | Bichonne ta Caisse",
        description:
          "Nettoyage de canapés, matelas et fauteuils à domicile à Lille et dans la métropole lilloise. Nettoyage en profondeur, tarifs transparents et devis gratuit.",
        canonical: "https://bichonnetacaisse.fr/canapes-textiles",
      },
      {
        path: "/nettoyage-canape-lille" as const,
        title: "Nettoyage canapé à domicile Lille | Bichonne ta Caisse",
        canonical: "https://bichonnetacaisse.fr/nettoyage-canape-lille",
      },
      {
        path: "/nettoyage-matelas-lille" as const,
        title: "Nettoyage matelas à domicile Lille | Bichonne ta Caisse",
        canonical: "https://bichonnetacaisse.fr/nettoyage-matelas-lille",
      },
    ];

    const seenDescriptions = new Set<string>();

    for (const page of expectedPages) {
      const matches = router.matchRoutes(page.path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);

      const route = router.routesById[page.path];
      const head = (
        route.options as unknown as {
          head?: () => {
            meta?: Array<Record<string, string>>;
            links?: Array<Record<string, string>>;
          };
        }
      ).head?.();

      const titleMeta = head?.meta?.find((m) => "title" in m);
      const descMeta = head?.meta?.find((m) => m["name"] === "description");
      const robotsMeta = head?.meta?.find((m) => m["name"] === "robots");
      const canonicalLink = head?.links?.find((l) => l["rel"] === "canonical");

      expect(titleMeta?.["title"]).toBe(page.title);
      expect(canonicalLink?.["href"]).toBe(page.canonical);
      expect(robotsMeta?.["content"]).toBe("index, follow");

      const desc = descMeta?.["content"] ?? "";
      expect(desc.length).toBeGreaterThanOrEqual(120);
      expect(desc.length).toBeLessThanOrEqual(165);
      if (page.description) {
        expect(desc).toBe(page.description);
      }
      expect(seenDescriptions.has(desc)).toBe(false);
      seenDescriptions.add(desc);
    }

    // Header NAV must stay strictly unchanged
    expect(NAV).toHaveLength(3);
  });
});
