import MediaCredits from "@/components/Credits/MediaCredits";
import { getSeries } from "@/lib/endpoints";
import Image from "next/image";
import StarRating from "@/components/Ratings/StarRating";

export default async function SeriesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeries.details(id);
  const credits = await getSeries.detailsEndpoint(id, "credits");

  return (
    <main className="min-h-screen mt-20">
      {/* Fondo panorámico */}
      {series.backdrop_path && (
        <div className="fixed inset-0 -z-10 mt-20">
          <Image
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={`${series.name} fondo`}
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          {series.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-1/5 rounded overflow-hidden shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name || "Poster de la serie"}
              width={500}
              height={750}
              className="object-contain rounded"
              priority
            />
          </div>

          <div className="md:w-2/3 space-y-4 text-lg leading-relaxed">
            <p>{series.overview}</p>

            {series.release_date && (
              <p>
                <strong>Fecha de estreno:</strong>{" "}
                {new Date(series.release_date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}

            {series.vote_average !== undefined && (
              <div>
                <strong>Valoración:</strong>
                <div className="mt-2">
                  <StarRating rating={series.vote_average} />
                </div>
              </div>
            )}

            {series.genres?.length > 0 && (
              <p>
                <strong>Géneros:</strong>{" "}
                {series.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
      <MediaCredits cast={credits.cast} />
    </main>
  );
}
