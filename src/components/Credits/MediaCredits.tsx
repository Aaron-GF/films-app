import Image from "next/image";

export default function MediaCredits({
  cast,
  crew,
}: {
  cast: Array<{
    id: number;
    name: string;
    profile_path?: string | null;
    character?: string;
  }>;
  crew?: Array<{
    id: number;
    name: string;
    profile_path?: string | null;
    job?: string;
  }>;
}) {
  const directors = crew
    ? crew.filter((member) => member.job === "Director")
    : [];
  const mainCast = cast.slice(0, 12);

  return (
    <section className="flex flex-col gap-6 mt-10 p-10">
      {crew && (
        <>
          <h2 className="text-2xl font-bold m-4">Dirigida por</h2>
          {directors.map((director) => (
            <div key={director.id} className="flex flex-col m-2">
              {director.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                  alt={director.name}
                  width={90}
                  height={90}
                  className="rounded-full object-cover mb-2 ml-4 hover:scale-140 hover:rounded-md transition-transform hover:mask-b-from-70% h-40 w-25"
                />
              ) : (
                <div className="size-24 rounded-full bg-gray-300" />
              )}
              <span className="font-medium mt-2 z-10">{director.name}</span>
            </div>
          ))}
        </>
      )}
      <h2 className="text-2xl font-bold m-4">Reparto principal</h2>
      <div className="flex flex-wrap gap-10 m-2">
        {mainCast.map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-center text-center min-w-30 "
          >
            {actor.profile_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
                className="rounded-full object-cover mb-2 hover:scale-140 hover:rounded transition-transform hover:mask-b-from-70% size-auto"
                width={90}
                height={90}
              />
            )}
            <span className="font-medium z-10 mt-auto">{actor.name}</span>
            <span className="text-xs text-gray-400 z-10">
              {actor.character}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
