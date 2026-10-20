import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Receipt, MessageCircle, MapPin, Phone, Car, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import heroWebp from "@/assets/hero-car.webp";
import logoImg from "@/assets/logo-full.jpg";
import logoWebp from "@/assets/logo-full.webp";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { ContactBand } from "@/components/site/Layout";
import { BUSINESS, euro, whatsappLink } from "@/lib/business";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["AutoDetailing", "LocalBusiness"],
      "@id": "https://bichonnetacaisse.fr/#organization",
      name: "Bichonne ta Caisse",
      alternateName: "Bichonne Ta Caisse",
      url: "https://bichonnetacaisse.fr/",
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
              "Lavage professionnel et respectueux de la carrosserie, avec une méthode adaptée pour limiter le risque de micro-rayures. Nettoyage des roues inclus.",
            price: "49",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#exterieur",
          },
          {
            "@type": "Offer",
            name: "Nettoyage intérieur",
            description:
              "Un nettoyage minutieux de l'habitacle, des surfaces aux textiles, avec un traitement vapeur si nécessaire, adapté aux matériaux.",
            price: "69",
            priceCurrency: "EUR",
            url: "https://bichonnetacaisse.fr/formules#interieur",
          },
          {
            "@type": "Offer",
            name: "Nettoyage complet",
            description: "L'intérieur et l'extérieur réunis en une seule intervention.",
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
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/" }],
  }),
  component: Index,
});

const PERKS = [
  {
    icon: Home,
    title: "À domicile",
    text: "Nous venons chez vous, vous n'avez pas à vous déplacer.",
  },
  {
    icon: Receipt,
    title: "Tarifs transparents",
    text: "Des formules claires, un prix identique pour tous les véhicules.",
  },
  {
    icon: MessageCircle,
    title: "Contact simple",
    text: "Un appel, un message WhatsApp ou le formulaire : c'est vous qui choisissez.",
  },
];

function Index() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
      />
      <section className="relative overflow-hidden bg-night text-night-foreground">
        <div className="container-site grid items-center gap-10 pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Lavage automobile à domicile
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl">
              Nettoyage automobile à domicile
              <br />
              <span className="text-primary">à Lille</span> et métropole lilloise
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-display font-bold uppercase tracking-wide text-white/95">
              Votre voiture propre, sans bouger de chez vous
            </p>
            <p className="mt-4 max-w-lg text-base md:text-lg opacity-80">
              Bichonne ta Caisse intervient à votre domicile ou sur votre lieu de travail à Lille,
              Wambrechies, Lambersart, Marcq-en-Barœul et dans toute la métropole lilloise.
              Nettoyage intérieur, lavage extérieur ou formule complète : un tarif identique pour
              tous les véhicules.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/formules" className="btn btn-primary">
                Découvrir les formules
              </Link>
              <Link to="/contact" className="btn btn-outline-light">
                Demander un devis
              </Link>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold opacity-90 hover:opacity-100"
            >
              <MessageCircle className="size-4 text-whatsapp" /> Ou écrivez-nous directement sur
              WhatsApp
            </a>

            {/* Bandeau compact multi-véhicules */}
            <div className="mt-6 rounded-xl border border-white/15 bg-[#11114E] p-3.5 sm:p-4 shadow-md transition-all hover:border-primary/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-start sm:items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#F47721] text-white shadow-xs">
                    <Car className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-white leading-tight">
                      Plusieurs voitures à la maison ?
                    </h2>
                    <p className="mt-0.5 text-xs sm:text-sm text-white/80 leading-snug">
                      On bichonne toute la famille ! Demandez votre devis personnalisé pour
                      plusieurs véhicules.
                    </p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 self-start sm:self-center shrink-0 rounded-lg border border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Demander un devis <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mt-12 sm:mt-0 block">
            <div className="absolute -inset-3 rounded-3xl stripe-accent opacity-30" />
            <picture>
              <source type="image/webp" srcSet={heroWebp} />
              <img
                src={heroImg}
                alt="Nettoyage et detailing automobile complet à domicile à Lille - Bichonne ta Caisse"
                width={1280}
                height={960}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
              />
            </picture>
            <div className="absolute -top-[96px] right-1 sm:-top-[120px] sm:-right-4 lg:-top-[136px] lg:-right-6 size-36 sm:size-48 lg:size-56 xl:size-60 rounded-full border-4 sm:border-6 lg:border-8 border-night shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden bg-night ring-4 ring-primary/90 z-20">
              <picture>
                <source type="image/webp" srcSet={logoWebp} />
                <img
                  src={logoImg}
                  alt="Logo officiel Bichonne ta Caisse - Nettoyage automobile métropole lilloise"
                  width={240}
                  height={240}
                  loading="eager"
                  decoding="async"
                  className="size-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary" aria-labelledby="perks-heading">
        <h2 id="perks-heading" className="sr-only">
          Pourquoi faire nettoyer votre véhicule à domicile avec Bichonne ta Caisse ?
        </h2>
        <div className="container-site grid gap-6 py-12 md:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-night text-primary">
                <p.icon className="size-6" />
              </span>
              <div>
                <h3 className="text-2xl font-bold font-display uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 md:py-24" aria-labelledby="formulas-heading">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Nos formules</p>
            <h2 id="formulas-heading" className="mt-2 text-4xl sm:text-5xl">
              Choisissez votre formule de nettoyage
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Même prix pour tous les véhicules. Pas de frais cachés.
          </p>
        </div>
        <FormulaCards />
      </section>

      <section className="bg-secondary" aria-labelledby="cares-heading">
        <div className="container-site py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Soins ciblés</p>
          <h2 id="cares-heading" className="mt-2 text-4xl sm:text-5xl">
            Les finitions qui font la différence
          </h2>
          <p className="mt-2 mb-10 text-base text-muted-foreground max-w-2xl">
            Rénovation des plastiques intérieurs et extérieurs, traitement anti-odeurs, soin du cuir
            et dépoilage intensif pour aller plus loin dans le détail.
          </p>
          <CareCards />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/formules" hash="soins-cibles" className="btn btn-outline">
              Voir tous les détails
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site grid gap-8 py-16 md:grid-cols-2 md:items-center">
        <div className="flex items-start gap-4">
          <MapPin className="size-10 text-primary shrink-0 mt-1" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase tracking-wide">
              Zone d'intervention locale
            </h2>
            <p className="mt-1 text-base text-muted-foreground">
              Lavage et nettoyage automobile à domicile dans toute la métropole lilloise :
            </p>
            <p className="mt-2 text-sm font-medium text-foreground/90">
              Lille, Wambrechies, Lambersart, Marcq-en-Barœul, Bondues, La Madeleine, Tourcoing,
              Roubaix et communes voisines.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Intervention directement chez vous, sur votre parking ou sur votre lieu de travail.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <a href={BUSINESS.phoneTel} className="btn btn-outline">
            <Phone className="size-4" />
            {BUSINESS.phoneDisplay}
          </a>
          <Link to="/contact" className="btn btn-primary">
            Formulaire de devis
          </Link>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
