import { Link } from "@tanstack/react-router";
import { Check, Clock, Sparkles, PawPrint, Info, Plus } from "lucide-react";
import { CARES, FORMULAS, INTENSIVE_DIRT_NOTICE, euro } from "@/lib/business";

export function FormulaCards({ detailed = false }: { detailed?: boolean }) {
  const premiumFormula = FORMULAS.find((f) => f.id === "interieur-premium");

  return (
    <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch">
      {FORMULAS.map((f) => {
        const isPremium = f.id === "interieur-premium";
        const isComplet = f.id === "complet";

        if (isPremium) {
          // CARTE BLANCHE AU CENTRE : INTÉRIEUR PREMIUM (LA PLUS POPULAIRE)
          return (
            <article
              key={f.id}
              id={f.id}
              className="relative flex flex-col justify-between rounded-2xl bg-white text-[#11114E] border border-slate-200/90 p-6 sm:p-7 shadow-2xl transition-all duration-200 lg:-translate-y-2 z-10"
            >
              {/* Badge supérieur orange : LA PLUS POPULAIRE */}
              <div className="absolute -top-3.5 left-6 sm:left-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                  <Sparkles className="size-3" /> La plus populaire
                </span>
              </div>

              <div>
                {/* En-tête : Nom, Prix & Durée */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight text-[#11114E]">
                    {f.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-6xl font-bold text-primary tracking-tight">
                      {euro(f.price)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-slate-500">
                      / véhicule
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>Durée estimée : {f.duration}</span>
                  </div>
                </div>

                {/* Description courte */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{f.short}</p>

                {/* Encadré spécial Shampoing inclus */}
                <div className="mt-4 rounded-xl bg-[#FFF6EE] border border-primary/20 p-3 sm:p-3.5 text-xs sm:text-[13px] font-semibold text-[#11114E] leading-snug">
                  Shampoing des sièges et tapis{" "}
                  <span className="text-primary font-bold">inclus</span>
                </div>

                {/* Séparateur */}
                <div className="my-5 h-px w-full bg-slate-200" />

                {/* Liste des prestations incluses */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                    Prestations incluses
                  </p>
                  <ul className="space-y-2.5 text-sm">
                    {f.items.map((i) => {
                      const isShampoo = i.toLowerCase().includes("shampoing");
                      return (
                        <li key={i} className="flex items-start gap-2.5 leading-snug">
                          <Check
                            className="size-4 text-primary shrink-0 mt-0.5"
                            strokeWidth={2.5}
                          />
                          <span
                            className={isShampoo ? "text-[#11114E] font-bold" : "text-slate-700"}
                          >
                            {i}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Notice en cas de salissures intensives */}
                {f.notice && (
                  <div className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                    <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <p>{f.notice}</p>
                  </div>
                )}
              </div>

              {/* Bouton de réservation orange en relief 3D */}
              <div className="mt-7 pt-2 space-y-2">
                <Link
                  to="/contact"
                  search={{ formule: f.id }}
                  className="btn btn-primary w-full text-base py-3"
                >
                  Choisir cette formule
                </Link>
                {!detailed && (
                  <Link
                    to="/formules"
                    hash={f.id}
                    className="block text-center text-xs font-semibold text-slate-500 hover:text-[#11114E] hover:underline pt-0.5"
                  >
                    Voir les détails complets
                  </Link>
                )}
              </div>
            </article>
          );
        }

        if (isComplet) {
          // CARTE BLEU NUIT : FORMULE COMPLÈTE (119 €)
          return (
            <article
              key={f.id}
              id={f.id}
              className="relative flex flex-col justify-between rounded-2xl bg-[#13144d]/90 text-white border border-white/10 p-6 sm:p-7 shadow-lg transition-all duration-200"
            >
              {/* Badge supérieur : LE SOIN INTÉGRAL */}
              <div className="absolute -top-3.5 left-6 sm:left-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xs shadow-sm">
                  Soin intégral
                </span>
              </div>

              <div>
                {/* En-tête : Nom, Prix & Durée */}
                <div className="space-y-3 pt-2">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight text-white">
                    {f.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl sm:text-6xl font-bold text-primary tracking-tight">
                      {euro(f.price)}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white/70">/ véhicule</span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>Durée estimée : {f.duration}</span>
                  </div>
                </div>

                {/* Description courte */}
                <p className="mt-4 text-sm leading-relaxed text-white/80">{f.short}</p>

                {/* Séparateur */}
                <div className="my-5 h-px w-full bg-white/10" />

                {/* Deux blocs distincts séparés par un symbole + orange */}
                <div className="space-y-2.5">
                  <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5 space-y-1.5">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-primary">
                      Intégralité de la formule Intérieur Premium
                    </p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {premiumFormula?.items.join(" · ")}
                    </p>
                  </div>

                  <div className="flex justify-center -my-1">
                    <span className="grid size-6 place-items-center rounded-full bg-primary text-white font-bold text-xs shadow-xs">
                      <Plus className="size-3.5 stroke-[3]" />
                    </span>
                  </div>

                  <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3.5 space-y-1.5">
                    <p className="font-display text-xs font-bold uppercase tracking-wider text-white">
                      Prestations carrosserie & extérieur
                    </p>
                    <ul className="space-y-1.5 text-xs text-white/80">
                      <li className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                        <span>Prélavage à la mousse active</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                        <span>Lavage manuel de la carrosserie</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                        <span>Nettoyage des jantes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                        <span>Rinçage et séchage manuel à la microfibre</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Notice en cas de salissures intensives */}
                {f.notice && (
                  <div className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-white/60">
                    <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
                    <p>{f.notice}</p>
                  </div>
                )}
              </div>

              {/* Bouton sombre avec bordure fine */}
              <div className="mt-7 pt-2 space-y-2">
                <Link
                  to="/contact"
                  search={{ formule: f.id }}
                  className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 w-full text-sm font-bold uppercase tracking-wider py-3"
                >
                  Choisir cette formule
                </Link>
                {!detailed && (
                  <Link
                    to="/formules"
                    hash={f.id}
                    className="block text-center text-xs font-semibold text-white/70 hover:text-white hover:underline pt-0.5"
                  >
                    Voir les détails complets
                  </Link>
                )}
              </div>
            </article>
          );
        }

        // CARTE BLEU NUIT : INTÉRIEUR EXPRESS (49 €)
        return (
          <article
            key={f.id}
            id={f.id}
            className="relative flex flex-col justify-between rounded-2xl bg-[#13144d]/90 text-white border border-white/10 p-6 sm:p-7 shadow-lg transition-all duration-200"
          >
            <div>
              {/* En-tête : Nom, Prix & Durée */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight text-white">
                  {f.name}
                </h3>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl sm:text-6xl font-bold text-primary tracking-tight">
                    {euro(f.price)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white/70">/ véhicule</span>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-white/80">
                  <Clock className="size-3.5 text-primary shrink-0" />
                  <span>Durée estimée : {f.duration}</span>
                </div>
              </div>

              {/* Description courte */}
              <p className="mt-4 text-sm leading-relaxed text-white/80">{f.short}</p>

              {/* Séparateur */}
              <div className="my-5 h-px w-full bg-white/10" />

              {/* Liste des prestations incluses */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Prestations incluses
                </p>
                <ul className="space-y-2.5 text-sm">
                  {f.items.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-snug">
                      <Check className="size-4 text-primary shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-white/90">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bouton sombre avec bordure fine */}
            <div className="mt-7 pt-2 space-y-2">
              <Link
                to="/contact"
                search={{ formule: f.id }}
                className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 w-full text-sm font-bold uppercase tracking-wider py-3"
              >
                Choisir cette formule
              </Link>
              {!detailed && (
                <Link
                  to="/formules"
                  hash={f.id}
                  className="block text-center text-xs font-semibold text-white/70 hover:text-white hover:underline pt-0.5"
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
    <div className="rounded-2xl bg-white p-6 sm:p-8 text-[#11114E] shadow-2xl space-y-6">
      {/* Prestation 1 : Poils d'animaux / Véhicule très sale */}
      {poilsCare && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#11114E] text-primary shadow-xs mt-0.5">
              <PawPrint className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#11114E] leading-snug">
                {poilsCare.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {poilsCare.short}
              </p>
            </div>
          </div>
          <div className="sm:text-right shrink-0 pl-15 sm:pl-0">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
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
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#11114E] text-primary shadow-xs mt-0.5">
              <Sparkles className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#11114E] leading-snug">
                {cuirCare.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {cuirCare.short}
              </p>
            </div>
          </div>
          <div className="sm:text-right shrink-0 pl-15 sm:pl-0">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              +{euro(cuirCare.price)}
            </span>
          </div>
        </div>
      )}

      {/* Ligne de séparation fine */}
      <div className="h-px w-full bg-slate-200" />

      {/* Mention informative sur les nettoyages intensifs / Sur devis */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary shadow-xs mt-0.5">
            <Info className="size-5" />
          </span>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
            {INTENSIVE_DIRT_NOTICE}
          </p>
        </div>
        <div className="sm:text-right shrink-0 pl-15 sm:pl-0">
          <span className="font-bold text-sm sm:text-base text-[#11114E] whitespace-nowrap">
            Sur devis
          </span>
        </div>
      </div>
    </div>
  );
}
