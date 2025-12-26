"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "@/types/tmdb";
import CarouselButton from "./CarouselButton";

interface MediaCarouselProps {
  media: MediaItem[];
  category?: "movie" | "tv";
}

export default function MediaCarousel({ media, category }: MediaCarouselProps) {
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
    <div className="relative w-full overflow-scroll">
      <div className="flex items-center">
        <CarouselButton
          direction="prev"
          onClick={prevSlide}
          label="Previous slide"
          className="hide-on-touch"
        />

        <div
          className="flex w-full transition-transform duration-normal ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {media.map((mediaItem) => {
            let href = "";
            if (category) {
              href = `/${category}/${mediaItem.id}`;
            } else {
              href = mediaItem.title
                ? `/movies/${mediaItem.id}`
                : `/series/${mediaItem.id}`;
            }
            return (
              <div
                key={mediaItem.id}
                className="flex shrink-0 w-1/3 lg:w-1/6 px-1 sm:px-2"
              >
                <Link
                  href={href}
                  className="block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-normal cursor-pointer"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${mediaItem.poster_path}`}
                    alt={mediaItem.title || mediaItem.name}
                    title={mediaItem.title || mediaItem.name}
                    width={300}
                    height={450}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <CarouselButton
          direction="next"
          onClick={nextSlide}
          label="Next slide"
          className="hide-on-touch"
        />
      </div>
    </div>
  );
}
