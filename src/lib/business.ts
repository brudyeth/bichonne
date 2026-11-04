// Source unique des infos entreprise, tarifs et coordonnées.
export const BUSINESS = {
  name: "Bichonne ta Caisse",
  phoneDisplay: "06 59 14 09 39",
  phoneTel: "tel:+33659140939",
  whatsappNumber: "33659140939",
  facebookUrl: "https://www.facebook.com/profile.php?id=61595404295972",
  instagramUrl: "https://www.instagram.com/bichonne.tacaisse/",
  instagramHandle: "@bichonne.tacaisse",
  area: "Métropole lilloise",
  departureAddressNote: "Lille et métropole (59)",
  siret: "[À renseigner]",
  tvaNotice: "TVA non applicable, art. 293 B du CGI",
  googleReviewUrl: "https://g.page/r/bichonnetacaisse/review",
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
    id: "interieur-express",
    name: "Intérieur Express",
    price: 49,
    duration: "1 h à 1 h 30",
    short: "Pour un entretien rapide de votre habitacle.",
    items: [
      "Aspiration de l'habitacle et du coffre",
      "Nettoyage des plastiques intérieurs",
      "Nettoyage de surface des sièges et tissus",
    ],
  },
  {
    id: "interieur-premium",
    name: "Intérieur Premium",
    price: 69,
    duration: "2 à 3 h",
    short: "Pour un nettoyage intérieur en profondeur.",
    items: [
      "Aspiration complète de l'habitacle et du coffre",
      "Nettoyage et dressing des plastiques",
      "Shampoing des sièges et tapis",
      "Nettoyage adapté des surfaces en cuir ou Alcantara",
      "Nettoyage des vitres intérieures",
      "Nettoyage des intérieurs de portes",
      "Traitement anti-odeur",
      "Finitions soignées",
    ],
    notice:
      "En présence de poils d'animaux en grande quantité ou de saletés fortement incrustées dans les tissus et moquettes, un devis personnalisé sera établi. La durée d'intervention pourra être prolongée.",
    highlight: true,
  },
  {
    id: "complet",
    name: "Formule Complète",
    price: 109,
    duration: "3 à 5 h",
    short: "Le soin intégral de votre véhicule, intérieur et extérieur.",
    items: [
      "Intégralité de la formule Intérieur Premium",
      "Prélavage à la mousse active",
      "Lavage manuel de la carrosserie",
      "Nettoyage des jantes",
      "Rinçage",
      "Séchage manuel à la microfibre",
    ],
    notice:
      "Les conditions particulières relatives aux salissures intensives s'appliquent également à cette formule.",
  },
];

// Supplément fixe pour tous les véhicules utilitaires (petits, moyens et grands)
export const UTILITY_VEHICLE_SURCHARGE = 20;

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
  freeRadiusKm: 20,
  ratePerKmRoundTrip: 0.5,
  referenceCity: "Lille",
  departurePoint: {
    name: "Place de la République, Lille",
    address: "Place de la République, 59000 Lille",
    lat: 50.63185,
    lon: 3.06074,
  },
  headline: "Déplacement offert jusqu'à 20 km de Lille",
  subline: "Au-delà : 0,50 €/km supplémentaire aller-retour.",
  notice:
    "Déplacement offert jusqu'à 20 km de Lille. Au-delà : 0,50 €/km supplémentaire aller-retour (selon l'itinéraire routier estimé, communiqué avant confirmation définitive).",
  calculateFee: (distanceOneWayKm: number) => {
    const extraKm = Math.max(0, distanceOneWayKm - 20);
    return Math.round(extraKm * 2 * 0.5 * 100) / 100;
  },
};

export interface LocalCommune {
  name: string;
  postalCode: string;
  distanceKm: number;
}

export const LOCAL_COMMUNES: LocalCommune[] = [
  { name: "Lille", postalCode: "59000", distanceKm: 0 },
  { name: "La Madeleine", postalCode: "59110", distanceKm: 3 },
  { name: "Marcq-en-Barœul", postalCode: "59700", distanceKm: 5 },
  { name: "Lambersart", postalCode: "59130", distanceKm: 4 },
  { name: "Wambrechies", postalCode: "59118", distanceKm: 7 },
  { name: "Saint-André-lez-Lille", postalCode: "59350", distanceKm: 4 },
  { name: "Villeneuve-d'Ascq", postalCode: "59650", distanceKm: 8 },
  { name: "Roubaix", postalCode: "59100", distanceKm: 11 },
  { name: "Tourcoing", postalCode: "59200", distanceKm: 12 },
  { name: "Bondues", postalCode: "59910", distanceKm: 10 },
  { name: "Mouvaux", postalCode: "59420", distanceKm: 9 },
  { name: "Croix", postalCode: "59170", distanceKm: 8 },
  { name: "Wasquehal", postalCode: "59290", distanceKm: 7 },
  { name: "Roncq", postalCode: "59223", distanceKm: 14 },
  { name: "Englos", postalCode: "59320", distanceKm: 7 },
  { name: "Seclin", postalCode: "59113", distanceKm: 12 },
];

export interface ClientReview {
  id: number;
  author: string;
  commune: string;
  date: string;
  comment: string;
  formula: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [];

export const MIN_PRICE = Math.min(...FORMULAS.map((f) => f.price));

export const euro = (n: number) => `${n} €`;

export type WhatsAppLinkInput =
  | string
  | {
      text?: string;
      commune?: string;
      formula?: string;
    };

export function whatsappLink(
  input: WhatsAppLinkInput = "Bonjour, je souhaite un devis pour le nettoyage de mon véhicule.",
): string {
  let message = "Bonjour, je souhaite un devis pour le nettoyage de mon véhicule.";
  if (typeof input === "string") {
    message = input;
  } else if (input && typeof input === "object") {
    if (input.text) {
      message = input.text;
    } else if (input.commune) {
      message = `Bonjour, je souhaite un devis pour un nettoyage automobile à ${input.commune}.`;
    }
  }
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
