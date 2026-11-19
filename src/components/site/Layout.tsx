import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  Menu,
  Phone,
  X,
  MessageCircle,
  Facebook,
  ChevronDown,
  Car,
  Building2,
  ArrowRight,
  Sofa,
} from "lucide-react";
import { Logo } from "./Logo";
import { BUSINESS, whatsappLink } from "@/lib/business";

export const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/formules", label: "Nettoyage automobile" },
  { to: "/canapes-textiles", label: "Canapés & textiles" },
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

export interface BookingOption {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Car;
  to: string;
  hash?: string;
}

export const BOOKING_OPTIONS: BookingOption[] = [
  {
    id: "particulier",
    title: "Particulier",
    subtitle: "Réserver un nettoyage",
    icon: Car,
    to: "/contact",
  },
  {
    id: "professionnel",
    title: "Professionnel",
    subtitle: "Demander un devis",
    icon: Building2,
    to: "/entreprises",
    hash: "devis",
  },
];

export function HeaderBookingDropdown({
  className = "",
  isActive,
  onSelect,
}: {
  className?: string;
  isActive?: boolean;
  onSelect?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const rawPath = location.pathname;
  const currentPath = rawPath.length > 1 && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;
  const active =
    isActive !== undefined
      ? isActive
      : currentPath === "/contact" ||
        currentPath.startsWith("/contact/") ||
        currentPath === "/entreprises" ||
        currentPath.startsWith("/entreprises/");

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const toggleDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen((prev) => !prev);
  };

  // Fermeture lors d'un clic en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gestion du clavier (Échap pour fermer et redonner le focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="booking-dropdown-menu"
        aria-label="Menu Réservation & Devis"
        aria-current={active ? "page" : undefined}
        className={`inline-flex items-center gap-1.5 whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-[7px] text-[14px] xl:text-[15px] transition-colors duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]/50 motion-reduce:transition-none ${
          active
            ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
            : "bg-transparent text-white font-medium hover:text-white/80"
        }`}
      >
        <span>Réservation &amp; Devis</span>
        <ChevronDown
          className={`size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
            active ? "text-[#F47721]" : "text-white/80"
          } ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {/* Menu déroulant élégant avec pont invisible pour le survol continu */}
      {isOpen && (
        <div
          id="booking-dropdown-menu"
          role="menu"
          aria-label="Options de réservation et devis"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 rounded-2xl bg-white text-[#11114E] border border-slate-200/90 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 motion-reduce:animate-none before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 focus:outline-none"
        >
          <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Votre besoin
            </span>
            <span className="text-[10px] font-semibold text-primary">Intervention à domicile</span>
          </div>

          <div className="space-y-1">
            {BOOKING_OPTIONS.map((opt) => (
              <Link
                key={opt.id}
                to={opt.to}
                hash={opt.hash}
                role="menuitem"
                onClick={() => {
                  setIsOpen(false);
                  onSelect?.();
                }}
                className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 focus:bg-orange-50/70 focus:outline-none transition-all cursor-pointer"
              >
                <div className="grid size-10 place-items-center rounded-xl bg-orange-100/80 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 shadow-2xs">
                  <opt.icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="font-display text-sm font-bold uppercase tracking-wide text-[#11114E] group-hover:text-primary transition-colors">
                    {opt.title}
                  </p>
                  <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
                    {opt.subtitle}
                  </p>
                </div>
                <ArrowRight className="size-4 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HeaderReservationButton({
  className = "",
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return <HeaderBookingDropdown className={className} onSelect={onClick} />;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const normalizedPath =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const isAccueilActive = normalizedPath === "/";
  const isAutoActive =
    normalizedPath === "/formules" ||
    normalizedPath.startsWith("/formules/") ||
    normalizedPath === "/soins-cibles" ||
    normalizedPath.startsWith("/services/");
  const isTextilesActive =
    normalizedPath === "/canapes-textiles" || normalizedPath.startsWith("/canapes-textiles/");
  const isBookingActive =
    normalizedPath === "/contact" ||
    normalizedPath.startsWith("/contact/") ||
    normalizedPath === "/entreprises" ||
    normalizedPath.startsWith("/entreprises/");

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
      className={`sticky top-0 z-50 text-white transition-colors duration-300 ease-out ${
        scrolled ? "bg-[#11114E]/95 backdrop-blur-md" : "bg-[#11114E]/35 backdrop-blur-md"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex h-16 sm:h-[68px] items-center justify-between gap-3 xl:gap-6 2xl:gap-10 pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-9 md:pr-9 lg:pl-6 lg:pr-6 xl:pl-[70px] xl:pr-[70px]">
        {/* Zone gauche : identité de marque */}
        <Link
          to="/"
          aria-label="Accueil Bichonne ta Caisse"
          className="shrink-0 flex items-center py-1 transition-opacity duration-200 hover:opacity-90"
        >
          <Logo light variant="wordmark" />
        </Link>

        {/* Zone centrale : navigation principale */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-4 2xl:gap-6 min-w-0"
        >
          <Link
            to="/"
            aria-current={isAccueilActive ? "page" : undefined}
            className={`inline-flex items-center whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-[7px] text-[14px] xl:text-[15px] transition-colors duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]/50 motion-reduce:transition-none ${
              isAccueilActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <span>Accueil</span>
          </Link>

          <Link
            to="/formules"
            aria-current={isAutoActive ? "page" : undefined}
            className={`inline-flex items-center whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-[7px] text-[14px] xl:text-[15px] transition-colors duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]/50 motion-reduce:transition-none ${
              isAutoActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <span>Nettoyage automobile</span>
          </Link>

          <Link
            to="/canapes-textiles"
            aria-current={isTextilesActive ? "page" : undefined}
            className={`inline-flex items-center whitespace-nowrap px-2 xl:px-3 py-1.5 rounded-[7px] text-[14px] xl:text-[15px] transition-colors duration-200 ease-out cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47721]/50 motion-reduce:transition-none ${
              isTextilesActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <span>Canapés &amp; textiles</span>
          </Link>

          <HeaderBookingDropdown isActive={isBookingActive} />
        </nav>

        {/* Zone droite : téléphone et réseaux sociaux */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 shrink-0">
          <a
            href={BUSINESS.phoneTel}
            className="inline-flex items-center gap-2 font-semibold whitespace-nowrap text-[14px] xl:text-[15px] text-white/90 hover:text-white transition-colors duration-200"
          >
            <Phone className="size-4 text-[#F47721] shrink-0" />
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
          <div className="flex items-center gap-2.5">
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Facebook"
              title="Retrouvez-nous sur Facebook"
              className="inline-flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-200"
            >
              <Facebook3DIcon className="size-6" />
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Retrouvez-nous sur Instagram"
              title="Retrouvez-nous sur Instagram"
              className="inline-flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-200"
            >
              <Instagram3DIcon className="size-6" />
            </a>
          </div>
        </div>

        {/* Bouton de menu mobile à droite */}
        <div className="flex lg:hidden items-center shrink-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile déroulant */}
      {open && (
        <nav
          aria-label="Menu de navigation mobile"
          className="lg:hidden border-t border-white/10 bg-[#11114E]/98 backdrop-blur-xl container-site py-4 flex flex-col gap-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 motion-reduce:animate-none"
        >
          <Link
            to="/"
            aria-current={isAccueilActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center px-3.5 py-2.5 rounded-[7px] font-display text-xl uppercase tracking-wide transition-colors duration-200 ease-out ${
              isAccueilActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <span>Accueil</span>
          </Link>

          <Link
            to="/formules"
            aria-current={isAutoActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-[7px] font-display text-xl uppercase tracking-wide transition-colors duration-200 ease-out ${
              isAutoActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <Car className="size-5 text-[#F47721] shrink-0" />
            <span>Nettoyage automobile</span>
          </Link>

          <Link
            to="/canapes-textiles"
            aria-current={isTextilesActive ? "page" : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-[7px] font-display text-xl uppercase tracking-wide transition-colors duration-200 ease-out ${
              isTextilesActive
                ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                : "bg-transparent text-white font-medium hover:text-white/80"
            }`}
          >
            <Sofa className="size-5 text-[#F47721] shrink-0" />
            <span>Canapés &amp; textiles</span>
          </Link>

          {/* Section Réservation & Devis mobile */}
          <div className="pt-2 border-t border-white/10 mt-1 space-y-2">
            <div className="flex items-center px-1">
              <p
                className={`text-xs uppercase tracking-wider px-2.5 py-1 rounded-[7px] transition-colors duration-200 ease-out ${
                  isBookingActive
                    ? "bg-[#F47721]/[0.12] text-[#F47721] font-semibold"
                    : "bg-transparent text-white font-medium"
                }`}
              >
                Réservation &amp; Devis
              </p>
            </div>
            <div className="grid gap-2">
              {BOOKING_OPTIONS.map((opt) => (
                <Link
                  key={opt.id}
                  to={opt.to}
                  hash={opt.hash}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] active:bg-white/[0.2] border border-white/15 text-white transition-all active:scale-[0.99]"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-primary text-white shrink-0 shadow-xs">
                    <opt.icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-base font-bold uppercase tracking-wide text-white">
                      {opt.title}
                    </p>
                    <p className="text-xs text-white/75">{opt.subtitle}</p>
                  </div>
                  <ArrowRight className="size-4 text-primary shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-white/10 mt-1">
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
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#11114E] text-white">
      {/* Halos lumineux subtils et maîtrisés en superposition sur le fond bleu nuit officiel #11114E (-30% d'intensité, teintes bleu profond & indigo sombre) */}
      {/* 1. Halo indigo sombre #282A74 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 size-[420px] rounded-full bg-[#282A74]/18 blur-[140px]"
      />
      {/* 2. Halo bleu profond #243888 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[5%] size-[380px] rounded-full bg-[#243888]/18 blur-[130px]"
      />
      {/* 3. Halo indigo nocturne #2C3275 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[25%] size-[300px] rounded-full bg-[#2C3275]/15 blur-[125px]"
      />
      {/* 4. Touche subtile d'orange #F47721 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[20%] size-[240px] rounded-full bg-[#F47721]/[0.05] blur-[95px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-10 mix-blend-overlay"
      />

      <div className="relative z-10">
        <div className="h-2 stripe-accent opacity-80" />
        <div className="container-site grid gap-10 py-14 md:grid-cols-3">
          <div className="space-y-3">
            <Logo light variant="horizontal" />
            <p className="text-sm opacity-80 max-w-xs leading-relaxed">
              Nettoyage automobile professionnel à domicile (et nettoyage de canapés, matelas et
              textiles). Intervention à Lille, Wambrechies, Marcq-en-Barœul, Lambersart, Bondues, La
              Madeleine, Roubaix, Tourcoing et toute la métropole lilloise (déplacement offert
              jusqu'à 20 km).
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-display text-lg uppercase text-primary">Prestations</p>
            <Link to="/formules" className="block opacity-80 hover:opacity-100">
              Nettoyage automobile
            </Link>
            <Link to="/canapes-textiles" className="block opacity-80 hover:opacity-100">
              Canapés &amp; textiles
            </Link>
            <Link to="/resultats" className="block opacity-80 hover:opacity-100">
              Résultats avant / après
            </Link>
            <Link to="/contact" className="block opacity-80 hover:opacity-100">
              Réservation &amp; Devis
            </Link>
            <Link to="/entreprises" className="block opacity-80 hover:opacity-100">
              Entreprises &amp; Flottes
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
            <p className="opacity-80 pt-1 text-xs">
              Zone desservie : Lille et métropole lilloise (rayon 20 km offert)
            </p>
          </div>
        </div>
        <div className="border-t border-night-foreground/10">
          <div className="container-site flex flex-wrap gap-x-6 gap-y-2 py-5 text-xs opacity-70">
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} {BUSINESS.name}
            </span>
            <Link to="/cgv" className="hover:underline">
              Conditions Générales de Vente (CGV)
            </Link>
            <Link to="/mentions-legales" className="hover:underline">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="hover:underline">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileStickyBar() {
  return (
    <aside
      aria-label="Actions rapides mobiles"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#11114E]/95 backdrop-blur-lg border-t border-white/15 px-3 py-2.5 shadow-2xl safe-area-pb"
    >
      <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
        <a
          href={BUSINESS.phoneTel}
          className="btn border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
        >
          <Phone className="size-4 text-primary" />
          <span>Appeler</span>
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp text-white font-bold text-xs uppercase tracking-wider py-2.5 flex items-center justify-center gap-2"
        >
          <MessageCircle className="size-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="hidden lg:grid fixed bottom-5 right-5 z-50 size-14 place-items-center rounded-full btn-whatsapp shadow-lg"
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
        <div className="container-site pt-22 pb-8 sm:pt-24 sm:pb-10 md:pt-26 md:pb-12 animate-rise relative z-10">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2.5">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span>{eyebrow}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-[1.04]">
            {title}
          </h1>
          {children && (
            <div className="mt-3.5 max-w-2xl opacity-85 leading-relaxed text-sm sm:text-base">
              {children}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#11114E] text-white">
      {/* Halos lumineux subtils et maîtrisés en superposition sur le fond bleu nuit d'origine #11114E (-30% d'intensité) */}
      {/* 1. Halo bleu profond #243888 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-[460px] sm:size-[540px] rounded-full bg-[#243888]/22 blur-[150px] sm:blur-[170px]"
      />
      {/* 2. Halo indigo sombre #282A74 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 size-[440px] sm:size-[500px] rounded-full bg-[#282A74]/22 blur-[145px] sm:blur-[160px]"
      />
      {/* 3. Halo indigo nocturne #2C3275 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[30%] size-[360px] rounded-full bg-[#2C3275]/18 blur-[135px]"
      />
      {/* 4. Touche orange #F47721 discrète */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 right-[15%] size-[260px] sm:size-[320px] rounded-full bg-[#F47721]/[0.06] blur-[110px]"
      />

      {/* Texture de grain ultra-fine pour casser l'effet aplat sans blanchir le fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
      />

      <div className="container-site pt-22 pb-8 sm:pt-24 sm:pb-10 md:pt-26 md:pb-12 animate-rise relative z-10">
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2.5">
          <span className="w-6 h-[2px] bg-primary"></span>
          <span>{eyebrow}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-[1.04]">
          {title}
        </h1>
        {children && (
          <div className="mt-3.5 max-w-2xl opacity-85 leading-relaxed text-sm sm:text-base">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="bg-primary">
      <div className="container-site flex flex-col gap-6 py-10 md:py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#11114E]">
            On s'occupe de votre caisse ?
          </h2>
          <p className="mt-1.5 text-sm sm:text-base font-medium text-[#11114E]/85">
            Contactez-nous pour organiser votre nettoyage à domicile.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={BUSINESS.phoneTel}
            className="btn bg-[#11114E] text-white hover:bg-[#11114E]/90 text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 shadow-md"
          >
            <Phone className="size-4" />
            <span>{BUSINESS.phoneDisplay}</span>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-xs sm:text-sm font-bold uppercase tracking-wider px-5 py-3 shadow-md"
          >
            <MessageCircle className="size-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
