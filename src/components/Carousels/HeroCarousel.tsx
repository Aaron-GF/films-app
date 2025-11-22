"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Optimizado para cargar imágenes
import Link from "next/link";

interface MediaType {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string;
  media_type: "movie" | "tv";
}

interface HeroCarouselProps {
  media: MediaType[];
}

export default function HeroCarousel({ media }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Avance automático de diapositivas
  useEffect(() => {
    if (isHovered || !media.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovered, media.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };
  if (!media.length) return null;

  return (
    <div
      className="relative lg:w-10/12 w-full h-[500px] overflow-hidden rounded-lg shadow-lg mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {media.map((mediaItem, index) => {
          const href =
            mediaItem.media_type === "movie"
              ? `/movie/${mediaItem.id}`
              : `/tv/${mediaItem.id}`;
          return (
            <div
              key={mediaItem.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-t from-dark to-transparent z-10" />
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  mediaItem.backdrop_path || mediaItem.poster_path
                }`}
                alt={mediaItem.title || mediaItem.name}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="100vw"
              />
              <div className="relative z-20 flex flex-col justify-end h-full p-8">
                <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                  {mediaItem.title || mediaItem.name}
                </h2>
                {mediaItem.overview && (
                  <p className="max-w-2xl mb-6 text-lg line-clamp-3">
                    {mediaItem.overview}
                  </p>
                )}
                <Link key={mediaItem.id} href={href}>
                  <button className="self-start px-4 md:px-6 py-1 md:py-2 text-lg font-medium text-gray-dark bg-yellow-dark rounded-md hover:bg-yellow-light transition-colors mb-4">
                    Ver más
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`size-1 md:size-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-yellow-light"
                : "bg-light/50 hover:bg-light"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Botones de navegación (sliders) */}
      <button
        type="button"
        className="absolute top-1/2 left-4 z-20 p-2 -translate-y-1/2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
        onClick={goToPrevSlide}
        aria-label="Anterior"
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 right-4 z-20 p-2 -translate-y-1/2 bg-black/50 rounded-full hover:bg-black/75 transition-colors"
        onClick={goToNextSlide}
        aria-label="Siguiente"
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
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
