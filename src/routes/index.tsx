import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Home,
  Receipt,
  MessageCircle,
  MapPin,
  Phone,
  Car,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import heroWebp from "@/assets/hero-car.webp";
import logoImg from "@/assets/logo-full.png";
import logoWebp from "@/assets/logo-full.webp";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { BeforeAfterSection } from "@/components/site/BeforeAfterSection";
import { FaqSection, FAQ_ITEMS } from "@/components/site/FaqSection";
import { ContactBand } from "@/components/site/Layout";
import { BUSINESS, euro, whatsappLink } from "@/lib/business";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoDetailing", "LocalBusiness", "Organization"],
      "@id": "https://bichonnetacaisse.fr/#organization",
      name: "Bichonne ta Caisse",
      alternateName: "Bichonne Ta Caisse",
      url: "https://bichonnetacaisse.fr/",
      logo: "https://bichonnetacaisse.fr/brand/logo-rond.png",
      image: [
        "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
        "https://bichonnetacaisse.fr/brand/logo-rond.png",
        "https://bichonnetacaisse.fr/og-image.jpg",
      ],
      description:
        "Nettoyage intérieur, extérieur et complet de votre véhicule à domicile à Lille, Wambrechies et dans la métropole lilloise. Découvrez nos formules dès 49 €.",
      telephone: "+33659140939",
      priceRange: "49 € - 109 €",
      currenciesAccepted: "EUR",
      paymentAccepted: "Espèces, Virement bancaire, Carte bancaire",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Wambrechies",
        postalCode: "59118",
        addressRegion: "Hauts-de-France",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 50.6868,
        longitude: 3.0536,
      },
      areaServed: [
        { "@type": "City", name: "Lille" },
        { "@type": "City", name: "Wambrechies" },
        { "@type": "City", name: "Marcq-en-Barœul" },
        { "@type": "City", name: "Lambersart" },
        { "@type": "City", name: "La Madeleine" },
        { "@type": "City", name: "Bondues" },
        { "@type": "City", name: "Tourcoing" },
        { "@type": "City", name: "Roubaix" },
        { "@type": "AdministrativeArea", name: "Métropole Européenne de Lille" },
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=61595404295972",
        "https://www.instagram.com/bicho.nnetacaisse/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Formules de nettoyage auto à domicile",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Nettoyage extérieur",
            description:
              "Un nettoyage minutieux pour redonner éclat et propreté à votre carrosserie. Durée estimée : 1 h à 1 h 30.",
            price: "49",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#exterieur",
          },
          {
            "@type": "Offer",
            name: "Nettoyage intérieur",
            description:
              "Un nettoyage en profondeur pour retrouver un habitacle propre, frais et soigné. Durée estimée : 2 à 3 h.",
            price: "69",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#interieur",
          },
          {
            "@type": "Offer",
            name: "Nettoyage complet",
            description:
              "La formule tout-en-un pour prendre soin de votre véhicule, à l'intérieur comme à l'extérieur. Durée estimée : 3 à 5 h.",
            price: "109",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#complet",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://bichonnetacaisse.fr/#faq",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: typeof item.answer === "string" ? item.answer : "",
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": "https://bichonnetacaisse.fr/#website",
      url: "https://bichonnetacaisse.fr/",
      name: "Bichonne ta Caisse",
      publisher: {
        "@id": "https://bichonnetacaisse.fr/#organization",
      },
      inLanguage: "fr-FR",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nettoyage voiture à domicile Lille | Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Nettoyage intérieur, extérieur et complet de votre véhicule à domicile à Lille, Wambrechies et dans la métropole lilloise. Découvrez nos formules dès 49 €.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Nettoyage voiture à domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Nettoyage intérieur, extérieur et complet de votre véhicule à domicile à Lille, Wambrechies et dans la métropole lilloise. Découvrez nos formules dès 49 €.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/" },
      {
        property: "og:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      {
        property: "og:image:alt",
        content: "Nettoyage automobile à domicile - Bichonne ta Caisse Lille",
      },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Nettoyage voiture à domicile Lille | Bichonne ta Caisse",
      },
      {
        name: "twitter:description",
        content:
          "Nettoyage intérieur, extérieur et complet de votre véhicule à domicile à Lille, Wambrechies et dans la métropole lilloise. Découvrez nos formules dès 49 €.",
      },
      {
        name: "twitter:image",
        content: "https://bichonnetacaisse.fr/brand/partage-reseaux-1200x630.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/" }],
  }),
  component: Index,
});

const REASSURANCE = [
  {
    icon: Home,
    title: "Intervention à domicile",
    subtitle: "Chez vous ou au travail",
    text: "Directement chez vous ou sur votre lieu de travail dans la métropole lilloise : gagnez du temps sans vous déplacer.",
  },
  {
    icon: Sparkles,
    title: "Nettoyage approfondi",
    subtitle: "Shampoing sièges inclus",
    text: "Aspiration minutieuse, rénovation des plastiques et shampoing en profondeur des sièges et moquettes inclus.",
  },
  {
    icon: Receipt,
    title: "Tarifs transparents",
    subtitle: "Même prix pour tous",
    text: "Des prix fixes et identiques que vous rouliez en citadine, berline ou SUV. Aucun coût caché.",
  },
  {
    icon: MapPin,
    title: "Déplacement offert",
    subtitle: "Jusqu'à 15 km de Lille",
    text: "Déplacement 100 % offert jusqu'à 15 km autour de Lille. Au-delà, barème clair de 0,50 €/km supplémentaire A/R.",
  },
];

function Index() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      {/* SECTION 1 : HÉRO / PREMIER ÉCRAN (Bleu nuit officiel #11114E avec halos lumineux) */}
      <section className="relative overflow-hidden bg-[#11114E] text-white pt-24 sm:pt-[104px] md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Halos lumineux diffus localisés sur les côtés, préservant la profondeur du bleu nuit #11114E */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[620px] sm:size-[760px] lg:size-[900px] rounded-full bg-[#3448D8]/26 blur-[150px] sm:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[580px] sm:size-[720px] lg:size-[840px] rounded-full bg-[#4440A0]/25 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[25%] left-[8%] size-[300px] sm:size-[380px] rounded-full bg-[#F47721]/[0.08] blur-[110px] sm:blur-[130px]"
        />
        {/* Texture de grain tactile fine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <div className="container-site relative z-10">
          {/* GRILLE PRINCIPALE RÉÉQUILIBRÉE : Contenu textuel complet à gauche & Photo carrée centrée à droite */}
          <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-10 xl:gap-14">
            {/* Colonne gauche (7 colonnes) : Titre dominant, slogan, présentation, atouts et boutons */}
            <div className="lg:col-span-7 space-y-5 animate-rise">
              <div className="mb-4 sm:mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-xs">
                <Sparkles className="size-3.5" />
                Nettoyage automobile à domicile · Métropole lilloise
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[56px] font-display font-bold uppercase tracking-wide leading-[1.08]">
                Nettoyage automobile à domicile
                <br />
                <span className="text-primary">à Lille</span> et métropole lilloise
              </h1>

              {/* Slogan & Présentation complète */}
              <div className="space-y-2">
                <p className="text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white/95">
                  Votre voiture propre, sans bouger de chez vous
                </p>

                <p className="text-base sm:text-lg opacity-85 leading-relaxed max-w-xl">
                  Bichonne ta Caisse intervient directement à votre domicile ou sur votre lieu de
                  travail à Lille, Wambrechies, Lambersart, Marcq-en-Barœul et dans toute la
                  métropole lilloise. Nettoyage intérieur soigné, lavage carrosserie extérieur ou
                  formule complète : un résultat impeccable sans vous déplacer.
                </p>
              </div>

              {/* Atouts visibles immédiatement sur le premier écran */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold pt-1">
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-3.5 py-2 text-white/95 backdrop-blur-xs">
                  <Sparkles className="size-4 text-primary shrink-0" />
                  <span>
                    Formule Intérieur dès <strong className="text-primary">69 €</strong> · Shampoing
                    sièges & tapis <strong className="text-white">inclus</strong>
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-3.5 py-2 text-white/95 backdrop-blur-xs">
                  <MapPin className="size-4 text-primary shrink-0" />
                  <span>
                    Déplacement <strong className="text-primary">offert</strong> jusqu'à 15 km de
                    Lille
                  </span>
                </div>
              </div>

              {/* Boutons d'action et lien WhatsApp */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link to="/contact" className="btn btn-primary text-base px-7">
                  Demander mon nettoyage
                </Link>
                <Link to="/formules" className="btn btn-outline-light">
                  Découvrir les formules
                </Link>
              </div>

              <div>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity"
                >
                  <MessageCircle className="size-4 text-whatsapp" /> Ou écrivez-nous directement sur
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Colonne droite (5 colonnes) : Photo carrée réduite d'environ 20%, parfaitement centrée verticalement */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center mt-4 lg:mt-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] xl:max-w-[420px]">
                {/* Encadrement décoratif stripe accent */}
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl stripe-accent opacity-20" />

                <picture>
                  <source type="image/webp" srcSet={heroWebp} />
                  <img
                    src={heroImg}
                    alt="Nettoyage et detailing automobile complet à domicile à Lille - Bichonne ta Caisse"
                    width={960}
                    height={960}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="relative aspect-square w-full rounded-2xl object-cover shadow-2xl"
                  />
                </picture>

                {/* Logo officiel rond superposé dans l'angle supérieur droit */}
                <div className="absolute -top-3 -right-2 sm:-top-3.5 sm:-right-2.5 lg:-top-4 lg:-right-3 size-20 sm:size-24 lg:size-26 xl:size-28 drop-shadow-md z-20">
                  <picture>
                    <source type="image/webp" srcSet={logoWebp} />
                    <img
                      src={logoImg}
                      alt="Logo officiel Bichonne ta Caisse - Nettoyage automobile métropole lilloise"
                      width={120}
                      height={120}
                      loading="eager"
                      decoding="async"
                      className="size-full object-contain"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* Encadré plusieurs voitures à la maison */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="max-w-2xl mx-auto lg:max-w-none">
              <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xs p-4 sm:p-5 shadow-md transition-all hover:border-primary/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#F47721] text-white shadow-xs">
                      <Car className="size-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white leading-tight">
                        Plusieurs voitures{" "}
                        <span className="whitespace-nowrap">à la maison&nbsp;?</span>
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-white/80 leading-snug">
                        On bichonne toute la famille ! Demandez votre devis personnalisé pour
                        plusieurs véhicules.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Demander un devis <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : RÉASSURANCE (Blanc nacré légèrement métallisé) */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-24"
        aria-labelledby="reassurance-heading"
      >
        {/* Reflets diffus nacrés/argentés très doux */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[540px] rounded-full bg-blue-100/40 blur-[130px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 size-[520px] rounded-full bg-indigo-100/40 blur-[125px]"
        />
        {/* Texture tactile subtile pour casser l'effet aplat sans assombrir */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-multiply"
        />

        <div className="container-site relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
              <ShieldCheck className="size-3.5" />
              Sérénité & Clarté
            </div>
            <h2
              id="reassurance-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wide text-[#11114E]"
            >
              Pourquoi choisir Bichonne ta Caisse ?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Un service de nettoyage automobile soigné, accessible et transparent à domicile.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASSURANCE.map((r) => (
              <div
                key={r.title}
                className="flex flex-col rounded-2xl border border-slate-200/90 bg-white/95 text-[#11114E] p-5 sm:p-6 shadow-md shadow-slate-200/50 hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#11114E] text-primary shadow-xs">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold font-display uppercase tracking-wide leading-tight text-[#11114E]">
                      {r.title}
                    </h3>
                    <p className="text-xs font-semibold text-primary">{r.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENEUR FORMULES + SOINS : Arrière-plan bleu nuit continu #11114E avec halos continus sans rupture */}
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos continus partagés */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 size-[700px] sm:size-[850px] lg:size-[950px] rounded-full bg-[#3448D8]/34 blur-[150px] sm:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[25%] -right-24 size-[650px] sm:size-[800px] lg:size-[920px] rounded-full bg-[#5140A0]/30 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[55%] -left-20 size-[680px] sm:size-[820px] lg:size-[940px] rounded-full bg-[#4440A0]/33 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[65%] right-[10%] size-[320px] sm:size-[400px] rounded-full bg-[#F47721]/10 blur-[115px] sm:blur-[135px]"
        />
        {/* Texture de grain tactile fine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        {/* SECTION 3 : FORMULES DE NETTOYAGE */}
        <section className="relative z-10 py-16 md:py-24" aria-labelledby="formulas-heading">
          <div className="container-site relative z-10">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">
                  Nos formules
                </p>
                <h2
                  id="formulas-heading"
                  className="mt-2 text-4xl sm:text-5xl font-display font-bold uppercase tracking-wide text-white"
                >
                  Choisissez votre formule de nettoyage
                </h2>
              </div>
              <p className="text-sm text-white/80 max-w-xs">
                Même prix pour tous les véhicules. Pas de frais cachés.
              </p>
            </div>
            <FormulaCards />
            <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-2xl italic">
              * Soins complémentaires et suppléments éventuels annoncés avant confirmation du
              rendez-vous.
            </p>
          </div>
        </section>

        {/* SECTION 4 : PRESTATIONS COMPLÉMENTAIRES */}
        <section
          className="relative z-10 py-16 md:py-24 pt-0 md:pt-0"
          aria-labelledby="cares-heading"
        >
          <div className="container-site relative z-10">
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-primary">
                Prestations complémentaires
              </p>
              <h2
                id="cares-heading"
                className="mt-2 text-4xl sm:text-5xl font-display font-bold uppercase tracking-wide text-white"
              >
                Les petits plus pour votre voiture
              </h2>
              <p className="mt-2 mb-10 text-base text-white/80 max-w-2xl">
                Complétez votre formule avec les soins adaptés à votre véhicule.
              </p>
            </div>
            <CareCards />
            <div className="mt-10 flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link
                to="/formules"
                hash="soins-cibles"
                className="btn border-2 border-white/30 text-white hover:bg-white/10"
              >
                Voir tous les détails
              </Link>
              <Link to="/contact" className="btn btn-primary text-white font-bold">
                Réservation & Devis
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 5 : AVANT / APRÈS (Blanc nacré légèrement métallisé) */}
      <BeforeAfterSection />

      {/* SECTION 6 : ZONE D'INTERVENTION (Bleu nuit officiel #11114E avec halos lumineux) */}
      <section
        className="relative overflow-hidden bg-[#11114E] text-white py-16 md:py-24"
        aria-labelledby="zone-heading"
      >
        {/* Halos lumineux zone d'intervention */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 size-[680px] sm:size-[820px] lg:size-[920px] rounded-full bg-[#3448D8]/33 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 size-[640px] sm:size-[780px] lg:size-[880px] rounded-full bg-[#4440A0]/32 blur-[140px] sm:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[20%] size-[300px] rounded-full bg-[#F47721]/[0.08] blur-[110px]"
        />
        {/* Texture de grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <div className="container-site relative z-10">
          <div className="rounded-2xl border border-white/20 bg-white text-[#11114E] p-6 sm:p-8 md:p-10 shadow-2xl">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  <MapPin className="size-3.5" />
                  Zone d'intervention locale
                </div>

                <div>
                  <h2
                    id="zone-heading"
                    className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-wide text-[#11114E]"
                  >
                    Déplacement offert jusqu'à 15 km autour de Lille
                  </h2>
                  <p className="mt-2 text-base font-medium text-slate-700">
                    Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km,
                    aller-retour.
                  </p>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  Lavage et nettoyage automobile à domicile directement chez vous, sur votre parking
                  ou sur votre lieu de travail à{" "}
                  <span className="font-semibold text-[#11114E]">
                    Lille, Wambrechies, Lambersart, Marcq-en-Barœul, Bondues, La Madeleine,
                    Tourcoing, Roubaix
                  </span>{" "}
                  et communes voisines.
                </p>

                <p className="text-xs text-slate-500 italic">
                  * Distance calculée selon l'itinéraire routier depuis notre point de référence à
                  Lille.
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
                <div className="w-full max-w-sm rounded-xl border border-primary/20 bg-[#F8F9FC] p-4 text-xs space-y-2 shadow-2xs">
                  <p className="font-bold uppercase tracking-wider text-[#11114E] text-[11px] flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary" />
                    Barème kilométrique transparent
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-700">
                    <span>
                      • Jusqu'à 15 km : <strong className="text-[#11114E]">Offert</strong>
                    </span>
                    <span>
                      • 20 km : <strong className="text-[#11114E]">5 €</strong>
                    </span>
                    <span>
                      • 25 km : <strong className="text-[#11114E]">10 €</strong>
                    </span>
                    <span>
                      • 30 km : <strong className="text-[#11114E]">15 €</strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                    Seuls les kilomètres dépassant les 15 km offerts sont facturés.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full max-w-sm">
                  <a
                    href={BUSINESS.phoneTel}
                    className="btn border-2 border-[#11114E] text-[#11114E] hover:bg-[#11114E] hover:text-white flex-1 justify-center"
                  >
                    <Phone className="size-4" />
                    {BUSINESS.phoneDisplay}
                  </a>
                  <Link
                    to="/contact"
                    className="btn btn-primary text-white font-bold flex-1 justify-center"
                  >
                    Réservation & Devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 : FOIRE AUX QUESTIONS (Blanc nacré légèrement métallisé) */}
      <FaqSection />

      <ContactBand />
    </>
  );
}
