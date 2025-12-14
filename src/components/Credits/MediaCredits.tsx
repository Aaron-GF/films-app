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

  const CreditCard = ({
    item,
    role,
  }: {
    item: CastMember | CrewMember;
    role?: string;
  }) => (
    <div className="group relative aspect-2/3 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {item.profile_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg fill="none" stroke="currentColor" className="w-24 h-24" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0m-4 7a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7"/></svg>
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />

      {/* Content - Always visible, no movement */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-bold text-sm leading-tight">
          {item.name}
        </p>
        <p className="text-yellow-light text-xs mt-1">{role}</p>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col gap-8 p-6 md:p-10 mt-6">
      {crew && directors.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-yellow-dark px-2 border-l-4 border-yellow-dark">
            Dirigida por
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {directors.map((director) => (
              <CreditCard key={director.id} item={director} role="Director" />
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-yellow-dark px-2 border-l-4 border-yellow-dark">
          Reparto principal
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {mainCast.map((actor) => (
            <CreditCard key={actor.id} item={actor} role={actor.character} />
          ))}
        </div>
      </div>
    </section>
  );
}
