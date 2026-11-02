import { useState, useMemo } from "react";
import { MapPin, CheckCircle2, AlertCircle, Phone, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LOCAL_COMMUNES, TRAVEL_CONDITIONS, BUSINESS } from "@/lib/business";

export function CommuneChecker() {
  const [query, setQuery] = useState("");
  const [selectedCommuneName, setSelectedCommuneName] = useState("Lille");

  const filtered = useMemo(() => {
    if (!query.trim()) return LOCAL_COMMUNES.slice(0, 8);
    const q = query.toLowerCase().trim();
    return LOCAL_COMMUNES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.postalCode.includes(q),
    );
  }, [query]);

  const activeCommune = useMemo(() => {
    return (
      LOCAL_COMMUNES.find((c) => c.name.toLowerCase() === selectedCommuneName.toLowerCase()) ||
      LOCAL_COMMUNES[0]
    );
  }, [selectedCommuneName]);

  const isFree = activeCommune.distanceKm <= TRAVEL_CONDITIONS.freeRadiusKm;
  const fee = TRAVEL_CONDITIONS.calculateFee(activeCommune.distanceKm);

  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 sm:p-6 backdrop-blur-md text-white shadow-xl">
      <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
        <MapPin className="size-4" />
        <span>Vérificateur de déplacement express</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white">
        Testez votre commune ou code postal
      </h3>
      <p className="text-xs sm:text-sm text-white/80 mt-1 mb-4">
        Le déplacement est offert jusqu'à 15 km de notre point de référence.
      </p>

      {/* Champ de recherche */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex : Wambrechies, Lille, 59700, Marcq..."
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Suggestions rapides cliquables */}
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
          {filtered.map((c) => (
            <button
              key={`${c.name}-${c.postalCode}`}
              type="button"
              onClick={() => {
                setSelectedCommuneName(c.name);
                setQuery("");
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                activeCommune.name === c.name
                  ? "bg-primary text-white font-bold"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              {c.name} ({c.postalCode})
            </button>
          ))}
        </div>
      </div>

      {/* Résultat du calcul */}
      <div className="mt-5 rounded-xl border border-white/10 bg-[#11114E]/70 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-white/90">
            Commune sélectionnée : <strong className="text-white">{activeCommune.name}</strong> (
            {activeCommune.postalCode})
          </span>
          <span className="text-xs text-white/60">~{activeCommune.distanceKm} km</span>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs sm:text-sm text-white/80">Frais de déplacement :</span>
          {isFree ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="size-3.5" /> Déplacement Offert
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              {fee} € aller-retour ({activeCommune.distanceKm - 15} km au-delà des 15 km offerts)
            </span>
          )}
        </div>
      </div>

      {/* Note sur l'adresse de référence */}
      <p className="mt-3 text-[11px] text-white/60 italic leading-snug">
        * Distance indicative calculée depuis notre base ({BUSINESS.departureAddressNote}). Le
        montant exact vous est confirmé avant intervention.
      </p>

      {/* CTA rapide */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2 pt-1">
        <Link
          to="/contact"
          search={{ formule: "interieur" }}
          className="btn btn-primary flex-1 justify-center py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider"
        >
          <span>Réserver pour {activeCommune.name}</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
