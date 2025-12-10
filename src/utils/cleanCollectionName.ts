import type { SearchResult } from "@/types/tmdb";

export const cleanCollectionName = (
    name: string,
    mediaType: SearchResult["media_type"]
  ) => {
    if (mediaType !== "collection") return name;

    // Remueve sufijos redundantes como "- Collection", "Collection", "- Colección", "Colección"
    return name
      .replace(/\s*[-–—]\s*Collection$/i, "")
      .replace(/\s+Collection$/i, "")
      .replace(/\s*[-–—]\s*Colección$/i, "")
      .replace(/\s+Colección$/i, "")
      .trim();
  };