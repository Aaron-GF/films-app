import { fetchData } from "@/lib/fetchData";
import type {
  Movie,
  TVShow,
  Collection,
  Genre,
  PaginatedResponse,
  SearchResult,
  WatchProvidersResponse,
  Season,
} from "@/types/tmdb";

type MediaType = "movie" | "tv";
type MovieListType = "popular" | "top_rated" | "now_playing" | "upcoming";
type SeriesListType = "popular" | "top_rated" | "airing_today" | "on_the_air";
type DetailsEndPoint = "credits" | "videos" | "similar";

/* ==================================
   Películas
================================== */
export const getMovies = {
  list: (type: MovieListType) =>
    fetchData<PaginatedResponse<Movie>>(`movie/${type}`),
  details: (id: number | string) => fetchData<Movie>(`movie/${id}`), // Detalles en general
  detailsEndpoint: <T = any>(id: number | string, endpoint: DetailsEndPoint) =>
    fetchData<T>(`movie/${id}/${endpoint}`), // Detalle en específico
  watchProviders: (id: number | string) =>
    fetchData<WatchProvidersResponse>(`movie/${id}/watch/providers`), // Proveedores de streaming
};

/* ==================================
   Series
================================== */
export const getSeries = {
  list: (type: SeriesListType) =>
    fetchData<PaginatedResponse<TVShow>>(`tv/${type}`),
  details: (id: number | string) => fetchData<TVShow>(`tv/${id}`), // Detalles en general
  detailsEndpoint: <T = any>(id: number | string, endpoint: DetailsEndPoint) =>
    fetchData<T>(`tv/${id}/${endpoint}`), // Detalle en específico
  season: (seriesId: number | string, seasonNumber: number) =>
    fetchData<Season>(`tv/${seriesId}/season/${seasonNumber}`), // Información de temporadas y episodios
  watchProviders: (id: number | string) =>
    fetchData<WatchProvidersResponse>(`tv/${id}/watch/providers`), // Proveedores de streaming
};

/* ==================================
   Géneros
================================== */
export const getGenres = {
  movies: () => fetchData<{ genres: Genre[] }>("genre/movie/list"),
  tv: () => fetchData<{ genres: Genre[] }>("genre/tv/list"),
};

/* ==================================
   Utilidades generales
================================== */
export const searchMulti = (query: string) =>
  fetchData<PaginatedResponse<SearchResult>>(
    `search/multi?query=${encodeURIComponent(query)}`
  );

export const searchCollection = (query: string) =>
  fetchData<PaginatedResponse<Collection>>(
    `search/collection?query=${encodeURIComponent(query)}`
  );

export const getCollection = (id: number | string) =>
  fetchData<Collection>(`collection/${id}`); // Detalles de una colección

export const getTrending = (
  mediaType: MediaType | "all",
  timeWindow: "day" | "week"
) =>
  fetchData<PaginatedResponse<Movie | TVShow>>(
    `trending/${mediaType}/${timeWindow}`
  );

export const getDiscover = (category: MediaType, query?: string) =>
  fetchData<PaginatedResponse<Movie | TVShow>>(
    `discover/${category}${query ? `?${query}` : ""}`
  ); // Recomendaciones
