import { Link } from "@tanstack/react-router";
import { Check, Layers, ShieldCheck, Wind, Sparkles, PawPrint, ArrowRight } from "lucide-react";
import { CARES, FORMULAS, euro, type Care } from "@/lib/business";

const CARE_ICONS: Record<Care["icon"], typeof Sparkles> = {
  layers: Layers,
  "shield-check": ShieldCheck,
  wind: Wind,
  sparkles: Sparkles,
  "paw-print": PawPrint,
};

export function FormulaCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {FORMULAS.map((f) => (
        <article
          key={f.id}
          id={f.id}
          className={`relative flex flex-col rounded-2xl p-7 ${f.highlight ? "bg-night text-night-foreground" : "bg-card border"}`}
        >
          {f.highlight && (
            <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">
              Le plus complet
            </span>
          )}
          <h3 className="text-3xl">{f.name}</h3>
          <p className={`mt-2 text-sm ${f.highlight ? "opacity-80" : "text-muted-foreground"}`}>
            {f.short}
          </p>
          <p className="mt-5 font-display text-6xl font-bold text-primary">{euro(f.price)}</p>
          {detailed && (
            <ul className="mt-6 space-y-3 text-sm">
              {f.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-7">
            {detailed ? (
              <Link to="/contact" search={{ formule: f.id }} className="btn btn-primary w-full">
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
  return (
    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {CARES.map((c, index) => {
        const IconComponent = CARE_ICONS[c.icon] ?? Sparkles;
        // 3 cartes sur la 1ère ligne (2 colonnes chacune = 6 cols)
        // 2 cartes sur la 2nde ligne (3 colonnes chacune = 6 cols)
        const colSpanClass = index < 3 ? "lg:col-span-2" : "sm:col-span-2 lg:col-span-3";

        return (
          <article
            key={c.id}
            className={`group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 shadow-2xs transition-all duration-200 hover:border-primary/50 hover:shadow-xs hover:-translate-y-0.5 ${colSpanClass}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2.5">
                <span className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-lg bg-night text-primary shadow-2xs transition-transform duration-200 group-hover:scale-105">
                  <IconComponent className="size-4 sm:size-4.5" />
                </span>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-display text-base sm:text-lg font-bold tracking-tight text-primary">
                  {euro(c.price)}
                </span>
              </div>
              <h3 className="mt-2.5 font-display text-base sm:text-lg font-bold uppercase tracking-wide text-foreground leading-snug">
                {c.name}
              </h3>
              <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-muted-foreground">
                {c.short}
              </p>
              {c.note && (
                <p className="mt-1.5 text-[11px] text-primary font-medium italic leading-tight">
                  * {c.note}
                </p>
              )}
            </div>
            <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-muted-foreground">
                Complément formule
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-primary group-hover:gap-1.5 transition-all text-[11px] sm:text-xs"
              >
                Choisir <ArrowRight className="size-3" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
