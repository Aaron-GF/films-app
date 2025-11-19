import MediaCast from "@/components/Cast/MediaCast";
import { getMovies } from "@/lib/endpoints";  
import Image from "next/image";

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovies.details(id);
  const cast = await getMovies.detailsEndpoint(id, "credits");
  console.log(cast);

  return (
    <main className="relative min-h-screen mt-19">
      {/* Fondo panorámico */}
      {movie.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={`${movie.title} fondo`}
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-dark" />
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          {movie.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-1/5 rounded shadow-lg">
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
              <p>
                <strong>Valoración:</strong> {movie.vote_average} / 10
              </p>
            )}

            {movie.genres?.length > 0 && (
              <p>
                <strong>Géneros:</strong>{" "}
                {movie.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
      <MediaCast cast={cast.cast}/>
    </main>
  );
}
