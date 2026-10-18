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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {CARES.map((c) => {
        const IconComponent = CARE_ICONS[c.icon] ?? Sparkles;
        return (
          <article
            key={c.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-xl bg-night text-primary shadow-xs transition-transform duration-200 group-hover:scale-105">
                  <IconComponent className="size-6" />
                </span>
                <span className="rounded-full bg-primary/10 px-3.5 py-1 font-display text-2xl font-bold tracking-tight text-primary">
                  {euro(c.price)}
                </span>
              </div>
              <h3 className="mt-5 text-2xl tracking-wide text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.short}</p>
              {c.note && <p className="mt-3 text-xs text-muted-foreground/80 italic">* {c.note}</p>}
            </div>
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                En complément d'une formule
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary group-hover:gap-1.5 transition-all"
              >
                Choisir <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
