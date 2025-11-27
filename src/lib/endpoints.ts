import { fetchData } from "@/lib/fetchData";

type MediaType = "movie" | "tv";
type MovieListType = "popular" | "top_rated" | "now_playing" | "upcoming";
type SeriesListType = "popular" | "top_rated" | "airing_today" | "on_the_air";
type DetailsEndPoint = "credits" | "videos" | "similar";

/* ==================================
   Películas
================================== */
export const getMovies = {
  list: (type: MovieListType) => fetchData(`movie/${type}`),
  details: (id: number | string) => fetchData(`movie/${id}`), // Detalles en general de una película
  detailsEndpoint: (id: number | string, endpoint: DetailsEndPoint) =>
    fetchData(`movie/${id}/${endpoint}`), // Detalle en específico de una película
  watchProviders: (id: number | string) => fetchData(`movie/${id}/watch/providers`), // Proveedores de streaming
};

/* ==================================
   Series
================================== */
export const getSeries = {
  list: (type: SeriesListType) => fetchData(`tv/${type}`),
  details: (id: number | string) => fetchData(`tv/${id}`), // Detalles en general de una serie
  detailsEndpoint: (id: number | string, endpoint: DetailsEndPoint) =>
    fetchData(`tv/${id}/${endpoint}`), // Detalle en específico de una serie
  season: (seriesId: number | string, seasonNumber: number) =>
    fetchData(`tv/${seriesId}/season/${seasonNumber}`), // Información de temporadas y episodios
  watchProviders: (id: number | string) => fetchData(`tv/${id}/watch/providers`), // Proveedores de streaming
};

/* ==================================
   Utilidades generales
================================== */
export const searchMulti = (query: string) =>
  fetchData(`search/multi?query=${encodeURIComponent(query)}`);

export const getTrending = (
  mediaType: MediaType | "all",
  timeWindow: "day" | "week"
) => fetchData(`trending/${mediaType}/${timeWindow}`);

export const getDiscover = (category: MediaType, query?: string) =>
  fetchData(`discover/${category}${query ? `?${query}` : ""}`); // Recomendaciones
