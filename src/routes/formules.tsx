import { createFileRoute, Link } from "@tanstack/react-router";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { ContactBand, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/formules")({
  head: () => ({
    meta: [
      { title: "Formules & tarifs — Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Nettoyage extérieur 49 €, intérieur 69 €, complet 109 €. Même prix pour tous les véhicules, à domicile dans la métropole lilloise.",
      },
      { property: "og:title", content: "Formules & tarifs — Bichonne ta Caisse" },
      {
        property: "og:description",
        content:
          "Extérieur 49 €, intérieur 69 €, complet 109 €. Prix identiques pour tous les véhicules.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Formules & tarifs" title="Des prix clairs, sans surprise">
        Les tarifs sont identiques pour tous les types de véhicules. Aucun frais caché.
      </PageHero>
      <section className="container-site py-16 md:py-20">
        <FormulaCards detailed />
        <p className="mt-8 text-sm text-muted-foreground max-w-2xl">
          Le nettoyage des tissus vise à atténuer au mieux les taches ; selon leur ancienneté et la
          nature du tissu, certaines peuvent ne pas disparaître complètement.
        </p>

        <div id="soins-cibles" className="mt-16 pt-12 border-t border-border">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Soins ciblés</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Les finitions qui font la différence</h2>
          <p className="mt-2 mb-8 max-w-2xl text-base text-muted-foreground">
            Des soins ciblés pour aller plus loin dans le détail.
          </p>
          <CareCards />
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary/60 border p-6">
            <p className="text-sm text-muted-foreground max-w-xl">
              Ces prestations s'ajoutent facilement à votre formule de nettoyage pour un rendu
              impeccable jusque dans les moindres détails.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
