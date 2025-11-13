import { fetchData } from "@/lib/fetchData";

/* Películas destacadas recomendadas */
export const getRecomendedMovies = () => fetchData("discover/movie");

/* Películas con mejores valoraciones */
export const getBestRatedMovies = () => fetchData("movie/top_rated");

/* Películas por género */
export const getMoviesByGenre = (genreId: number) =>
  fetchData(`discover/movie?with_genres=${genreId}`);

/* Películas que se estrenarán próximamente */
export const getUpcomingMovies = () => fetchData("movie/upcoming");

/* Estrenos cartelera */
export const getNowPlayingMovies = () => fetchData("movie/now_playing");

/* Series destacadas */
export const getPopularSeries = () => fetchData("tv/popular");
