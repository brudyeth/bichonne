import iconHeaderPng from "@/assets/brand/icon-header.png";
import iconHeaderWebp from "@/assets/brand/icon-header.webp";

export function Logo({
  className = "",
  light = false,
  showIcon = true,
  alt = "Logo officiel Bichonne ta Caisse - Nettoyage automobile Lille",
}: {
  className?: string;
  light?: boolean;
  showIcon?: boolean;
  showText?: boolean;
  variant?: "horizontal" | "round";
  alt?: string;
}) {
  const text = light ? "text-night-foreground" : "text-night";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && (
        <picture className="shrink-0 flex items-center">
          <source type="image/webp" srcSet={iconHeaderWebp} />
          <img
            src={iconHeaderPng}
            alt={alt}
            width={40}
            height={40}
            loading="eager"
            decoding="async"
            className="size-8 sm:size-10 object-contain shrink-0"
          />
        </picture>
      )}
      <span
        className={`font-display text-2xl sm:text-3xl font-bold uppercase leading-none tracking-wide ${text}`}
      >
        Bichonne <span className="text-primary">ta</span> Caisse
      </span>
    </span>
  );
}
