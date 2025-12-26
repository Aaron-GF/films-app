interface CarouselButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  className?: string;
}

export default function CarouselButton({
  direction,
  onClick,
  label,
  className = "",
}: CarouselButtonProps) {
  const positionClass = direction === "prev" ? "left-4" : "right-4";
  const iconPath = direction === "prev" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";

  return (
    <button
      type="button"
      className={`absolute top-1/2 ${positionClass} z-overlay p-2 -translate-y-1/2 bg-dark/50 rounded-full hover:bg-dark/75 transition-colors outline-1 outline-yellow-dark/40 ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      <svg
        className="size-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconPath}
        />
      </svg>
    </button>
  );
}
