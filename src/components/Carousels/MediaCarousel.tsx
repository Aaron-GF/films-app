"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
}

interface MediaCarouselProps {
  media: MediaItem[];
}

export default function MediaCarousel({ media }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= media.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - itemsPerPage : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 bg-dark bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
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
          className="flex w-full transition-transform duration-normal ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {media.map((mediaItem) => {
            const href = mediaItem.title
              ? `/movie/${mediaItem.id}`
              : `/tv/${mediaItem.id}`;
            return (
              <div
                key={mediaItem.id}
                className="flex shrink-0 w-1/3 lg:w-1/6 px-2"
              >
                <Link key={mediaItem.id} href={href}>
                  <div className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-normal cursor-pointer">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${mediaItem.poster_path}`}
                      alt={mediaItem.title || mediaItem.name}
                      title={mediaItem.title || mediaItem.name}
                      width={300}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 bg-dark bg-opacity-50 rounded-full hover:bg-opacity-75 transition-all"
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
