import { Star, MessageSquarePlus, ExternalLink, ShieldCheck } from "lucide-react";
import { CLIENT_REVIEWS, BUSINESS } from "@/lib/business";

export function ReviewsSection() {
  const hasReviews = CLIENT_REVIEWS.length > 0;
  const hasValidReviewLink =
    BUSINESS.googleReviewUrl && !BUSINESS.googleReviewUrl.startsWith("[À COMPLÉTER");

  // Masqué temporairement si aucun avis réel et lien Google non configuré
  if (!hasReviews && !hasValidReviewLink) {
    return null;
  }

  return (
    <section
      id="avis-clients"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-20 border-t border-slate-200/70"
      aria-labelledby="reviews-heading"
    >
      <div className="container-site relative z-10">
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
            <span className="w-6 h-[2px] bg-primary"></span>
            <span>Avis & Retours d'expérience</span>
          </div>
          <h2
            id="reviews-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#11114E]"
          >
            Ce que pensent nos clients
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            La satisfaction et la transparence au cœur de chaque nettoyage automobile à domicile.
          </p>
        </div>

        {hasReviews ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLIENT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-slate-700">{rev.commune}</span>
                    <span>{rev.date}</span>
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">« {rev.comment} »</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="font-display uppercase tracking-wide text-sm font-bold text-[#11114E]">
                    {rev.author}
                  </span>
                  <span className="text-xs font-medium text-primary">{rev.formula}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Carte d'invitation sobre et authentique sans aucun faux avis */
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-grid size-12 place-items-center rounded-full bg-[#11114E] text-primary mx-auto">
              <MessageSquarePlus className="size-6" />
            </div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-[#11114E]">
              Vous avez fait nettoyer votre véhicule ?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Votre avis compte énormément ! Les avis présentés sur cette page proviennent
              exclusivement de clients réels ayant bénéficié de nos prestations.
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center gap-2 text-sm py-3 px-6"
              >
                <span>Laisser un avis sur Google</span>
                <ExternalLink className="size-4" />
              </a>
            </div>
            <p className="text-xs text-slate-400">Lien de collecte : {BUSINESS.googleReviewUrl}</p>
          </div>
        )}
      </div>
    </section>
  );
}
