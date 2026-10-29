import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Receipt, MessageCircle, MapPin, Phone, Car, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import heroWebp from "@/assets/hero-car.webp";
import logoImg from "@/assets/logo-full.png";
import logoWebp from "@/assets/logo-full.webp";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { BeforeAfterSection } from "@/components/site/BeforeAfterSection";
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

const PERKS = [
  {
    icon: Home,
    title: "À domicile",
    text: "Nous venons chez vous. Déplacement offert jusqu'à 15 km autour de Lille.",
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
      <section className="relative overflow-hidden bg-night text-night-foreground pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-20">
        <div className="container-site">
          {/* NIVEAU SUPÉRIEUR : Titre principal (gauche) & Photographie avec Logo officiel (droite) */}
          <div className="grid lg:grid-cols-[1.1fr_1fr] items-start gap-8 lg:gap-12 xl:gap-16">
            {/* Colonne gauche : Badge & Grand Titre */}
            <div className="animate-rise">
              <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                Lavage automobile à domicile
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-display font-bold uppercase tracking-wide leading-[1.08]">
                Nettoyage automobile à domicile
                <br />
                <span className="text-primary">à Lille</span> et métropole lilloise
              </h1>
            </div>

            {/* Colonne droite : Photo avec Logo officiel superposé */}
            <div className="relative mt-2 lg:mt-0">
              <div className="relative w-full max-w-[520px] mx-auto lg:ml-auto lg:mr-0">
                <div className="absolute -inset-1.5 sm:-inset-2 rounded-2xl stripe-accent opacity-20" />
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
                    className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] w-full rounded-2xl object-cover shadow-2xl"
                  />
                </picture>
                {/* Logo officiel rond superposé dans l'angle supérieur droit */}
                <div className="absolute -top-3.5 -right-2 sm:-top-4 sm:-right-3 lg:-top-5 lg:-right-4 size-22 sm:size-26 lg:size-28 xl:size-32 drop-shadow-md z-20">
                  <picture>
                    <source type="image/webp" srcSet={logoWebp} />
                    <img
                      src={logoImg}
                      alt="Logo officiel Bichonne ta Caisse - Nettoyage automobile métropole lilloise"
                      width={130}
                      height={130}
                      loading="eager"
                      decoding="async"
                      className="size-full object-contain"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          {/* NIVEAU INFÉRIEUR : Slogan, Présentation complète, Boutons d'action, WhatsApp et Multi-véhicules */}
          <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/10">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Colonne gauche (7 cols) : Slogan, Paragraphe complet, Boutons et Lien WhatsApp */}
              <div className="lg:col-span-7 space-y-5">
                <p className="text-lg sm:text-xl lg:text-2xl font-display font-bold uppercase tracking-wide text-white/95">
                  Votre voiture propre, sans bouger de chez vous
                </p>

                <p className="text-base md:text-lg opacity-85 leading-relaxed max-w-2xl">
                  Bichonne ta Caisse intervient à votre domicile ou sur votre lieu de travail à
                  Lille, Wambrechies, Lambersart, Marcq-en-Barœul et dans toute la métropole
                  lilloise. Nettoyage intérieur, lavage extérieur ou formule complète : un tarif
                  identique pour tous les véhicules.
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <Link to="/formules" className="btn btn-primary">
                    Découvrir les formules
                  </Link>
                  <Link to="/contact" className="btn btn-outline-light">
                    Réservation & Devis
                  </Link>
                </div>

                <div>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold opacity-90 hover:opacity-100 transition-opacity"
                  >
                    <MessageCircle className="size-4 text-whatsapp" /> Ou écrivez-nous directement
                    sur WhatsApp
                  </a>
                </div>
              </div>

              {/* Colonne droite (5 cols) : Encadré plusieurs voitures à la maison */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-white/15 bg-[#11114E] p-4 sm:p-5 shadow-md transition-all hover:border-primary/40">
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
        <p className="mt-4 text-xs sm:text-sm text-muted-foreground/90 max-w-2xl italic">
          * Soins complémentaires et suppléments éventuels annoncés avant confirmation du
          rendez-vous.
        </p>
      </section>

      <section className="bg-secondary" aria-labelledby="cares-heading">
        <div className="container-site py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">
            Prestations complémentaires
          </p>
          <h2 id="cares-heading" className="mt-2 text-4xl sm:text-5xl">
            Les petits plus pour votre voiture
          </h2>
          <p className="mt-2 mb-10 text-base text-muted-foreground max-w-2xl">
            Complétez votre formule avec les soins adaptés à votre véhicule.
          </p>
          <CareCards />
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/formules" hash="soins-cibles" className="btn btn-outline">
              Voir tous les détails
            </Link>
            <Link to="/contact" className="btn btn-primary">
              Réservation & Devis
            </Link>
          </div>
        </div>
      </section>

      <BeforeAfterSection />

      <section className="container-site py-16 md:py-20" aria-labelledby="zone-heading">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-xs">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <MapPin className="size-3.5" />
                Zone d'intervention locale
              </div>

              <div>
                <h2
                  id="zone-heading"
                  className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-wide text-foreground"
                >
                  Déplacement offert jusqu'à 15 km autour de Lille
                </h2>
                <p className="mt-2 text-base font-medium text-muted-foreground">
                  Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km,
                  aller-retour.
                </p>
              </div>

              <p className="text-sm text-muted-foreground/90 leading-relaxed">
                Lavage et nettoyage automobile à domicile directement chez vous, sur votre parking
                ou sur votre lieu de travail à{" "}
                <span className="font-semibold text-foreground">
                  Lille, Wambrechies, Lambersart, Marcq-en-Barœul, Bondues, La Madeleine, Tourcoing,
                  Roubaix
                </span>{" "}
                et communes voisines.
              </p>

              <p className="text-xs text-muted-foreground italic">
                * Distance calculée selon l'itinéraire routier depuis notre point de référence à
                Lille.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
              <div className="w-full max-w-sm rounded-xl border border-primary/20 bg-secondary/50 p-4 text-xs space-y-2">
                <p className="font-bold uppercase tracking-wider text-foreground text-[11px] flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-primary" />
                  Barème kilométrique transparent
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-muted-foreground">
                  <span>
                    • Jusqu'à 15 km : <strong className="text-foreground">Offert</strong>
                  </span>
                  <span>
                    • 20 km : <strong className="text-foreground">5 €</strong>
                  </span>
                  <span>
                    • 25 km : <strong className="text-foreground">10 €</strong>
                  </span>
                  <span>
                    • 30 km : <strong className="text-foreground">15 €</strong>
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground/80 pt-1 border-t border-border/50">
                  Seuls les kilomètres dépassant les 15 km offerts sont facturés.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 w-full max-w-sm">
                <a href={BUSINESS.phoneTel} className="btn btn-outline flex-1 justify-center">
                  <Phone className="size-4" />
                  {BUSINESS.phoneDisplay}
                </a>
                <Link to="/contact" className="btn btn-primary flex-1 justify-center">
                  Réservation & Devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
