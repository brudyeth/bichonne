import { createFileRoute, Link } from "@tanstack/react-router";
import { BeforeAfterSection } from "@/components/site/BeforeAfterSection";
import { PageHero, ContactBand } from "@/components/site/Layout";
import { Sparkles, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/resultats")({
  head: () => ({
    meta: [
      {
        title: "Résultats avant / après nettoyage voiture Lille | Bichonne ta Caisse",
      },
      {
        name: "description",
        content:
          "Découvrez en photos nos résultats de nettoyage automobile à domicile à Lille et métropole lilloise. Comparaisons avant / après haute définition sur Peugeot 208 et Renault Clio 5.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Résultats avant / après nettoyage voiture Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Découvrez en photos nos résultats de nettoyage automobile à domicile à Lille et métropole lilloise. Comparaisons avant / après haute définition sur Peugeot 208 et Renault Clio 5.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/resultats" },
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:image:alt",
        content: "Galerie avant / après nettoyage automobile - Bichonne ta Caisse",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Résultats avant / après nettoyage voiture Lille | Bichonne ta Caisse",
      },
      {
        name: "twitter:description",
        content:
          "Découvrez en photos nos résultats de nettoyage automobile à domicile à Lille et métropole lilloise. Comparaisons avant / après haute définition sur Peugeot 208 et Renault Clio 5.",
      },
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/resultats" }],
  }),
  component: ResultatsPage,
});

function ResultatsPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos lumineux d'ambiance */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[650px] lg:size-[850px] rounded-full bg-[#243888]/22 blur-[150px] lg:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[600px] lg:size-[800px] rounded-full bg-[#282A74]/22 blur-[145px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <PageHero
          transparent
          eyebrow="Nos réalisations en images"
          title="Résultats avant / après – Nettoyage auto à domicile"
        >
          <p className="text-white/85 text-sm sm:text-base leading-relaxed">
            Découvrez nos interventions concrètes réalisées à domicile et sur lieu de travail dans
            la métropole lilloise. Toutes nos photos sont 100 % authentiques et prises directement
            sur nos chantiers.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="btn btn-primary text-xs sm:text-sm px-5 py-2.5 font-bold uppercase tracking-wider"
            >
              <span>Demander un devis</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/formules"
              className="btn border border-white/20 bg-white/[0.05] text-white hover:bg-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 py-2.5"
            >
              Voir les formules dès 49 €
            </Link>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary shrink-0" />
              <span>Shampoing textiles &amp; extraction</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>Photos réelles certifiées sans retouche</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="size-4 text-primary shrink-0" />
              <span>Intervention rapide à domicile</span>
            </div>
          </div>
        </PageHero>
      </div>

      {/* Galerie complète des réalisations */}
      <BeforeAfterSection />

      {/* Bandeau d'action final */}
      <ContactBand />
    </>
  );
}
