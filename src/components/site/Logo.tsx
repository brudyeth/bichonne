import iconHeaderPng from "@/assets/brand/icon-header.png";
import iconHeaderWebp from "@/assets/brand/icon-header.webp";

export function Logo({
  className = "",
  light = true,
  alt = "Logo officiel Bichonne ta Caisse - Nettoyage automobile Lille",
}: {
  className?: string;
  light?: boolean;
  showIcon?: boolean;
  showText?: boolean;
  variant?: "graphic" | "text" | "horizontal" | "round";
  alt?: string;
}) {
  const textColor = light ? "text-white" : "text-[#11114E]";

  return (
    <span
      className={`group inline-flex items-center gap-2.5 sm:gap-3 whitespace-nowrap select-none ${className}`}
    >
      {/* 1. Logo rond officiel sans aucune écriture (personnage, voiture et étoiles) */}
      <picture className="shrink-0 flex items-center">
        <source type="image/webp" srcSet={iconHeaderWebp} />
        <img
          src={iconHeaderPng}
          alt={alt}
          width={44}
          height={44}
          loading="eager"
          decoding="async"
          className="size-9 sm:size-10 md:size-11 object-contain shrink-0 drop-shadow-xs transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </picture>

      {/* 2. Nom « Bichonne TA CAISSE » sur une seule ligne avec Manrope ExtraBold (800) droit */}
      <div className="inline-flex items-baseline gap-1.5 sm:gap-2 leading-none">
        {/* « Bichonne » : Manrope ExtraBold (800) droit, sobre, moderne et professionnel */}
        <span
          className={`font-sans font-extrabold tracking-tight text-[19px] sm:text-[21px] md:text-[22px] leading-none ${textColor}`}
        >
          Bichonne
        </span>
        {/* « TA CAISSE » : en orange officiel #F47721, droit, cohérent et harmonieux */}
        <span className="font-sans font-extrabold uppercase text-[#F47721] text-[15px] sm:text-[16px] md:text-[17px] tracking-tight leading-none">
          TA CAISSE
        </span>
      </div>
    </span>
  );
}
