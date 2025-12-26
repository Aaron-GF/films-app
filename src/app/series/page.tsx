"use client";

import { useState, useEffect } from "react";
import { getSeries, getGenres, getDiscover } from "@/lib/endpoints";
import { translateGenres } from "@/utils/genreTranslations";
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
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
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
        if (selectedGenre || selectedYear) {
          // Usar discover cuando hay género o año seleccionado
          const params = [];
          if (selectedGenre) params.push(`with_genres=${selectedGenre}`);
          if (selectedYear) params.push(`first_air_date_year=${selectedYear}`);
          data = await getDiscover("tv", params.join("&"));
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
  }, [selectedCategory, selectedGenre, selectedYear]);

  const getPageTitle = () => {
    const parts = [];
    if (selectedGenre) {
      const genre = genres.find((g) => g.id === selectedGenre);
      parts.push(`Series de ${genre?.name || ""}`);
    } else {
      parts.push(CATEGORY_TITLES[selectedCategory]);
    }
    if (selectedYear) {
      parts.push(`(${selectedYear})`);
    }
    return parts.join(" ");
  };

  return (
    <>
      <FilterBar
        categories={CATEGORIES}
        genres={genres}
        selectedCategory={selectedCategory}
        selectedGenre={selectedGenre}
        selectedYear={selectedYear}
        onCategoryChange={(category) => {
          setSelectedCategory(category as SeriesCategory);
          setSelectedGenre(null); // Reset genre filter when changing category
        }}
        onGenreChange={setSelectedGenre}
        onYearChange={setSelectedYear}
      />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <h1 className="text-lg md:text-2xl font-bold text-yellow-dark mb-8">
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
