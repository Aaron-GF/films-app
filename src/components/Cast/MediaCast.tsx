import Image from "next/image";

export default function MediaCast({
  cast,
}: {
  cast: Array<{ id: number; name: string; profile_path?: string | null; character?: string; known_for_department?: string }>;
}) {
 const directing = cast.filter((member) => member.known_for_department === "Directing");
 const mainCast = cast.slice(0, 12);
  

  return (
    <section className="flex flex-col gap-6 mt-10 p-10">
      <h2 className="text-2xl font-bold mb-2">Dirigida por</h2>
      {directing[0] && (
        <img
          src={`https://image.tmdb.org/t/p/w200${directing[0].profile_path}`}
          alt={directing[0].name}
          className="size-30 rounded-full object-cover"
        />
      )}
      <span>{directing[0].name}</span>
      <h2 className="text-2xl font-bold mt-4 mb-2">Reparto principal</h2>
      <div className="flex flex-wrap gap-6">
        {mainCast.map((actor) => (
          <div
            key={actor.id}
            className="w-30 flex flex-col items-center text-center"
          >
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="size-30 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="size-30 rounded-full bg-gray-300 mb-2" />
            )}
            <span className="font-medium">{actor.name}</span>
            <span className="text-xs text-gray-400">{actor.character}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
