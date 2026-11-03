import iconHeaderPng from "@/assets/brand/icon-header.png";
import iconHeaderWebp from "@/assets/brand/icon-header.webp";

export function Logo({
  className = "",
  light = true,
  variant = "split",
  alt = "Logo officiel Bichonne ta Caisse - Nettoyage automobile Lille",
}: {
  className?: string;
  light?: boolean;
  showIcon?: boolean;
  showText?: boolean;
  variant?: "graphic" | "text" | "horizontal" | "round" | "split";
  alt?: string;
}) {
  const textColor = light ? "text-white" : "text-[#11114E]";

  if (variant === "horizontal") {
    return (
      <span
        className={`group inline-flex items-center gap-2.5 sm:gap-3 whitespace-nowrap select-none ${className}`}
      >
        {/* Logo rond officiel sans écriture */}
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

        {/* Nom « Bichonne TA CAISSE » sur une seule ligne */}
        <div className="inline-flex items-baseline gap-1.5 sm:gap-2 leading-none">
          <span
            className={`font-sans font-extrabold tracking-tight text-[19px] sm:text-[21px] md:text-[22px] leading-none ${textColor}`}
          >
            Bichonne
          </span>
          <span className="font-sans font-extrabold uppercase text-[#F47721] text-[15px] sm:text-[16px] md:text-[17px] tracking-tight leading-none">
            TA CAISSE
          </span>
        </div>
      </span>
    );
  }

  // Signature visuelle harmonisée : Bichonne | Logo | Ta Caisse
  return (
    <span className={`group inline-flex items-center whitespace-nowrap select-none ${className}`}>
      {/* 1. « Bichonne » : blanc, typographie moderne et élégante (font-bold 700) */}
      <span
        className={`font-sans font-bold not-italic tracking-[-0.02em] text-[15.5px] sm:text-[19px] md:text-[21.5px] leading-none ${textColor} transition-colors inline-flex items-center mr-1.5 sm:mr-2 md:mr-2.5`}
      >
        Bichonne
      </span>

      {/* 2. Logo circulaire officiel au centre : taille exacte conservée (30px / 38px / 42px) */}
      <picture className="shrink-0 inline-flex items-center justify-center">
        <source type="image/webp" srcSet={iconHeaderWebp} />
        <img
          src={iconHeaderPng}
          alt={alt}
          width={44}
          height={44}
          loading="eager"
          decoding="async"
          className="size-[30px] sm:size-[38px] md:size-[42px] object-contain block shrink-0 drop-shadow-xs transition-transform duration-200 ease-out group-hover:scale-105"
        />
      </picture>

      {/* 3. « Ta Caisse » : exactement la même police, même graisse, même taille et même espacement que Bichonne, en orange officiel #F47721 */}
      <span className="font-sans font-bold not-italic text-[#F47721] tracking-[-0.02em] text-[15.5px] sm:text-[19px] md:text-[21.5px] leading-none transition-colors inline-flex items-center ml-1.5 sm:ml-2 md:ml-2.5">
        Ta Caisse
      </span>
    </span>
  );
}
