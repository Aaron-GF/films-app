"use client";
import { useState } from "react";
import Image from "next/image";
import type { Season, Episode } from "@/types/tmdb";
import { getSeries } from "@/lib/endpoints";
import { formatDate } from "@/utils/formatDate";

interface SeasonInfoProps {
  seriesId: number;
  seasons: Season[];
}

export default function SeasonInfo({ seriesId, seasons }: SeasonInfoProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(
    new Set()
  );
  const [seasonData, setSeasonData] = useState<Map<number, Season>>(new Map());
  const [loadingSeasons, setLoadingSeasons] = useState<Set<number>>(new Set());

  const toggleSeason = async (seasonNumber: number) => {
    const newExpanded = new Set(expandedSeasons);

    if (expandedSeasons.has(seasonNumber)) {
      newExpanded.delete(seasonNumber);
      setExpandedSeasons(newExpanded);
    } else {
      newExpanded.add(seasonNumber);
      setExpandedSeasons(newExpanded);

      if (!seasonData.has(seasonNumber)) {
        setLoadingSeasons((prev) => new Set(prev).add(seasonNumber));
        try {
          const data = await getSeries.season(seriesId, seasonNumber);
          setSeasonData((prev) => new Map(prev).set(seasonNumber, data));
        } catch (error) {
          console.error(`Error fetching season ${seasonNumber}:`, error);
        } finally {
          setLoadingSeasons((prev) => {
            const newSet = new Set(prev);
            newSet.delete(seasonNumber);
            return newSet;
          });
        }
      }
    }
  };

  const regularSeasons = seasons.filter((season) => season.season_number > 0);

  return (
    <section className="mt-18 space-y-4">
      {regularSeasons.map((season) => {
        const isExpanded = expandedSeasons.has(season.season_number);
        const isLoading = loadingSeasons.has(season.season_number);
        const episodes = seasonData.get(season.season_number)?.episodes;

        return (
          <div
            key={season.id}
            className="rounded-xl bg-dark/60 backdrop-blur-md border border-light/10 overflow-hidden transition-all duration-medium hover:border-yellow-dark/50"
          >
            <button
              onClick={() => toggleSeason(season.season_number)}
              className="w-full p-6 flex items-center gap-6 hover:bg-light/5 transition-colors"
              aria-expanded={isExpanded}
              aria-label={`${isExpanded ? "Contraer" : "Expandir"} ${
                season.name
              }`}
            >
              {season.poster_path && (
                <div className="relative w-20 h-28 shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                    alt={season.name}
                    width={200}
                    height={280}
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold mb-2">{season.name}</h3>
                <div className="flex flex-wrap gap-4 text-light/70 mb-2">
                  {season.air_date && (
                    <span>{season.air_date.substring(0, 4)}</span>
                  )}
                  <span>
                    {season.episode_count}{" "}
                    {season.episode_count === 1 ? "episodio" : "episodios"}
                  </span>
                </div>
                {season.overview && (
                  <p className="text-light/80 line-clamp-2">
                    {season.overview}
                  </p>
                )}
              </div>

              <span
                className={`text-yellow-dark text-2xl transition-transform duration-medium ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isExpanded && (
              <div className="border-t border-light/10 p-6 bg-dark/40">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full size-12 border-4 border-yellow-dark border-t-transparent" />
                  </div>
                ) : episodes?.length ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {episodes.map((episode: Episode) => (
                      <div
                        key={episode.id}
                        className="rounded-lg bg-gray-dark/50 overflow-hidden hover:bg-gray-dark/70 transition-colors"
                      >
                        {episode.still_path && (
                          <div className="relative w-full aspect-video">
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                              alt={episode.name}
                              width={300}
                              height={169}
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="p-4">
                          <h4 className="font-semibold text-yellow-light mb-2">
                            {episode.episode_number}. {episode.name}
                          </h4>
                          {episode.air_date && (
                            <p className="text-sm text-light/60 mb-2">
                              {formatDate(episode.air_date)}
                            </p>
                          )}
                          {episode.overview && (
                            <p className="text-sm text-light/80 line-clamp-3">
                              {episode.overview}
                            </p>
                          )}
                          {episode.runtime && (
                            <p className="text-xs text-light/60 mt-2">
                              {episode.runtime} min
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-light/60 py-8">
                    No hay información de episodios disponible
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
