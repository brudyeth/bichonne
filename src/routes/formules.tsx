import { createFileRoute, Link } from "@tanstack/react-router";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { ContactBand, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/formules")({
  head: () => ({
    meta: [
      { title: "Tarifs nettoyage auto à domicile Lille | Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Découvrez nos formules de nettoyage auto à domicile à Lille : extérieur 49 €, intérieur 69 € et complet 109 €. Intervention dans la métropole lilloise.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Tarifs nettoyage auto à domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Découvrez nos formules de nettoyage auto à domicile à Lille : extérieur 49 €, intérieur 69 € et complet 109 €. Intervention dans la métropole lilloise.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/formules" },
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:image:alt",
        content: "Formules et tarifs de nettoyage automobile à domicile - Bichonne ta Caisse Lille",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Tarifs nettoyage auto à domicile Lille | Bichonne ta Caisse",
      },
      {
        name: "twitter:description",
        content:
          "Découvrez nos formules de nettoyage auto à domicile à Lille : extérieur 49 €, intérieur 69 € et complet 109 €. Intervention dans la métropole lilloise.",
      },
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/formules" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Prestations & Tarifs à domicile"
        title="Formules de nettoyage automobile à domicile à Lille"
      >
        Les tarifs sont identiques pour tous les types de véhicules (citadine, berline, SUV). Aucun
        frais caché dans la métropole lilloise.
      </PageHero>
      <section className="container-site py-16 md:py-20">
        <FormulaCards detailed />
        <p className="mt-4 text-xs sm:text-sm text-muted-foreground/90 max-w-2xl italic">
          * Soins complémentaires et suppléments éventuels annoncés avant confirmation du
          rendez-vous.
        </p>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl">
          Le nettoyage des tissus vise à atténuer au mieux les taches ; selon leur ancienneté et la
          nature du tissu, certaines peuvent ne pas disparaître complètement.
        </p>

        <div id="soins-cibles" className="mt-16 pt-12 border-t border-border">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Prestations complémentaires
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Les petits plus pour votre voiture</h2>
          <p className="mt-2 mb-8 max-w-2xl text-base text-muted-foreground">
            Complétez votre formule avec les soins adaptés à votre véhicule.
          </p>
          <CareCards />
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-secondary/60 border p-6">
            <p className="text-sm text-muted-foreground max-w-xl">
              Ces prestations s'ajoutent facilement à votre formule de nettoyage pour un rendu
              impeccable jusque dans les moindres détails.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Réservation & Devis
            </Link>
          </div>
        </div>

        {/* Section FAQ utile pour le SEO et la conversion client */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Questions fréquentes
          </p>
          <h2 className="mt-2 text-4xl">Comment se déroule l'intervention à domicile ?</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Où réalisez-vous le nettoyage ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nous nous déplaçons directement à votre domicile, dans votre cour, allée, garage ou
                sur le parking privé de votre lieu de travail à Lille et dans toute la métropole.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                De quoi avez-vous besoin sur place ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pour réaliser nos prestations dans les meilleures conditions, nous avons simplement
                besoin d'un accès à une prise électrique classique. Un point d'eau est également
                nécessaire pour les prestations comprenant un lavage extérieur.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Vous ne disposez pas de ces équipements ? Aucun souci ! Contactez-nous en amont afin
                que nous puissions étudier une solution adaptée à votre situation.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Le prix varie-t-il selon la taille du véhicule ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Non ! Nos tarifs sont fixes et transparents : 49 € pour l'extérieur, 69 € pour
                l'intérieur, 109 € pour le complet, que vous ayez une citadine, une berline ou un
                SUV. Nos tarifs peuvent également être revus à la baisse dans le cadre d'offres
                promotionnelles ponctuelles.
              </p>
            </div>
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-display text-xl font-bold uppercase text-foreground">
                Comment réserver une date ?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Un simple appel au 06 59 14 09 39, un message sur WhatsApp ou via le{" "}
                <Link
                  to="/contact"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                >
                  formulaire de devis en ligne
                </Link>{" "}
                : nous convenons ensemble du jour et du créneau qui vous arrangent.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
