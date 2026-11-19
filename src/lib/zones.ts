// Répertoire centralisé et extensible des communes desservies par Bichonne ta Caisse.
// Pour ajouter une commune ou activer le lien vers une nouvelle page locale,
// il suffit de mettre à jour le tableau INTERVENTION_ZONES ci-dessous.

export type InterventionSectorId =
  "lille-premiere-couronne" | "val-de-deule-nord" | "roubaix-tourcoing-est";

export interface InterventionSector {
  id: InterventionSectorId;
  label: string;
  description: string;
}

export interface InterventionZone {
  id: string;
  name: string;
  postalCode: string;
  sector: InterventionSectorId;
  /** Distance routière indicative depuis la Place de la République (Lille) */
  distanceKm: number;
  /** Slug exact dans /services/$slug si une page locale dédiée existe déjà */
  localPageSlug?: string;
}

export const INTERVENTION_SECTORS: readonly InterventionSector[] = [
  {
    id: "lille-premiere-couronne",
    label: "Lille et première couronne",
    description: "Intervention rapide à domicile ou sur lieu de travail au cœur de la métropole.",
  },
  {
    id: "val-de-deule-nord",
    label: "Val de Deûle et Nord métropole",
    description: "Communes résidentielles et zones d'activités au nord de Lille.",
  },
  {
    id: "roubaix-tourcoing-est",
    label: "Secteur Roubaix – Tourcoing et Est lillois",
    description: "Déplacement offert sur tout le versant nord-est et l'est de la métropole.",
  },
] as const;

export const INTERVENTION_ZONES: readonly InterventionZone[] = [
  // Lille et première couronne (ordre alphabétique)
  {
    id: "la-madeleine",
    name: "La Madeleine",
    postalCode: "59110",
    sector: "lille-premiere-couronne",
    distanceKm: 3,
    localPageSlug: "nettoyage-voiture-domicile-la-madeleine",
  },
  {
    id: "lambersart",
    name: "Lambersart",
    postalCode: "59130",
    sector: "lille-premiere-couronne",
    distanceKm: 4,
    localPageSlug: "nettoyage-voiture-domicile-lambersart",
  },
  {
    id: "lille",
    name: "Lille",
    postalCode: "59000",
    sector: "lille-premiere-couronne",
    distanceKm: 0,
    localPageSlug: "nettoyage-interieur-voiture-lille",
  },
  {
    id: "saint-andre-lez-lille",
    name: "Saint-André-lez-Lille",
    postalCode: "59350",
    sector: "lille-premiere-couronne",
    distanceKm: 4,
  },

  // Val de Deûle et Nord métropole (ordre alphabétique)
  {
    id: "bondues",
    name: "Bondues",
    postalCode: "59910",
    sector: "val-de-deule-nord",
    distanceKm: 10,
  },
  {
    id: "marcq-en-baroeul",
    name: "Marcq-en-Barœul",
    postalCode: "59700",
    sector: "val-de-deule-nord",
    distanceKm: 5,
    localPageSlug: "nettoyage-voiture-domicile-marcq-en-baroeul",
  },
  {
    id: "marquette-lez-lille",
    name: "Marquette-lez-Lille",
    postalCode: "59520",
    sector: "val-de-deule-nord",
    distanceKm: 5,
  },
  {
    id: "mouvaux",
    name: "Mouvaux",
    postalCode: "59420",
    sector: "val-de-deule-nord",
    distanceKm: 9,
  },
  {
    id: "wambrechies",
    name: "Wambrechies",
    postalCode: "59118",
    sector: "val-de-deule-nord",
    distanceKm: 7,
    localPageSlug: "nettoyage-voiture-domicile-wambrechies",
  },

  // Secteur Roubaix – Tourcoing et Est lillois (ordre alphabétique)
  {
    id: "croix",
    name: "Croix",
    postalCode: "59170",
    sector: "roubaix-tourcoing-est",
    distanceKm: 8,
  },
  {
    id: "roncq",
    name: "Roncq",
    postalCode: "59223",
    sector: "roubaix-tourcoing-est",
    distanceKm: 14,
  },
  {
    id: "roubaix",
    name: "Roubaix",
    postalCode: "59100",
    sector: "roubaix-tourcoing-est",
    distanceKm: 11,
    localPageSlug: "nettoyage-voiture-domicile-roubaix",
  },
  {
    id: "tourcoing",
    name: "Tourcoing",
    postalCode: "59200",
    sector: "roubaix-tourcoing-est",
    distanceKm: 12,
    localPageSlug: "nettoyage-voiture-domicile-tourcoing",
  },
  {
    id: "villeneuve-d-ascq",
    name: "Villeneuve-d'Ascq",
    postalCode: "59650",
    sector: "roubaix-tourcoing-est",
    distanceKm: 8,
  },
  {
    id: "wasquehal",
    name: "Wasquehal",
    postalCode: "59290",
    sector: "roubaix-tourcoing-est",
    distanceKm: 7,
  },
] as const;

export function getInterventionZonesBySector() {
  return INTERVENTION_SECTORS.map((sector) => ({
    ...sector,
    communes: INTERVENTION_ZONES.filter((zone) => zone.sector === sector.id).sort((a, b) =>
      a.name.localeCompare(b.name, "fr"),
    ),
  }));
}
