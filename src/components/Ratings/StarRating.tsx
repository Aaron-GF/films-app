interface StarRatingProps {
  rating: number;
  className?: string;
}

export default function StarRating({
  rating,
  className = "",
}: StarRatingProps) {
  const maxStars = 5;
  const normalizedRating = (rating / 10) * maxStars; // Convierte la valoración de 0-10 a 0-5

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxStars }, (_, index) => {
        const fillPercentage = Math.min(
          Math.max((normalizedRating - index) * 100, 0),
          100
        );

        return (
          <div key={index} className="relative inline-block size-6">
            {/* Estrella vacía (fondo) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="absolute inset-0 text-gray-500" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>

            {/* Estrella rellena (overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-yellow-dark size-6" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>
            </div>
          </div>
        );
      })}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)} / 10</span>
    </div>
  );
}
