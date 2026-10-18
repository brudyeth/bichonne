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
  short: string;
  items: string[];
  highlight?: boolean;
};

export const FORMULAS: Formula[] = [
  {
    id: "exterieur",
    name: "Nettoyage extérieur",
    price: 49,
    short:
      "Lavage professionnel et respectueux de la carrosserie, avec une méthode adaptée pour limiter le risque de micro-rayures. Nettoyage des roues inclus.",
    items: [
      "Lavage professionnel et respectueux de la carrosserie",
      "Nettoyage des roues et jantes inclus",
      "Nettoyage des vitres extérieures",
      "Séchage soigné",
    ],
  },
  {
    id: "interieur",
    name: "Nettoyage intérieur",
    price: 69,
    short:
      "Un nettoyage minutieux de l'habitacle, des surfaces aux textiles, avec un traitement vapeur si nécessaire, adapté aux matériaux.",
    items: [
      "Aspiration complète de l'habitacle et du coffre",
      "Nettoyage soigné des tissus : produit adapté appliqué à la brosse",
      "Traitement vapeur si nécessaire, adapté aux matériaux",
      "Dépoussiérage et nettoyage des plastiques",
      "Nettoyage des vitres intérieures",
    ],
  },
  {
    id: "complet",
    name: "Nettoyage complet",
    price: 109,
    short: "L'intérieur et l'extérieur réunis en une seule intervention.",
    items: [
      "Tout le contenu de la formule intérieur",
      "Tout le contenu de la formule extérieur",
      "Une seule intervention à domicile",
    ],
    highlight: true,
  },
];

export type Care = {
  id: string;
  name: string;
  price: number;
  short: string;
  note?: string;
  icon: "layers" | "shield-check" | "wind" | "sparkles" | "paw-print";
};

export const CARES: Care[] = [
  {
    id: "plastiques-int",
    name: "Rénovation des plastiques intérieurs",
    price: 20,
    short: "Redonnez profondeur et éclat aux surfaces intérieures.",
    icon: "layers",
  },
  {
    id: "plastiques-ext",
    name: "Rénovation des plastiques extérieurs",
    price: 20,
    short: "Ravivez les plastiques ternis pour une finition soignée.",
    icon: "shield-check",
  },
  {
    id: "anti-odeurs",
    name: "Traitement anti-odeurs",
    price: 15,
    short: "Ciblez les odeurs persistantes dans l'habitacle.",
    icon: "wind",
  },
  {
    id: "soin-cuir",
    name: "Soin du cuir",
    price: 15,
    short: "Nourrissez et ravivez l'éclat du cuir pour lui redonner une apparence soignée.",
    icon: "sparkles",
  },
  {
    id: "depoilage",
    name: "Dépoilage intensif",
    price: 15,
    short: "Éliminez les poils d'animaux en quantité sur les sièges et moquettes.",
    note: "Tarif confirmé avant intervention selon l'état du véhicule.",
    icon: "paw-print",
  },
];

export const MIN_PRICE = Math.min(...FORMULAS.map((f) => f.price));

export const euro = (n: number) => `${n} €`;

export const whatsappLink = (
  text = "Bonjour, je souhaite un devis pour le nettoyage de mon véhicule.",
) => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(text)}`;
