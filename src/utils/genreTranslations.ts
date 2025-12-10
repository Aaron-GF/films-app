import type { Genre } from "@/types/tmdb";

/**
 * Traducciones manuales para géneros que TMDB no traduce automáticamente
 * Principalmente para géneros de series TV
 */
const GENRE_TRANSLATIONS: Record<string, string> = {
  // Géneros de series que suelen venir en inglés
  "Action & Adventure": "Acción y Aventura",
  "Sci-Fi & Fantasy": "Ciencia Ficción y Fantasía",
  "War & Politics": "Guerra y Política",
  Soap: "Telenovela",
  Talk: "Programa de Entrevistas",
  News: "Noticias",
  Reality: "Reality",
  Kids: "Infantil",
  Western: "Western",

  // Géneros comunes en inglés
  Action: "Acción",
  Adventure: "Aventura",
  Animation: "Animación",
  Comedy: "Comedia",
  Crime: "Crimen",
  Documentary: "Documental",
  Drama: "Drama",
  Family: "Familia",
  Fantasy: "Fantasía",
  History: "Historia",
  Horror: "Terror",
  Music: "Música",
  Mystery: "Misterio",
  Romance: "Romance",
  "Science Fiction": "Ciencia Ficción",
  Thriller: "Thriller",
  War: "Guerra",
};

/**
 * Traduce un género al español si es necesario
 */
export function translateGenre(genreName: string): string {
  return GENRE_TRANSLATIONS[genreName] || genreName;
}

/**
 * Traduce un array de géneros al español
 */
export function translateGenres(genres: Genre[]): Genre[] {
  return genres.map((genre) => ({
    ...genre,
    name: translateGenre(genre.name),
  }));
}
