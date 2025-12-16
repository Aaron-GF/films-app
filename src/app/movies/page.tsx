"use client";
import { useState, useEffect } from "react";

/* Endpoints */
import { getMovies, getGenres, getDiscover } from "@/lib/endpoints";

/* Componentes */
import FilterBar from "@/components/Filters/FilterBar";
import MediaGrid from "@/components/Media/MediaGrid";

/* Tipos */
import type { Movie, Genre } from "@/types/tmdb";

type MovieCategory = "popular" | "top_rated" | "now_playing" | "upcoming";

const CATEGORIES = [
  { value: "popular", label: "Popular" },
  { value: "top_rated", label: "Mejor valoradas" },
  { value: "now_playing", label: "En cartelera" },
  { value: "upcoming", label: "Próximos estrenos" },
];

const CATEGORY_TITLES: Record<MovieCategory, string> = {
  popular: "Películas Populares",
  top_rated: "Películas Mejor Valoradas",
  now_playing: "Películas en Cartelera",
  upcoming: "Próximos Estrenos",
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<MovieCategory>("popular");
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Carga géneros al montar
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres.movies();
        setGenres(data.genres || []);
      } catch (error) {
        console.error("Error loading genres:", error);
      }
    };
    loadGenres();
  }, []);

  // Carga películas cuando cambian los filtros
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedGenre) {
          // Usar discover cuando hay género seleccionado
          data = await getDiscover("movie", `with_genres=${selectedGenre}`);
        } else {
          // Usar lista de categoría
          data = await getMovies.list(selectedCategory);
        }
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error loading movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [selectedCategory, selectedGenre]);

  const getPageTitle = () => {
    if (selectedGenre) {
      const genre = genres.find((g) => g.id === selectedGenre);
      return `Películas de ${genre?.name || ""}`;
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
          setSelectedCategory(category as MovieCategory);
          setSelectedGenre(null); // Reset genre filter when changing category
        }}
        onGenreChange={setSelectedGenre}
      />

      <main className="container mx-auto px-2 sm:px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-dark mb-8">
          {getPageTitle()}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full size-12 border-4 border-yellow-dark border-t-transparent" />
          </div>
        ) : (
          <MediaGrid media={movies} mediaType="movie" />
        )}
      </main>
    </>
  );
}
