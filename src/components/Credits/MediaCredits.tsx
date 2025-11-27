import Image from "next/image";
import type { CastMember, CrewMember } from "@/types/tmdb";

interface MediaCreditsProps {
  cast: CastMember[];
  crew?: CrewMember[];
}

export default function MediaCredits({ cast, crew }: MediaCreditsProps) {
  const directors = crew
    ? crew.filter((member) => member.job === "Director")
    : [];
  const mainCast = cast.slice(0, 12);

  return (
    <section className="flex flex-col gap-6 p-10 mt-10">
      {crew && (
        <>
          <h2 className="m-4 text-2xl font-bold text-yellow-dark">
            Dirigida por
          </h2>
          {directors.map((director) => (
            <div key={director.id} className="flex flex-col m-2">
              {director.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                  alt={director.name}
                  width={90}
                  height={90}
                  className="w-25 h-40 object-cover rounded-full mb-2 ml-4 transition-transform hover:scale-140 hover:rounded-md hover:mask-b-from-70%"
                />
              ) : (
                <div className="size-24 rounded-full" />
              )}
              <span className="font-medium mt-2 z-10">{director.name}</span>
            </div>
          ))}
        </>
      )}
      <h2 className="m-4 text-2xl font-bold text-yellow-dark">
        Reparto principal
      </h2>
      <div className="flex flex-wrap gap-12 m-2">
        {mainCast.map((actor) => (
          <div
            key={actor.id}
            className="flex flex-col items-center text-center max-w-30"
          >
            {actor.profile_path && (
              <Image
                src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                alt={actor.name}
                className="object-cover rounded-full mb-2 transition-transform hover:scale-140 hover:rounded hover:mask-b-from-70%"
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
