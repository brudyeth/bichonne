import { BUSINESS } from "./business";

export type TextileCategory = "canapes" | "matelas" | "sur-devis";

export interface TextilePrestation {
  id: string;
  name: string;
  category: TextileCategory;
  /** Tarif fixe en euros, ou null si la prestation est sur devis */
  price: number | null;
  priceLabel: string;
  unitNote?: string;
  duration: string;
  short: string;
  includes: string[];
  popular?: boolean;
}

export const TEXTILE_PRESTATIONS: TextilePrestation[] = [
  {
    id: "canape-2-3",
    name: "Canapé 2 ou 3 places",
    category: "canapes",
    price: 69,
    priceLabel: "69 €",
    duration: "Environ 1 h",
    short: "Nettoyage complet des assises, dossiers, accoudoirs et coussins en tissu.",
    includes: [
      "Aspiration minutieuse des fibres, coutures et recoins",
      "Pré-détachage ciblé selon la nature des traces",
      "Injection-extraction en profondeur des assises et dossiers",
      "Extraction maximale de l'humidité pour un séchage optimisé",
    ],
    popular: true,
  },
  {
    id: "canape-4-5",
    name: "Canapé 4 ou 5 places",
    category: "canapes",
    price: 89,
    priceLabel: "89 €",
    duration: "Environ 1 h 30",
    short: "Nettoyage intégral pour grand canapé droit familial, méridienne incluse.",
    includes: [
      "Aspiration approfondie de l'ensemble de la structure",
      "Pré-détachage ciblé des zones d'usage et taches localisées",
      "Injection-extraction complète assises, dossiers et accoudoirs",
      "Extraction maximale de l'humidité",
    ],
  },
  {
    id: "fauteuil",
    name: "Fauteuil",
    category: "canapes",
    price: 39,
    priceLabel: "39 €",
    duration: "30 à 45 min",
    short: "Remise au propre complète de votre fauteuil en tissu ou microfibre.",
    includes: [
      "Aspiration des fibres et des plis d'assise",
      "Pré-détachage ciblé des zones sollicitées",
      "Nettoyage en profondeur par injection-extraction",
      "Extraction de l'eau résiduelle",
    ],
  },
  {
    id: "matelas-1",
    name: "Matelas 1 place",
    category: "matelas",
    price: 39,
    priceLabel: "39 €",
    unitNote: "Face de couchage",
    duration: "30 à 45 min",
    short: "Rafraîchissement en profondeur du coutil pour matelas simple (90×190 / 90×200).",
    includes: [
      "Aspiration approfondie des poussières et acariens de surface",
      "Pré-détachage des auréoles et traces d'usage",
      "Injection-extraction adaptée au textile du matelas",
      "Réduction des odeurs et extraction maximale de l'humidité",
    ],
  },
  {
    id: "matelas-2",
    name: "Matelas 2 places",
    category: "matelas",
    price: 59,
    priceLabel: "59 €",
    unitNote: "Face de couchage (140×190 à 180×200)",
    duration: "Environ 1 h",
    short: "Nettoyage complet de votre matelas double ou king size directement dans la chambre.",
    includes: [
      "Aspiration haute dépression sur toute la surface",
      "Pré-détachage ciblé des auréoles de transpiration ou taches",
      "Injection-extraction maîtrisée pour ne pas détremper le garnissage",
      "Atténuation des odeurs et extraction soignée de l'eau",
    ],
  },
  {
    id: "canape-angle-u",
    name: "Canapé d'angle ou en U",
    category: "sur-devis",
    price: null,
    priceLabel: "Sur devis",
    unitNote: "selon ses dimensions",
    duration: "Selon gabarit",
    short: "Tarif établi sur mesure selon le nombre de places, la configuration et la longueur.",
    includes: [
      "Estimation gratuite et rapide sur photo ou descriptif",
      "Même protocole complet : aspiration, pré-détachage et injection-extraction",
      "Traitement homogène de la méridienne et des retours d'angle",
    ],
  },
  {
    id: "tapis-moquette-chaises",
    name: "Tapis, moquette et chaises",
    category: "sur-devis",
    price: null,
    priceLabel: "Sur devis",
    unitNote: "selon les dimensions ou la quantité",
    duration: "Selon surface / quantité",
    short: "Tapis de salon, moquette de pièce ou lot de chaises en tissu nettoyés sur place.",
    includes: [
      "Devis gratuit adapté à la surface (m²) ou au nombre d'assises",
      "Aspiration et brossage mécanique des fibres",
      "Injection-extraction pour raviver les couleurs et éliminer la saleté",
    ],
  },
];

export const TEXTILE_FIXED_PRESTATIONS = TEXTILE_PRESTATIONS.filter((p) => p.price !== null);
export const TEXTILE_QUOTE_PRESTATIONS = TEXTILE_PRESTATIONS.filter((p) => p.price === null);

export interface TextileOption {
  id: string;
  name: string;
  price: number;
  short: string;
}

export const TEXTILE_OPTIONS: TextileOption[] = [];

export const TEXTILE_STEAM_OPTION = {
  id: "traitement-vapeur",
  name: "Traitement vapeur",
  pricePerItem: 10,
  priceLabel: "+10 €",
  unitLabel: "par élément traité",
  unitNote: "Tarif par élément traité",
  short:
    "Un soin complémentaire à la vapeur pour une hygiène renforcée. La chaleur aide à réduire la présence d'acariens en surface, à décoller certaines salissures et à rafraîchir vos textiles.",
} as const;

export interface TextileSteamEstimateInput {
  /** Quantités sélectionnées par prestation à tarif fixe (id -> quantité >= 0) */
  quantities: Record<string, number>;
  /** Prestations sur devis sélectionnées (ex. canapé d'angle, tapis/chaises) */
  quoteIds?: string[];
  /** Option traitement vapeur activée par le client (jamais true par défaut) */
  steamEnabled: boolean;
  /** Nombre d'éléments à traiter à la vapeur par prestation fixe (id -> 0..qty) */
  steamQuantities: Record<string, number>;
  /** Nombre d'éléments supplémentaires à traiter à la vapeur (cas sur devis uniquement) */
  steamCustomCount?: number;
}

export interface TextileOrderLine {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  steamCount: number;
  steamSubtotal: number;
}

export interface TextileEstimateResult {
  fixedLines: TextileOrderLine[];
  quoteItems: TextilePrestation[];
  totalFixedPieces: number;
  fixedSubtotal: number;
  steamPiecesCount: number;
  steamSurcharge: number;
  /** Total chiffré (prestations fixes + supplément vapeur), ou 0 si uniquement sur devis sans vapeur */
  baseTotal: number;
  hasQuoteOnlyItems: boolean;
  isQuoteOnlyOrder: boolean;
}

/**
 * Calcule le détail d'une commande textile (multi-pièces) et le supplément
 * traitement vapeur à 10 € par élément traité.
 */
export function calculateTextileEstimate(input: TextileSteamEstimateInput): TextileEstimateResult {
  const fixedLines: TextileOrderLine[] = [];

  for (const item of TEXTILE_FIXED_PRESTATIONS) {
    const qty = Math.max(0, Math.floor(input.quantities[item.id] ?? 0));
    if (qty <= 0 || item.price === null) continue;

    const rawSteam = input.steamEnabled
      ? Math.max(0, Math.floor(input.steamQuantities[item.id] ?? 0))
      : 0;
    const steamCount = Math.min(rawSteam, qty);

    fixedLines.push({
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: qty,
      subtotal: item.price * qty,
      steamCount,
      steamSubtotal: steamCount * TEXTILE_STEAM_OPTION.pricePerItem,
    });
  }

  const quoteIdSet = new Set(input.quoteIds ?? []);
  const quoteItems = TEXTILE_QUOTE_PRESTATIONS.filter((p) => quoteIdSet.has(p.id));

  const totalFixedPieces = fixedLines.reduce((acc, line) => acc + line.quantity, 0);
  const fixedSubtotal = fixedLines.reduce((acc, line) => acc + line.subtotal, 0);

  const fixedSteamCount = fixedLines.reduce((acc, line) => acc + line.steamCount, 0);
  const extraSteamCount =
    input.steamEnabled && totalFixedPieces === 0
      ? Math.max(0, Math.floor(input.steamCustomCount ?? 0))
      : 0;

  const steamPiecesCount = fixedSteamCount + extraSteamCount;
  const steamSurcharge = steamPiecesCount * TEXTILE_STEAM_OPTION.pricePerItem;

  const hasQuoteOnlyItems = quoteItems.length > 0;
  const isQuoteOnlyOrder = totalFixedPieces === 0;

  return {
    fixedLines,
    quoteItems,
    totalFixedPieces,
    fixedSubtotal,
    steamPiecesCount,
    steamSurcharge,
    baseTotal: fixedSubtotal + steamSurcharge,
    hasQuoteOnlyItems,
    isQuoteOnlyOrder,
  };
}

export const TEXTILE_PROCESS_STEPS = [
  {
    step: "01",
    title: "Aspiration préalable",
    description:
      "Retrait soigné des poussières, miettes, poils d'animaux et particules logées dans les coutures et plis du tissu.",
  },
  {
    step: "02",
    title: "Pré-détachage ciblé",
    description:
      "Application d'un nettoyant textile adapté aux fibres et brossage doux sur les taches repérées et zones d'appui.",
  },
  {
    step: "03",
    title: "Injection-extraction",
    description:
      "Injection d'eau et de solution détergente textile dans l'épaisseur de la fibre, immédiatement ré-aspirée avec les salissures.",
  },
  {
    step: "04",
    title: "Extraction & séchage",
    description:
      "Passes de séchage par aspiration puissante pour limiter l'humidité résiduelle (comptez 3 à 6 h de séchage selon la pièce).",
  },
] as const;

export const TEXTILE_HONEST_NOTICE =
  "Le nettoyage par injection-extraction ravive les fibres, extrait les salissures incrustées et atténue les odeurs du quotidien. Selon l'ancienneté des taches, les colorants ou la nature du tissu, certaines traces très anciennes peuvent être atténuées sans disparaître à 100 %.";

export const TEXTILE_MIN_PRICE = Math.min(
  ...TEXTILE_FIXED_PRESTATIONS.map((p) => p.price as number),
);

export function getTextileWhatsappLink(itemName?: string): string {
  const message = itemName
    ? `Bonjour, je souhaite un devis à domicile pour : ${itemName} (Bichonne ta Caisse).`
    : "Bonjour, je souhaite un devis pour un nettoyage de canapé, matelas ou textile à domicile (Bichonne ta Caisse).";
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
