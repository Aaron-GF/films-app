"use client";

import Image from "next/image";
import Link from "next/link";
import type { Movie, TVShow } from "@/types/tmdb";

interface MediaGridProps {
  media: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
}

export default function MediaGrid({ media, mediaType }: MediaGridProps) {
  if (!media || media.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-light/60 text-lg">No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {media.map((item, index) => {
        const title = "title" in item ? item.title : item.name;
        const href =
          mediaType === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
        const backdropPath = item.backdrop_path || item.poster_path;

        if (!backdropPath) return null;

        return (
          <Link key={item.id} href={href}>
            <div className="group relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-medium cursor-pointer">
              {/* Imagen de fondo */}
              <Image
                src={`https://image.tmdb.org/t/p/w780${backdropPath}`}
                alt={title}
                fill
                className="object-cover transition-transform duration-medium group-hover:scale-110 group-hover:brightness-75"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={index < 4}
              />

              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Contenido */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-light font-bold text-sm md:text-base line-clamp-2 mb-2">
                  {title}
                </h3>

                {/* Valoración */}
                {item.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="size-4 text-yellow-dark"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-yellow-light text-sm font-semibold">
                      {item.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
