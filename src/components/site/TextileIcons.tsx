export type TextileIconId = "canape-2-3" | "canape-4-5" | "fauteuil" | "matelas-1" | "matelas-2";

interface TextileLineIconProps {
  id: string;
  className?: string;
}

/**
 * Illustrations vectorielles minimalistes (line art, traits fins, sans remplissage)
 * dans la palette Bichonne ta Caisse : bleu nuit #11114E et touches d'orange #F47721.
 */
export function TextileLineIcon({ id, className = "w-20 h-12" }: TextileLineIconProps) {
  switch (id as TextileIconId) {
    case "canape-2-3":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Dossier 2 places */}
          <path
            d="M19 25V14.5C19 12.6 20.6 11 22.5 11H57.5C59.4 11 61 12.6 61 14.5V25"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Séparation centrale des deux coussins de dossier */}
          <line x1="40" y1="11.5" x2="40" y2="25" stroke="#11114E" strokeWidth="1.5" />
          {/* Touches orange fines sur le dossier */}
          <line x1="25" y1="16" x2="34" y2="16" stroke="#F47721" strokeWidth="1.5" />
          <line x1="46" y1="16" x2="55" y2="16" stroke="#F47721" strokeWidth="1.5" />
          {/* Accoudoirs gauche et droit */}
          <rect x="13" y="20" width="6" height="15" rx="2.2" stroke="#11114E" strokeWidth="1.75" />
          <rect x="61" y="20" width="6" height="15" rx="2.2" stroke="#11114E" strokeWidth="1.75" />
          {/* Assise (2 coussins) */}
          <path d="M19 25H61" stroke="#11114E" strokeWidth="1.75" />
          <line x1="40" y1="25" x2="40" y2="32" stroke="#11114E" strokeWidth="1.5" />
          <path d="M19 32H61" stroke="#F47721" strokeWidth="1.35" />
          <path d="M19 35H61" stroke="#11114E" strokeWidth="1.75" />
          {/* Pieds */}
          <line x1="17" y1="35" x2="16" y2="41" stroke="#11114E" strokeWidth="1.75" />
          <line x1="63" y1="35" x2="64" y2="41" stroke="#11114E" strokeWidth="1.75" />
        </svg>
      );

    case "canape-4-5":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Dossier large 4-5 places (3 grands coussins) */}
          <path
            d="M11 25V14.5C11 12.6 12.6 11 14.5 11H65.5C67.4 11 69 12.6 69 14.5V25"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Séparations des 3 coussins */}
          <line x1="30.5" y1="11.5" x2="30.5" y2="25" stroke="#11114E" strokeWidth="1.5" />
          <line x1="49.5" y1="11.5" x2="49.5" y2="25" stroke="#11114E" strokeWidth="1.5" />
          {/* Touches orange fines sur chaque coussin */}
          <line x1="16.5" y1="16" x2="25" y2="16" stroke="#F47721" strokeWidth="1.5" />
          <line x1="36" y1="16" x2="44" y2="16" stroke="#F47721" strokeWidth="1.5" />
          <line x1="55" y1="16" x2="63.5" y2="16" stroke="#F47721" strokeWidth="1.5" />
          {/* Accoudoirs */}
          <rect x="5" y="20" width="6" height="15" rx="2.2" stroke="#11114E" strokeWidth="1.75" />
          <rect x="69" y="20" width="6" height="15" rx="2.2" stroke="#11114E" strokeWidth="1.75" />
          {/* Assise large (3 coussins) */}
          <path d="M11 25H69" stroke="#11114E" strokeWidth="1.75" />
          <line x1="30.5" y1="25" x2="30.5" y2="32" stroke="#11114E" strokeWidth="1.5" />
          <line x1="49.5" y1="25" x2="49.5" y2="32" stroke="#11114E" strokeWidth="1.5" />
          <path d="M11 32H69" stroke="#F47721" strokeWidth="1.35" />
          <path d="M11 35H69" stroke="#11114E" strokeWidth="1.75" />
          {/* Pieds + pied central */}
          <line x1="9" y1="35" x2="8" y2="41" stroke="#11114E" strokeWidth="1.75" />
          <line x1="40" y1="35" x2="40" y2="40.5" stroke="#11114E" strokeWidth="1.5" />
          <line x1="71" y1="35" x2="72" y2="41" stroke="#11114E" strokeWidth="1.75" />
        </svg>
      );

    case "fauteuil":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Dossier individuel légèrement plus haut */}
          <path
            d="M27 25V12.5C27 10.6 28.6 9 30.5 9H49.5C51.4 9 53 10.6 53 12.5V25"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Détail capitonnage / coussin orange */}
          <path d="M34 15.5H46" stroke="#F47721" strokeWidth="1.5" />
          <circle cx="40" cy="19.5" r="1.1" stroke="#F47721" strokeWidth="1.35" />
          {/* Accoudoirs individuels */}
          <rect x="21" y="20" width="6" height="15" rx="2.4" stroke="#11114E" strokeWidth="1.75" />
          <rect x="53" y="20" width="6" height="15" rx="2.4" stroke="#11114E" strokeWidth="1.75" />
          {/* Assise unique */}
          <path d="M27 25H53" stroke="#11114E" strokeWidth="1.75" />
          <path d="M27 31.5H53" stroke="#F47721" strokeWidth="1.35" />
          <path d="M27 35H53" stroke="#11114E" strokeWidth="1.75" />
          {/* Pieds légèrement inclinés */}
          <line x1="25" y1="35" x2="23.5" y2="41" stroke="#11114E" strokeWidth="1.75" />
          <line x1="55" y1="35" x2="56.5" y2="41" stroke="#11114E" strokeWidth="1.75" />
        </svg>
      );

    case "matelas-1":
      return (
        <svg
          viewBox="0 0 80 48"
          fill="none"
          aria-hidden="true"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Tête de lit simple */}
          <path
            d="M24 24V13.5C24 11.6 25.6 10 27.5 10H52.5C54.4 10 56 11.6 56 13.5V24"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Oreiller unique centré en accent orange */}
          <rect
            x="31"
            y="16.5"
            width="18"
            height="7.5"
            rx="2.5"
            stroke="#F47721"
            strokeWidth="1.6"
          />
          {/* Matelas 1 place */}
          <rect x="22" y="24" width="36" height="11" rx="2.5" stroke="#11114E" strokeWidth="1.75" />
          {/* Ligne de matelassage */}
          <line x1="26" y1="29.5" x2="32" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          <line x1="37" y1="29.5" x2="43" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          <line x1="48" y1="29.5" x2="54" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          {/* Pieds */}
          <line x1="26" y1="35" x2="26" y2="41" stroke="#11114E" strokeWidth="1.75" />
          <line x1="54" y1="35" x2="54" y2="41" stroke="#11114E" strokeWidth="1.75" />
        </svg>
      );

    case "matelas-2":
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
          {/* Tête de lit double */}
          <path
            d="M12 24V13.5C12 11.6 13.6 10 15.5 10H64.5C66.4 10 68 11.6 68 13.5V24"
            stroke="#11114E"
            strokeWidth="1.75"
          />
          {/* Deux oreillers côte à côte en accent orange */}
          <rect
            x="17"
            y="16.5"
            width="19.5"
            height="7.5"
            rx="2.5"
            stroke="#F47721"
            strokeWidth="1.6"
          />
          <rect
            x="43.5"
            y="16.5"
            width="19.5"
            height="7.5"
            rx="2.5"
            stroke="#F47721"
            strokeWidth="1.6"
          />
          {/* Matelas 2 places */}
          <rect x="10" y="24" width="60" height="11" rx="2.5" stroke="#11114E" strokeWidth="1.75" />
          {/* Lignes de matelassage */}
          <line x1="15" y1="29.5" x2="22" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          <line x1="29" y1="29.5" x2="36" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          <line x1="44" y1="29.5" x2="51" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          <line x1="58" y1="29.5" x2="65" y2="29.5" stroke="#F47721" strokeWidth="1.4" />
          {/* Pieds */}
          <line x1="14" y1="35" x2="14" y2="41" stroke="#11114E" strokeWidth="1.75" />
          <line x1="66" y1="35" x2="66" y2="41" stroke="#11114E" strokeWidth="1.75" />
        </svg>
      );
  }
}

/**
 * Icône vectorielle minimaliste (line art, sans remplissage) évoquant la vapeur
 * pour l'option « Traitement vapeur (+10 € par élément traité) ».
 */
export function TextileSteamIcon({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trois volutes de vapeur fines et élégantes */}
      <path
        d="M13 24.5C11.2 21.8 14.8 19.2 13 16.5C11.7 14.6 12.8 12.6 13.8 11.5"
        stroke="#11114E"
        strokeWidth="1.65"
      />
      <path
        d="M20 23.5C17.8 20.2 22.2 17 20 13.6C18.6 11.5 19.6 9.3 20.8 8"
        stroke="#F47721"
        strokeWidth="1.75"
      />
      <path
        d="M27 24.5C25.2 21.8 28.8 19.2 27 16.5C25.7 14.6 26.8 12.6 27.8 11.5"
        stroke="#11114E"
        strokeWidth="1.65"
      />
      {/* Surface textile minimaliste */}
      <path d="M8.5 29.5H31.5" stroke="#11114E" strokeWidth="1.75" />
      <path d="M12.5 33H27.5" stroke="#F47721" strokeWidth="1.4" />
    </svg>
  );
}

/**
 * Icône vectorielle minimaliste (line art, sans remplissage) évoquant la fraîcheur
 * et la neutralisation des odeurs pour l'option « Traitement anti-odeurs (+10 €) ».
 */
export function TextileAntiOdorIcon({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Flux d'air frais purifié */}
      <path
        d="M8.5 16H23.5C25.7 16 27.5 14.3 27.5 12.2C27.5 10.2 25.9 8.8 24 8.8C22.4 8.8 21.2 9.8 21 11.2"
        stroke="#11114E"
        strokeWidth="1.7"
      />
      <path
        d="M11 21.5H28.5C30.4 21.5 32 23 32 24.9C32 26.8 30.5 28.2 28.6 28.2C27 28.2 25.8 27.2 25.6 25.8"
        stroke="#F47721"
        strokeWidth="1.75"
      />
      {/* Éclat de fraîcheur discret */}
      <path d="M14 27.5H21" stroke="#11114E" strokeWidth="1.65" />
      <path d="M12 10.5V13.5M10.5 12H13.5" stroke="#F47721" strokeWidth="1.5" />
      {/* Surface textile minimaliste */}
      <path d="M9.5 32.5H30.5" stroke="#11114E" strokeWidth="1.6" />
    </svg>
  );
}
