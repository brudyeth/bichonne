export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
  showText?: boolean;
}) {
  const text = light ? "text-night-foreground" : "text-night";
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        className={`font-display text-2xl sm:text-3xl font-bold uppercase leading-none tracking-wide ${text}`}
      >
        Bichonne <span className="text-primary">ta</span> Caisse
      </span>
    </span>
  );
}
