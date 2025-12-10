import Link from "next/link";

/* Utilidades */
import { getYear } from "@/utils/getYear";
import { cleanCollectionName } from "@/utils/cleanCollectionName";

/* Tipos */
import type { SearchResult } from "@/types/tmdb";

interface SearchDropdownProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export default function SearchDropdown({
  results,
  onSelect,
}: SearchDropdownProps) {
  if (results.length === 0) return null;

  const getHref = (item: SearchResult) => {
    if (item.media_type === "movie") return `/movie/${item.id}`;
    if (item.media_type === "tv") return `/tv/${item.id}`;
    return `/collections/${item.id}`;
  };

  const getLabel = (mediaType: SearchResult["media_type"]) => {
    if (mediaType === "movie") return "Película";
    if (mediaType === "tv") return "Serie";
    return "Colección";
  };

  return (
    <ul className="absolute top-19 right-0 bg-dark max-w-80">
      {results.map((item) => (
        <Link key={item.id} href={getHref(item)}>
          <li
            onClick={() => onSelect(item)}
            className="font-semibold px-4 py-2 hover:bg-yellow-dark hover:text-dark cursor-pointer"
          >
            {cleanCollectionName(
              item.title || item.name || "",
              item.media_type
            )}
            {item.media_type !== "collection" && ` (${getYear(item)})`}
            <span className="text-yellow-light text-xs bg-gray-dark rounded-full px-2 py-1 ml-2">
              {getLabel(item.media_type)}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
