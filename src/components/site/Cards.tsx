import { Link } from "@tanstack/react-router";
import { Check, Clock, Sparkles, Plus, Info, PawPrint } from "lucide-react";
import { FORMULAS, CARES, euro, INTENSIVE_DIRT_NOTICE } from "@/lib/business";

export function FormulaCards({ detailed = false }: { detailed?: boolean }) {
  const premiumFormula = FORMULAS.find((f) => f.id === "interieur-premium");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-3 items-stretch">
        {FORMULAS.map((f) => {
          const isPremium = f.id === "interieur-premium";
          const isComplet = f.id === "complet";

          if (isPremium) {
            // CARTE BLANCHE AU CENTRE : INTÉRIEUR PREMIUM (LA PLUS POPULAIRE)
            return (
              <article
                key={f.id}
                id={f.id}
                className="relative flex flex-col justify-between h-full rounded-2xl bg-white text-[#11114E] border-2 border-primary ring-4 ring-primary/10 shadow-[0_12px_36px_-6px_rgba(244,119,33,0.20)] p-4 sm:p-5 lg:p-4.5 xl:p-5 transition-all duration-200 lg:-translate-y-1.5 z-10"
              >
                {/* Badge supérieur orange : LA PLUS POPULAIRE */}
                <div className="absolute -top-3 left-5 sm:left-6">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
                    <Sparkles className="size-3" /> La plus populaire
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  {/* En-tête : Nom, Prix & Durée */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide leading-tight text-[#11114E]">
                      {f.name}
                    </h3>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-primary tracking-tight leading-none">
                        {euro(f.price)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">/ véhicule</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                      <Clock className="size-3.5 text-primary shrink-0" />
                      <span>Durée estimée : {f.duration}</span>
                    </div>
                  </div>

                  {/* Description courte */}
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-slate-600">
                    {f.short}
                  </p>

                  {/* Encadré spécial Shampoing inclus */}
                  <div className="mt-2.5 rounded-lg bg-[#FFF6EE] border border-primary/20 py-1.5 px-2.5 text-xs font-semibold text-[#11114E] leading-snug">
                    Shampoing des sièges et tapis{" "}
                    <span className="text-primary font-bold">inclus</span>
                  </div>

                  {/* Séparateur */}
                  <div className="my-3 h-px w-full bg-slate-200" />

                  {/* Liste des prestations incluses */}
                  <div className="flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                      Prestations incluses
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-[13px]">
                      {f.items.map((i) => {
                        const isShampoo = i.toLowerCase().includes("shampoing");
                        return (
                          <li key={i} className="flex items-start gap-2 leading-snug">
                            <Check
                              className="size-3.5 text-primary shrink-0 mt-0.5"
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
                    <div className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-tight text-slate-500">
                      <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <p>{f.notice}</p>
                    </div>
                  )}
                </div>

                {/* Bouton de réservation orange */}
                <div className="mt-4 pt-1 space-y-1.5">
                  <Link
                    to="/contact"
                    search={{ formule: f.id }}
                    className="btn btn-primary w-full text-xs sm:text-sm font-bold uppercase tracking-wider py-2.5"
                  >
                    Choisir cette formule
                  </Link>
                  {!detailed && (
                    <Link
                      to="/formules"
                      hash={f.id}
                      className="block text-center text-[11px] font-semibold text-slate-500 hover:text-[#11114E] hover:underline"
                    >
                      Voir les détails complets
                    </Link>
                  )}
                </div>
              </article>
            );
          }

          if (isComplet) {
            // CARTE BLEU NUIT : FORMULE COMPLÈTE (109 €)
            return (
              <article
                key={f.id}
                id={f.id}
                className="relative flex flex-col justify-between h-full rounded-2xl bg-[#13144d]/90 text-white border border-white/10 p-4 sm:p-5 lg:p-4.5 xl:p-5 shadow-lg transition-all duration-200"
              >
                {/* Badge supérieur : LE SOIN INTÉGRAL */}
                <div className="absolute -top-3 left-5 sm:left-6">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-xs shadow-sm">
                    Soin intégral
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  {/* En-tête : Nom, Prix & Durée */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide leading-tight text-white">
                      {f.name}
                    </h3>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-primary tracking-tight leading-none">
                        {euro(f.price)}
                      </span>
                      <span className="text-xs font-semibold text-white/70">/ véhicule</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                      <Clock className="size-3.5 text-primary shrink-0" />
                      <span>Durée estimée : {f.duration}</span>
                    </div>
                  </div>

                  {/* Description courte */}
                  <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/80">
                    {f.short}
                  </p>

                  {/* Séparateur */}
                  <div className="my-3 h-px w-full bg-white/10" />

                  {/* Deux blocs distincts aérés sans pavé dense */}
                  <div className="space-y-2 flex-1">
                    <div className="rounded-lg bg-white/[0.05] border border-white/10 p-2.5 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                        <p className="font-display text-[11px] font-bold uppercase tracking-wider text-primary">
                          Intégralité d'Intérieur Premium
                        </p>
                      </div>
                      <p className="text-[11px] text-white/80 leading-snug pl-5">
                        Aspiration complète, shampoing sièges & tapis, plastiques, vitres
                        intérieures et traitement anti-odeur.
                      </p>
                    </div>

                    <div className="flex justify-center -my-1">
                      <span className="grid size-5 place-items-center rounded-full bg-primary text-white font-bold text-[10px] shadow-xs">
                        <Plus className="size-3 stroke-[3]" />
                      </span>
                    </div>

                    <div className="rounded-lg bg-white/[0.05] border border-white/10 p-2.5 space-y-1">
                      <p className="font-display text-[11px] font-bold uppercase tracking-wider text-white">
                        Prestations carrosserie & extérieur
                      </p>
                      <ul className="space-y-1 text-xs text-white/85">
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
                          <span>Nettoyage soigné des jantes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
                          <span>Rinçage et séchage microfibre</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Notice en cas de salissures intensives */}
                  {f.notice && (
                    <div className="mt-2.5 flex items-start gap-1.5 text-[11px] leading-tight text-white/60">
                      <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <p>{f.notice}</p>
                    </div>
                  )}
                </div>

                {/* Bouton sombre avec bordure fine */}
                <div className="mt-4 pt-1 space-y-1.5">
                  <Link
                    to="/contact"
                    search={{ formule: f.id }}
                    className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 w-full text-xs sm:text-sm font-bold uppercase tracking-wider py-2.5"
                  >
                    Choisir cette formule
                  </Link>
                  {!detailed && (
                    <Link
                      to="/formules"
                      hash={f.id}
                      className="block text-center text-[11px] font-semibold text-white/70 hover:text-white hover:underline"
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
              className="relative flex flex-col justify-between h-full rounded-2xl bg-[#13144d]/90 text-white border border-white/10 p-4 sm:p-5 lg:p-4.5 xl:p-5 shadow-lg transition-all duration-200"
            >
              <div className="flex-1 flex flex-col">
                {/* En-tête : Nom, Prix & Durée */}
                <div className="space-y-1.5 pt-1">
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide leading-tight text-white">
                    {f.name}
                  </h3>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-primary tracking-tight leading-none">
                      {euro(f.price)}
                    </span>
                    <span className="text-xs font-semibold text-white/70">/ véhicule</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/80">
                    <Clock className="size-3.5 text-primary shrink-0" />
                    <span>Durée estimée : {f.duration}</span>
                  </div>
                </div>

                {/* Description courte */}
                <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-white/80">
                  {f.short}
                </p>

                {/* Séparateur */}
                <div className="my-3 h-px w-full bg-white/10" />

                {/* Liste des prestations incluses */}
                <div className="flex-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                    Prestations incluses
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-[13px]">
                    {f.items.map((i) => (
                      <li key={i} className="flex items-start gap-2 leading-snug">
                        <Check
                          className="size-3.5 text-primary shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span className="text-white/90">{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bouton sombre avec bordure fine */}
              <div className="mt-4 pt-1 space-y-1.5">
                <Link
                  to="/contact"
                  search={{ formule: f.id }}
                  className="btn border border-white/20 bg-white/[0.06] text-white hover:bg-white/10 w-full text-xs sm:text-sm font-bold uppercase tracking-wider py-2.5"
                >
                  Choisir cette formule
                </Link>
                {!detailed && (
                  <Link
                    to="/formules"
                    hash={f.id}
                    className="block text-center text-[11px] font-semibold text-white/70 hover:text-white hover:underline"
                  >
                    Voir les détails complets
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Ligne discrète : Supplément véhicules utilitaires */}
      <div className="rounded-xl border border-white/15 bg-white/[0.04] backdrop-blur-xs px-3.5 py-2 sm:px-4 sm:py-2.5 text-white">
        <p className="text-xs sm:text-sm font-bold text-white">
          Véhicules utilitaires :{" "}
          <span className="text-primary font-display text-base sm:text-lg font-bold">+20 €</span>
        </p>
        <p className="text-[11px] text-white/70 mt-0.5">
          Applicable à toutes les formules (petits, moyens et grands utilitaires).
        </p>
      </div>
    </div>
  );
}

export function CareCards() {
  const [poilsCare, cuirCare] = CARES;

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-6 text-[#11114E] shadow-xl space-y-4">
      {/* Prestation 1 : Poils d'animaux / Véhicule très sale */}
      {poilsCare && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#11114E] text-primary shadow-xs mt-0.5">
              <PawPrint className="size-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#11114E] leading-snug">
                {poilsCare.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{poilsCare.short}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center pl-12 sm:pl-0">
            <span className="font-display text-xl sm:text-2xl font-bold text-primary">
              +{euro(poilsCare.price)}
            </span>
            <Link
              to="/contact"
              className="btn btn-outline py-1.5 px-3.5 text-xs font-bold uppercase tracking-wider"
            >
              Ajouter
            </Link>
          </div>
        </div>
      )}

      <div className="h-px w-full bg-slate-100" />

      {/* Prestation 2 : Soin nourrissant des cuirs */}
      {cuirCare && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#11114E] text-primary shadow-xs mt-0.5">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#11114E] leading-snug">
                {cuirCare.name}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{cuirCare.short}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center pl-12 sm:pl-0">
            <span className="font-display text-xl sm:text-2xl font-bold text-primary">
              +{euro(cuirCare.price)}
            </span>
            <Link
              to="/contact"
              className="btn btn-outline py-1.5 px-3.5 text-xs font-bold uppercase tracking-wider"
            >
              Ajouter
            </Link>
          </div>
        </div>
      )}

      {/* Mention discrète salissures intensives */}
      <div className="rounded-lg bg-[#FFF6EE] border border-primary/20 p-2.5 sm:p-3 text-[11px] sm:text-xs text-[#11114E] flex items-start gap-2 leading-relaxed">
        <Info className="size-3.5 text-primary shrink-0 mt-0.5" />
        <p>{INTENSIVE_DIRT_NOTICE}</p>
      </div>
    </div>
  );
}
