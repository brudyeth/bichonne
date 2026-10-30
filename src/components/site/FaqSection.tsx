import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BUSINESS, whatsappLink } from "@/lib/business";

export interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Comment se passe l'intervention à domicile ?",
    answer:
      "Nous nous déplaçons directement chez vous ou sur votre lieu de travail avec tout le matériel professionnel nécessaire. Nous avons uniquement besoin d'un accès à une prise électrique classique (et d'un point d'eau si votre prestation comprend un lavage extérieur). En cas d'impossibilité, contactez-nous au préalable pour étudier une solution adaptée.",
  },
  {
    question: "Le tarif dépend-il de la taille de mon véhicule ?",
    answer:
      "Non, nos tarifs sont transparents et identiques pour tous les véhicules : citadine, berline, break ou SUV. Le tarif affiché (49 € extérieur, 69 € intérieur, 109 € complet) reste le même quel que soit votre modèle.",
  },
  {
    question: "Quels sont les frais de déplacement ?",
    answer:
      "Le déplacement est entièrement offert dans un rayon de 15 km autour de Lille. Au-delà de ces 15 km gratuits, seuls les kilomètres supplémentaires sont facturés à 0,50 € par kilomètre, calculés sur l'aller-retour selon l'itinéraire routier réel.",
  },
  {
    question: "Le shampoing des sièges et tapis est-il bien inclus ?",
    answer:
      "Oui ! Le shampoing complet des sièges, tissus, tapis et moquettes est inclus d'office dans la formule Nettoyage Intérieur (69 €) ainsi que dans la formule Nettoyage Complet (109 €).",
  },
  {
    question: "Comment régler ma prestation ?",
    answer:
      "Le règlement s'effectue sur place à la fin de la prestation, une fois le résultat vérifié avec vous. Vous pouvez régler en espèces, par virement instantané ou par carte bancaire. Aucun prépaiement n'est demandé lors de la réservation en ligne.",
  },
];

export function FaqSection({ className = "" }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-24 ${className}`}
      aria-labelledby="faq-heading"
    >
      {/* Reflets diffus nacrés/argentés très doux */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 size-[520px] rounded-full bg-blue-100/40 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-20 size-[500px] rounded-full bg-indigo-100/40 blur-[125px]"
      />
      {/* Texture tactile subtile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04] mix-blend-multiply"
      />

      <div className="container-site max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="size-3.5" />
            Questions fréquentes
          </div>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-wide text-[#11114E]"
          >
            Tout savoir sur nos prestations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Des réponses claires et précises pour préparer votre nettoyage en toute sérénité.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-primary/40 bg-white shadow-xs"
                    : "border-slate-200/90 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E] cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{item.question}</span>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
                      isOpen ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown className="size-4.5" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-600 leading-relaxed pt-1 border-t border-slate-100 animate-in fade-in-50 duration-150">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact direct rapide sous la FAQ */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div>
            <p className="font-display text-lg font-bold uppercase text-[#11114E]">
              Une autre question ?
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Nous répondons rapidement par téléphone ou par message WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={BUSINESS.phoneTel}
              className="btn border-2 border-[#11114E] text-[#11114E] hover:bg-[#11114E] hover:text-white text-xs h-10 px-4 py-2"
            >
              <Phone className="size-3.5" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs h-10 px-4 py-2"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
