import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  CheckCircle2,
  Sofa,
} from "lucide-react";
import { PageHero, ContactBand } from "@/components/site/Layout";
import { BUSINESS, FORMULAS, TRAVEL_CONDITIONS, euro, whatsappLink } from "@/lib/business";
import { INTERVENTION_ZONES, getInterventionZonesBySector } from "@/lib/zones";

const PAGE_URL = "https://bichonnetacaisse.fr/zones-intervention";
const PAGE_TITLE = "Zones d'intervention | Nettoyage auto à domicile Lille – Bichonne ta Caisse";
const PAGE_DESCRIPTION =
  "Découvrez les communes desservies par Bichonne ta Caisse pour le nettoyage auto à domicile à Lille et en métropole lilloise. Déplacement offert jusqu'à 20 km.";

const ZONES_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Nettoyage automobile à domicile à Lille et dans la métropole lilloise",
      serviceType: "Nettoyage automobile à domicile",
      url: PAGE_URL,
      description:
        "Intervention de nettoyage intérieur et extérieur automobile à domicile ou sur lieu de travail dans la métropole lilloise, avec déplacement offert jusqu'à 20 km de Lille.",
      provider: {
        "@type": ["AutoDetailing", "LocalBusiness"],
        "@id": "https://bichonnetacaisse.fr/#organization",
        name: BUSINESS.name,
        url: "https://bichonnetacaisse.fr/",
        telephone: "+33659140939",
      },
      areaServed: [
        ...INTERVENTION_ZONES.map((zone) => ({
          "@type": "City",
          name: zone.name,
        })),
        {
          "@type": "AdministrativeArea",
          name: "Métropole Européenne de Lille",
        },
      ],
      offers: FORMULAS.map((formula) => ({
        "@type": "Offer",
        name: formula.name,
        price: String(formula.price),
        priceCurrency: "EUR",
        url: `https://bichonnetacaisse.fr/formules#${formula.id}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://bichonnetacaisse.fr/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Zones d'intervention",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/zones-intervention")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: ZonesInterventionPage,
});

function ZonesInterventionPage() {
  const sectors = getInterventionZonesBySector();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ZONES_SCHEMA) }}
      />

      {/* En-tête de page bleu nuit cohérent avec l'identité du site */}
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[540px] rounded-full bg-[#243888]/20 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[480px] rounded-full bg-[#282A74]/20 blur-[145px]"
        />

        {/* Fil d'Ariane HTML */}
        <nav
          aria-label="Fil d'Ariane"
          className="container-site pt-20 sm:pt-24 text-xs text-white/70 flex items-center gap-1.5 relative z-10"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Accueil
          </Link>
          <ChevronRight className="size-3 text-white/40" aria-hidden="true" />
          <span className="text-primary font-semibold">Zones d'intervention</span>
        </nav>

        <PageHero
          transparent
          eyebrow="Métropole lilloise (59)"
          title="Nettoyage automobile à domicile à Lille et dans la métropole lilloise"
        >
          <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
            Bichonne ta Caisse se déplace directement chez vous ou sur votre lieu de travail pour
            entretenir l'intérieur et l'extérieur de votre véhicule. Nous intervenons dans toute la
            métropole lilloise avec un matériel professionnel complet et des tarifs transparents,
            sans majoration liée à la taille du véhicule.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="btn btn-primary text-xs sm:text-sm font-bold px-6 py-2.5"
            >
              <span>Réserver ou demander un devis</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink(
                "Bonjour, je souhaite vérifier une disponibilité pour un nettoyage automobile à domicile dans la métropole lilloise.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs sm:text-sm font-bold px-5 py-2.5"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>Écrire sur WhatsApp</span>
            </a>
          </div>
        </PageHero>

        {/* Bandeau repère déplacement */}
        <div className="relative z-10 border-t border-white/10 bg-[#0D0D3F]/60">
          <div className="container-site py-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-white/85">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-[#F47721] shrink-0" aria-hidden="true" />
              <span>
                <strong className="text-white">{TRAVEL_CONDITIONS.headline}</strong> (référence{" "}
                {TRAVEL_CONDITIONS.departurePoint.name}).
              </span>
            </div>
            <span className="text-white/70">{TRAVEL_CONDITIONS.subline}</span>
          </div>
        </div>
      </div>

      {/* Annuaire des communes par secteur géographique */}
      <section className="bg-[#FAFBFD] text-[#11114E] py-12 md:py-16">
        <div className="container-site space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Annuaire local</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Nos zones d'intervention dans la métropole lilloise
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Retrouvez ci-dessous les principales communes dans lesquelles nous intervenons
              régulièrement pour le nettoyage automobile à domicile. Les communes dotées d'une page
              locale dédiée sont directement consultables.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {sectors.map((sector) => (
              <div
                key={sector.id}
                className="rounded-2xl bg-white border border-[#E9EDF1] shadow-xs p-6 flex flex-col"
              >
                <div className="pb-4 mb-4 border-b border-[#E9EDF1]">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
                    {sector.label}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sector.description}
                  </p>
                </div>

                <ul className="space-y-2 flex-1">
                  {sector.communes.map((commune) => (
                    <li key={commune.id}>
                      {commune.localPageSlug ? (
                        <Link
                          to="/services/$slug"
                          params={{ slug: commune.localPageSlug }}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-[#E9EDF1] bg-[#FAFBFD] px-3.5 py-2.5 text-sm font-semibold text-[#11114E] hover:border-[#F47721]/50 hover:bg-[#F47721]/[0.05] transition-colors"
                        >
                          <span className="flex items-center gap-2 min-w-0">
                            <MapPin className="size-4 text-[#F47721] shrink-0" aria-hidden="true" />
                            <span className="truncate group-hover:text-[#F47721] transition-colors">
                              {commune.name}
                            </span>
                            <span className="text-xs font-normal text-slate-500 shrink-0">
                              ({commune.postalCode})
                            </span>
                          </span>
                          <ArrowRight
                            className="size-4 text-slate-400 group-hover:text-[#F47721] group-hover:translate-x-0.5 transition-all shrink-0"
                            aria-hidden="true"
                          />
                        </Link>
                      ) : (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E9EDF1]/80 bg-white px-3.5 py-2.5 text-sm text-[#11114E]">
                          <span className="flex items-center gap-2 min-w-0">
                            <span
                              className="size-1.5 rounded-full bg-slate-300 shrink-0 ml-1 mr-0.5"
                              aria-hidden="true"
                            />
                            <span className="font-medium truncate">{commune.name}</span>
                            <span className="text-xs text-slate-500 shrink-0">
                              ({commune.postalCode})
                            </span>
                          </span>
                          <span className="text-[11px] font-medium text-slate-500 shrink-0">
                            Déplacement offert
                          </span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Note complémentaire sur les communes voisines et prestation ciblée Lille */}
          <div className="rounded-2xl bg-[#E9EDF1]/70 border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-sm font-bold text-[#11114E]">
                Votre commune ne figure pas dans la liste ?
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nous intervenons dans l'ensemble des communes situées autour de Lille (rayon de{" "}
                {TRAVEL_CONDITIONS.freeRadiusKm} km offert, puis 0,50 €/km supplémentaire
                aller-retour au-delà). Consultez aussi notre page dédiée au{" "}
                <Link
                  to="/services/$slug"
                  params={{ slug: "shampoing-sieges-tapis-voiture-lille" }}
                  className="font-semibold text-[#11114E] underline decoration-[#F47721]/60 underline-offset-4 hover:text-[#F47721] transition-colors"
                >
                  shampouinage de sièges et moquettes voiture à Lille
                </Link>
                .
              </p>
            </div>
            <Link
              to="/contact"
              className="btn bg-[#11114E] text-white hover:bg-[#11114E]/90 text-xs font-bold uppercase tracking-wider px-5 py-2.5 shrink-0 self-start md:self-center"
            >
              <span>Vérifier ma commune</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rappel synthétique des prestations auto proposées dans ces communes */}
      <section className="bg-white text-[#11114E] py-12 md:py-14 border-t border-[#E9EDF1]">
        <div className="container-site space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
                <span>Prestations principales</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
                Nos formules de nettoyage automobile à domicile
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chaque intervention est réalisée sur votre lieu de stationnement (allée, cour,
                parking privé ou lieu de travail autorisé) avec accès à une prise 220 V.
              </p>
            </div>
            <Link
              to="/formules"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#11114E] hover:text-[#F47721] transition-colors shrink-0"
            >
              <span>Voir le détail des formules</span>
              <ArrowRight className="size-4 text-[#F47721]" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FORMULAS.map((formula) => (
              <div
                key={formula.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 ${
                  formula.highlight
                    ? "border-[#F47721]/50 bg-[#FFF9F4]"
                    : "border-[#E9EDF1] bg-[#FAFBFD]"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                      {formula.name}
                    </h3>
                    <span className="font-display text-2xl font-bold text-[#F47721]">
                      {euro(formula.price)}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Durée estimée : {formula.duration}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{formula.short}</p>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/70">
                  {formula.items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2
                        className="size-3.5 text-[#F47721] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              to="/contact"
              className="btn btn-primary text-xs sm:text-sm font-bold px-6 py-2.5"
            >
              <span>Demander un rendez-vous</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={BUSINESS.phoneTel}
              className="btn btn-outline text-xs sm:text-sm font-bold px-5 py-2.5"
            >
              <Phone className="size-4 text-[#F47721]" aria-hidden="true" />
              <span>{BUSINESS.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Section secondaire : nettoyage de textiles à domicile */}
      <section className="bg-[#E9EDF1]/55 text-[#11114E] py-10 border-t border-[#E9EDF1]">
        <div className="container-site">
          <div className="rounded-2xl bg-white border border-[#E9EDF1] p-6 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Sofa className="size-4 text-[#F47721]" aria-hidden="true" />
                <span>Activité complémentaire sur la même zone</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-[#11114E]">
                Nettoyage de canapés, matelas et textiles à domicile
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                En complément du nettoyage automobile, Bichonne ta Caisse propose également le{" "}
                <Link
                  to="/nettoyage-canape-lille"
                  className="font-semibold text-[#11114E] underline decoration-[#F47721]/60 underline-offset-4 hover:text-[#F47721] transition-colors"
                >
                  nettoyage de canapés à domicile
                </Link>
                , de fauteuils et le{" "}
                <Link
                  to="/nettoyage-matelas-lille"
                  className="font-semibold text-[#11114E] underline decoration-[#F47721]/60 underline-offset-4 hover:text-[#F47721] transition-colors"
                >
                  nettoyage de matelas à Lille
                </Link>{" "}
                et dans toute la métropole lilloise par injection-extraction.
              </p>
            </div>
            <Link
              to="/canapes-textiles"
              className="inline-flex items-center gap-2 rounded-xl border border-[#11114E]/20 bg-[#FAFBFD] hover:border-[#F47721] hover:text-[#F47721] px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#11114E] transition-colors shrink-0 self-start md:self-center"
            >
              <span>Découvrir Canapés &amp; textiles</span>
              <ArrowRight className="size-4 text-[#F47721]" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
