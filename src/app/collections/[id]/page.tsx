/* Componentes */
import MediaGrid from "@/components/Media/MediaGrid";

/* Endpoints */
import { getCollection } from "@/lib/endpoints";

/* Imagenes */
import Image from "next/image"; 

/* Metadata */
import { generateMediaMetadata } from "@/utils/generateMediaMetadata";

/* Tipos */
import type { Collection } from "@/types/tmdb";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return generateMediaMetadata(id, getCollection, "name");
}

export default async function CollectionDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const collection: Collection = await getCollection(id);

  return (
    <main className="min-h-screen mt-20">
      {/* Fondo panorámico */}
      {collection.backdrop_path && (
        <div className="fixed inset-0 -z-10 mt-18">
          <Image
            src={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
            alt={`${collection.name} fondo`}
            fill
            className="object-cover object-center opacity-15"
            priority
          />
        </div>
      )}

      <article className="max-w-6xl mx-auto p-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg text-yellow-dark">
          {collection.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {collection.poster_path && (
            <figure className="w-full md:w-1/4 max-w-[300px] rounded overflow-hidden shadow-lg mx-auto md:mx-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${collection.poster_path}`}
                alt={collection.name}
                width={500}
                height={750}
                className="object-contain rounded"
                priority
              />
            </figure>
          )}

          <div className="md:w-3/4 space-y-4 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-2">Descripción</h2>
            <p className="text-light/90">{collection.overview}</p>

            <div className="pt-4">
              <p className="text-xl font-semibold text-yellow-light">
                {collection.parts.length} Películas en la colección
              </p>
            </div>
          </div>
        </div>

        {/* Películas de la colección */}
        <section>
          <h2 className="text-3xl font-bold mb-6 border-b border-yellow-dark/20 pb-2">
            Películas
          </h2>
          <MediaGrid media={collection.parts} mediaType="movie" />
        </section>
      </article>
    </main>
  );
}
