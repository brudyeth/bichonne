import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import heroDetailingWebp from "@/assets/hero-detailing.webp";
import heroDetailingPng from "@/assets/hero-detailing.png";
import { FormulaCards } from "@/components/site/Cards";
import { BUSINESS, whatsappLink } from "@/lib/business";

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
        "Nettoyage automobile professionnel à domicile à Lille et métropole lilloise : Intérieur Express dès 49 €, Intérieur Premium 69 € et Formule Complète 109 €.",
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
        "https://www.instagram.com/bichonne.tacaisse/",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Formules de nettoyage auto à domicile",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Intérieur Express",
            description:
              "Pour un entretien rapide de votre habitacle. Aspiration habitacle/coffre et plastiques intérieurs. Durée estimée : 1 h à 1 h 30.",
            price: "49",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#interieur-express",
          },
          {
            "@type": "Offer",
            name: "Intérieur Premium",
            description:
              "Pour un nettoyage intérieur en profondeur avec shampoing des sièges et tapis. Durée estimée : 2 à 3 h.",
            price: "69",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#interieur-premium",
          },
          {
            "@type": "Offer",
            name: "Formule Complète",
            description:
              "Le soin intégral de votre véhicule, intérieur et extérieur. Durée estimée : 3 à 5 h.",
            price: "109",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#complet",
          },
        ],
      },
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
          "Nettoyage automobile à domicile à Lille et métropole lilloise dès 49 € : Intérieur Express, Intérieur Premium et Formule Complète. Déplacement offert jusqu'à 20 km.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Nettoyage voiture à domicile Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Nettoyage automobile à domicile à Lille et métropole lilloise dès 49 € : Intérieur Express, Intérieur Premium et Formule Complète. Déplacement offert jusqu'à 20 km.",
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
          "Nettoyage automobile à domicile à Lille et métropole lilloise dès 49 € : Intérieur Express, Intérieur Premium et Formule Complète. Déplacement offert jusqu'à 20 km.",
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

// 3 exemples phares authentiques issus de nos réalisations réelles
const FEATURED_RESULTS = [
  {
    id: "poste-conduite",
    vehicle: "Peugeot 208",
    title: "Poste de conduite",
    subtitle: "Tableau de bord, volant & console centrale",
    description:
      "Dépoussiérage, dégraissage minutieux des aérateurs et rénovation satinée des plastiques intérieurs.",
    beforeWebp: "/assets/before-after/208-poste-conduite-avant.webp",
    beforeJpg: "/assets/before-after/208-poste-conduite-avant.jpg",
    afterWebp: "/assets/before-after/208-poste-conduite-apres.webp",
    afterJpg: "/assets/before-after/208-poste-conduite-apres.jpg",
    altBefore: "Poste de conduite Peugeot 208 avant nettoyage intérieur à domicile à Lille",
    altAfter: "Poste de conduite Peugeot 208 après nettoyage intérieur à domicile à Lille",
  },
  {
    id: "tapis-conducteur",
    vehicle: "Peugeot 208",
    title: "Tapis conducteur",
    subtitle: "Extraction textile & élimination des gravillons",
    description:
      "Aspiration haute dépression et brossage mécanique des fibres pour désincruster la terre séchée.",
    beforeWebp: "/assets/before-after/208-tapis-conducteur-avant.webp",
    beforeJpg: "/assets/before-after/208-tapis-conducteur-avant.jpg",
    afterWebp: "/assets/before-after/208-tapis-conducteur-apres.webp",
    afterJpg: "/assets/before-after/208-tapis-conducteur-apres.jpg",
    altBefore: "Tapis conducteur Peugeot 208 avant brossage et aspiration textile",
    altAfter: "Tapis conducteur Peugeot 208 après brossage et aspiration textile",
  },
  {
    id: "pedalier-clio",
    vehicle: "Renault Clio 5",
    title: "Pédalier & Moquette",
    subtitle: "Moquette conducteur, pédales & seuil",
    description:
      "Aspiration profonde des fibres textiles, élimination des poils et dégraissage intégral du pédalier.",
    beforeWebp: "/assets/before-after/pedalier-avant.webp",
    beforeJpg: "/assets/before-after/pedalier-avant.jpg",
    afterWebp: "/assets/before-after/pedalier-apres.webp",
    afterJpg: "/assets/before-after/pedalier-apres.jpg",
    altBefore: "Pédalier et moquette Renault Clio 5 avant nettoyage automobile à domicile",
    altAfter: "Pédalier et moquette Renault Clio 5 après nettoyage automobile à domicile",
  },
];

function Index() {
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const activeResult = FEATURED_RESULTS[selectedResultIndex] ?? FEATURED_RESULTS[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />

      {/* ========================================================================= */}
      {/* 1. PRÉSENTATION : HERO & BÉNÉFICES CLÉS                                   */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#11114E] text-white pt-20 sm:pt-24 md:pt-26 pb-12 sm:pb-14 md:pb-16">
        {/* Halos lumineux subtils */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[620px] sm:size-[760px] lg:size-[900px] rounded-full bg-[#2a44a6]/25 blur-[150px] sm:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[580px] sm:size-[720px] lg:size-[840px] rounded-full bg-[#282A74]/18 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[30%] left-[8%] size-[300px] sm:size-[380px] rounded-full bg-[#F47721]/[0.06] blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        {/* Image hero desktop avec fusion organique en fondu */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-0 bottom-0 w-[56%] xl:w-[60%] pointer-events-none select-none z-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 12%, rgba(0,0,0,0.2) 28%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 62%, black 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 12%, rgba(0,0,0,0.2) 28%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 62%, black 100%)",
          }}
        >
          <picture className="size-full">
            <source type="image/webp" srcSet={heroDetailingWebp} />
            <img
              src={heroDetailingPng}
              alt="Matériel de detailing automobile professionnel Bichonne ta Caisse avec microfibre, flacon et carrosserie soignée"
              width={1672}
              height={941}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="size-full object-cover object-[68%_48%]"
              style={{ filter: "contrast(1.04) brightness(1.1) saturate(1.04)" }}
            />
          </picture>
        </div>

        <div className="container-site relative z-10">
          <div className="max-w-xl lg:max-w-2xl lg:w-[54%] space-y-5 animate-rise">
            {/* Surtitre local */}
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Lille &amp; Métropole lilloise • À domicile</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight leading-[1.03] text-white">
              Nettoyage automobile
              <br />à domicile <span className="text-primary">à Lille</span> et
              <br />
              métropole lilloise
            </h1>

            {/* Paragraphe explicatif clair */}
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
              Nous venons directement chez vous ou sur votre lieu de travail avec tout le matériel
              professionnel. Notre spécialité : l'intérieur en profondeur, sièges et moquettes
              shampouinés, finitions soignées sans que vous ayez à vous déplacer.
            </p>

            {/* Photo d'immersion mobile */}
            <div className="lg:hidden relative -mx-4 sm:-mx-6 aspect-[16/10] my-3 overflow-hidden rounded-xl">
              <picture className="size-full">
                <source type="image/webp" srcSet={heroDetailingWebp} />
                <img
                  src={heroDetailingPng}
                  alt="Nettoyage automobile professionnel à domicile à Lille"
                  width={1200}
                  height={750}
                  loading="eager"
                  className="size-full object-cover object-center"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#11114E] via-transparent to-transparent opacity-80" />
            </div>

            {/* Boutons d'action prioritaires dès le haut de page */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/contact"
                className="btn btn-primary text-xs sm:text-sm px-5 sm:px-6 py-3 font-bold uppercase tracking-wider shadow-lg"
              >
                <span>Demander un devis gratuit</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="#formules"
                className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/12 text-xs sm:text-sm font-bold uppercase tracking-wider px-4 sm:px-5 py-3"
              >
                Voir nos formules
              </a>
            </div>

            {/* Raccourcis directs téléphone & WhatsApp */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 pt-0.5">
              <a
                href={BUSINESS.phoneTel}
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="size-3.5 text-primary" />
                <span className="font-semibold text-white">{BUSINESS.phoneDisplay}</span>
              </a>
              <span className="text-white/30">•</span>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-white transition-colors"
              >
                <MessageCircle className="size-3.5 text-whatsapp" />
                <span>WhatsApp direct</span>
              </a>
            </div>

            {/* 4 bénéfices très courts intégrés à la présentation */}
            <div className="pt-4 border-t border-white/12 grid grid-cols-2 gap-3 text-xs sm:text-[13px]">
              <div className="flex items-start gap-2 text-white/90">
                <Check className="size-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>
                  <strong>À domicile ou au travail</strong>
                  <span className="block text-white/70 text-[11px]">Zéro contrainte</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-white/90">
                <Check className="size-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>
                  <strong>Shampoing sièges inclus</strong>
                  <span className="block text-white/70 text-[11px]">Injection / extraction</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-white/90">
                <Check className="size-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>
                  <strong>Même tarif pour tous</strong>
                  <span className="block text-white/70 text-[11px]">Citadine, berline ou SUV</span>
                </span>
              </div>
              <div className="flex items-start gap-2 text-white/90">
                <Check className="size-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>
                  <strong>Déplacement offert</strong>
                  <span className="block text-white/70 text-[11px]">Jusqu'à 20 km de Lille</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. FORMULES : TARIFS CLAIRS SANS MODIFICATION (49 €, 69 €, 109 €)        */}
      {/* ========================================================================= */}
      <section
        id="formules"
        className="relative overflow-hidden bg-[#11114E] text-white py-12 sm:py-14 md:py-16 border-t border-white/10"
        aria-labelledby="formulas-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[650px] rounded-full bg-[#243888]/20 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 size-[600px] rounded-full bg-[#282A74]/20 blur-[150px]"
        />

        <div className="container-site relative z-10">
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span>Nos formules de nettoyage</span>
              </div>
              <h2
                id="formulas-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-white"
              >
                Des formules transparentes et adaptées
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/85">
              <CheckCircle2 className="size-4 text-primary shrink-0" />
              <span>Tarif unique pour citadine, berline et SUV • Aucun frais caché</span>
            </div>
          </div>

          {/* Cartes officielles des 3 formules (49 €, 69 €, 109 €) */}
          <FormulaCards />

          {/* Rappel concis déplacement + lien vers soins ciblés */}
          <div className="mt-6 rounded-xl border border-white/12 bg-white/[0.04] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-white/85">
            <div className="flex items-center gap-2.5">
              <MapPin className="size-4 text-primary shrink-0" />
              <span>
                <strong>Déplacement offert jusqu'à 20 km de Lille</strong> (Place de la République).
                Au-delà : 0,50 €/km supplémentaire aller-retour.
              </span>
            </div>
            <Link
              to="/formules"
              hash="soins-cibles"
              className="text-primary font-bold hover:underline shrink-0 flex items-center gap-1"
            >
              <span>Soins ciblés (poils, cuir)</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RÉSULTATS : 3 EXEMPLES CONCRETS + BOUTON VERS LA PAGE DÉDIÉE          */}
      {/* ========================================================================= */}
      <section
        className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-12 sm:py-14 md:py-16"
        aria-labelledby="results-heading"
      >
        <div className="container-site relative z-10">
          {/* En-tête de section */}
          <div className="max-w-2xl mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Résultats réels</span>
            </div>
            <h2
              id="results-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-[#11114E]"
            >
              Avant / Après : L'efficacité en images
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
              Découvrez la différence immédiate après intervention. Photos 100 % authentiques prises
              directement sur nos chantiers dans la métropole lilloise.
            </p>
          </div>

          {/* Onglets de sélection des 3 exemples phares */}
          <div className="flex flex-wrap gap-2 mb-5">
            {FEATURED_RESULTS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedResultIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all ${
                  selectedResultIndex === idx
                    ? "bg-[#11114E] text-white shadow-md"
                    : "bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50"
                }`}
              >
                {item.title} ({item.vehicle})
              </button>
            ))}
          </div>

          {/* Carte de comparaison côte à côte AVANT / APRÈS */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-md">
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E]">
                  {activeResult.vehicle} • {activeResult.title}
                </h3>
                <p className="text-xs text-slate-500">{activeResult.subtitle}</p>
              </div>
              <span className="self-start sm:self-center text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Avant / Après
              </span>
            </div>

            {/* Comparaison côte à côte sans curseur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Photo AVANT */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-600">État initial</span>
                  <span className="text-red-700 bg-red-100/80 px-2 py-0.5 rounded text-[11px]">
                    AVANT
                  </span>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <picture className="size-full">
                    <source type="image/webp" srcSet={activeResult.beforeWebp} />
                    <img
                      src={activeResult.beforeJpg}
                      alt={activeResult.altBefore}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </picture>
                </div>
              </div>

              {/* Photo APRÈS */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-[#11114E]">Résultat rénové</span>
                  <span className="text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded text-[11px]">
                    APRÈS
                  </span>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <picture className="size-full">
                    <source type="image/webp" srcSet={activeResult.afterWebp} />
                    <img
                      src={activeResult.afterJpg}
                      alt={activeResult.altAfter}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </picture>
                </div>
              </div>
            </div>

            <p className="mt-3.5 text-xs text-slate-600 leading-relaxed">
              {activeResult.description}
            </p>
          </div>

          {/* Bouton vers la page Résultats présentant l'intégralité des photos */}
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="text-sm sm:text-base font-bold text-[#11114E]">
                Envie de voir davantage de transformations ?
              </p>
              <p className="text-xs text-slate-600">
                Consultez notre galerie complète avec l'ensemble des zones rénovées sur Peugeot 208
                et Renault Clio 5.
              </p>
            </div>
            <Link
              to="/resultats"
              className="btn btn-primary text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 shrink-0 shadow-md"
            >
              <span>Voir toutes nos réalisations</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CONTACT : APPEL CLAIR À DEMANDER UN DEVIS / CONTACTER L'ENTREPRISE     */}
      {/* ========================================================================= */}
      <section
        className="relative overflow-hidden bg-[#11114E] text-white py-12 sm:py-14 md:py-16 border-t border-white/10"
        aria-labelledby="contact-cta-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[650px] rounded-full bg-[#2a44a6]/25 blur-[160px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 size-[620px] rounded-full bg-[#F47721]/[0.08] blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Demande rapide &amp; sans engagement</span>
              <span className="w-6 h-[2px] bg-primary"></span>
            </div>
            <h2
              id="contact-cta-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-[1.04]"
            >
              Prêt à redonner une seconde jeunesse à votre voiture ?
            </h2>
            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
              Demandez votre devis gratuit en 2 minutes ou contactez-nous directement par téléphone
              ou WhatsApp pour convenir d'une date d'intervention.
            </p>
          </div>

          {/* Grille de contact claire avec 3 options directes */}
          <div className="grid gap-3.5 sm:gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            {/* Option 1 : Formulaire en ligne (mise en avant principale) */}
            <Link
              to="/contact"
              className="group flex flex-col justify-between rounded-2xl border-2 border-primary bg-primary/10 p-5 text-left transition-all hover:bg-primary/15 hover:scale-[1.01] shadow-lg"
            >
              <div className="space-y-2">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-white font-bold shadow-sm">
                  <Calendar className="size-5" />
                </span>
                <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  Devis en ligne
                </p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Formulaire simplifié en 3 étapes. Estimation immédiate avec calcul kilométrique.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-primary/30 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary group-hover:text-white transition-colors">
                <span>Remplir ma demande</span>
                <ArrowRight className="size-4" />
              </div>
            </Link>

            {/* Option 2 : Téléphone direct */}
            <a
              href={BUSINESS.phoneTel}
              className="flex flex-col justify-between rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-left transition-all hover:bg-white/10 hover:border-white/30"
            >
              <div className="space-y-2">
                <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-primary font-bold">
                  <Phone className="size-5" />
                </span>
                <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  Par téléphone
                </p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Échange direct pour discuter de l'état de votre véhicule et convenir d'une date.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-white">
                <span className="text-primary font-display text-lg tracking-wide block">
                  {BUSINESS.phoneDisplay}
                </span>
                <span className="text-[11px] text-white/60 font-normal">Du lundi au samedi</span>
              </div>
            </a>

            {/* Option 3 : WhatsApp */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-left transition-all hover:bg-emerald-900/30 hover:border-emerald-500/50"
            >
              <div className="space-y-2">
                <span className="grid size-10 place-items-center rounded-xl bg-emerald-600 text-white font-bold shadow-sm">
                  <MessageCircle className="size-5" />
                </span>
                <p className="font-display text-xl font-bold uppercase tracking-wide text-white">
                  WhatsApp direct
                </p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Envoyez des photos de votre habitacle pour une estimation rapide et sur-mesure.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400">
                <span>Écrire sur WhatsApp</span>
                <ArrowRight className="size-4" />
              </div>
            </a>
          </div>

          {/* Mentions rassurantes sous les cartes de contact */}
          <div className="mt-8 pt-5 border-t border-white/10 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/75">
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" strokeWidth={2.5} />
              Sans engagement &amp; sans paiement en ligne
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" strokeWidth={2.5} />
              Rappel rapide pour convenir de la date
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="size-3.5 text-primary" strokeWidth={2.5} />
              Règlement sur place une fois le nettoyage réalisé
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
