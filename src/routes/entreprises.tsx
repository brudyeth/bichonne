import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero, ContactBand } from "@/components/site/Layout";
import { BUSINESS, whatsappLink } from "@/lib/business";
import {
  Building2,
  Car,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/entreprises")({
  head: () => ({
    meta: [
      {
        title: "Nettoyage Flottes & Véhicules Pro Lille | Bichonne ta Caisse",
      },
      {
        name: "description",
        content:
          "Service de nettoyage automobile sur site pour entreprises, flottes pro et comités d'entreprise à Lille et métropole. Devis rapide, facture avec TVA.",
      },
      { property: "og:site_name", content: "Bichonne ta Caisse" },
      {
        property: "og:title",
        content: "Nettoyage Flottes & Véhicules Pro Lille | Bichonne ta Caisse",
      },
      {
        property: "og:description",
        content:
          "Entreprises & Flottes : nettoyage automobile professionnel sur votre parking d'entreprise dans toute la métropole lilloise.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bichonnetacaisse.fr/entreprises" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://bichonnetacaisse.fr/entreprises" }],
  }),
  component: EntreprisesPage,
});

const B2B_ADVANTAGES = [
  {
    icon: Building2,
    title: "Sur votre parking",
    subtitle: "ZÉRO DÉPLACEMENT DE COLLABORATEURS",
    text: "Nous intervenons directement sur le parking de votre société ou sur votre site d'activité sans immobiliser vos équipes.",
  },
  {
    icon: Clock,
    title: "Optimisation du temps",
    subtitle: "RENDEZ-VOUS GROUPÉS",
    text: "Possibilité de traiter plusieurs véhicules dans la même demi-journée ou journée selon votre planning d'entreprise.",
  },
  {
    icon: FileText,
    title: "Facturation pro claire",
    subtitle: "DEVIS & FACTURATION CONFORME",
    text: "Devis préalable détaillé, facturation centralisée pour votre comptabilité et suivi sur mesure.",
  },
  {
    icon: Sparkles,
    title: "Image de marque soignée",
    subtitle: "VÉHICULES PRO IRRÉPROCHABLES",
    text: "Des véhicules commerciaux, de direction ou de fonction impeccables pour valoriser l'image de votre société auprès de vos clients.",
  },
];

const B2B_OFFERS = [
  {
    title: "Nettoyage de flottes commerciales",
    desc: "Entretien régulier ou ponctuel de vos citadines et utilitaires d'entreprise. Dépoussiérage, désinfection de l'habitacle et lavage soigné.",
    highlight: "Pour 2 à 15+ véhicules",
  },
  {
    title: "Véhicules de direction & fonction",
    desc: "Formule esthétique approfondie avec shampoing des selleries, soin des cuirs et finition minutieuse pour vos cadres et dirigeants.",
    highlight: "Prestation haut de gamme",
  },
  {
    title: "Remise en état avant restitution leasing (LOA/LLD)",
    desc: "Nettoyage en profondeur intérieur et extérieur pour éviter les pénalités et frais de dépréciation exorbitants lors de la restitution.",
    highlight: "Économies substantielles",
  },
  {
    title: "Avantage salarié & Comité d'Entreprise (CSE)",
    desc: "Journée « Bichonnage » organisée sur site : vos salariés profitent du nettoyage de leur véhicule personnel pendant leurs heures de bureau.",
    highlight: "Avantage bien-être au travail",
  },
];

function EntreprisesPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-[#11114E] text-white">
        {/* Halos subtils */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[650px] rounded-full bg-[#243888]/22 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[600px] rounded-full bg-[#282A74]/22 blur-[145px]"
        />

        <PageHero
          transparent
          eyebrow="Solutions B2B & Professionnels"
          title="Nettoyage automobile sur site pour entreprises & flottes à Lille"
        >
          <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
            Valorisez l'image de votre entreprise sans perte de temps. Nous nous déplaçons
            directement sur le parking de votre société à Lille, Wambrechies et dans toute la
            métropole avec tout notre équipement professionnel.
          </p>
        </PageHero>

        {/* 4 Avantages B2B */}
        <section className="relative z-10 py-12 md:py-16 border-t border-white/10">
          <div className="container-site">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {B2B_ADVANTAGES.map((a) => (
                <div
                  key={a.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-primary mb-4">
                      <a.icon className="size-5" />
                    </div>
                    <h2 className="font-display text-lg font-bold uppercase tracking-tight text-white">
                      {a.title}
                    </h2>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-primary mt-1 mb-2.5">
                      {a.subtitle}
                    </p>
                    <p className="text-xs sm:text-sm text-white/75 leading-relaxed">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Offres détaillées B2B */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-16 md:py-24">
        <div className="container-site">
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Nos prestations pour professionnels</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-[#11114E]">
              Des solutions adaptées à vos besoins d'entreprise
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Chaque parc automobile a ses spécificités. Nous établissons un devis clair et
              personnalisé sous 24 à 48 heures.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {B2B_OFFERS.map((o) => (
              <div
                key={o.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-3">
                    {o.highlight}
                  </span>
                  <h3 className="font-display text-xl font-bold uppercase text-[#11114E]">
                    {o.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">{o.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Tarification sur devis
                  </span>
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-primary hover:text-[#11114E] flex items-center gap-1"
                  >
                    <span>Demander une étude</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Encadré d'appel à l'action B2B */}
          <div className="mt-14 rounded-2xl bg-[#11114E] text-white p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Contact Entreprises dédié
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                Besoin d'un devis pour votre parc automobile ?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Indiquez le nombre de véhicules, l'adresse de votre site et le type de prestation
                souhaité. Nous vous répondons très rapidement avec une proposition sur mesure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={BUSINESS.phoneTel}
                className="btn border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-5 justify-center"
              >
                <Phone className="size-4 text-primary mr-1" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <Link
                to="/contact"
                className="btn btn-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3 px-6 justify-center"
              >
                <span>Demander un devis pro</span>
                <ArrowRight className="size-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
