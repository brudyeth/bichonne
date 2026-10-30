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
          className="size-9 sm:size-10 md:size-11 object-contain shrink-0 drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </picture>

      {/* 2. Nom « BICHONNE TA CAISSE » sur une seule ligne avec typographie fidèle au lettrage officiel */}
      <div className="inline-flex items-baseline gap-1.5 sm:gap-2 leading-none">
        {/* « Bichonne » : épaisse, légèrement inclinée, arrondie et dynamique */}
        <span
          className={`font-logo font-black italic tracking-tight text-[18px] sm:text-[20px] md:text-[22px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] ${textColor}`}
        >
          Bichonne
        </span>
        {/* « TA CAISSE » : en orange officiel #F47721, compacte et structurée */}
        <span className="font-sans font-extrabold uppercase text-[#F47721] text-[12px] sm:text-[13px] md:text-[14px] tracking-[0.14em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
          TA CAISSE
        </span>
      </div>
    </span>
  );
}
