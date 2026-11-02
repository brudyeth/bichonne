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
  Check,
} from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import heroWebp from "@/assets/hero-car.webp";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { BeforeAfterSection } from "@/components/site/BeforeAfterSection";
import { FaqSection, FAQ_ITEMS } from "@/components/site/FaqSection";
import { ContactBand } from "@/components/site/Layout";
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
    subtitle: "CHEZ VOUS OU AU TRAVAIL",
    text: "Chez vous ou sur votre lieu de travail dans la métropole lilloise : vous gagnez du temps sans vous déplacer.",
  },
  {
    icon: Sparkles,
    title: "Nettoyage approfondi",
    subtitle: "SHAMPOING SIÈGES INCLUS",
    text: "Aspiration minutieuse, rénovation des plastiques et shampoing en profondeur des sièges et moquettes.",
  },
  {
    icon: Receipt,
    title: "Tarifs transparents",
    subtitle: "MÊME PRIX POUR TOUS",
    text: "Des prix fixes et identiques pour citadine, berline ou SUV. Aucun coût caché.",
  },
  {
    icon: MapPin,
    title: "Déplacement offert",
    subtitle: "JUSQU'À 15 KM DE LILLE",
    text: "Offert jusqu'à 15 km autour de Lille. Au-delà, 0,50 €/km supplémentaire aller-retour.",
  },
];

const COMMUNES = [
  "Lille",
  "Wambrechies",
  "Lambersart",
  "Marcq-en-Barœul",
  "Bondues",
  "La Madeleine",
  "Tourcoing",
  "Roubaix",
  "et communes voisines",
];

function Index() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />

      {/* SECTION 1 : HERO REPRODUCTION FIDÈLE LOVABLE (Bleu nuit profond avec halos diffus et composition asymétrique) */}
      <section className="relative overflow-hidden bg-[#11114E] text-white pt-24 sm:pt-[104px] md:pt-28 pb-12 sm:pb-16 md:pb-20">
        {/* Halos lumineux profonds et subtils */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[620px] sm:size-[760px] lg:size-[900px] rounded-full bg-[#243888]/18 blur-[150px] sm:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[580px] sm:size-[720px] lg:size-[840px] rounded-full bg-[#282A74]/18 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[25%] left-[8%] size-[300px] sm:size-[380px] rounded-full bg-[#F47721]/[0.06] blur-[110px] sm:blur-[130px]"
        />
        {/* Texture de grain tactile fine */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <div className="container-site relative z-10">
          {/* GRILLE ASYMÉTRIQUE DU HERO : 7 colonnes gauche (texte + cartes + boutons), 5 colonnes droite (photo verticale) */}
          <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-10 xl:gap-14">
            {/* Colonne gauche : Surtitre, Titre compact avec À LILLE en orange, paragraphe, 2 cartes d'avantages, boutons */}
            <div className="lg:col-span-7 space-y-5 animate-rise">
              {/* Petit surtitre orange précédé d'un trait horizontal */}
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span>Lille & Métropole lilloise</span>
              </div>

              {/* Grand titre blanc compact avec À LILLE en orange */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-display font-bold uppercase tracking-tight leading-[0.98] text-white">
                Nettoyage automobile
                <br />à domicile <span className="text-primary">à Lille</span> et
                <br />
                métropole lilloise
              </h1>

              {/* Paragraphe commercial court */}
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                Nous venons chez vous ou au travail avec tout le matériel. Notre spécialité :
                l'intérieur en profondeur, sièges et tapis shampouinés.
              </p>

              {/* Deux cartes d'avantages côte à côte */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1 max-w-xl">
                {/* Carte avantage 1 */}
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 flex items-start gap-3 backdrop-blur-xs">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                    <Sparkles className="size-4.5" />
                  </span>
                  <div className="text-left leading-tight">
                    <p className="text-sm font-bold text-white">Intérieur dès 69 €</p>
                    <p className="text-xs text-white/70 mt-0.5">Shampoing sièges et tapis inclus</p>
                  </div>
                </div>

                {/* Carte avantage 2 */}
                <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3.5 flex items-start gap-3 backdrop-blur-xs">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                    <MapPin className="size-4.5" />
                  </span>
                  <div className="text-left leading-tight">
                    <p className="text-sm font-bold text-white">Déplacement offert</p>
                    <p className="text-xs text-white/70 mt-0.5">Jusqu'à 15 km autour de Lille</p>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/contact"
                  className="btn btn-primary text-sm sm:text-base px-6 sm:px-7 py-3"
                >
                  <span>Réserver mon nettoyage</span>
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/formules"
                  className="btn border border-white/20 bg-white/[0.04] text-white hover:bg-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3"
                >
                  Découvrir les formules
                </Link>
              </div>

              {/* Lien WhatsApp discret */}
              <div className="pt-1">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                >
                  <MessageCircle className="size-4 text-whatsapp" />
                  <span>Une question ? Écrivez-nous sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Colonne droite : Grande photographie verticale avec coins arrondis et encadré de prix superposé */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <picture>
                  <source type="image/webp" srcSet={heroWebp} />
                  <img
                    src={heroImg}
                    alt="Nettoyage et detailing automobile complet à domicile à Lille - Bichonne ta Caisse"
                    width={960}
                    height={1200}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </picture>

                {/* Petit encadré de prix superposé en bas de la photographie */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto inline-flex items-center gap-3.5 rounded-2xl bg-[#11114E]/90 border border-white/15 backdrop-blur-md px-4 py-3 shadow-2xl z-10">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                    69 €
                  </span>
                  <div className="text-left leading-tight">
                    <p className="font-bold text-xs sm:text-sm text-white">Nettoyage intérieur</p>
                    <p className="text-[11px] text-white/75 mt-0.5">Shampoing inclus · 2 à 3 h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bas du hero : Bandeau discret "Plusieurs voitures à la maison ?" */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-7 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Car className="size-5 text-primary shrink-0" />
              <p className="text-xs sm:text-sm text-white/90">
                <strong className="text-white font-bold">Plusieurs voitures à la maison ?</strong>{" "}
                Demandez un devis personnalisé pour toute la famille.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-white transition-colors shrink-0"
            >
              <span>Demander un devis</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 : POURQUOI NOUS CHOISIR (Fond blanc nacré, titre à gauche et 4 cartes sobres) */}
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-multiply"
        />

        <div className="container-site relative z-10">
          {/* En-tête sobre aligné à gauche avec surtitre orange précédé d'un trait */}
          <div className="max-w-3xl mb-10 sm:mb-12">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Pourquoi nous choisir</span>
            </div>
            <h2
              id="reassurance-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#11114E]"
            >
              Pourquoi choisir Bichonne ta Caisse ?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              Un service de nettoyage automobile soigné, accessible et transparent, à domicile.
            </p>
          </div>

          {/* 4 cartes sobres avec icônes bleu nuit et sous-titres orange */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REASSURANCE.map((r) => (
              <div
                key={r.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid size-12 place-items-center rounded-full bg-[#11114E] text-primary mb-5 shadow-xs">
                  <r.icon className="size-5" />
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#11114E]">
                  {r.title}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mt-1 mb-3">
                  {r.subtitle}
                </p>
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
          className="pointer-events-none absolute -top-24 -left-24 size-[700px] sm:size-[850px] lg:size-[950px] rounded-full bg-[#243888]/22 blur-[150px] sm:blur-[180px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[25%] -right-24 size-[650px] sm:size-[800px] lg:size-[920px] rounded-full bg-[#282A74]/20 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[55%] -left-20 size-[680px] sm:size-[820px] lg:size-[940px] rounded-full bg-[#2C3275]/21 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[65%] right-[10%] size-[320px] sm:size-[400px] rounded-full bg-[#F47721]/[0.06] blur-[115px] sm:blur-[135px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        {/* SECTION 3 : FORMULES DE NETTOYAGE */}
        <section className="relative z-10 py-16 md:py-24" aria-labelledby="formulas-heading">
          <div className="container-site relative z-10">
            {/* En-tête : Surtitre, titre principal à gauche, argument à droite */}
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                  <span className="w-6 h-[2px] bg-primary"></span>
                  <span>Nos formules</span>
                </div>
                <h2
                  id="formulas-heading"
                  className="text-4xl sm:text-5xl font-display font-bold uppercase tracking-tight text-white"
                >
                  Choisissez votre formule de nettoyage
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 font-medium">
                <Check className="size-4 text-primary shrink-0" strokeWidth={2.5} />
                <span>Même prix pour tous les véhicules. Pas de frais cachés.</span>
              </div>
            </div>

            {/* 3 cartes : Nettoyage extérieur 49€ (bleu nuit), Nettoyage intérieur 69€ (blanche au centre), Nettoyage complet 109€ (bleu nuit) */}
            <FormulaCards />

            <p className="mt-4 text-xs sm:text-sm text-white/70 max-w-2xl italic">
              * Soins complémentaires et suppléments éventuels annoncés avant confirmation du
              rendez-vous.
            </p>
          </div>
        </section>

        {/* SECTION 4 : PRESTATIONS COMPLÉMENTAIRES (Composition asymétrique : titre à gauche, grand encadré blanc à droite) */}
        <section
          className="relative z-10 pb-16 md:pb-24 pt-4 md:pt-6 border-t border-white/10"
          aria-labelledby="cares-heading"
        >
          <div className="container-site relative z-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Colonne gauche (5 colonnes) : Surtitre, titre, description et bouton */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <span className="w-6 h-[2px] bg-primary"></span>
                  <span>Prestations complémentaires</span>
                </div>
                <h2
                  id="cares-heading"
                  className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white"
                >
                  Les petits plus pour votre voiture
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
                  Complétez votre formule avec les soins adaptés à votre véhicule.
                </p>
                <div className="pt-2">
                  <Link
                    to="/formules"
                    hash="soins-cibles"
                    className="btn border border-white/20 bg-white/[0.05] text-white hover:bg-white/10 text-xs sm:text-sm font-bold uppercase tracking-wider"
                  >
                    Voir tous les détails
                  </Link>
                </div>
              </div>

              {/* Colonne droite (7 colonnes) : Grand encadré blanc avec prix orange */}
              <div className="lg:col-span-7">
                <CareCards />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 5 : AVANT / APRÈS (Fond blanc nacré, composition asymétrique Lovable avec sélecteur interactif) */}
      <BeforeAfterSection />

      {/* SECTION 6 : ZONE D'INTERVENTION (Bleu nuit profond, composition asymétrique avec tableau kilométrique blanc) */}
      <section
        className="relative overflow-hidden bg-[#11114E] text-white py-16 md:py-24"
        aria-labelledby="zone-heading"
      >
        {/* Halos zone d'intervention */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-20 size-[680px] sm:size-[820px] lg:size-[920px] rounded-full bg-[#243888]/22 blur-[145px] sm:blur-[175px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-20 size-[640px] sm:size-[780px] lg:size-[880px] rounded-full bg-[#282A74]/20 blur-[140px] sm:blur-[170px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-[20%] size-[300px] rounded-full bg-[#F47721]/[0.05] blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
        />

        <div className="container-site relative z-10">
          {/* COMPOSITION ASYMÉTRIQUE : 5 colonnes gauche (texte + badges communes), 7 colonnes droite (carte blanche avec barème) */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Colonne gauche */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span>Zone d'intervention</span>
              </div>

              <h2
                id="zone-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-[0.98]"
              >
                Déplacement offert jusqu'à 15 km autour de Lille
              </h2>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km,
                aller-retour. Nous intervenons chez vous, sur votre parking ou sur votre lieu de
                travail.
              </p>

              {/* Étiquettes des communes desservies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {COMMUNES.map((commune) => (
                  <span
                    key={commune}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs"
                  >
                    {commune}
                  </span>
                ))}
              </div>

              <p className="text-xs text-white/60 italic pt-2">
                * Distance calculée selon l'itinéraire routier depuis notre point de référence à
                Lille.
              </p>
            </div>

            {/* Colonne droite : Carte blanche avec tableau kilométrique transparent */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white p-6 sm:p-8 text-[#11114E] shadow-2xl">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-5">
                  <MapPin className="size-4" />
                  <span>Barème kilométrique transparent</span>
                </div>

                <div className="divide-y divide-slate-100 text-sm">
                  <div className="flex items-center justify-between pb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Distance</span>
                    <span>Frais</span>
                  </div>
                  <div className="flex items-center justify-between py-3 font-semibold">
                    <span className="text-slate-800">Jusqu'à 15 km</span>
                    <span className="font-bold text-primary">Offert</span>
                  </div>
                  <div className="flex items-center justify-between py-3 font-semibold">
                    <span className="text-slate-800">20 km</span>
                    <span className="font-bold text-[#11114E]">5 €</span>
                  </div>
                  <div className="flex items-center justify-between py-3 font-semibold">
                    <span className="text-slate-800">25 km</span>
                    <span className="font-bold text-[#11114E]">10 €</span>
                  </div>
                  <div className="flex items-center justify-between py-3 font-semibold">
                    <span className="text-slate-800">30 km</span>
                    <span className="font-bold text-[#11114E]">15 €</span>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Seuls les kilomètres dépassant les 15 km offerts sont facturés.
                </p>

                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href={BUSINESS.phoneTel}
                    className="btn border-2 border-slate-200 hover:border-[#11114E] text-[#11114E] flex-1 justify-center py-2.5 font-bold"
                  >
                    <Phone className="size-4" />
                    <span>{BUSINESS.phoneDisplay}</span>
                  </a>
                  <Link
                    to="/contact"
                    className="btn btn-primary flex-1 justify-center py-2.5 text-white font-bold"
                  >
                    Réservation & Devis
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 : QUESTIONS FRÉQUENTES (Fond blanc nacré, composition asymétrique Lovable avec accordéon et carte contact) */}
      <FaqSection />

      {/* SECTION FINALE : BANDE ORANGE */}
      <ContactBand />
    </>
  );
}
