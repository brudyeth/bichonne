import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Maximize2,
  X,
  Play,
  Pause,
} from "lucide-react";

export interface ComparisonView {
  id: string;
  label: string;
  title: string;
  description: string;
  beforeWebp: string;
  beforeJpg: string;
  afterWebp: string;
  afterJpg: string;
  altBefore: string;
  altAfter: string;
}

export interface Realization {
  id: number;
  number: string;
  title: string;
  vehicle: string;
  description: string;
  badge: string;
  views: ComparisonView[];
}

export const REALIZATIONS: Realization[] = [
  {
    id: 2,
    number: "01",
    title: "Peugeot 208 – Nettoyage intérieur",
    vehicle: "Peugeot 208",
    description:
      "Rénovation complète de l'habitacle : poste de conduite, tapis conducteur, banquette arrière et espace passager.",
    badge: "4 zones",
    views: [
      {
        id: "208-poste-conduite",
        label: "Poste de conduite",
        title: "Peugeot 208 • Poste de conduite",
        description:
          "Dépoussiérage et dégraissage minutieux du tableau de bord, du volant, de la console centrale et des aérateurs.",
        beforeWebp: "/assets/before-after/208-poste-conduite-avant.webp",
        beforeJpg: "/assets/before-after/208-poste-conduite-avant.jpg",
        afterWebp: "/assets/before-after/208-poste-conduite-apres.webp",
        afterJpg: "/assets/before-after/208-poste-conduite-apres.jpg",
        altBefore:
          "Poste de conduite Peugeot 208 avant nettoyage intérieur à domicile à Lille - Bichonne ta Caisse",
        altAfter:
          "Poste de conduite Peugeot 208 après nettoyage intérieur à domicile à Lille - Bichonne ta Caisse",
      },
      {
        id: "208-tapis-conducteur",
        label: "Tapis conducteur",
        title: "Peugeot 208 • Tapis conducteur",
        description:
          "Aspiration haute performance et brossage des fibres textiles pour extraire poussières, terre et gravillons incrustés.",
        beforeWebp: "/assets/before-after/208-tapis-conducteur-avant.webp",
        beforeJpg: "/assets/before-after/208-tapis-conducteur-avant.jpg",
        afterWebp: "/assets/before-after/208-tapis-conducteur-apres.webp",
        afterJpg: "/assets/before-after/208-tapis-conducteur-apres.jpg",
        altBefore:
          "Tapis conducteur Peugeot 208 avant brossage et aspiration textile - Bichonne ta Caisse",
        altAfter:
          "Tapis conducteur Peugeot 208 après brossage et aspiration textile - Bichonne ta Caisse",
      },
      {
        id: "208-banquette-arriere",
        label: "Banquette et sol arrière",
        title: "Peugeot 208 • Banquette et sol arrière",
        description:
          "Nettoyage soigné de la banquette arrière, aspiration complète du plancher, des moquettes et des zones sous sièges.",
        beforeWebp: "/assets/before-after/208-banquette-arriere-avant.webp",
        beforeJpg: "/assets/before-after/208-banquette-arriere-avant.jpg",
        afterWebp: "/assets/before-after/208-banquette-arriere-apres.webp",
        afterJpg: "/assets/before-after/208-banquette-arriere-apres.jpg",
        altBefore:
          "Banquette et sol arrière Peugeot 208 avant nettoyage intérieur complet - Bichonne ta Caisse",
        altAfter:
          "Banquette et sol arrière Peugeot 208 après nettoyage intérieur complet - Bichonne ta Caisse",
      },
      {
        id: "208-habitacle-passager",
        label: "Habitacle côté passager",
        title: "Peugeot 208 • Habitacle côté passager",
        description:
          "Dépoussiérage et protection des plastiques de la planche de bord passager, boîte à gants et aspiration du plancher.",
        beforeWebp: "/assets/before-after/208-habitacle-passager-avant.webp",
        beforeJpg: "/assets/before-after/208-habitacle-passager-avant.jpg",
        afterWebp: "/assets/before-after/208-habitacle-passager-apres.webp",
        afterJpg: "/assets/before-after/208-habitacle-passager-apres.jpg",
        altBefore:
          "Habitacle côté passager Peugeot 208 avant rénovation intérieure - Bichonne ta Caisse",
        altAfter:
          "Habitacle côté passager Peugeot 208 après rénovation intérieure - Bichonne ta Caisse",
      },
    ],
  },
  {
    id: 1,
    number: "02",
    title: "Renault Clio 5 – Nettoyage intérieur",
    vehicle: "Renault Clio 5",
    description:
      "Rénovation intérieure minutieuse de la moquette, du pédalier et des seuils de porte.",
    badge: "2 zones",
    views: [
      {
        id: "clio-pedalier",
        label: "Pédalier & Moquette",
        title: "Renault Clio 5 • Pédalier & Moquette conducteur",
        description:
          "Aspiration en profondeur des fibres textiles, élimination des poils d'animaux et dégraissage complet du pédalier.",
        beforeWebp: "/assets/before-after/pedalier-avant.webp",
        beforeJpg: "/assets/before-after/pedalier-avant.jpg",
        afterWebp: "/assets/before-after/pedalier-apres.webp",
        afterJpg: "/assets/before-after/pedalier-apres.jpg",
        altBefore:
          "Pédalier et moquette conducteur Renault Clio 5 avant nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
        altAfter:
          "Pédalier et moquette conducteur Renault Clio 5 après nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
      },
      {
        id: "clio-plancher",
        label: "Plancher arrière & Seuil",
        title: "Renault Clio 5 • Plancher arrière & Seuil de porte",
        description:
          "Aspiration minutieuse de la moquette arrière, décrassage et rénovation des plastiques et seuils de porte.",
        beforeWebp: "/assets/before-after/seuil-avant.webp",
        beforeJpg: "/assets/before-after/seuil-avant.jpg",
        afterWebp: "/assets/before-after/seuil-apres.webp",
        afterJpg: "/assets/before-after/seuil-apres.jpg",
        altBefore:
          "Plancher arrière et seuil de porte Renault Clio 5 avant nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
        altAfter:
          "Plancher arrière et seuil de porte Renault Clio 5 après nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
      },
    ],
  },
];

const DEFAULT_REALIZATION = REALIZATIONS[0];
const AUTOPLAY_INTERVAL_MS = 5000;

export function BeforeAfterSection() {
  const [currentRealizationIndex, setCurrentRealizationIndex] = useState(0);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const [autoplayStopped, setAutoplayStopped] = useState(false);
  const [zoomImage, setZoomImage] = useState<{
    srcWebp: string;
    srcJpg: string;
    alt: string;
    tag: "AVANT" | "APRÈS";
    title: string;
  } | null>(null);

  const touchStartX = useRef<number | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentRealization = REALIZATIONS[currentRealizationIndex] ?? DEFAULT_REALIZATION;
  const currentView = currentRealization.views[currentViewIndex] ?? currentRealization.views[0];

  // Arrêt définitif du défilement automatique dès la première interaction utilisateur
  const stopAutoplay = useCallback(() => {
    if (!autoplayStopped) {
      setAutoplayStopped(true);
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    }
  }, [autoplayStopped]);

  const handlePrev = useCallback(() => {
    stopAutoplay();
    if (currentViewIndex > 0) {
      setCurrentViewIndex((prev) => prev - 1);
    } else {
      setCurrentViewIndex(currentRealization.views.length - 1);
    }
  }, [currentViewIndex, currentRealization.views.length, stopAutoplay]);

  const handleNext = useCallback(() => {
    stopAutoplay();
    if (currentViewIndex < currentRealization.views.length - 1) {
      setCurrentViewIndex((prev) => prev + 1);
    } else {
      setCurrentViewIndex(0);
    }
  }, [currentViewIndex, currentRealization.views.length, stopAutoplay]);

  // Autoplay : 5 secondes, respecte prefers-reduced-motion, s'arrête définitivement à la première interaction
  useEffect(() => {
    if (autoplayStopped) return;

    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setAutoplayStopped(true);
        return;
      }
    }

    autoplayTimerRef.current = setInterval(() => {
      setCurrentViewIndex((prevIndex) => {
        const next = prevIndex + 1;
        return next >= currentRealization.views.length ? 0 : next;
      });
    }, AUTOPLAY_INTERVAL_MS);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplayStopped, currentRealization.views.length]);

  // Navigation tactile (Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const diff = touchStartX.current - touch.clientX;
    if (Math.abs(diff) > 40) {
      stopAutoplay();
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-24"
      aria-labelledby="before-after-heading"
    >
      {/* Reflets diffus nacrés/argentés très doux */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 -right-20 size-[540px] rounded-full bg-blue-100/40 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-20 size-[520px] rounded-full bg-indigo-100/35 blur-[125px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.035] mix-blend-multiply"
      />

      <div className="container-site relative z-10">
        {/* En-tête de section centré et percutant */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span>Avant / Après</span>
            <span className="w-6 h-[2px] bg-primary"></span>
          </div>
          <h2
            id="before-after-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-[#11114E] leading-[1.05]"
          >
            La transformation en images.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Constatez le résultat de nos rénovations en un coup d'œil. Des photographies réelles,
            nettes et sans retouche.
          </p>
        </div>

        {/* Sélecteur de véhicule (Segmented Control moderne) */}
        <div className="flex items-center justify-center mt-8 mb-7 sm:mb-9">
          <div
            role="tablist"
            aria-label="Véhicules réalisés"
            className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-none"
          >
            {REALIZATIONS.map((realization, index) => {
              const isSelected = currentRealizationIndex === index;
              return (
                <button
                  key={realization.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    stopAutoplay();
                    setCurrentRealizationIndex(index);
                    setCurrentViewIndex(0);
                  }}
                  className={`flex items-center gap-2.5 px-4 sm:px-6 py-2.5 rounded-xl font-display text-xs sm:text-sm uppercase tracking-wider font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "bg-[#11114E] text-white shadow-md ring-2 ring-primary/40"
                      : "text-slate-600 hover:text-[#11114E] hover:bg-slate-50"
                  }`}
                >
                  <span>{realization.vehicle}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {realization.views.length} zones
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vitrine immersive Avant / Après */}
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-7 shadow-2xl shadow-slate-200/60"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Barre supérieure : Titre de la zone traitée et navigation fluide */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-wide text-[#11114E] truncate">
                    {currentView.title}
                  </h3>
                  <span className="hidden sm:inline-flex text-[11px] font-bold text-primary font-mono bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200/60 shrink-0">
                    {currentViewIndex + 1} / {currentRealization.views.length}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2 sm:line-clamp-1">
                  {currentView.description}
                </p>
              </div>

              {/* Contrôles de navigation et indicateur autoplay */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                {!autoplayStopped ? (
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full cursor-pointer hover:bg-slate-200 transition-colors"
                    onClick={stopAutoplay}
                    title="Arrêter le défilement automatique"
                  >
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Défilement 5s</span>
                    <Pause className="size-3 text-slate-400 ml-0.5" />
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-slate-400 sm:hidden">
                    Zone {currentViewIndex + 1} / {currentRealization.views.length}
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Zone précédente"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-colors cursor-pointer text-slate-600 bg-white hover:bg-orange-50/50 shadow-xs"
                  >
                    <ChevronLeft className="size-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Zone suivante"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-colors cursor-pointer text-slate-600 bg-white hover:bg-orange-50/50 shadow-xs"
                  >
                    <ChevronRight className="size-4.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Grande comparaison des deux photos côte à côte (Proportions 3:4 natives parfaites) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 my-4 sm:my-6">
              {/* Photo AVANT */}
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm">
                <picture>
                  <source type="image/webp" srcSet={currentView.beforeWebp} />
                  <img
                    src={currentView.beforeJpg}
                    alt={currentView.altBefore}
                    loading={currentViewIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="size-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </picture>
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 pointer-events-none">
                  <span className="inline-flex items-center rounded-lg bg-[#11114E]/90 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md border border-white/20">
                    AVANT
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    stopAutoplay();
                    setZoomImage({
                      srcWebp: currentView.beforeWebp,
                      srcJpg: currentView.beforeJpg,
                      alt: currentView.altBefore,
                      tag: "AVANT",
                      title: currentView.title,
                    });
                  }}
                  aria-label="Agrandir la photo avant en pleine résolution"
                  className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 z-10 size-8 sm:size-9 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-black/80 transition-all cursor-pointer backdrop-blur-xs shadow-md"
                  title="Agrandir en haute résolution"
                >
                  <Maximize2 className="size-3.5 sm:size-4" />
                </button>
              </div>

              {/* Photo APRÈS */}
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-sm">
                <picture>
                  <source type="image/webp" srcSet={currentView.afterWebp} />
                  <img
                    src={currentView.afterJpg}
                    alt={currentView.altAfter}
                    loading={currentViewIndex === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="size-full object-cover select-none transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </picture>
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none">
                  <span className="inline-flex items-center rounded-lg bg-primary px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md">
                    APRÈS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    stopAutoplay();
                    setZoomImage({
                      srcWebp: currentView.afterWebp,
                      srcJpg: currentView.afterJpg,
                      alt: currentView.altAfter,
                      tag: "APRÈS",
                      title: currentView.title,
                    });
                  }}
                  aria-label="Agrandir la photo après en pleine résolution"
                  className="absolute bottom-2.5 left-2.5 sm:bottom-3.5 sm:left-3.5 z-10 size-8 sm:size-9 rounded-lg bg-black/60 text-white flex items-center justify-center opacity-80 hover:opacity-100 hover:bg-black/80 transition-all cursor-pointer backdrop-blur-xs shadow-md"
                  title="Agrandir en haute résolution"
                >
                  <Maximize2 className="size-3.5 sm:size-4" />
                </button>
              </div>
            </div>

            {/* Bandeau de miniatures interactives pour sélectionner directement une zone */}
            <div className="pt-3.5 sm:pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <Sparkles className="size-3.5 text-primary" />
                  <span>Zones nettoyées sur {currentRealization.vehicle}</span>
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Cliquez sur une zone pour l'afficher immédiatement
                </span>
              </div>

              <div
                role="tablist"
                aria-label="Miniatures des zones du véhicule"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
              >
                {currentRealization.views.map((view, vIdx) => {
                  const isCurrent = currentViewIndex === vIdx;
                  return (
                    <button
                      key={view.id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => {
                        stopAutoplay();
                        setCurrentViewIndex(vIdx);
                      }}
                      className={`group flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isCurrent
                          ? "border-primary bg-orange-50/70 shadow-sm ring-2 ring-primary/40"
                          : "border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-white"
                      }`}
                    >
                      <div className="relative size-12 sm:size-14 rounded-lg overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <img
                          src={view.afterJpg}
                          alt=""
                          className="size-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute bottom-0.5 right-0.5 text-[8px] sm:text-[9px] font-bold bg-[#F47721] text-white px-1 py-0.2 rounded-xs">
                          APRÈS
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs sm:text-sm font-bold leading-tight truncate ${
                            isCurrent ? "text-[#11114E]" : "text-slate-700 group-hover:text-primary"
                          }`}
                        >
                          {view.label}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-1.5">
                          <span>Zone 0{vIdx + 1}</span>
                          {isCurrent && <span className="size-1.5 rounded-full bg-primary" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA final : Réserver mon nettoyage */}
          <div className="mt-12 sm:mt-14 text-center max-w-xl mx-auto space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#11114E]">
              Votre véhicule mérite le même soin.
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Intervention directement chez vous ou sur votre lieu de travail dans toute la
              métropole lilloise.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/contact"
                className="btn btn-primary text-base px-8 py-3.5 shadow-lg shadow-orange-500/20 w-full sm:w-auto"
              >
                <span>Réserver mon nettoyage</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/formules"
                className="btn btn-ghost text-sm text-[#11114E] hover:text-primary px-5 py-3 w-full sm:w-auto"
              >
                <span>Découvrir nos formules dès 49 €</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Zoom plein écran haute résolution */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Agrandissement haute résolution de la photographie"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-[94vw] overflow-hidden rounded-2xl bg-[#11114E] border border-white/20 shadow-2xl p-2.5 sm:p-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                    zoomImage.tag === "AVANT"
                      ? "bg-slate-800 text-white border border-white/20"
                      : "bg-primary text-white"
                  }`}
                >
                  {zoomImage.tag}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                  {zoomImage.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                aria-label="Fermer la vue agrandie"
                className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <picture className="max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl">
              <source type="image/webp" srcSet={zoomImage.srcWebp} />
              <img
                src={zoomImage.srcJpg}
                alt={zoomImage.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl"
              />
            </picture>
          </div>
        </div>
      )}
    </section>
  );
}
