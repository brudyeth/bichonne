export type AutoFormulaIconId = "interieur-express" | "interieur-premium" | "complet";

interface AutoFormulaLineIconProps {
  id: string;
  className?: string;
}

/**
 * Illustrations vectorielles minimalistes (line art, traits fins, sans remplissage)
 * dans la même famille graphique que les icônes textiles :
 * bleu nuit #11114E et touches d'orange #F47721.
 */
export function AutoFormulaLineIcon({
  id,
  className = "w-[74px] h-[44px]",
}: AutoFormulaLineIconProps) {
  switch (id as AutoFormulaIconId) {
    case "interieur-express":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Appui-tête */}
          <rect
            x="28"
            y="6.5"
            width="12"
            height="6.5"
            rx="2.5"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Tiges appui-tête */}
          <line x1="31.5" y1="13" x2="31.5" y2="16" stroke="#11114E" strokeWidth="1.5" />
          <line x1="36.5" y1="13" x2="36.5" y2="16" stroke="#11114E" strokeWidth="1.5" />
          {/* Dossier de siège auto */}
          <path
            d="M25.5 18.5C25.5 17 26.7 16 28.2 16H36.5C38.2 16 39.6 17.2 40 18.9L42.5 31H29C27 31 25.5 29.5 25.5 27.5V18.5Z"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Assise ergonomique */}
          <path
            d="M29 31H53.5C55.4 31 57 32.5 57 34.4V35C57 36.7 55.6 38 54 38H30C27.5 38 25.5 36 25.5 33.5V28"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Couture / maintien latéral en accent orange */}
          <path d="M31.5 20.5L33 27.5" stroke="#F47721" strokeWidth="1.5" />
          <line x1="34" y1="34.5" x2="51.5" y2="34.5" stroke="#F47721" strokeWidth="1.45" />
          {/* Rail inférieur */}
          <line x1="27" y1="41.5" x2="54" y2="41.5" stroke="#11114E" strokeWidth="1.65" />
          <line x1="32" y1="38" x2="31" y2="41.5" stroke="#11114E" strokeWidth="1.5" />
          <line x1="49" y1="38" x2="50" y2="41.5" stroke="#11114E" strokeWidth="1.5" />
        </svg>
      );

    case "interieur-premium":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Appui-tête */}
          <rect
            x="21"
            y="6.5"
            width="12"
            height="6.5"
            rx="2.5"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          <line x1="24.5" y1="13" x2="24.5" y2="16" stroke="#11114E" strokeWidth="1.5" />
          <line x1="29.5" y1="13" x2="29.5" y2="16" stroke="#11114E" strokeWidth="1.5" />
          {/* Dossier de siège auto */}
          <path
            d="M18.5 18.5C18.5 17 19.7 16 21.2 16H29.5C31.2 16 32.6 17.2 33 18.9L35.5 31H22C20 31 18.5 29.5 18.5 27.5V18.5Z"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Assise ergonomique */}
          <path
            d="M22 31H46.5C48.4 31 50 32.5 50 34.4V35C50 36.7 48.6 38 47 38H23C20.5 38 18.5 36 18.5 33.5V28"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Couture accent orange */}
          <path d="M24.5 20.5L26 27.5" stroke="#F47721" strokeWidth="1.5" />
          <line x1="27" y1="34.5" x2="44.5" y2="34.5" stroke="#F47721" strokeWidth="1.45" />
          {/* Rail inférieur */}
          <line x1="20" y1="41.5" x2="47" y2="41.5" stroke="#11114E" strokeWidth="1.65" />
          <line x1="25" y1="38" x2="24" y2="41.5" stroke="#11114E" strokeWidth="1.5" />
          <line x1="42" y1="38" x2="43" y2="41.5" stroke="#11114E" strokeWidth="1.5" />

          {/* Lignes fines symbolisant le nettoyage en profondeur / extraction */}
          <path
            d="M44 13.5C46 11.5 48.5 11.5 50.5 13.5C52.5 15.5 55 15.5 57 13.5"
            stroke="#F47721"
            strokeWidth="1.5"
          />
          <path
            d="M46 19.5C48 17.5 50.5 17.5 52.5 19.5C54.5 21.5 57 21.5 59 19.5"
            stroke="#F47721"
            strokeWidth="1.5"
          />
          {/* Éclats minimalistes */}
          <path d="M60.5 8.5V12.5M58.5 10.5H62.5" stroke="#F47721" strokeWidth="1.5" />
          <path d="M56.5 25V28M55 26.5H58" stroke="#11114E" strokeWidth="1.4" />
        </svg>
      );

    case "complet":
    default:
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Silhouette complète de voiture (profil minimaliste) */}
          <path
            d="M12.5 34H9.5C8.1 34 7 32.9 7 31.5V27.2C7 25.6 8.1 24.3 9.7 23.9L17.5 22L24.5 14.8C25.8 13.5 27.6 12.8 29.4 12.8H48.5C50.7 12.8 52.7 13.8 54 15.5L59.5 22.2L69.5 23.8C71.5 24.1 73 25.8 73 27.8V31.5C73 32.9 71.9 34 70.5 34H66.5"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Bas de caisse entre les roues */}
          <line x1="25.5" y1="34" x2="53.5" y2="34" stroke="#11114E" strokeWidth="1.75" />
          {/* Ligne de vitres */}
          <path d="M22.5 22H55.5" stroke="#11114E" strokeWidth="1.5" />
          <line x1="39.5" y1="13.2" x2="39.5" y2="22" stroke="#11114E" strokeWidth="1.45" />
          {/* Ligne de style carrosserie en accent orange */}
          <line x1="27" y1="27.5" x2="53" y2="27.5" stroke="#F47721" strokeWidth="1.5" />
          {/* Roues */}
          <circle cx="19" cy="34" r="6" stroke="#11114E" strokeWidth="1.75" />
          <circle cx="19" cy="34" r="2.1" stroke="#F47721" strokeWidth="1.4" />
          <circle cx="60" cy="34" r="6" stroke="#11114E" strokeWidth="1.75" />
          <circle cx="60" cy="34" r="2.1" stroke="#F47721" strokeWidth="1.4" />
          {/* Éclat discret au-dessus de la carrosserie */}
          <path d="M66.5 11.5V15.5M64.5 13.5H68.5" stroke="#F47721" strokeWidth="1.5" />
        </svg>
      );
  }
}
