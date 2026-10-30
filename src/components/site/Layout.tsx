import { Link } from "@tanstack/react-router";
import { useState, useEffect, type ReactNode } from "react";
import { Menu, Phone, X, MessageCircle, Facebook } from "lucide-react";
import { Logo } from "./Logo";
import { BUSINESS, whatsappLink } from "@/lib/business";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/formules", label: "Formules & tarifs" },
  { to: "/contact", label: "Réservation & Devis" },
] as const;

export function Facebook3DIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`${className} shrink-0`} aria-hidden="true">
      <defs>
        <linearGradient id="fb3d-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#186be0" />
          <stop offset="50%" stopColor="#0d52b9" />
          <stop offset="100%" stopColor="#083e91" />
        </linearGradient>
      </defs>
      {/* 3D bottom bevel shadow */}
      <rect x="1" y="2.5" width="26" height="24.5" rx="6.5" fill="#062e6e" />
      {/* 3D front face with rich darker blue gradient */}
      <rect x="1" y="1" width="26" height="24.5" rx="6.5" fill="url(#fb3d-grad)" />
      {/* Top light reflection bevel */}
      <path
        d="M7.5 1.75h13a5.75 5.75 0 0 1 5.75 5.75v0.5a5.75 5.75 0 0 0-5.75-5.25h-13a5.75 5.75 0 0 0-5.75 5.25V7.5A5.75 5.75 0 0 1 7.5 1.75z"
        fill="#ffffff"
        opacity="0.3"
      />
      {/* White Facebook "f" */}
      <path
        d="M17.5 25.5v-9.5h3.2l.5-3.8h-3.7V9.8c0-1.1.3-1.8 1.8-1.8h2V4.6c-.7-.1-1.9-.2-3.3-.2-3.3 0-5.4 2-5.4 5.5v2.3H9.5v3.8h3.1v9.5h4.9z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function Instagram3DIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={`${className} shrink-0`} aria-hidden="true">
      <defs>
        <linearGradient id="insta3d-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fa7e1e" />
          <stop offset="35%" stopColor="#d62976" />
          <stop offset="70%" stopColor="#962fbf" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      {/* 3D bottom bevel shadow */}
      <rect x="1" y="2.5" width="26" height="24.5" rx="6.5" fill="#3b1c61" />
      {/* 3D front face with rich Instagram gradient */}
      <rect x="1" y="1" width="26" height="24.5" rx="6.5" fill="url(#insta3d-grad)" />
      {/* Top light reflection bevel */}
      <path
        d="M7.5 1.75h13a5.75 5.75 0 0 1 5.75 5.75v0.5a5.75 5.75 0 0 0-5.75-5.25h-13a5.75 5.75 0 0 0-5.75 5.25V7.5A5.75 5.75 0 0 1 7.5 1.75z"
        fill="#ffffff"
        opacity="0.3"
      />
      {/* Camera symbol */}
      <rect
        x="6.8"
        y="6.8"
        width="14.4"
        height="14.4"
        rx="4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
      />
      <circle cx="14" cy="14" r="3.6" fill="none" stroke="#ffffff" strokeWidth="1.8" />
      <circle cx="18.2" cy="9.8" r="1.1" fill="#ffffff" />
    </svg>
  );
}

export function HeaderReservationButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to="/contact"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider text-white select-none rounded-xl px-5 py-2.5 sm:px-6 sm:py-2.5 text-sm sm:text-[15px]
        /* Base orange officiel avec dégradé subtil */
        bg-gradient-to-b from-[#ff8533] via-[#F47721] to-[#df640f]
        /* Bords physiques : reflet blanc fin en haut, lèvre 2px chaude en bas */
        border-t border-white/35 border-b-2 border-[#b54300] border-x border-[#d95908]
        /* Ombre douce avec halo chaud sous le bouton */
        shadow-[0_4px_14px_rgba(244,119,33,0.38),0_2px_4px_rgba(17,17,78,0.22),inset_0_1px_0_rgba(255,255,255,0.45)]
        /* Transitions micro-interactions douces */
        transition-all duration-200 ease-out
        /* Survol : remonte de 2px max et renforce légèrement son ombre */
        hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_6px_20px_rgba(244,119,33,0.52),0_3px_6px_rgba(17,17,78,0.26),inset_0_1px_0_rgba(255,255,255,0.55)]
        /* Clic : effet d'enfoncement tactile naturel */
        active:translate-y-0.5 active:shadow-[0_1px_4px_rgba(244,119,33,0.3),inset_0_2px_4px_rgba(0,0,0,0.25)] active:border-b active:brightness-95
        /* Focus clavier visible */
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#11114E]
        shrink-0 ${className}`}
    >
      {/* Léger reflet lumineux diffus sur la partie supérieure */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-0 h-[45%] rounded-t-[10px] bg-gradient-to-b from-white/25 to-transparent opacity-85"
      />
      <span className="relative z-10 drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.35)] flex items-center gap-1.5">
        Réserver mon nettoyage
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ease-out ${
        scrolled
          ? "bg-[#11114E]/92 backdrop-blur-md shadow-[0_8px_30px_rgba(17,17,78,0.28)] border-b border-white/[0.06]"
          : "bg-[#11114E]/40 backdrop-blur-md border-b border-transparent shadow-none"
      }`}
    >
      {/* Halos lumineux d'ambiance intégrés au décor pour une continuité parfaite avec le fond */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 right-[10%] size-64 rounded-full bg-[#3448D8]/22 blur-2xl transition-opacity duration-300" />
        <div className="absolute -top-10 left-[5%] size-60 rounded-full bg-[#4440A0]/24 blur-2xl transition-opacity duration-300" />
        <div className="absolute -top-8 left-[35%] size-40 rounded-full bg-[#F47721]/[0.08] blur-2xl transition-opacity duration-300" />
      </div>

      <div className="container-site relative z-10 flex h-16 sm:h-[68px] items-center justify-between gap-3 sm:gap-4 py-2.5 sm:py-3">
        <Link to="/" aria-label="Accueil Bichonne ta Caisse" className="shrink-0 flex items-center">
          <Logo light />
        </Link>
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold shrink-0">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-white/85 hover:text-white transition-colors whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
              activeProps={{ className: "!text-primary !opacity-100 font-bold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
          <div className="flex items-center gap-2 xl:gap-2.5">
            <a
              href={BUSINESS.phoneTel}
              className="flex items-center gap-1.5 xl:gap-2 font-bold whitespace-nowrap text-sm xl:text-base text-white/95 hover:text-white transition-colors"
            >
              <Phone className="size-4 text-primary shrink-0" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Facebook"
              title="Retrouvez-nous sur Facebook"
              className="inline-flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Facebook3DIcon className="size-6 sm:size-7" />
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Instagram"
              title="Retrouvez-nous sur Instagram"
              className="inline-flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Instagram3DIcon className="size-6 sm:size-7" />
            </a>
          </div>
          {/* Bouton en relief 3D cliquable */}
          <HeaderReservationButton />
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={BUSINESS.phoneTel}
            aria-label={`Appeler le ${BUSINESS.phoneDisplay}`}
            className="grid size-10 sm:size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-xs active:scale-95 transition-transform"
          >
            <Phone className="size-4.5 sm:size-5" />
          </a>
          <a
            href={BUSINESS.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Retrouvez-nous sur Facebook"
            title="Retrouvez-nous sur Facebook"
            className="grid size-10 sm:size-11 place-items-center rounded-full border border-white/20 hover:scale-105 active:scale-95 transition-transform backdrop-blur-xs"
          >
            <Facebook3DIcon className="size-5.5 sm:size-6" />
          </a>
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Retrouvez-nous sur Instagram"
            title="Retrouvez-nous sur Instagram"
            className="grid size-10 sm:size-11 place-items-center rounded-full border border-white/20 hover:scale-105 active:scale-95 transition-transform backdrop-blur-xs"
          >
            <Instagram3DIcon className="size-5.5 sm:size-6" />
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-10 sm:size-11 place-items-center rounded-full border border-white/25 hover:border-white/40 active:scale-95 transition-colors backdrop-blur-xs"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-white/10 bg-[#11114E]/95 backdrop-blur-xl container-site py-4 flex flex-col gap-1 shadow-2xl">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="py-3 font-display text-2xl uppercase tracking-wide text-white/95 hover:text-white"
              activeProps={{ className: "!text-primary font-bold" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 py-3 border-t border-white/10 mt-1">
            <a href={BUSINESS.phoneTel} className="font-bold flex items-center gap-2 text-white">
              <Phone className="size-4 text-primary" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Facebook"
              title="Retrouvez-nous sur Facebook"
              className="inline-flex items-center justify-center hover:scale-105 active:scale-95 transition-transform ml-auto"
            >
              <Facebook3DIcon className="size-6" />
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Instagram"
              title="Retrouvez-nous sur Instagram"
              className="inline-flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              <Instagram3DIcon className="size-6" />
            </a>
          </div>
          <HeaderReservationButton
            onClick={() => setOpen(false)}
            className="mt-2 w-full py-3 text-base"
          />
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#11114E] text-white">
      {/* Halos lumineux localisés très diffus en superposition sur le fond bleu nuit officiel #11114E */}
      {/* 1. Grand halo bleu indigo diffus #4440A0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 size-[420px] rounded-full bg-[#4440A0]/28 blur-[140px]"
      />
      {/* 2. Halo bleu électrique vibrant #3448D8 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[5%] size-[380px] rounded-full bg-[#3448D8]/26 blur-[130px]"
      />
      {/* 3. Halo violet bleuté #5140A0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[25%] size-[300px] rounded-full bg-[#5140A0]/22 blur-[125px]"
      />
      {/* 4. Touche subtile d'orange #F47721 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[20%] size-[240px] rounded-full bg-[#F47721]/[0.08] blur-[95px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-10 mix-blend-overlay"
      />

      <div className="relative z-10">
        <div className="h-2 stripe-accent opacity-80" />
        <div className="container-site grid gap-10 py-14 md:grid-cols-3">
          <div className="space-y-3">
            <Logo light />
            <p className="text-sm opacity-75 max-w-xs">
              Nettoyage automobile à domicile. Intervention dans la métropole lilloise.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-display text-lg uppercase text-primary">Prestations</p>
            <Link to="/formules" className="block opacity-80 hover:opacity-100">
              Formules & tarifs
            </Link>
            <Link to="/contact" className="block opacity-80 hover:opacity-100">
              Réservation & Devis
            </Link>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-display text-lg uppercase text-primary">Contact</p>
            <a href={BUSINESS.phoneTel} className="block text-lg font-bold">
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block opacity-80 hover:opacity-100"
            >
              WhatsApp
            </a>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Facebook (ouvre un nouvel onglet)"
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Facebook3DIcon className="size-4.5" />
              <span>Suivez-nous sur Facebook</span>
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Instagram (ouvre un nouvel onglet)"
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
            >
              <Instagram3DIcon className="size-4.5" />
              <span>Suivez-nous sur Instagram</span>
            </a>
            <p className="opacity-80">{BUSINESS.area}</p>
          </div>
        </div>
        <div className="border-t border-night-foreground/10">
          <div className="container-site flex flex-wrap gap-x-6 gap-y-2 py-5 text-xs opacity-70">
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} {BUSINESS.name}
            </span>
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/confidentialite">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full btn-whatsapp shadow-lg"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  transparent = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  transparent?: boolean;
}) {
  if (transparent) {
    return (
      <section className="relative z-10 text-white">
        <div className="container-site pt-28 pb-14 md:pt-36 md:pb-16 animate-rise relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
          {children && <div className="mt-4 max-w-2xl opacity-80">{children}</div>}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#11114E] text-white">
      {/* Halos lumineux localisés très diffus en superposition sur le fond bleu nuit d'origine #11114E */}
      {/* 1. Grand halo bleu électrique #3448D8 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-[460px] sm:size-[540px] rounded-full bg-[#3448D8]/35 blur-[150px] sm:blur-[170px]"
      />
      {/* 2. Grand halo indigo profond #4440A0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 size-[440px] sm:size-[500px] rounded-full bg-[#4440A0]/35 blur-[145px] sm:blur-[160px]"
      />
      {/* 3. Halo violet bleuté #5140A0 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[30%] size-[360px] rounded-full bg-[#5140A0]/28 blur-[135px]"
      />
      {/* 4. Touche orange #F47721 discrète */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-[15%] size-[260px] sm:size-[320px] rounded-full bg-[#F47721]/[0.11] blur-[110px]"
      />

      {/* Texture de grain ultra-fine pour casser l'effet aplat sans blanchir le fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
      />

      <div className="container-site pt-28 pb-14 md:pt-36 md:pb-20 animate-rise relative z-10">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-5xl md:text-6xl">{title}</h1>
        {children && <div className="mt-4 max-w-2xl opacity-80">{children}</div>}
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="bg-primary">
      <div className="container-site flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-4xl md:text-5xl text-night">On s'occupe de votre caisse ?</h2>
          <p className="mt-2 font-medium text-night/80">
            Contactez-nous pour organiser votre nettoyage à domicile.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={BUSINESS.phoneTel} className="btn bg-night text-night-foreground">
            <Phone className="size-4" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
