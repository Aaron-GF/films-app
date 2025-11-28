import MediaCredits from "@/components/Credits/MediaCredits";
import { getSeries } from "@/lib/endpoints";
import Image from "next/image";
import StarRating from "@/components/Ratings/StarRating";
import TrailerPlayer from "@/components/TrailerPlayer/TrailerPlayer";
import { formatDate } from "@/utils/formatDate";
import SeasonInfo from "@/components/Seasons/SeasonInfo";
import WatchProvidersInfo from "@/components/WatchProviders/WatchProvidersInfo";

export default async function SeriesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeries.details(id);
  const credits = await getSeries.detailsEndpoint(id, "credits");
  const videos = await getSeries.detailsEndpoint(id, "videos");
  const watchProviders = await getSeries.watchProviders(id);

  return (
    <main className="min-h-screen mt-20">
      {/* Fondo panorámico */}
      {series.backdrop_path && (
        <div className="fixed inset-0 -z-10 mt-18">
          <Image
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={`${series.name} fondo`}
            fill
            className="object-cover object-center opacity-15"
            priority
          />
        </div>
      )}

      <article className="max-w-6xl mx-auto p-6 z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          {series.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <figure className="w-1/5 rounded overflow-hidden shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
              alt={series.name || "Poster de la serie"}
              width={500}
              height={750}
              className="object-contain rounded"
              priority
            />
          </figure>

          <div className="md:w-2/3 space-y-4 text-lg leading-relaxed">
            <p>{series.overview}</p>

            {series.first_air_date && (
              <p>
                <strong>Fecha de estreno:</strong>{" "}
                {formatDate(series.first_air_date)}
              </p>
            )}

            {series.vote_average !== undefined && (
              <div>
                <strong>Valoración:</strong>
                <StarRating rating={series.vote_average} className="mt-2" />
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
        <TrailerPlayer videos={videos?.results ?? []} />
        <WatchProvidersInfo watchProviders={watchProviders} />
        {series.seasons && series.seasons.length > 0 && (
          <SeasonInfo seriesId={series.id} seasons={series.seasons} />
        )}
      </article>
      <MediaCredits cast={credits?.cast ?? []} />
    </main>
  );
}
