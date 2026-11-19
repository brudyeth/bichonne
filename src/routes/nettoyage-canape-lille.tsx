import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Droplets,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sofa,
  Wind,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { TextileLineIcon, TextileSteamIcon } from "@/components/site/TextileIcons";
import { BUSINESS, TRAVEL_CONDITIONS } from "@/lib/business";
import {
  TEXTILE_FIXED_PRESTATIONS,
  TEXTILE_HONEST_NOTICE,
  TEXTILE_PROCESS_STEPS,
  TEXTILE_QUOTE_PRESTATIONS,
  TEXTILE_STEAM_OPTION,
  getTextileWhatsappLink,
} from "@/lib/textiles";
import { INTERVENTION_ZONES } from "@/lib/zones";

const PAGE_URL = "https://bichonnetacaisse.fr/nettoyage-canape-lille";
const PAGE_TITLE = "Nettoyage canapé à domicile Lille | Bichonne ta Caisse";
const PAGE_DESCRIPTION =
  "Nettoyage de canapé à domicile à Lille et métropole lilloise dès 69 € par injection-extraction. Canapé 2 à 5 places, angle ou fauteuil. Devis gratuit.";

const SOFA_FIXED_ITEMS = TEXTILE_FIXED_PRESTATIONS.filter((item) => item.category === "canapes");
const SOFA_ANGLE_ITEM = TEXTILE_QUOTE_PRESTATIONS.find((item) => item.id === "canape-angle-u");

const COMPATIBLE_FABRICS = [
  {
    name: "Tissu tissé & chiné",
    detail:
      "Idéal pour l'injection-extraction : les fibres retrouvent de la fraîcheur et les salissures incrustées sont extraites en profondeur.",
  },
  {
    name: "Microfibre & alcantara synthétique",
    detail:
      "Nettoyage homogène des zones d'appui (assises, accoudoirs, appuie-têtes) avec brossage doux adapté.",
  },
  {
    name: "Velours synthétique & tissu bouclé",
    detail:
      "Traitement délicat à pression maîtrisée pour préserver le toucher et le relief des fibres.",
  },
  {
    name: "Coton & mélanges textiles",
    detail:
      "Vérification préalable de la tenue des teintes sur une zone discrète avant le passage complet.",
  },
] as const;

const SOFA_FAQ = [
  {
    question: "Combien de temps faut-il pour que le canapé sèche après l'intervention ?",
    answer:
      "Grâce aux passes d'extraction finale, l'eau sale est aspirée au maximum. Comptez généralement entre 3 et 6 heures de séchage selon l'épaisseur des coussins, le type de tissu, la température et l'aération de la pièce.",
  },
  {
    question: "Toutes les taches (café, vin, gras, animaux) disparaissent-elles forcément ?",
    answer:
      "Le pré-détachage ciblé suivi de l'injection-extraction permet d'éliminer ou d'atténuer nettement la grande majorité des taches du quotidien et des auréoles. Toutefois, selon l'ancienneté d'une trace, les colorants ou d'éventuels produits ménagers utilisés auparavant, certaines marques très anciennes peuvent rester légèrement visibles.",
  },
  {
    question: "Nettoyez-vous les canapés non déhoussables ou convertibles ?",
    answer:
      "Oui. Le nettoyage est réalisé directement sur place sans avoir besoin de déhousser les coussins ni de déplacer le canapé. Pour les canapés convertibles, nous pouvons également nettoyer le matelas déplié sur demande.",
  },
  {
    question: "Comment obtenir un tarif pour un canapé d'angle ou en U ?",
    answer:
      "Le tarif d'un canapé d'angle ou panoramique en U est établi sur devis gratuit selon ses dimensions et le nombre d'assises. Vous pouvez nous envoyer une photo par WhatsApp ou remplir le formulaire de devis en ligne pour recevoir une estimation rapide.",
  },
  {
    question: "À quelle fréquence est-il conseillé de faire nettoyer son canapé ?",
    answer:
      "Un nettoyage professionnel une fois par an suffit généralement pour entretenir un canapé familial, ou tous les 6 à 12 mois en présence d'enfants en bas âge, d'animaux ou de tissu très clair.",
  },
] as const;

const SOFA_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Nettoyage de canapé à domicile à Lille",
      serviceType: "Nettoyage de canapé et fauteuil à domicile",
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
      offers: SOFA_FIXED_ITEMS.map((item) => ({
        "@type": "Offer",
        name: item.name,
        price: String(item.price),
        priceCurrency: "EUR",
        url: `${PAGE_URL}#${item.id}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: SOFA_FAQ.map((faq) => ({
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
          name: "Nettoyage canapé à Lille",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export const Route = createFileRoute("/nettoyage-canape-lille")({
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
  component: NettoyageCanapeLillePage,
});

function NettoyageCanapeLillePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFA_SCHEMA) }}
      />

      {/* ========================================================================= */}
      {/* 1. HERO & PRÉSENTATION DU SERVICE                                         */}
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
          <span className="text-primary font-semibold">Nettoyage canapé à Lille</span>
        </nav>

        <PageHero
          transparent
          eyebrow="Nettoyage textile à domicile • Métropole lilloise"
          title="Nettoyage de canapé à domicile à Lille"
        >
          <p>
            Votre canapé en tissu retrouve de l'éclat sans quitter votre salon.{" "}
            <strong className="text-white font-semibold">Bichonne ta Caisse</strong> réalise le
            nettoyage de canapé à domicile à Lille et dans toute la métropole lilloise par
            injection-extraction professionnelle, pour les canapés droits, fauteuils et canapés
            d'angle.
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
              search={{ activite: "textiles", prestation: "canape-2-3" }}
              className="btn btn-primary text-xs sm:text-sm px-5 py-3 font-bold uppercase tracking-wider shadow-lg"
            >
              <span>Demander un devis / Réserver</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <a
              href={getTextileWhatsappLink("Nettoyage de canapé à domicile")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs sm:text-sm px-4 py-3 font-bold uppercase tracking-wider shadow-md"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>Devis photo sur WhatsApp</span>
            </a>
          </div>
        </PageHero>

        {/* ========================================================================= */}
        {/* 2. TARIFS RÉELS CANAPÉS & FAUTEUILS                                       */}
        {/* ========================================================================= */}
        <section
          id="tarifs-canape"
          className="relative z-10 pt-6 pb-12 md:pt-8 md:pb-14"
          aria-labelledby="sofa-pricing-heading"
        >
          <div className="container-site space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
                  <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
                  <span>Tarifs transparents</span>
                </div>
                <h2
                  id="sofa-pricing-heading"
                  className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white"
                >
                  Tarifs nettoyage de canapé et fauteuil
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/85">
                <CheckCircle2 className="size-4 text-primary shrink-0" aria-hidden="true" />
                <span>Sans supplément caché • Règlement après prestation</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
              {SOFA_FIXED_ITEMS.map((item) => (
                <article
                  key={item.id}
                  id={item.id}
                  className={`flex flex-col justify-between rounded-2xl p-5 shadow-lg ${
                    item.popular
                      ? "bg-white text-[#11114E] border-2 border-primary ring-2 ring-primary/15"
                      : "bg-[#E9EDF1] text-[#11114E] border border-slate-300/80"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-full flex items-center justify-center rounded-xl py-2.5 px-2 mb-3 border ${
                        item.popular
                          ? "bg-[#FFF8F3] border-primary/20"
                          : "bg-white/90 border-slate-200/80"
                      }`}
                    >
                      <TextileLineIcon id={item.id} className="w-[78px] h-[46px]" />
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-display text-[38px] font-bold text-primary leading-none tabular-nums">
                      {item.priceLabel}
                    </p>
                    <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-slate-500">
                      <Clock className="size-3 text-slate-400" aria-hidden="true" />
                      <span>{item.duration}</span>
                    </p>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">{item.short}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-300/50">
                    <Link
                      to="/contact"
                      search={{ activite: "textiles", prestation: item.id }}
                      className={`btn w-full min-h-10 py-2 px-3 text-xs font-bold uppercase tracking-wider ${
                        item.popular
                          ? "btn-primary shadow-md"
                          : "bg-[#11114E] text-white hover:bg-[#11114E]/90"
                      }`}
                    >
                      <span>Réserver</span>
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}

              {SOFA_ANGLE_ITEM && (
                <article
                  id={SOFA_ANGLE_ITEM.id}
                  className="flex flex-col justify-between rounded-2xl bg-white text-[#11114E] border border-slate-200 p-5 shadow-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-full flex items-center justify-center rounded-xl py-2.5 px-2 mb-3 border bg-slate-50 border-slate-200/80">
                      <TextileLineIcon id="canape-4-5" className="w-[78px] h-[46px]" />
                    </div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
                      {SOFA_ANGLE_ITEM.name}
                    </h3>
                    <p className="mt-2 font-display text-2xl font-bold uppercase text-primary leading-tight">
                      {SOFA_ANGLE_ITEM.priceLabel}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">
                      {SOFA_ANGLE_ITEM.unitNote}
                    </p>
                    <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
                      {SOFA_ANGLE_ITEM.short}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <Link
                      to="/contact"
                      search={{ activite: "textiles", prestation: SOFA_ANGLE_ITEM.id }}
                      className="btn bg-[#11114E] text-white hover:bg-[#11114E]/90 w-full min-h-10 py-2 px-3 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Demander un devis</span>
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )}
            </div>

            {/* Option Traitement vapeur */}
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
      {/* 3. REVÊTEMENTS COMPATIBLES & TYPES DE CANAPÉS                             */}
      {/* ========================================================================= */}
      <section className="bg-white text-[#11114E] py-12 md:py-14">
        <div className="container-site space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Tissus &amp; formats pris en charge</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Types de canapés et revêtements compatibles
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Nous intervenons sur les canapés droits 2 à 5 places, canapés d'angle, canapés en U,
              méridiennes, banquettes et fauteuils en tissu. Chaque revêtement fait l'objet d'un
              contrôle rapide avant le nettoyage afin d'adapter le dosage et le brossage.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {COMPATIBLE_FABRICS.map((fabric) => (
              <div
                key={fabric.name}
                className="rounded-2xl border border-[#E9EDF1] bg-[#FAFBFD] p-5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <Check className="size-4 text-primary shrink-0" strokeWidth={2.5} />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[#11114E]">
                    {fabric.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{fabric.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#E9EDF1]/55 p-4 sm:p-5 flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong className="text-[#11114E]">Matières particulières :</strong> pour les tissus
              très délicats (lin brut non stabilisé, soie, velours de coton ancien ou daim/nubuck),
              une vérification préalable sur photo ou lors de la prise de contact permet de
              confirmer si l'injection-extraction est adaptée.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. MÉTHODE & DÉROULEMENT D'UNE INTERVENTION                               */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Injection-extraction professionnelle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Comment se déroule le nettoyage de votre canapé
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              La méthode par injection-extraction nettoie la fibre en profondeur puis ré-aspire
              instantanément l'eau chargée de salissures, sans détremper le garnissage du canapé.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TEXTILE_PROCESS_STEPS.map((step) => (
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
      {/* 5. CONSEILS & PRÉCAUTIONS APRÈS NETTOYAGE                                 */}
      {/* ========================================================================= */}
      <section className="bg-white text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Après l'intervention</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Conseils et précautions après le nettoyage
            </h2>
            <ul className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <Wind className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Aérez la pièce :</strong> ouvrir légèrement les
                  fenêtres ou maintenir une pièce tempérée accélère le séchage (3 à 6 h en moyenne).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Patientez avant utilisation :</strong> évitez
                  de vous asseoir sur le canapé ou de reposer plaids et coussins décoratifs tant que
                  le tissu reste humide au toucher.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sofa className="size-4 text-primary shrink-0 mt-1" aria-hidden="true" />
                <span>
                  <strong className="text-[#11114E]">Position des coussins :</strong> si les
                  coussins sont amovibles, les laisser légèrement espacés ou sur la tranche facilite
                  la circulation de l'air.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#E9EDF1] border border-slate-200 p-6 space-y-3.5">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#11114E]">
              Conditions pratiques chez vous
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Zap className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Une prise électrique 220 V accessible à proximité du salon.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Droplets className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>Un point d'eau (évier ou salle de bain) pour remplir l'extracteur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Un léger dégagement autour du canapé pour accéder facilement aux assises et
                  accoudoirs.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FAQ SPÉCIFIQUE AU NETTOYAGE DE CANAPÉ                                  */}
      {/* ========================================================================= */}
      <section className="bg-[#FAFBFD] text-[#11114E] py-12 md:py-14 border-t border-slate-200/80">
        <div className="container-site max-w-4xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2px] bg-primary" aria-hidden="true" />
              <span>Questions fréquentes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              FAQ — Nettoyage de canapé à domicile
            </h2>
          </div>

          <div className="space-y-3.5">
            {SOFA_FAQ.map((faq) => (
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
      {/* 7. ZONES D'INTERVENTION, MAILLAGE INTERNE & CTA FINAL                     */}
      {/* ========================================================================= */}
      <section className="bg-[#11114E] text-white py-12 md:py-14 border-t border-white/10">
        <div className="container-site grid gap-6 lg:grid-cols-12 items-start">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span>Zones d'intervention</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
              Nettoyage de canapé à Lille et dans la métropole lilloise
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
                to="/nettoyage-matelas-lille"
                className="inline-flex items-center gap-1.5 font-semibold text-white/85 hover:text-primary transition-colors"
              >
                <BedDouble className="size-3.5 text-primary" aria-hidden="true" />
                <span>Nettoyage de matelas à Lille</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#E9EDF1] text-[#11114E] p-6 space-y-4 shadow-xl">
            <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-[#11114E]">
              Demander un devis pour votre canapé
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Indiquez le format de votre canapé (2–3 places, 4–5 places, angle/U ou fauteuil) et
              votre commune : nous vous confirmons rapidement un créneau à domicile.
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                to="/contact"
                search={{ activite: "textiles", prestation: "canape-2-3" }}
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
                  href={getTextileWhatsappLink("Nettoyage de canapé à domicile")}
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
