import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, Receipt, MessageCircle, MapPin, Phone, Car, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-car.jpg";
import logoImg from "@/assets/logo-full.jpg";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { ContactBand } from "@/components/site/Layout";
import { BUSINESS, euro, whatsappLink } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bichonne ta Caisse — Nettoyage auto à domicile, métropole lilloise" },
      {
        name: "description",
        content:
          "Nettoyage intérieur, extérieur ou complet de votre voiture à domicile dans la métropole lilloise.",
      },
      { property: "og:title", content: "Bichonne ta Caisse — Nettoyage auto à domicile" },
      {
        property: "og:description",
        content: "Votre voiture propre, sans bouger de chez vous. Métropole lilloise.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
      <section className="relative overflow-hidden bg-night text-night-foreground">
        <div className="container-site grid items-center gap-10 pt-12 pb-12 sm:pt-16 sm:pb-16 md:pt-20 md:pb-20 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-rise">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
              Lavage automobile à domicile
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl">
              Votre voiture propre,
              <br />
              <span className="text-primary">sans bouger</span> de chez vous.
            </h1>
            <p className="mt-5 max-w-lg text-base md:text-lg opacity-80">
              Bichonne ta Caisse prend soin de votre véhicule directement à domicile, dans la
              métropole lilloise. Choisissez votre formule et contactez-nous pour organiser votre
              nettoyage.
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
            <img
              src={heroImg}
              alt="Capot de voiture propre et brillant devant une maison"
              width={1280}
              height={960}
              className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute -top-[96px] right-1 sm:-top-[120px] sm:-right-4 lg:-top-[136px] lg:-right-6 size-36 sm:size-48 lg:size-56 xl:size-60 rounded-full border-4 sm:border-6 lg:border-8 border-night shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden bg-night ring-4 ring-primary/90 z-20">
              <img
                src={logoImg}
                alt="Logo officiel Bichonne ta Caisse"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-site grid gap-6 py-12 md:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-night text-primary">
                <p.icon className="size-6" />
              </span>
              <div>
                <h2 className="text-2xl">{p.title}</h2>
                <p className="text-sm text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Nos formules</p>
            <h2 className="mt-2 text-5xl">Choisissez votre nettoyage</h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Même prix pour tous les véhicules. Pas de frais cachés.
          </p>
        </div>
        <FormulaCards />
      </section>

      <section className="bg-secondary">
        <div className="container-site py-16 md:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Soins ciblés</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Les finitions qui font la différence</h2>
          <p className="mt-2 mb-10 text-base text-muted-foreground max-w-2xl">
            Des soins ciblés pour aller plus loin dans le détail.
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
        <div className="flex items-center gap-4">
          <MapPin className="size-10 text-primary shrink-0" />
          <div>
            <h2 className="text-4xl">Secteur</h2>
            <p className="text-muted-foreground">
              Intervention dans la {BUSINESS.area.toLowerCase()}.
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
