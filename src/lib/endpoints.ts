import { fetchData } from "@/lib/fetchData";

/* ==================================
   Películas
================================== */
export const getMovies = {
  list: (type: "popular" | "top_rated" | "now_playing" | "upcoming") =>
    fetchData(`movie/${type}`),
  details: (id: number | string, endpoint?: "credits" | "videos" | "similar") =>
    fetchData(`movie/${id}/${endpoint}`),
};

/* ==================================
   Series
================================== */
export const getSeries = {
  list: (type: "popular" | "top_rated" | "airing_today" | "upcoming") =>
    fetchData(`tv/${type}`),
  details: (id: number | string, endpoint?: "credits" | "videos" | "similar") =>
    fetchData(`tv/${id}/${endpoint}`),
};

/* ==================================
   Utilidades generales
================================== */
export const searchMulti = (query: string) =>
  fetchData(`search/multi?query=${encodeURIComponent(query)}`);

export const getTrending = (
  mediaType: "movie" | "tv" | "all",
  timeWindow: "day" | "week"
) => fetchData(`trending/${mediaType}/${timeWindow}`);

export const getDiscover = (
  category: "movie" | "tv",
  query?: string 
) => fetchData(`discover/${category}${query ? `?${query}` : ""}`);
