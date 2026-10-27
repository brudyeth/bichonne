// Source unique des infos entreprise, tarifs et coordonnées.
export const BUSINESS = {
  name: "Bichonne ta Caisse",
  phoneDisplay: "06 59 14 09 39",
  phoneTel: "tel:+33659140939",
  whatsappNumber: "33659140939",
  facebookUrl: "https://www.facebook.com/profile.php?id=61595404295972",
  instagramUrl: "https://www.instagram.com/bicho.nnetacaisse/",
  area: "Métropole lilloise",
};

export type Formula = {
  id: string;
  name: string;
  price: number;
  duration: string;
  short: string;
  items: string[];
  notice?: string;
  highlight?: boolean;
};

export const FORMULAS: Formula[] = [
  {
    id: "exterieur",
    name: "Nettoyage extérieur",
    price: 49,
    duration: "1 h à 1 h 30",
    short: "Un nettoyage minutieux pour redonner éclat et propreté à votre carrosserie.",
    items: [
      "Prélavage à la mousse active",
      "Traitement démoustiquant de la carrosserie",
      "Lavage manuel au gant microfibre",
      "Nettoyage et dégraissage des jantes",
      "Rinçage complet de la carrosserie",
      "Séchage manuel à la microfibre",
    ],
  },
  {
    id: "interieur",
    name: "Nettoyage intérieur",
    price: 69,
    duration: "2 à 3 h",
    short: "Un nettoyage en profondeur pour retrouver un habitacle propre, frais et soigné.",
    items: [
      "Aspiration complète de l'habitacle et du coffre",
      "Nettoyage et dressing des plastiques intérieurs",
      "Shampoing des sièges, tissus, tapis et moquettes",
      "Nettoyage adapté des surfaces en cuir et Alcantara",
      "Nettoyage des vitres intérieures",
      "Nettoyage des intérieurs de portes et des encadrements",
      "Traitement des mauvaises odeurs",
    ],
    notice:
      "En présence de poils d'animaux en grande quantité ou de saletés fortement incrustées dans les tissus et moquettes, un devis personnalisé sera établi. La durée d'intervention pourra être prolongée.",
  },
  {
    id: "complet",
    name: "Nettoyage complet",
    price: 109,
    duration: "3 à 5 h",
    short:
      "La formule tout-en-un pour prendre soin de votre véhicule, à l'intérieur comme à l'extérieur.",
    items: [
      "Toutes les prestations du Nettoyage Extérieur",
      "Toutes les prestations du Nettoyage Intérieur",
    ],
    notice:
      "Les conditions particulières relatives aux salissures intensives s'appliquent également à cette formule.",
    highlight: true,
  },
];

export type Care = {
  id: string;
  name: string;
  price: number;
  short: string;
  note?: string;
  icon: "paw-print" | "sparkles";
};

export const CARES: Care[] = [
  {
    id: "poils-sale",
    name: "Poils d'animaux / Véhicule très sale",
    price: 15,
    short: "Supplément pour un nettoyage nécessitant une attention particulière.",
    icon: "paw-print",
  },
  {
    id: "soin-cuir",
    name: "Soin nourrissant des cuirs",
    price: 15,
    short:
      "Application d'un soin spécifique pour nourrir, assouplir et préserver les surfaces en cuir.",
    icon: "sparkles",
  },
];

export const INTENSIVE_DIRT_NOTICE =
  "En cas de dépoilage intensif ou de résidus fortement incrustés dans les tissus et moquettes (épines végétales, débris tenaces, etc.), un devis personnalisé sera établi selon le travail nécessaire.";

export const TRAVEL_CONDITIONS = {
  freeRadiusKm: 15,
  ratePerKmRoundTrip: 0.5,
  referenceCity: "Lille",
  headline: "Déplacement offert jusqu'à 15 km autour de Lille",
  subline: "Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km, aller-retour.",
  notice:
    "Déplacement offert jusqu'à 15 km autour de Lille. Au-delà, seuls les kilomètres supplémentaires sont facturés à 0,50 €/km, aller-retour (selon l'itinéraire routier, communiqué avant confirmation définitive).",
  calculateFee: (distanceOneWayKm: number) => {
    const extraKm = Math.max(0, distanceOneWayKm - 15);
    return Math.round(extraKm * 2 * 0.5 * 100) / 100;
  },
};

export const MIN_PRICE = Math.min(...FORMULAS.map((f) => f.price));

export const euro = (n: number) => `${n} €`;

export const whatsappLink = (
  text = "Bonjour, je souhaite un devis pour le nettoyage de mon véhicule.",
) => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
