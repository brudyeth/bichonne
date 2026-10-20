import { createFileRoute, Link } from "@tanstack/react-router";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { ContactBand, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/formules")({
  head: () => ({
    meta: [
      { title: "Formules & Tarifs Nettoyage Auto à Domicile Lille | Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Consultez nos tarifs de nettoyage automobile à domicile à Lille et dans la métropole : extérieur dès 49 €, intérieur 69 €, formule complète 109 €. Prix unique garanti.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Formules & Tarifs Nettoyage Auto à Domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Extérieur 49 €, intérieur 69 €, complet 109 €. Prix transparents identiques pour tous les types de véhicules.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/formules" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
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
        title="Formules de nettoyage automobile à domicile"
      >
        Les tarifs sont identiques pour tous les types de véhicules (citadine, berline, SUV). Aucun
        frais caché dans la métropole lilloise.
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
            Des soins ciblés pour aller plus loin dans le détail : rénovation des plastiques
            intérieurs et extérieurs, traitement anti-odeurs, soin du cuir et dépoilage intensif.
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
                Un simple appel au 06 59 14 09 39, un message sur WhatsApp ou via le formulaire de
                devis en ligne : nous convenons ensemble du jour et du créneau qui vous arrangent.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
