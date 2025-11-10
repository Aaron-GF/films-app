"use client";

import { useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCarouselProps {
  movies: Movie[];
}

export function MovieCarousel({ movies }: MovieCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= movies.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - itemsPerPage : prevIndex - 1
    );
  };

  const visibleMovies = movies.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 bg-dark bg-opacity-50 text-yellow-light rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div
          className="flex w-full transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex shrink-0 w-1/4 px-2">
              <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  title={movie.title}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/300x450?text=No+Image";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 bg-dark bg-opacity-50 text-yellow-light rounded-full hover:bg-opacity-75 transition-all"
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
