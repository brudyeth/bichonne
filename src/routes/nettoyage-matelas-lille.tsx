import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Sofa,
  Sun,
  Wind,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { TextileLineIcon, TextileSteamIcon } from "@/components/site/TextileIcons";
import { BUSINESS, TRAVEL_CONDITIONS } from "@/lib/business";
import {
  TEXTILE_FIXED_PRESTATIONS,
  TEXTILE_HONEST_NOTICE,
  TEXTILE_STEAM_OPTION,
  getTextileWhatsappLink,
} from "@/lib/textiles";
import { INTERVENTION_ZONES } from "@/lib/zones";

const PAGE_URL = "https://bichonnetacaisse.fr/nettoyage-matelas-lille";
const PAGE_TITLE = "Nettoyage matelas à domicile Lille | Bichonne ta Caisse";
const PAGE_DESCRIPTION =
  "Nettoyage de matelas à domicile à Lille et métropole lilloise dès 39 € : matelas 1 place 39 €, 2 places 59 €. Injection-extraction soignée et devis gratuit.";

const MATTRESS_ITEMS = TEXTILE_FIXED_PRESTATIONS.filter((item) => item.category === "matelas");

const MATTRESS_STAINS = [
  {
    title: "Auréoles de transpiration et d'humidité",
    detail:
      "Le pré-détachage et le rinçage par extraction atténuent les auréoles jaunâtres accumulées au fil des nuits et redonnent de la fraîcheur au coutil.",
  },
  {
    title: "Traces accidentelles du quotidien",
    detail:
      "Boissons renversées, taches alimentaires ou petits accidents domestiques traités localement avant l'extraction complète de la face de couchage.",
  },
  {
    title: "Poussières fines et salissures de surface",
    detail:
      "Une aspiration haute dépression précède toujours le nettoyage humide afin de retirer poussières, squames et particules retenues dans le matelassage.",
  },
  {
    title: "Odeurs persistantes d'usage",
    detail:
      "L'extraction de l'eau sale et le rinçage des fibres textiles aident à atténuer les odeurs de renfermé ou de transpiration dans la literie.",
  },
] as const;

const MATTRESS_METHOD_STEPS = [
  {
    step: "01",
    title: "Aspiration haute dépression",
    description:
      "Passage minutieux sur toute la face de couchage, les coutures et les bordures pour évacuer poussières et résidus secs.",
  },
  {
    step: "02",
    title: "Pré-détachage doux du coutil",
    description:
      "Application ciblée d'une solution textile adaptée sur les auréoles et zones d'usage, suivie d'un brossage manuel délicat.",
  },
  {
    step: "03",
    title: "Injection-extraction maîtrisée",
    description:
      "Nettoyage en profondeur du coutil avec un apport d'eau contrôlé afin de ne pas saturer les mousses internes ou le garnissage.",
  },
  {
    step: "04",
    title: "Extraction poussée de l'humidité",
    description:
      "Passes finales à sec pour retirer un maximum d'eau résiduelle et préparer un séchage rapide dans la chambre.",
  },
] as const;

const MATTRESS_FAQ = [
  {
    question: "Puis-je dormir sur mon matelas le soir même après le nettoyage ?",
    answer:
      "Oui, dans la majorité des cas, à condition de planifier l'intervention le matin ou en tout début d'après-midi et de bien aérer la chambre. Le temps de séchage habituel se situe entre 3 et 6 heures selon la ventilation et la température ambiante.",
  },
  {
    question: "Le tarif inclut-il une face ou les deux faces du matelas ?",
    answer:
      "Nos tarifs affichés (39 € pour un matelas 1 place et 59 € pour un matelas 2 places) correspondent au nettoyage complet de la face de couchage. Si vous souhaitez faire nettoyer les deux faces ou un sommier tapissier, précisez-le lors de la demande afin d'adapter le devis.",
  },
  {
    question: "Quels types de matelas pouvez-vous nettoyer à domicile ?",
    answer:
      "Nous intervenons sur les matelas en mousse, à ressorts ensachés, en latex ou à mémoire de forme, pour tous les formats courants (90×190, 90×200, 140×190, 160×200 et 180×200 cm). Le dosage d'humidité est ajusté pour rester en surface du coutil.",
  },
  {
    question: "Les anciennes auréoles jaunes disparaissent-elles complètement ?",
    answer:
      "Le nettoyage ravive le coutil et atténue nettement les auréoles et odeurs d'usage. Toutefois, lorsque l'oxydation ou une tache est ancienne et a altéré la teinte du tissu, une légère nuance peut subsister même une fois le textile nettoyé.",
  },
  {
    question: "À quoi sert l'option Traitement vapeur (+10 € par élément traité) ?",
    answer:
      "C'est un soin complémentaire optionnel à la vapeur qui complète l'injection-extraction : la chaleur aide à réduire la présence d'acariens en surface, à décoller certaines salissures et à rafraîchir le coutil du matelas.",
  },
] as const;

const MATTRESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Nettoyage de matelas à domicile à Lille",
      serviceType: "Nettoyage de matelas à domicile",
      url: PAGE_URL,
      description: PAGE_DESCRIPTION,
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
      offers: MATTRESS_ITEMS.map((item) => ({
        "@type": "Offer",
        name: item.name,
        price: String(item.price),
        priceCurrency: "EUR",
        url: `${PAGE_URL}#${item.id}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: MATTRESS_FAQ.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
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
          name: "Canapés & textiles",
          item: "https://bichonnetacaisse.fr/canapes-textiles",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Nettoyage matelas à Lille",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/nettoyage-matelas-lille")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { property: "og:site_name", content: BUSINESS.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:url", content: PAGE_URL },
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
  }),
  component: NettoyageMatelasLillePage,
});

function NettoyageMatelasLillePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(MATTRESS_SCHEMA) }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO & PRÉSENTATION DU NETTOYAGE DE MATELAS À DOMICILE                 */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[600px] rounded-full bg-[#243888]/22 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[540px] rounded-full bg-[#282A74]/22 blur-[145px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        {/* Fil d'Ariane HTML */}
        <nav
          aria-label="Fil d'Ariane"
          className="container-site pt-20 sm:pt-24 text-xs text-white/70 flex flex-wrap items-center gap-1.5 relative z-10"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Accueil
          </Link>
          <ChevronRight className="size-3 text-white/40" aria-hidden="true" />
          <Link to="/canapes-textiles" className="hover:text-white transition-colors">
            Canapés &amp; textiles
          </Link>
          <ChevronRight className="size-3 text-white/40" aria-hidden="true" />
          <span className="text-primary font-semibold">Nettoyage matelas à Lille</span>
        </nav>

        <PageHero
          transparent
          eyebrow="Literie & textile à domicile • Métropole lilloise"
          title="Nettoyage de matelas à domicile à Lille"
        >
          <p>
            Rafraîchissez votre literie directement dans votre chambre, sans transport ni
            manutention. <strong className="text-white font-semibold">Bichonne ta Caisse</strong>{" "}
            assure le nettoyage de matelas à domicile à Lille et dans la métropole lilloise par
            injection-extraction maîtrisée, pour matelas 1 place (39 €) et 2 places (59 €).
          </p>

          <div className="mt-4 inline-flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs sm:text-sm text-white/95">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>{TRAVEL_CONDITIONS.headline}</span>
            </div>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="text-white/80 text-xs">{TRAVEL_CONDITIONS.subline}</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              search={{ activite: "textiles", prestation: "matelas-2" }}
              className="btn btn-primary text-xs sm:text-sm px-5 py-3 font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Demander un devis / Réserver</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={getTextileWhatsappLink("Nettoyage de matelas à domicile")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs sm:text-sm px-4 py-3 font-bold uppercase tracking-wider shadow-md"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>Devis rapide sur WhatsApp</span>
            </a>
          </div>
        </PageHero>

        {/* ========================================================================= */}
        {/* 2. TARIFS RÉELS MATELAS                                                   */}
        {/* ========================================================================= */}
        <section
          id="tarifs-matelas"
          className="relative z-10 pt-6 pb-12 md:pt-8 md:pb-14"
          aria-labelledby="mattress-pricing-heading"
        >
          <div className="container-site space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
                  <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
                  <span>Tarifs clairs</span>
                </div>
                <h2
                  id="mattress-pricing-heading"
                  className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white"
                >
                  Tarifs nettoyage de matelas à domicile
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/85">
                <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span>Intervention directement dans la chambre • Règlement après prestation</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {MATTRESS_ITEMS.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className="rounded-2xl bg-white text-[#11114E] border border-slate-200 p-6 shadow-lg flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="rounded-xl bg-[#FFF8F3] border border-primary/20 px-3 py-2 shrink-0">
                          <TextileLineIcon id={item.id} className="w-[70px] h-[42px]" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#11114E]">
                            {item.name}
                          </h3>
                          {item.unitNote && (
                            <p className="text-xs font-medium text-slate-500">{item.unitNote}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-display text-[40px] font-bold text-primary leading-none tabular-nums block">
                          {item.priceLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 mt-1">
                          <Clock className="size-3 text-slate-400" aria-hidden="true" />
                          <span>{item.duration}</span>
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">{item.short}</p>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs sm:text-[13px] text-[#11114E]">
                      {item.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <Check
                            className="size-3.5 text-primary shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    search={{ activite: "textiles", prestation: item.id }}
                    className={`btn w-full py-2.5 text-xs font-bold uppercase tracking-wider ${
                      item.id === "matelas-2"
                        ? "btn-primary shadow-md"
                        : "bg-[#11114E] text-white hover:bg-[#11114E]/90"
                    }`}
                  >
                    <span>Choisir {item.name}</span>
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>

            {/* Option complémentaire Traitement vapeur */}
            <div className="rounded-2xl bg-white/95 text-[#11114E] border border-primary/30 shadow-md px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-5">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="grid size-11 sm:size-12 shrink-0 place-items-center rounded-xl bg-[#FFF8F3] border border-primary/20">
                  <TextileSteamIcon className="size-8" />
                </div>
                <div className="space-y-1">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-primary">
                    Option complémentaire
                  </span>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E] leading-tight">
                    {TEXTILE_STEAM_OPTION.name}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-2xl">
                    {TEXTILE_STEAM_OPTION.short}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 border-t sm:border-t-0 border-slate-200/80 pt-2.5 sm:pt-0 sm:pl-5 sm:border-l">
                <span className="font-display text-3xl sm:text-[34px] font-bold text-primary leading-none tabular-nums">
                  {TEXTILE_STEAM_OPTION.priceLabel}
                </span>
                <span className="text-xs font-semibold text-[#11114E] sm:text-right">
                  {TEXTILE_STEAM_OPTION.unitLabel}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================================= */}
      {/* 3. POURQUOI FAIRE NETTOYER SON MATELAS & TACHES TRAITÉES                  */}
      {/* ========================================================================= */}
      <section className="bg-white text-[#11114E] py-12 md:py-14">
        <div className="container-site space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Entretien de la literie</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Pourquoi faire nettoyer son matelas régulièrement ?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Même avec un protège-matelas et des draps changés régulièrement, le coutil d'un
              matelas absorbe au fil des mois l'humidité nocturne, la transpiration et la poussière
              ambiante. Un nettoyage professionnel à domicile permet de rafraîchir le textile en
              profondeur, d'atténuer les marques d'usage et de conserver une literie propre et
              agréable plus longtemps.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Taches et salissures prises en charge
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {MATTRESS_STAINS.map((stain) => (
                <div
                  key={stain.title}
                  className="rounded-2xl border border-[#E9EDF1] bg-[#FAFBFD] p-5 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <Check className="size-4 text-primary shrink-0" strokeWidth={2.5} />
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#11114E]">
                      {stain.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {stain.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MÉTHODE DE NETTOYAGE ADAPTÉE AU MATELAS                                */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Protocole literie</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Une méthode d'injection-extraction calibrée pour le matelas
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Un matelas ne se nettoie pas comme une moquette : nous limitons volontairement la
              quantité d'eau injectée et insistons sur l'extraction afin de nettoyer le coutil en
              profondeur tout en préservant l'âme intérieure.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MATTRESS_METHOD_STEPS.map((step) => (
              <div
                key={step.step}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs space-y-2"
              >
                <span className="font-display text-2xl font-bold text-primary block">
                  {step.step}.
                </span>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#11114E]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
            <Info className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p>{TEXTILE_HONEST_NOTICE}</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PRÉCAUTIONS & TEMPS DE SÉCHAGE                                         */}
      {/* ========================================================================= */}
      <section className="bg-white text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Préparation &amp; séchage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Précautions et temps de séchage
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Sun className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Privilégiez un créneau en journée :</strong>{" "}
                  une intervention le matin ou en début d'après-midi laisse facilement les 3 à 6 h
                  de séchage nécessaires avant la nuit.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Wind className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Aérez la chambre après passage :</strong> une
                  bonne circulation d'air accélère nettement l'évaporation de l'humidité résiduelle.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Attendez le séchage complet :</strong> ne
                  remettez pas de protège-matelas imperméable ni de drap-housse tant que le coutil
                  n'est pas totalement sec au toucher.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#E9EDF1] border border-slate-200 p-6 space-y-3.5">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
              Avant notre arrivée
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Retirez draps, couette, oreillers et alèse avant le rendez-vous.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Zap className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Prévoyez l'accès à une prise électrique 220 V dans la pièce ou le couloir.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Droplets className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Un point d'eau accessible (salle de bain ou évier) suffit sur place.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ SPÉCIFIQUE AUX MATELAS                                             */}
      {/* ========================================================================= */}
      <section className="bg-[#FAFBFD] text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site max-w-4xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              FAQ — Nettoyage de matelas à domicile
            </h2>
          </div>

          <div className="space-y-3.5">
            {MATTRESS_FAQ.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl bg-white border border-slate-200/90 p-5 space-y-1.5"
              >
                <h3 className="font-bold text-sm sm:text-base text-[#11114E]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. COMMUNES DESSERVIES, MAILLAGE INTERNE & CTA FINAL                      */}
      {/* ========================================================================= */}
      <section className="bg-[#11114E] text-white py-12 md:py-14 border-t border-white/10">
        <div className="container-site grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>Communes desservies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
              Nettoyage de matelas à Lille et en métropole lilloise
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {TRAVEL_CONDITIONS.notice}
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {INTERVENTION_ZONES.map((zone) => (
                <li
                  key={zone.id}
                  className="rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/90"
                >
                  {zone.name}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm">
              <Link
                to="/zones-intervention"
                className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-primary transition-colors"
              >
                <span>Voir toutes nos zones d'intervention</span>
                <ArrowRight className="size-3.5 text-primary" aria-hidden="true" />
              </Link>
              <Link
                to="/canapes-textiles"
                className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-primary transition-colors"
              >
                <span>Toutes les prestations textiles</span>
                <ArrowRight className="size-3.5 text-primary" aria-hidden="true" />
              </Link>
              <Link
                to="/nettoyage-canape-lille"
                className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-primary transition-colors"
              >
                <Sofa className="size-3.5 text-primary" aria-hidden="true" />
                <span>Nettoyage de canapé à Lille</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#E9EDF1] text-[#11114E] p-6 space-y-4 shadow-xl">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#11114E]">
              Demander un devis pour votre matelas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Matelas 1 place (39 €), 2 places (59 €) ou plusieurs matelas dans le même logement :
              réservez votre créneau à domicile en quelques clics.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/contact"
                search={{ activite: "textiles", prestation: "matelas-2" }}
                className="btn btn-primary w-full py-3 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={BUSINESS.phoneTel}
                  className="btn bg-[#11114E] text-white hover:bg-[#11114E]/90 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  <Phone className="size-3.5 text-primary" aria-hidden="true" />
                  <span>{BUSINESS.phoneDisplay}</span>
                </a>
                <a
                  href={getTextileWhatsappLink("Nettoyage de matelas à domicile")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  <MessageCircle className="size-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
