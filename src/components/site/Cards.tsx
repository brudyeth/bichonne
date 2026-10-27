import { Link } from "@tanstack/react-router";
import { Check, Clock, Sparkles, PawPrint, Info } from "lucide-react";
import { CARES, FORMULAS, INTENSIVE_DIRT_NOTICE, euro } from "@/lib/business";

export function FormulaCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-6 lg:gap-8 md:grid-cols-3 items-stretch">
      {FORMULAS.map((f) => (
        <article
          key={f.id}
          id={f.id}
          className={`relative flex flex-col rounded-2xl transition-all duration-200 ${
            f.highlight
              ? "bg-[#11114E] text-white border-2 border-[#F47721]/50 shadow-xl"
              : "bg-card text-card-foreground border border-border/80 shadow-xs hover:border-primary/40 hover:shadow-md"
          } p-6 sm:p-7`}
        >
          {f.highlight && (
            <div className="absolute -top-3.5 left-6 sm:left-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F47721] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                <Sparkles className="size-3" /> Formule la plus complète
              </span>
            </div>
          )}

          {/* En-tête : Nom, Prix & Durée */}
          <div className="space-y-3 pt-1">
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide leading-tight">
              {f.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl sm:text-6xl font-bold text-[#F47721] tracking-tight">
                {euro(f.price)}
              </span>
              <span
                className={`text-xs sm:text-sm font-medium ${
                  f.highlight ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                / véhicule
              </span>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs font-semibold ${
                f.highlight
                  ? "bg-white/10 text-white/90 border border-white/10"
                  : "bg-secondary text-foreground/90 border border-border/60"
              }`}
            >
              <Clock className="size-3.5 text-[#F47721] shrink-0" />
              <span>Durée estimée : {f.duration}</span>
            </div>
          </div>

          {/* Séparateur horizontal fin */}
          <div className={`my-5 h-px w-full ${f.highlight ? "bg-white/15" : "bg-border/70"}`} />

          {/* Description courte et commerciale */}
          <p
            className={`text-sm leading-relaxed ${
              f.highlight ? "text-white/85" : "text-muted-foreground"
            }`}
          >
            {f.short}
          </p>

          {/* Liste des prestations avec coches */}
          <div className="mt-5 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#F47721] mb-3">
                Prestations incluses :
              </p>
              <ul className="space-y-2.5 text-sm">
                {f.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 leading-snug">
                    <span
                      className={`grid size-4.5 shrink-0 place-items-center rounded-full mt-0.5 ${
                        f.highlight
                          ? "bg-[#F47721]/20 text-[#F47721]"
                          : "bg-[#F47721]/15 text-[#F47721]"
                      }`}
                    >
                      <Check className="size-3 stroke-[2.5]" />
                    </span>
                    <span className={f.highlight ? "text-white/95" : "text-foreground/90"}>
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mention importante éventuelle (conditions particulières) */}
            {f.notice && (
              <div
                className={`mt-5 rounded-xl p-3 text-xs leading-relaxed border ${
                  f.highlight
                    ? "bg-white/5 border-white/10 text-white/75"
                    : "bg-muted/50 border-border/60 text-muted-foreground"
                }`}
              >
                <p className="italic">{f.notice}</p>
              </div>
            )}
          </div>

          {/* Bouton de réservation */}
          <div className="mt-7 pt-2">
            {detailed ? (
              <Link
                to="/contact"
                search={{ formule: f.id }}
                className="btn btn-primary w-full shadow-xs"
              >
                Choisir cette formule
              </Link>
            ) : (
              <Link
                to="/formules"
                hash={f.id}
                className={`btn w-full ${f.highlight ? "btn-primary" : "btn-outline"}`}
              >
                Voir le détail
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function CareCards() {
  const [poilsCare, cuirCare] = CARES;

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-xs max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Prestation 1 : Poils d'animaux / Véhicule très sale */}
        {poilsCare && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-night text-[#F47721] shadow-2xs mt-0.5">
                <PawPrint className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-foreground">
                  {poilsCare.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {poilsCare.short}
                </p>
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
        <div className="h-px w-full bg-border/60" />

        {/* Prestation 2 : Soin nourrissant des cuirs */}
        {cuirCare && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
            <div className="flex items-start gap-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-night text-[#F47721] shadow-2xs mt-0.5">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-foreground">
                  {cuirCare.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {cuirCare.short}
                </p>
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
      <div className="mt-6 sm:mt-7 pt-5 border-t border-border/50 flex items-start gap-3 rounded-xl bg-secondary/50 p-3.5 sm:p-4 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
        <Info className="size-4 text-[#F47721] shrink-0 mt-0.5" />
        <p>{INTENSIVE_DIRT_NOTICE}</p>
      </div>
    </div>
  );
}
