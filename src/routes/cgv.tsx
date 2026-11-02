import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { BUSINESS, TRAVEL_CONDITIONS, FORMULAS } from "@/lib/business";
import { ShieldCheck, Phone, Mail, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente (CGV) — Bichonne ta Caisse" },
      {
        name: "description",
        content:
          "Consultez les Conditions Générales de Vente (CGV) des prestations de nettoyage automobile à domicile de Bichonne ta Caisse à Lille et métropole.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      { property: "og:title", content: "Conditions Générales de Vente (CGV) — Bichonne ta Caisse" },
      {
        property: "og:description",
        content:
          "Conditions Générales de Vente applicables aux prestations de nettoyage automobile à domicile.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/cgv" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/cgv" }],
  }),
  component: CGVPage,
});

function CGVPage() {
  return (
    <>
      <PageHero
        eyebrow="Cadre contractuel & Transparence"
        title="Conditions Générales de Vente (CGV)"
      >
        <p>
          En vigueur au 1er janvier 2025. Ces conditions régissent les prestations de nettoyage
          automobile à domicile fournies par {BUSINESS.name}.
        </p>
      </PageHero>

      <section className="container-site max-w-4xl py-14">
        <div className="rounded-2xl border border-white/10 bg-white p-6 sm:p-10 text-[#11114E] shadow-2xl space-y-8 text-sm leading-relaxed">
          {/* Note préalable sur les informations à compléter */}
          <div className="rounded-xl border border-primary/20 bg-[#FFF6EE] p-4 text-xs space-y-1">
            <p className="font-bold text-primary">Informations légales de l'entreprise :</p>
            <p className="text-slate-700">
              {BUSINESS.name} — Siège social : {BUSINESS.departureAddressNote} — SIRET :{" "}
              {BUSINESS.siret}. {BUSINESS.tvaNotice}.
            </p>
          </div>

          {/* Article 1 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 1 — Champ d'application & Objet
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) s'appliquent sans restriction ni
              réserve à l'ensemble des prestations de nettoyage, préparation esthétique, aspiration
              et shampouinage automobile à domicile proposées par {BUSINESS.name} auprès de clients
              particuliers et professionnels situés dans la métropole lilloise.
            </p>
            <p>
              Toute validation de devis ou confirmation de rendez-vous implique l'acceptation pleine
              et entière des présentes CGV par le Client.
            </p>
          </div>

          {/* Article 2 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 2 — Prestations & Devis
            </h2>
            <p>
              {BUSINESS.name} propose trois formules principales : Nettoyage extérieur (49 €),
              Nettoyage intérieur avec shampoing inclus (69 €), et Nettoyage complet (109 €), ainsi
              que des prestations complémentaires (poils d'animaux, soin nourrissant des cuirs,
              etc.).
            </p>
            <p>
              En cas d'état d'encrassement exceptionnel (salissures intensives, boue incrustée,
              poils d'animaux en quantité abondante, débris végétaux tenaces), un devis rectificatif
              est établi et soumis à l'approbation du Client avant le démarrage de l'intervention.
            </p>
          </div>

          {/* Article 3 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 3 — Tarifs, Frais de déplacement & Modalités de paiement
            </h2>
            <p>
              Les prix sont exprimés en euros (€). Conformément à l'article 293 B du Code Général
              des Impôts :{" "}
              <strong>
                [À COMPLÉTER PAR LE PROPRIÉTAIRE : mention exacte de TVA, ex. TVA non applicable,
                art. 293 B du CGI]
              </strong>
              .
            </p>
            <p>
              <strong>Frais de déplacement :</strong> Le déplacement est offert jusqu'à 15 km autour
              de Lille. Au-delà, une participation de 0,50 €/km aller-retour est facturée sur les
              seuls kilomètres excédentaires.
            </p>
            <p>
              <strong>Modalités de paiement :</strong> Le règlement intervient sur place à la fin de
              la prestation après vérification du résultat par le Client. Moyens acceptés :{" "}
              <strong>
                [À COMPLÉTER PAR LE PROPRIÉTAIRE : ex. espèces, carte bancaire, virement instantané,
                chèque]
              </strong>
              .
            </p>
          </div>

          {/* Article 4 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 4 — Prérequis d'intervention & Obligations du Client
            </h2>
            <p>Pour assurer le bon déroulement de l'intervention, le Client s'engage à :</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
              <li>
                Fournir un accès sécurisé à une prise électrique 220 V classique à proximité du
                véhicule.
              </li>
              <li>
                Fournir un point d'eau accessible si la formule souscrite comprend un lavage
                extérieur.
              </li>
              <li>
                Mettre à disposition un emplacement de stationnement permettant l'ouverture complète
                des portières sans danger.
              </li>
              <li>
                Vider le véhicule de tout objet de valeur, argent, effets personnels ou objets
                fragiles avant l'arrivée du technicien.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              [À COMPLÉTER PAR LE PROPRIÉTAIRE : politique en cas d'absence d'accès eau/électricité
              ou solution alternative disponible].
            </p>
          </div>

          {/* Article 5 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 5 — Annulation, Report & Conditions météorologiques
            </h2>
            <p>
              <strong>Annulation par le Client :</strong> [À COMPLÉTER PAR LE PROPRIÉTAIRE : délai
              de prévenance souhaité, ex. sans frais jusqu'à 24 h avant l'intervention].
            </p>
            <p>
              <strong>Conditions météorologiques :</strong> En cas de conditions météo défavorables
              (pluie soutenue, gel, neige, fortes chaleurs) empêchant un nettoyage extérieur
              conforme aux règles de l'art, {BUSINESS.name} se réserve le droit de reporter le
              rendez-vous en accord avec le Client, sans pénalité de part ni d'autre.
            </p>
          </div>

          {/* Article 6 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 6 — Responsabilité & Assurances
            </h2>
            <p>
              {BUSINESS.name} met en œuvre tout son savoir-faire et du matériel professionnel adapté
              pour exécuter la prestation dans le respect des matériaux.
            </p>
            <p>
              Un état des lieux contradictoire sommaire du véhicule peut être réalisé avant
              intervention. {BUSINESS.name} ne saurait être tenu responsable des dégradations,
              rayures antérieures, déchirures de tissus usés ou éléments mécaniques défaillants
              antérieurs à l'intervention.
            </p>
            <p>
              <strong>Assurance Responsabilité Civile Professionnelle :</strong> [À COMPLÉTER PAR LE
              PROPRIÉTAIRE : nom de la compagnie d'assurance et n° de police].
            </p>
          </div>

          {/* Article 7 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 7 — Garantie satisfaction & Réclamations
            </h2>
            <p>
              Le Client est invité à vérifier le résultat en présence du technicien dès l'achèvement
              des opérations.
            </p>
            <p>
              En cas de réserve ou si un point d'attention a échappé à la vigilance de l'opérateur,{" "}
              {BUSINESS.name} s'engage à proposer une retouche offerte.{" "}
              <strong>
                [À COMPLÉTER PAR LE PROPRIÉTAIRE : délai de réclamation, ex. réclamation recevable
                dans les 48 heures suivant l'intervention par e-mail ou téléphone]
              </strong>
              .
            </p>
          </div>

          {/* Article 8 */}
          <div className="space-y-3">
            <h2 className="text-xl font-display font-bold uppercase tracking-tight text-[#11114E] border-b border-slate-200 pb-2">
              Article 8 — Médiation de la consommation & Droit applicable
            </h2>
            <p>
              Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, en cas de
              litige non résolu à l'amiable, le Client a la possibilité de recourir gratuitement à
              un médiateur de la consommation.
            </p>
            <p>
              <strong>Coordonnées du médiateur désigné :</strong> [À COMPLÉTER PAR LE PROPRIÉTAIRE :
              nom et site web du médiateur de la consommation agréé].
            </p>
            <p>
              Les présentes CGV sont soumises à la loi française. En cas de contestation, les
              tribunaux compétents du ressort du siège social seront seuls compétents.
            </p>
          </div>

          {/* Contact bas de page */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-bold text-[#11114E]">Une question sur nos conditions ?</p>
              <p className="text-xs text-slate-600">
                Contactez-nous directement pour toute précision.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={BUSINESS.phoneTel}
                className="btn border border-slate-300 hover:border-[#11114E] text-xs font-bold py-2 px-4"
              >
                <Phone className="size-3.5 mr-1 text-primary" />
                {BUSINESS.phoneDisplay}
              </a>
              <Link to="/contact" className="btn btn-primary text-xs font-bold py-2 px-4">
                <span>Demander un devis</span>
                <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
