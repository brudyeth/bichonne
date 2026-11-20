import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageHero, ContactBand } from "@/components/site/Layout";
import { FormulaCards, CareCards } from "@/components/site/Cards";
import { BUSINESS, whatsappLink } from "@/lib/business";
import {
  Sparkles,
  MapPin,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface ServicePageData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  city: string;
  postalCode?: string;
  introParagraphs: string[];
  localFaq: Array<{ question: string; answer: string }>;
  nearbySlugs: string[];
}

const SERVICE_PAGES: Record<string, ServicePageData> = {
  "nettoyage-interieur-voiture-lille": {
    slug: "nettoyage-interieur-voiture-lille",
    title: "Nettoyage intérieur voiture Lille",
    metaTitle: "Nettoyage intérieur voiture Lille (89 €) | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage intérieur auto en profondeur à domicile à Lille : shampouinage sièges et tapis inclus (89 €) ou formule Express dès 69 €. Intervention rapide à domicile ou au travail.",
    h1: "Nettoyage intérieur de voiture à domicile à Lille",
    lead: "Retrouvez un habitacle propre, sain et assaini. Notre formule signature Intérieur Premium comprend l'aspiration intégrale, la protection anti-UV des plastiques et le shampouinage en profondeur des sièges, tapis et moquettes pour 89 € (ou formule Express dès 69 €).",
    city: "Lille",
    postalCode: "59000",
    introParagraphs: [
      "Le nettoyage intérieur d'une voiture demande un savoir-faire et des outils spécifiques pour déloger la poussière incrustée, les taches de café ou d'aliments et les odeurs persistantes. À Lille et dans toute la métropole, Bichonne ta Caisse se déplace directement à votre domicile ou sur votre lieu de travail avec tout le matériel requis.",
      "Contrairement aux stations de lavage traditionnelles, nous prenons le temps d'aspirer minutieusement chaque recoin (coffre, rails de sièges, bacs de portières, pédalier), de nettoyer et protéger les plastiques contre les UV, et d'assainir les fibres textiles grâce au shampouinage professionnel.",
    ],
    localFaq: [
      {
        question: "Le shampouinage des sièges est-il vraiment inclus dans les 89 € ?",
        answer:
          "Oui, absolument. Le shampouinage en profondeur des sièges en tissu, des moquettes et des tapis est intégralement inclus dans notre formule signature Intérieur Premium à 89 € pour tous types de véhicules.",
      },
      {
        question: "Combien de temps faut-il pour le séchage des sièges ?",
        answer:
          "Grâce à notre technique d'extraction puissante, l'eau sale est immédiatement aspirée. Les sièges restent légèrement humides et sèchent généralement en 2 à 4 heures selon la ventilation et la température ambiante.",
      },
    ],
    nearbySlugs: [
      "nettoyage-voiture-domicile-la-madeleine",
      "nettoyage-voiture-domicile-lambersart",
      "nettoyage-voiture-domicile-marcq-en-baroeul",
      "shampoing-sieges-tapis-voiture-lille",
    ],
  },
  "shampoing-sieges-tapis-voiture-lille": {
    slug: "shampoing-sieges-tapis-voiture-lille",
    title: "Shampoing sièges et tapis voiture Lille",
    metaTitle: "Shampoing sièges et moquettes voiture Lille | Bichonne ta Caisse",
    metaDescription:
      "Shampouinage en profondeur par injection-extraction des sièges, tissus et moquettes auto à Lille. Assainissement et élimination des taches à domicile dès 89 €.",
    h1: "Shampoing des sièges et moquettes automobile à Lille",
    lead: "Éliminez les auréoles, taches tenaces et mauvaises odeurs de vos selleries textiles. Un résultat spectaculaire et visible dès le premier passage.",
    city: "Lille",
    postalCode: "59000",
    introParagraphs: [
      "Les tissus automobiles absorbent continuellement la poussière, la sueur, l'humidité et les liquides renversés. Avec le temps, de vilaines auréoles apparaissent et des odeurs d'humidité ou de tabac s'installent dans les mousses de sièges.",
      "Notre protocole d'extraction par shampouineuse injecte une solution nettoyante et dégraissante biodégradable au cœur des fibres avant de l'aspirer instantanément avec toutes les impuretés. Les tissus retrouvent leurs couleurs d'origine et une fraîcheur durable.",
    ],
    localFaq: [
      {
        question: "Les taches anciennes peuvent-elles disparaître ?",
        answer:
          "Notre shampouinage atténue ou fait disparaître la très grande majorité des taches du quotidien. Cependant, selon l'ancienneté de la tache et la nature chimique du produit renversé, de légères décolorations préalables des fibres peuvent subsister.",
      },
      {
        question: "Traitez-vous également les sièges en cuir ou Alcantara ?",
        answer:
          "Oui, les selleries en cuir et en Alcantara font l'objet d'un nettoyage spécifique avec des produits adaptés non agressifs, et nous proposons un soin nourrissant dédié au cuir en supplément (+15 €).",
      },
    ],
    nearbySlugs: [
      "nettoyage-interieur-voiture-lille",
      "nettoyage-voiture-domicile-la-madeleine",
      "nettoyage-voiture-domicile-lambersart",
      "nettoyage-voiture-domicile-wambrechies",
    ],
  },
  "nettoyage-voiture-domicile-wambrechies": {
    slug: "nettoyage-voiture-domicile-wambrechies",
    title: "Nettoyage voiture à domicile Wambrechies",
    metaTitle: "Nettoyage voiture à domicile Wambrechies | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage auto à domicile à Wambrechies (59118) : Intérieur Express dès 69 €, Intérieur Premium avec shampouinage à 89 € et Formule Complète à 139 €. Déplacement offert.",
    h1: "Nettoyage automobile à domicile à Wambrechies",
    lead: "Basé à proximité immédiate de Wambrechies, Bichonne ta Caisse intervient à votre domicile ou sur votre lieu de travail pour redonner une propreté éclatante à votre véhicule.",
    city: "Wambrechies",
    postalCode: "59118",
    introParagraphs: [
      "Habitants de Wambrechies et des bords de Deûle, profitez d'un service d'entretien automobile d'artisan local sans vous déplacer. Que vous soyez garé dans votre allée, votre cour ou sur votre parking de travail, nous venons équipés de tout le matériel professionnel nécessaire.",
      "Bénéficiez du déplacement offert et de nos trois formules transparentes : Intérieur Express à 69 €, Intérieur Premium avec shampouinage des sièges inclus à 89 €, et Formule Complète à 139 €.",
    ],
    localFaq: [
      {
        question: "Le déplacement est-il gratuit à Wambrechies ?",
        answer:
          "Oui, Wambrechies est située en plein cœur de notre zone d'intervention prioritaire : le déplacement est 100% offert.",
      },
      {
        question: "Quelles conditions pour intervenir à Wambrechies ?",
        answer:
          "Nous avons uniquement besoin d'un accès à une prise électrique 220 V standard et d'un point d'eau si vous choisissez un lavage de la carrosserie.",
      },
    ],
    nearbySlugs: [
      "nettoyage-voiture-domicile-marcq-en-baroeul",
      "nettoyage-voiture-domicile-lambersart",
      "nettoyage-voiture-domicile-la-madeleine",
      "nettoyage-interieur-voiture-lille",
    ],
  },
  "nettoyage-voiture-domicile-marcq-en-baroeul": {
    slug: "nettoyage-voiture-domicile-marcq-en-baroeul",
    title: "Nettoyage voiture Marcq-en-Barœul",
    metaTitle: "Nettoyage voiture Marcq-en-Barœul à domicile | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage de voiture à domicile à Marcq-en-Barœul : Intérieur Express dès 69 €, Intérieur Premium avec shampouinage à 89 € et Formule Complète à 139 €. Déplacement offert.",
    h1: "Nettoyage de voiture à domicile à Marcq-en-Barœul",
    lead: "Prenez soin de votre véhicule à Marcq-en-Barœul sans quitter votre domicile. Intervention soignée pour citadines, berlines et SUV haut de gamme.",
    city: "Marcq-en-Barœul",
    postalCode: "59700",
    introParagraphs: [
      "À Marcq-en-Barœul (Bourg, Croisé-Laroche, Quesne, Hippodrome), Bichonne ta Caisse vous propose un service sur mesure adapté à vos contraintes d'emploi du temps. Fini l'attente fastidieuse dans les centres de lavage : pendant que vous travaillez ou profitez de vos proches, nous rénovons votre véhicule sur place.",
      "Nous accordons une attention méticuleuse aux détails : dégraissage des jantes, lavage au gant microfibre sans micro-rayures, et traitement nourrissant des cuirs et plastiques.",
    ],
    localFaq: [
      {
        question: "Les frais de déplacement s'appliquent-ils à Marcq-en-Barœul ?",
        answer:
          "Non, Marcq-en-Barœul se trouve à seulement quelques kilomètres de notre base : le déplacement est totalement gratuit.",
      },
      {
        question: "Pouvez-vous intervenir sur mon lieu de travail à Marcq ?",
        answer:
          "Tout à fait, si le stationnement de votre entreprise permet d'accéder au véhicule et que les autorisations nécessaires sont réunies.",
      },
    ],
    nearbySlugs: [
      "nettoyage-voiture-domicile-la-madeleine",
      "nettoyage-voiture-domicile-wambrechies",
      "nettoyage-voiture-domicile-roubaix",
      "nettoyage-voiture-domicile-tourcoing",
    ],
  },
  "nettoyage-voiture-domicile-lambersart": {
    slug: "nettoyage-voiture-domicile-lambersart",
    title: "Nettoyage voiture Lambersart",
    metaTitle: "Nettoyage voiture Lambersart à domicile | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage automobile à domicile à Lambersart (59130) : formules dès 69 €, intérieur avec shampouinage sièges à 89 € et formule complète à 139 €. Déplacement gratuit.",
    h1: "Nettoyage automobile à domicile à Lambersart",
    lead: "Service premium de detailing et nettoyage automobile à Lambersart. Redonnez à votre voiture la fraîcheur et la propreté du premier jour.",
    city: "Lambersart",
    postalCode: "59130",
    introParagraphs: [
      "Dans tous les quartiers de Lambersart (Canon d'Or, Canteleu, Verghelles), confiez votre voiture à un artisan detailing méticuleux. Notre méthode respecte scrupuleusement la carrosserie et les matériaux intérieurs les plus délicats.",
      "Que vous prépariez votre véhicule pour la vente, une restitution de leasing ou simplement pour le plaisir de rouler dans un habitacle assaini, nous garantissons un résultat impeccable.",
    ],
    localFaq: [
      {
        question: "Combien coûte le nettoyage complet à Lambersart ?",
        answer:
          "La Formule Complète est au tarif fixe de 139 € (intérieur approfondi avec shampouinage sièges + carrosserie extérieure). Le déplacement à Lambersart est offert.",
      },
      {
        question: "Intervenez-vous en résidence ou maison individuelle à Lambersart ?",
        answer:
          "Oui, nous intervenons aussi bien devant une maison individuelle que sur une place de parking privative en résidence, dès lors qu'un accès à une prise 220 V est disponible à proximité.",
      },
    ],
    nearbySlugs: [
      "nettoyage-interieur-voiture-lille",
      "nettoyage-voiture-domicile-la-madeleine",
      "nettoyage-voiture-domicile-wambrechies",
      "nettoyage-voiture-domicile-marcq-en-baroeul",
    ],
  },
  "nettoyage-voiture-domicile-la-madeleine": {
    slug: "nettoyage-voiture-domicile-la-madeleine",
    title: "Nettoyage voiture La Madeleine",
    metaTitle: "Nettoyage voiture La Madeleine à domicile | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage auto à domicile à La Madeleine (59110) : intervention chez vous ou sur votre lieu de travail avec tout le matériel pro. Dès 69 €.",
    h1: "Nettoyage automobile à domicile à La Madeleine",
    lead: "Votre nettoyage automobile à domicile à La Madeleine (59110). Aspiration profonde, injection-extraction des sièges et lavage carrosserie doux.",
    city: "La Madeleine",
    postalCode: "59110",
    introParagraphs: [
      "À La Madeleine, entre le Vieux-Lille et Marcq, le stationnement et le manque de temps compliquent souvent l'entretien régulier de votre voiture. Bichonne ta Caisse se déplace directement à votre adresse pour un nettoyage en profondeur.",
      "Nos formules transparentes conviennent à tous les gabarits de véhicules sans majoration de taille.",
    ],
    localFaq: [
      {
        question: "Le tarif dépend-il de la taille du véhicule à La Madeleine ?",
        answer:
          "Non, nos tarifs sont strictement identiques pour une citadine, une berline, un break ou un grand SUV (69 € Intérieur Express, 89 € Intérieur Premium, 139 € Formule Complète).",
      },
      {
        question: "Combien de temps dure une prestation à domicile à La Madeleine ?",
        answer:
          "Comptez 1 h à 1 h 30 pour l'Intérieur Express, 2 à 3 h pour l'Intérieur Premium avec shampouinage des sièges, et 3 à 5 h pour la Formule Complète.",
      },
    ],
    nearbySlugs: [
      "nettoyage-interieur-voiture-lille",
      "nettoyage-voiture-domicile-marcq-en-baroeul",
      "nettoyage-voiture-domicile-lambersart",
      "nettoyage-voiture-domicile-wambrechies",
    ],
  },
  "nettoyage-voiture-domicile-roubaix": {
    slug: "nettoyage-voiture-domicile-roubaix",
    title: "Nettoyage voiture Roubaix",
    metaTitle: "Nettoyage voiture à domicile Roubaix | Bichonne ta Caisse",
    metaDescription:
      "Service de nettoyage automobile à domicile à Roubaix et environs : Intérieur Express à 69 €, Intérieur Premium avec shampouinage sièges à 89 €, Formule Complète à 139 €. Devis rapide.",
    h1: "Nettoyage automobile à domicile à Roubaix",
    lead: "Nettoyage soigné de voiture chez vous ou au bureau à Roubaix et agglomération. Équipement professionnel d'injection-extraction et finitions manuelles.",
    city: "Roubaix",
    postalCode: "59100",
    introParagraphs: [
      "Vous résidez ou travaillez à Roubaix ? Évitez la perte de temps des stations de lavage et profitez d'une prestation de nettoyage approfondi réalisée directement sur votre stationnement.",
      "Nous traitons efficacement les taches sur les sièges, les poussières incrustées et les saletés extérieures pour redonner tout son éclat à votre véhicule.",
    ],
    localFaq: [
      {
        question: "Y a-t-il des frais de déplacement pour Roubaix ?",
        answer:
          "Roubaix se situe à environ 11 km de notre point de référence : le déplacement est donc 100% offert dans notre rayon de 20 km gratuits.",
      },
      {
        question:
          "Puis-je réserver un nettoyage intérieur avant la vente d'un véhicule à Roubaix ?",
        answer:
          "Oui, l'Intérieur Premium (89 €) et la Formule Complète (139 €) sont particulièrement adaptés pour valoriser un véhicule avant une vente ou une restitution de leasing.",
      },
    ],
    nearbySlugs: [
      "nettoyage-voiture-domicile-tourcoing",
      "nettoyage-voiture-domicile-marcq-en-baroeul",
      "nettoyage-interieur-voiture-lille",
    ],
  },
  "nettoyage-voiture-domicile-tourcoing": {
    slug: "nettoyage-voiture-domicile-tourcoing",
    title: "Nettoyage voiture Tourcoing",
    metaTitle: "Nettoyage voiture à domicile Tourcoing | Bichonne ta Caisse",
    metaDescription:
      "Nettoyage auto à domicile à Tourcoing : formules dès 69 € (Intérieur Express), shampouinage injection-extraction à 89 € et soin complet à 139 €. Devis en ligne.",
    h1: "Nettoyage automobile à domicile à Tourcoing",
    lead: "Intervention de nettoyage automobile à domicile à Tourcoing (59200) et environs. Retrouvez un véhicule impeccable sans bouger de chez vous.",
    city: "Tourcoing",
    postalCode: "59200",
    introParagraphs: [
      "Tourquennois, facilitez-vous la vie avec notre service mobile de nettoyage automobile. Nous intervenons avec notre équipement professionnel chez vous ou sur votre lieu d'activité.",
      "De l'entretien Intérieur Express (69 €) jusqu'à la Formule Complète avec shampouinage des tissus et lavage carrosserie (139 €), nous prenons soin de votre véhicule dans les moindres recoins.",
    ],
    localFaq: [
      {
        question: "Le déplacement est-il offert à Tourcoing ?",
        answer:
          "Oui, Tourcoing est située à environ 12 km de notre point de référence (Place de la République à Lille), ce qui est pleinement compris dans nos 20 km de déplacement gratuit.",
      },
      {
        question: "Proposez-vous aussi l'entretien de véhicules utilitaires à Tourcoing ?",
        answer:
          "Oui, nous intervenons sur les véhicules utilitaires de particuliers et d'entreprises à Tourcoing avec un supplément fixe de 20 €, ou sur devis dédié pour les flottes.",
      },
    ],
    nearbySlugs: [
      "nettoyage-voiture-domicile-roubaix",
      "nettoyage-voiture-domicile-marcq-en-baroeul",
      "nettoyage-voiture-domicile-wambrechies",
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const data = SERVICE_PAGES[params.slug];
    if (!data) {
      throw notFound();
    }
    return data;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    return {
      meta: [
        { title: loaderData.metaTitle },
        { name: "description", content: loaderData.metaDescription },
        { property: "og:site_name", content: "Bichonne ta Caisse" },
        { property: "og:title", content: loaderData.metaTitle },
        { property: "og:description", content: loaderData.metaDescription },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://bichonnetacaisse.fr/services/${loaderData.slug}`,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.metaTitle },
        { name: "twitter:description", content: loaderData.metaDescription },
        { name: "robots", content: "index, follow" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://bichonnetacaisse.fr/services/${loaderData.slug}`,
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const data = Route.useLoaderData();
  const nearbyPages = data.nearbySlugs
    .map((slug) => SERVICE_PAGES[slug])
    .filter((page): page is ServicePageData => Boolean(page));

  const pageUrl = `https://bichonnetacaisse.fr/services/${data.slug}`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: data.h1,
        serviceType: "Nettoyage automobile à domicile",
        url: pageUrl,
        description: data.metaDescription,
        provider: {
          "@type": ["AutoDetailing", "LocalBusiness"],
          "@id": "https://bichonnetacaisse.fr/#organization",
          name: BUSINESS.name,
          url: "https://bichonnetacaisse.fr/",
          telephone: "+33659140939",
        },
        areaServed: {
          "@type": "City",
          name: data.city,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://bichonnetacaisse.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Zones d'intervention",
            item: "https://bichonnetacaisse.fr/zones-intervention",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: data.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <div className="relative overflow-hidden bg-[#11114E] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-[650px] rounded-full bg-[#243888]/22 blur-[150px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 size-[600px] rounded-full bg-[#282A74]/22 blur-[145px]"
        />

        {/* Fil d'Ariane SEO */}
        <nav
          aria-label="Fil d'Ariane"
          className="container-site pt-20 sm:pt-24 text-xs text-white/70 flex flex-wrap items-center gap-1.5 relative z-10"
        >
          <Link to="/" className="hover:text-white transition-colors">
            Accueil
          </Link>
          <ChevronRight className="size-3 text-white/40" aria-hidden="true" />
          <Link to="/zones-intervention" className="hover:text-white transition-colors">
            Zones d'intervention
          </Link>
          <ChevronRight className="size-3 text-white/40" aria-hidden="true" />
          <span className="text-primary font-semibold truncate max-w-xs">{data.title}</span>
        </nav>

        <PageHero transparent eyebrow={`Secteur : ${data.city}`} title={data.h1}>
          <p className="text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
            {data.lead}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/contact" className="btn btn-primary text-sm font-bold px-6 py-2.5">
              <span>Réserver à {data.city}</span>
              <ArrowRight className="size-4 ml-1" />
            </Link>
            <a
              href={whatsappLink(
                `Bonjour, je souhaite un devis pour un nettoyage automobile à ${data.city}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-sm font-bold px-5 py-2.5"
            >
              <MessageCircle className="size-4 mr-1.5" />
              <span>WhatsApp express</span>
            </a>
          </div>
        </PageHero>

        {/* Introduction textuelle */}
        <section className="relative z-10 py-10 md:py-12 border-t border-white/10">
          <div className="container-site max-w-4xl space-y-4 text-xs sm:text-sm text-white/85 leading-relaxed">
            {data.introParagraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      </div>

      {/* Formules de nettoyage */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFBFD] via-[#F4F6FB] to-[#EDF1F7] text-[#11114E] py-10 md:py-14">
        <div className="container-site">
          <div className="max-w-3xl mb-6 sm:mb-8">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1.5">
              <span className="w-6 h-[2px] bg-primary"></span>
              <span>Nos tarifs à {data.city}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-[#11114E]">
              Choisissez votre formule pour {data.city}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Déplacement offert jusqu'à 20 km de Lille (Place de la République). Même tarif pour
              tous les véhicules.
            </p>
          </div>

          <FormulaCards detailed />
        </div>
      </section>

      {/* FAQ locale */}
      {data.localFaq.length > 0 && (
        <section className="bg-white py-10 sm:py-12 border-t border-slate-200">
          <div className="container-site max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-[#11114E] mb-4 sm:mb-5">
              Questions fréquentes à {data.city}
            </h2>
            <div className="space-y-4">
              {data.localFaq.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 p-5 space-y-2">
                  <h3 className="font-bold text-base text-[#11114E]">{faq.question}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Maillage local : communes voisines et retour au répertoire des zones */}
      <section className="bg-[#FAFBFD] py-10 sm:py-12 border-t border-slate-200 text-[#11114E]">
        <div className="container-site max-w-4xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-1">
                <span className="w-5 h-[2px] bg-primary" aria-hidden="true" />
                <span>Maillage local</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase text-[#11114E]">
                Interventions à proximité de {data.city}
              </h2>
            </div>
            <Link
              to="/zones-intervention"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#11114E] hover:text-[#F47721] transition-colors"
            >
              <span>Toutes nos zones d'intervention</span>
              <ArrowRight className="size-4 text-[#F47721]" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {nearbyPages.map((nearby) => (
              <li key={nearby.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: nearby.slug }}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[#E9EDF1] bg-white px-4 py-3 text-sm font-semibold text-[#11114E] hover:border-[#F47721]/50 hover:text-[#F47721] transition-colors"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <MapPin className="size-4 text-[#F47721] shrink-0" aria-hidden="true" />
                    <span className="truncate">{nearby.title}</span>
                  </span>
                  <ArrowRight
                    className="size-4 text-slate-400 group-hover:text-[#F47721] group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Barème de déplacement transparent */}
      <section className="bg-[#11114E] py-14 text-white border-t border-white/10">
        <div className="container-site max-w-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="w-5 h-[2px] bg-primary"></span>
            <span>Zone d'intervention</span>
            <span className="w-5 h-[2px] bg-primary"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
            Déplacement offert jusqu'à 20 km de Lille
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto leading-relaxed">
            Nous intervenons directement sur votre stationnement à {data.city} ({data.postalCode})
            et dans toute la métropole lilloise. Le déplacement est 100% offert jusqu'à 20 km depuis
            la Place de la République à Lille. Au-delà, seuls les kilomètres supplémentaires sont
            facturés 0,50 €/km aller-retour selon la distance routière estimée.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="btn btn-primary inline-flex text-xs uppercase tracking-wider font-bold py-3 px-6 rounded-xl shadow-lg"
            >
              Demander un devis pour {data.city}
            </Link>
            <Link
              to="/zones-intervention"
              className="btn btn-outline-light inline-flex text-xs uppercase tracking-wider font-bold py-3 px-5 rounded-xl"
            >
              Voir toutes nos zones d'intervention
            </Link>
          </div>
        </div>
      </section>

      <ContactBand />
    </>
  );
}
