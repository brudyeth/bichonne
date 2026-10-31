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
      className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-24"
      aria-labelledby="before-after-heading"
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
      {/* Texture tactile subtile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-multiply"
      />

      <div className="container-site max-w-5xl relative z-10">
        {/* En-tête sobre et épuré */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
            Avant / Après
          </div>
          <h2
            id="before-after-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wide text-[#11114E]"
          >
            Le résultat parle de lui-même.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Découvrez la différence avant et après notre passage.
          </p>
        </div>

        {/* Bloc réalisation avec comparaison côte à côte */}
        <div
          className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xs"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Titre & Description de la réalisation en cours */}
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#11114E]">
              {current.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Comparaison côte à côte (2 colonnes préservées sur mobile et desktop) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-6">
            {/* Photo AVANT (à gauche) */}
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-md">
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
            <div className="group relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-md">
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
              className="grid size-9 sm:size-10 place-items-center rounded-xl bg-slate-100 text-[#11114E] hover:bg-slate-200 transition-colors border border-slate-200/80 active:scale-95 shadow-xs"
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
                  className={`h-2.5 rounded-full transition-all ${
                    currentIndex === i ? "w-7 bg-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Afficher la réalisation ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Réalisation suivante"
              className="grid size-9 sm:size-10 place-items-center rounded-xl bg-slate-100 text-[#11114E] hover:bg-slate-200 transition-colors border border-slate-200/80 active:scale-95 shadow-xs"
            >
              <ChevronRight className="size-4 sm:size-5" />
            </button>
          </div>
        </div>

        {/* Bouton de conversion sous les réalisations */}
        <div className="mt-8 sm:mt-10 text-center space-y-2.5">
          <Link
            to="/contact"
            className="btn btn-primary text-base sm:text-lg font-bold px-7 py-3.5"
          >
            <span>Réserver mon nettoyage</span>
            <ArrowRight className="size-4.5" />
          </Link>
          <p className="text-xs text-slate-500">
            Devis gratuit et sans engagement · Intervention à domicile dans toute la métropole
            lilloise
          </p>
        </div>
      </div>
    </section>
  );
}
