import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
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
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos continus partagés */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[650px] lg:size-[850px] rounded-full bg-[#3448D8]/35 blur-[150px] lg:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[600px] lg:size-[800px] rounded-full bg-[#4440A0]/35 blur-[145px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[28%] -left-24 size-[650px] lg:size-[850px] rounded-full bg-[#3448D8]/32 blur-[150px] lg:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[40%] right-[10%] size-[320px] lg:size-[400px] rounded-full bg-[#F47721]/10 blur-[115px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[58%] -right-20 size-[640px] lg:size-[820px] rounded-full bg-[#5140A0]/28 blur-[140px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-12 -left-20 size-[620px] lg:size-[800px] rounded-full bg-[#4440A0]/32 blur-[140px] lg:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <PageHero
          transparent
          eyebrow="Prestations & Tarifs à domicile"
          title="Formules de nettoyage automobile à domicile à Lille"
        >
          <p>
            Les tarifs sont identiques pour tous les types de véhicules (citadine, berline, SUV).
            Aucun frais caché.
          </p>
          <div className="mt-4 inline-flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm text-white/95">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <MapPin className="size-4 shrink-0" />
              <span>Déplacement offert jusqu'à 15 km autour de Lille</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white/80 text-xs">
              Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km, aller-retour.
            </span>
          </div>
        </PageHero>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container-site relative z-10">
            <FormulaCards detailed />
            <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-2xl italic">
              * Soins complémentaires et suppléments éventuels annoncés avant confirmation du
              rendez-vous.
            </p>
            <p className="mt-4 text-sm text-white/80 max-w-2xl">
              Le nettoyage des tissus vise à atténuer au mieux les taches ; selon leur ancienneté et
              la nature du tissu, certaines peuvent ne pas disparaître complètement.
            </p>

            <div id="soins-cibles" className="mt-16 pt-12 border-t border-white/10">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Prestations complémentaires
              </p>
              <h2 className="mt-2 text-4xl sm:text-5xl font-display font-bold uppercase tracking-wide text-white">
                Les petits plus pour votre voiture
              </h2>
              <p className="mt-2 mb-8 max-w-2xl text-base text-white/80">
                Complétez votre formule avec les soins adaptés à votre véhicule.
              </p>
              <CareCards />
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white text-[#11114E] border border-white/20 p-6 shadow-xl">
                <p className="text-sm text-slate-700 max-w-xl">
                  Ces prestations s'ajoutent facilement à votre formule de nettoyage pour un rendu
                  impeccable jusque dans les moindres détails.
                </p>
                <Link to="/contact" className="btn btn-primary text-white font-bold shadow-md">
                  Réservation & Devis
                </Link>
              </div>
            </div>

            {/* Section FAQ utile pour le SEO et la conversion client */}
            <div className="mt-16 pt-12 border-t border-white/10">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Questions fréquentes
              </p>
              <h2 className="mt-2 text-4xl font-display font-bold uppercase tracking-wide text-white">
                Comment se déroule l'intervention à domicile ?
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-xl text-[#11114E]">
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    Où réalisez-vous le nettoyage et quels sont les frais de déplacement ?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Nous nous déplaçons directement à votre domicile, dans votre cour, allée, garage
                    ou sur le parking de votre lieu de travail à Lille et dans toute la métropole.
                  </p>
                  <div className="mt-3 rounded-xl border border-primary/20 bg-[#F8F9FC] p-3.5 space-y-1 text-xs">
                    <p className="font-semibold text-[#11114E] flex items-center gap-1.5">
                      <MapPin className="size-3.5 text-primary shrink-0" />
                      Déplacement offert jusqu'à 15 km autour de Lille
                    </p>
                    <p className="text-slate-600">
                      Au-delà de 15 km, seuls les kilomètres supplémentaires sont facturés à 0,50
                      €/km, aller-retour (selon l'itinéraire routier, communiqué avant validation).
                    </p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-xl text-[#11114E]">
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    De quoi avez-vous besoin sur place ?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Pour réaliser nos prestations dans les meilleures conditions, nous avons
                    simplement besoin d'un accès à une prise électrique classique. Un point d'eau
                    est également nécessaire pour les prestations comprenant un lavage extérieur.
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Vous ne disposez pas de ces équipements ? Aucun souci ! Contactez-nous en amont
                    afin que nous puissions étudier une solution adaptée à votre situation.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-xl text-[#11114E]">
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    Le prix varie-t-il selon la taille du véhicule ?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Non ! Nos tarifs sont fixes et transparents : 49 € pour l'extérieur, 69 € pour
                    l'intérieur, 109 € pour le complet, que vous ayez une citadine, une berline ou
                    un SUV. Nos tarifs peuvent également être revus à la baisse dans le cadre
                    d'offres promotionnelles ponctuelles.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white p-6 shadow-xl text-[#11114E]">
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    Comment réserver une date ?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Un simple appel au 06 59 14 09 39, un message sur WhatsApp ou via le{" "}
                    <Link
                      to="/contact"
                      className="font-medium text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                    >
                      formulaire de devis en ligne
                    </Link>{" "}
                    : nous convenons ensemble du jour et du créneau qui vous arrangent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ContactBand />
    </>
  );
}
