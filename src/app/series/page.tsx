"use client";

import { useState, useEffect } from "react";
import { getSeries, getGenres, getDiscover } from "@/lib/endpoints";
import { translateGenres } from "@/lib/genreTranslations";
import FilterBar from "@/components/Filters/FilterBar";
import MediaGrid from "@/components/Media/MediaGrid";
import type { TVShow, Genre } from "@/types/tmdb";

type SeriesCategory = "popular" | "top_rated" | "airing_today" | "on_the_air";

const CATEGORIES = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Mejor valoradas" },
  { value: "airing_today", label: "Estrenos de hoy" },
  { value: "on_the_air", label: "En emisión" },
];

const CATEGORY_TITLES: Record<SeriesCategory, string> = {
  popular: "Series Populares",
  top_rated: "Series Mejor Valoradas",
  airing_today: "Series al Aire Hoy",
  on_the_air: "Series en Emisión",
};

export default function SeriesPage() {
  const [series, setSeries] = useState<TVShow[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<SeriesCategory>("popular");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar géneros al montar
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres.tv();
        const translatedGenres = translateGenres(data.genres || []);
        setGenres(translatedGenres);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    loadGenres();
  }, []);

  // Cargar series cuando cambian los filtros
  useEffect(() => {
    const loadSeries = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedGenre) {
          // Usar discover cuando hay género seleccionado
          data = await getDiscover("tv", `with_genres=${selectedGenre}`);
        } else {
          // Usar lista de categoría
          data = await getSeries.list(selectedCategory);
        }
        setSeries(data.results || []);
      } catch (error) {
        console.error("Error loading series:", error);
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };
    loadSeries();
  }, [selectedCategory, selectedGenre]);

  const getPageTitle = () => {
    if (selectedGenre) {
      const genre = genres.find((g) => g.id === selectedGenre);
      return `Series de ${genre?.name || ""}`;
    }
    return CATEGORY_TITLES[selectedCategory];
  };

  return (
    <>
      <FilterBar
        categories={CATEGORIES}
        genres={genres}
        selectedCategory={selectedCategory}
        selectedGenre={selectedGenre}
        onCategoryChange={(category) => {
          setSelectedCategory(category as SeriesCategory);
          setSelectedGenre(null); // Reset genre filter when changing category
        }}
        onGenreChange={setSelectedGenre}
      />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-dark mb-8">
          {getPageTitle()}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full size-12 border-4 border-yellow-dark border-t-transparent" />
          </div>
        ) : (
          <MediaGrid media={series} mediaType="tv" />
        )}
      </main>
    </>
  );
}
