/* Componentes */
import MediaCredits from "@/components/Credits/MediaCredits";
import StarRating from "@/components/Ratings/StarRating";
import TrailerPlayer from "@/components/TrailerPlayer/TrailerPlayer";

/* Endpoints */
import { getMovies } from "@/lib/endpoints";

/* Imágenes */
import Image from "next/image";

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovies.details(id);
  const credits = await getMovies.detailsEndpoint(id, "credits");
  const videos = await getMovies.detailsEndpoint(id, "videos");

  return (
    <main className="min-h-screen mt-20">
      {/* Fondo panorámico */}
      {movie.backdrop_path && (
        <div className="fixed inset-0 -z-10 mt-18">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} fondo`}
            fill
            className="object-cover object-center opacity-25"
            priority
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          {movie.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-1/5 shadow-lg">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "Poster de la película"}
              width={500}
              height={750}
              className="object-contain rounded"
              priority
            />
          </div>

          <div className="md:w-2/3 space-y-4 text-lg leading-relaxed">
            <p>{movie.overview}</p>

            {movie.release_date && (
              <p>
                <strong>Fecha de estreno:</strong>{" "}
                {new Date(movie.release_date).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}

            {movie.vote_average !== undefined && (
              <>
                <strong>Valoración:</strong>
                <StarRating rating={movie.vote_average} />
              </>
            )}

            {movie.genres?.length > 0 && (
              <p>
                <strong>Géneros:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}

            {movie.runtime && (
              <span className="inline-flex items-center gap-2 bg-gray-dark px-3 py-2 rounded-full text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="10" x2="14" y1="2" y2="2" />
                  <line x1="12" x2="15" y1="14" y2="11" />
                  <circle cx="12" cy="14" r="8" />
                </svg>
                {movie.runtime} min
              </span>
            )}
          </div>
        </div>
        <TrailerPlayer videos={videos.results} />
      </div>
      <MediaCredits cast={credits.cast} crew={credits.crew} />
    </main>
  );
}
