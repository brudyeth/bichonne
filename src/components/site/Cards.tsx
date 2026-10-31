import { Link } from "@tanstack/react-router";
import { Check, Clock, Sparkles, PawPrint, Info } from "lucide-react";
import { CARES, FORMULAS, INTENSIVE_DIRT_NOTICE, euro } from "@/lib/business";

export function FormulaCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch">
      {FORMULAS.map((f) => {
        const isInterior = f.id === "interieur";
        const isComplet = f.id === "complet";
        const isDark = isInterior;

        return (
          <article
            key={f.id}
            id={f.id}
            className={`relative flex flex-col rounded-2xl transition-all duration-200 ${
              isInterior
                ? "bg-[#11114E] text-white border-2 border-[#F47721] shadow-xl ring-1 ring-[#F47721]/30"
                : isComplet
                  ? "bg-white text-[#11114E] border-2 border-slate-300 shadow-sm hover:border-[#F47721]/40 hover:shadow-md"
                  : "bg-white text-[#11114E] border border-slate-200/90 shadow-xs hover:border-[#F47721]/40 hover:shadow-md"
            } p-6 sm:p-7`}
          >
            {/* Badge de valorisation visuelle */}
            {isInterior && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[#2563eb]/18 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -left-16 size-44 rounded-full bg-[#4338ca]/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 right-0 size-32 rounded-full bg-[#F47721]/[0.07] blur-2xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-noise opacity-12 mix-blend-overlay"
                />
                <div className="absolute -top-3.5 left-6 sm:left-7 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F47721] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    <Sparkles className="size-3" /> Notre spécialité
                  </span>
                </div>
              </>
            )}
            {isComplet && (
              <div className="absolute -top-3.5 left-6 sm:left-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#11114E] text-white border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider shadow-sm">
                  Formule tout-en-un
                </span>
              </div>
            )}

            {/* En-tête : Nom, Prix & Durée */}
            <div className="space-y-3 pt-1">
              <h3
                className={`font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight ${
                  isDark ? "text-white" : "text-[#11114E]"
                }`}
              >
                {f.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-5xl sm:text-6xl font-bold text-[#F47721] tracking-tight">
                  {euro(f.price)}
                </span>
                <span
                  className={`text-xs sm:text-sm font-medium ${
                    isDark ? "text-white/70" : "text-slate-500"
                  }`}
                >
                  / véhicule
                </span>
              </div>

              <div
                className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  isDark
                    ? "bg-white/10 text-white/90 border border-white/10"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                <Clock className="size-3.5 text-[#F47721] shrink-0" />
                <span>Durée estimée : {f.duration}</span>
              </div>
            </div>

            {/* Séparateur horizontal fin */}
            <div className={`my-5 h-px w-full ${isDark ? "bg-white/15" : "bg-slate-200"}`} />

            {/* Description courte et commerciale */}
            <p className={`text-sm leading-relaxed ${isDark ? "text-white/85" : "text-slate-600"}`}>
              {f.short}
            </p>

            {/* Liste des prestations avec coches */}
            <div className="mt-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#F47721] mb-3">
                  Prestations incluses :
                </p>
                <ul className="space-y-2.5 text-sm">
                  {f.items.map((i) => {
                    const isShampoo = i.toLowerCase().includes("shampoing");
                    return (
                      <li key={i} className="flex items-start gap-2.5 leading-snug">
                        <span
                          className={`grid size-4.5 shrink-0 place-items-center rounded-full mt-0.5 ${
                            isDark
                              ? "bg-[#F47721]/20 text-[#F47721]"
                              : "bg-[#F47721]/15 text-[#F47721]"
                          }`}
                        >
                          <Check className="size-3 stroke-[2.5]" />
                        </span>
                        <div className="flex-1">
                          <span
                            className={
                              isShampoo
                                ? `${isDark ? "text-white" : "text-[#11114E]"} font-bold`
                                : isDark
                                  ? "text-white/95"
                                  : "text-slate-800"
                            }
                          >
                            {i}
                          </span>
                          {isShampoo && (
                            <span className="ml-2 inline-flex items-center rounded-md bg-[#F47721]/20 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#F47721] border border-[#F47721]/30">
                              Inclus
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Mention importante éventuelle (conditions particulières) */}
              {f.notice && (
                <div
                  className={`mt-5 rounded-xl p-3 text-xs leading-relaxed border ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white/75"
                      : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}
                >
                  <p className="italic">{f.notice}</p>
                </div>
              )}
            </div>

            {/* Bouton de réservation */}
            <div className="mt-7 pt-2 space-y-2">
              <Link to="/contact" search={{ formule: f.id }} className="btn btn-primary w-full">
                Choisir cette formule
              </Link>
              {!detailed && (
                <Link
                  to="/formules"
                  hash={f.id}
                  className={`block text-center text-xs font-semibold hover:underline pt-0.5 ${
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-slate-500 hover:text-[#11114E]"
                  }`}
                >
                  Voir les détails complets
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function CareCards() {
  const [poilsCare, cuirCare] = CARES;

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Prestation 1 : Poils d'animaux / Véhicule très sale */}
        {poilsCare && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#11114E] text-[#F47721] shadow-2xs mt-0.5">
                <PawPrint className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E]">
                  {poilsCare.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{poilsCare.short}</p>
              </div>
            </div>
            <div className="sm:text-right shrink-0 pl-13 sm:pl-0">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#F47721] tracking-tight">
                +{euro(poilsCare.price)}
              </span>
            </div>
          </div>
        )}

        {/* Ligne de séparation fine */}
        <div className="h-px w-full bg-slate-200" />

        {/* Prestation 2 : Soin nourrissant des cuirs */}
        {cuirCare && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#11114E] text-[#F47721] shadow-2xs mt-0.5">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E]">
                  {cuirCare.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{cuirCare.short}</p>
              </div>
            </div>
            <div className="sm:text-right shrink-0 pl-13 sm:pl-0">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#F47721] tracking-tight">
                +{euro(cuirCare.price)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mention informative sur les nettoyages intensifs */}
      <div className="mt-6 sm:mt-7 pt-5 border-t border-slate-200 flex items-start gap-3 rounded-xl bg-[#F8F9FC] border border-slate-200/80 p-3.5 sm:p-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
        <Info className="size-4 text-[#F47721] shrink-0 mt-0.5" />
        <p>{INTENSIVE_DIRT_NOTICE}</p>
      </div>
    </div>
  );
}
