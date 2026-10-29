import { useState, useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Realization {
  id: number;
  title: string;
  description: string;
  beforeWebp: string;
  beforeJpg: string;
  afterWebp: string;
  afterJpg: string;
  altBefore: string;
  altAfter: string;
}

const REALIZATIONS: Realization[] = [
  {
    id: 1,
    title: "Pédalier & Moquette conducteur",
    description:
      "Aspiration en profondeur des fibres textiles, élimination des poils d'animaux et dégraissage du pédalier.",
    beforeWebp: "/assets/before-after/pedalier-avant.webp",
    beforeJpg: "/assets/before-after/pedalier-avant.jpg",
    afterWebp: "/assets/before-after/pedalier-apres.webp",
    afterJpg: "/assets/before-after/pedalier-apres.jpg",
    altBefore:
      "Pédalier et moquette conducteur avant nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
    altAfter:
      "Pédalier et moquette conducteur après nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
  },
  {
    id: 2,
    title: "Plancher arrière & Seuil de porte",
    description:
      "Aspiration minutieuse de la moquette arrière, décrassage et rénovation des plastiques et seuils de porte.",
    beforeWebp: "/assets/before-after/seuil-avant.webp",
    beforeJpg: "/assets/before-after/seuil-avant.jpg",
    afterWebp: "/assets/before-after/seuil-apres.webp",
    afterJpg: "/assets/before-after/seuil-apres.jpg",
    altBefore:
      "Plancher arrière et seuil de porte avant nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
    altAfter:
      "Plancher arrière et seuil de porte après nettoyage automobile à domicile à Lille - Bichonne ta Caisse",
  },
];

export function BeforeAfterSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const current = REALIZATIONS[currentIndex];

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? REALIZATIONS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === REALIZATIONS.length - 1 ? 0 : prev + 1));
  }, []);

  // Simple swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-night text-night-foreground py-16 md:py-20 border-t border-night-foreground/10"
      aria-labelledby="before-after-heading"
    >
      <div className="container-site max-w-5xl">
        {/* En-tête sobre et épuré */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-primary mb-2">
            Avant / Après
          </p>
          <h2
            id="before-after-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wide text-white"
          >
            Le résultat parle de lui-même.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Découvrez la différence avant et après notre passage.
          </p>
        </div>

        {/* Bloc réalisation avec comparaison côte à côte */}
        <div
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:p-5 md:p-6 shadow-xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Titre & Description de la réalisation en cours */}
          <div className="text-center mb-4 sm:mb-5">
            <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
              {current.title}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Comparaison côte à côte (2 colonnes préservées sur mobile et desktop) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
            {/* Photo AVANT (à gauche) */}
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-md">
              <picture>
                <source type="image/webp" srcSet={current.beforeWebp} />
                <img
                  src={current.beforeJpg}
                  alt={current.altBefore}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </picture>
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                <span className="inline-flex items-center rounded-md bg-black/80 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-xs border border-white/20">
                  AVANT
                </span>
              </div>
            </div>

            {/* Photo APRÈS (à droite) */}
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/15 bg-black shadow-md">
              <picture>
                <source type="image/webp" srcSet={current.afterWebp} />
                <img
                  src={current.afterJpg}
                  alt={current.altAfter}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </picture>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                <span className="inline-flex items-center rounded-md bg-[#F47721] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xs font-display">
                  APRÈS
                </span>
              </div>
            </div>
          </div>

          {/* Navigation du carrousel : Flèches discrètes & Indicateurs sous les photos */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Réalisation précédente"
              className="grid size-8 sm:size-9 place-items-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors border border-white/10 active:scale-95"
            >
              <ChevronLeft className="size-4 sm:size-5" />
            </button>

            {/* Petits indicateurs discrets */}
            <div className="flex items-center gap-2">
              {REALIZATIONS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    currentIndex === i ? "w-6 bg-primary" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Afficher la réalisation ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Réalisation suivante"
              className="grid size-8 sm:size-9 place-items-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors border border-white/10 active:scale-95"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Bouton de conversion sous les réalisations */}
        <div className="mt-8 sm:mt-10 text-center space-y-2.5">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F47721] hover:bg-[#F47721]/90 text-white font-display text-base sm:text-lg font-bold uppercase tracking-wide px-7 py-3 shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Réserver mon nettoyage</span>
            <ArrowRight className="size-4.5" />
          </Link>
          <p className="text-xs text-white/60">
            Devis gratuit et sans engagement · Intervention à domicile dans toute la métropole
            lilloise
          </p>
        </div>
      </div>
    </section>
  );
}
