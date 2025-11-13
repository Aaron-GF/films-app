import { fetchData } from "@/lib/fetchData";

/* Películas relevantes recomendadas */
export const getRecomendedMovies = () => fetchData("discover/movie");

/* Tendencias */
export const getPopularMovies = () =>
  fetchData("discover/movie?sort_by=popularity.desc");

/* Películas por género */
export const getMoviesByGenre = (genreId: number) =>
  fetchData(`discover/movie?with_genres=${genreId}`);

/* Más recientes */
export const getLatestMovies = () =>
  fetchData("discover/movie?sort_by=release_date.desc");
