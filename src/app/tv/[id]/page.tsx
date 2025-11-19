import { getSeries } from "@/lib/endpoints";   
import Image from "next/image";

export default async function SeriesDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = await getSeries.details(id);
  console.log(series);

  return (
    <main className="relative min-h-screen mt-19">
      {/* Fondo panorámico */}
      {series.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
            alt={`${series.name} fondo`}
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-dark" />
        </div>
      )}

      <div className="max-w-6xl mx-auto p-6 relative z-10">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          {series.name}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-1/5 rounded overflow-hidden shadow-lg">
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
              <p>
                <strong>Valoración:</strong> {series.vote_average} / 10
              </p>
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
    </main>
  );
}
