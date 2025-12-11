"use client";

import Image from "next/image";
import Link from "next/link";
import { cleanCollectionName } from "@/utils/cleanCollectionName";
import type { MediaItem } from "@/types/tmdb";

interface CollectionsGridProps {
  collections: MediaItem[];
}

export default function CollectionsGrid({ collections }: CollectionsGridProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.id}`}
            className="group relative h-48 md:h-64 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-normal transform hover:-translate-y-1"
          >
            {/* Imagen de fondo (Backdrop preferido, fallback a poster zoom) */}
            <div className="absolute inset-0">
              <Image
                src={`https://image.tmdb.org/t/p/w780${
                  collection.backdrop_path || collection.poster_path
                }`}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Overlay Gradiente */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-normal" />

            {/* Contenido (Texto) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-normal">
              <h3 className="text-xl md:text-2xl font-bold drop-shadow-md mb-1">
                {cleanCollectionName(collection.name, "collection")}
              </h3>
              <p className="text-yellow-dark text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-normal transform translate-y-2 group-hover:translate-y-0 delay-75">
                Ver colección →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
