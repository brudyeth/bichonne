import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle } from "lucide-react";
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

      <div className="container-site relative z-10">
        {/* COMPOSITION ASYMÉTRIQUE : 35% titre & carte contact à gauche, 65% accordéon à droite */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Colonne gauche : Surtitre, Titre compact, description et carte bleu nuit de contact */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
                <span className="w-6 h-[2px] bg-primary"></span>
                <span>Questions fréquentes</span>
              </div>
              <h2
                id="faq-heading"
                className="text-4xl sm:text-5xl lg:text-[46px] font-display font-bold uppercase tracking-tight leading-[0.98] text-[#11114E]"
              >
                Tout savoir sur nos prestations
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-md">
                Des réponses claires pour préparer votre nettoyage en toute sérénité.
              </p>
            </div>

            {/* Carte bleu nuit compacte de contact direct */}
            <div className="rounded-2xl bg-[#11114E] text-white p-5 sm:p-6 shadow-xl space-y-3.5 max-w-md">
              <div className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-white">
                <HelpCircle className="size-4.5 text-primary" />
                <span>Une autre question ?</span>
              </div>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Nous répondons rapidement par téléphone ou sur WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={BUSINESS.phoneTel}
                  className="btn border border-white/20 bg-white/[0.08] hover:bg-white/15 text-white text-xs flex-1 justify-center py-2.5 font-bold"
                >
                  <Phone className="size-3.5" />
                  {BUSINESS.phoneDisplay}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-xs flex-1 justify-center py-2.5 font-bold"
                >
                  <MessageCircle className="size-3.5" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite : Grand accordéon blanc avec séparateurs fins */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 divide-y divide-slate-100 overflow-hidden">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.question} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-[#11114E] hover:text-primary transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="leading-snug">{item.question}</span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-200 ${
                          isOpen ? "bg-primary text-white shadow-xs" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="size-4.5" />
                        ) : (
                          <ChevronDown className="size-4.5" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed pt-0">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
