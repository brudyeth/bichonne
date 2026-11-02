import { useState, useCallback, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface Realization {
  id: number;
  number: string;
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
    number: "01",
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
    number: "02",
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

      <div className="container-site relative z-10">
        {/* COMPOSITION ASYMÉTRIQUE : 35-40% titre & sélecteur à gauche, 60-65% galerie à droite */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Colonne gauche : Surtitre, Titre compact, description, sélecteur vertical et bouton */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span>Avant / Après</span>
              </div>
              <h2
                id="before-after-heading"
                className="text-4xl sm:text-5xl lg:text-[46px] font-display font-bold uppercase tracking-tight leading-[0.98] text-[#11114E]"
              >
                Le résultat parle de lui-même.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                Découvrez la différence avant et après notre passage. Photos réelles, sans retouche.
              </p>
            </div>

            {/* Liste numérotée interactive des réalisations */}
            <div className="space-y-2.5 max-w-md">
              {REALIZATIONS.map((r, index) => {
                const isActive = currentIndex === index;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`w-full text-left rounded-xl p-3.5 sm:p-4 font-bold text-sm sm:text-base flex items-center gap-3.5 transition-all cursor-pointer ${
                      isActive
                        ? "border-2 border-primary bg-white text-[#11114E] shadow-sm"
                        : "border border-transparent bg-transparent text-slate-600 hover:text-[#11114E] hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-extrabold ${
                        isActive ? "text-primary" : "text-slate-400"
                      }`}
                    >
                      {r.number}
                    </span>
                    <span className="font-display uppercase tracking-wide">{r.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Bouton de réservation principal */}
            <div className="pt-2">
              <Link to="/contact" className="btn btn-primary text-sm sm:text-base px-6 py-3">
                <span>Réserver mon nettoyage</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Colonne droite : Grande carte blanche contenant la comparaison côte à côte */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/50"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Deux photographies côte à côte */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Photo AVANT */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
                  <picture>
                    <source type="image/webp" srcSet={current.beforeWebp} />
                    <img
                      src={current.beforeJpg}
                      alt={current.altBefore}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </picture>
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                    <span className="inline-flex items-center rounded-md bg-[#11114E]/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs backdrop-blur-xs border border-white/20">
                      AVANT
                    </span>
                  </div>
                </div>

                {/* Photo APRÈS */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
                  <picture>
                    <source type="image/webp" srcSet={current.afterWebp} />
                    <img
                      src={current.afterJpg}
                      alt={current.altAfter}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover"
                    />
                  </picture>
                  <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
                    <span className="inline-flex items-center rounded-md bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
                      APRÈS
                    </span>
                  </div>
                </div>
              </div>

              {/* Ligne inférieure : Détail de la prestation & Flèches de navigation */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E]">
                    {current.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                    {current.description}
                  </p>
                </div>

                {/* Boutons de navigation précédent / suivant */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Réalisation précédente"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-colors cursor-pointer text-slate-600"
                  >
                    <ChevronLeft className="size-4.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Réalisation suivante"
                    className="grid size-10 place-items-center rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-colors cursor-pointer text-slate-600"
                  >
                    <ChevronRight className="size-4.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
