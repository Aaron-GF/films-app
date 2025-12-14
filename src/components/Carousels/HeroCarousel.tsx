"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CarouselButton from "@/components/Carousels/CarouselButton";
import type { MediaItem } from "@/types/tmdb";

interface HeroCarouselProps {
  media: MediaItem[];
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
      <div className="relative size-full">
        {media.map((mediaItem, index) => {
          const href =
            mediaItem.media_type === "movie"
              ? `/movies/${mediaItem.id}`
              : `/series/${mediaItem.id}`;
          return (
            <div
              key={mediaItem.id}
              className={`absolute inset-0 transition-opacity duration-slow ${
                index === currentSlide
                  ? "opacity-100 z-content"
                  : "opacity-0 z-base"
              }`}
            >
              <div className="absolute inset-0 bg-linear-to-t from-dark to-transparent z-content" />
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
              <div className="relative z-overlay flex flex-col justify-end h-full p-8">
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
      <div className="absolute bottom-4 left-1/2 z-overlay flex -translate-x-1/2 space-x-2">
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
      <CarouselButton
        direction="prev"
        onClick={goToPrevSlide}
        label="Anterior"
      />
      <CarouselButton
        direction="next"
        onClick={goToNextSlide}
        label="Siguiente"
      />
    </div>
  );
}
