import Link from "next/link";
import { getYear } from "@/utils/getYear";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
}

interface SearchDropdownProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

export default function SearchDropdown({
  results,
  onSelect,
}: SearchDropdownProps) {
  if (results.length === 0) return null;

  return (
    <ul className="absolute top-19 right-0 bg-dark max-w-80" tabIndex={-1}>
      {results.map((item) => (
        <Link
          key={item.id}
          href={
            item.media_type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`
          }
        >
          <li
            onClick={() => onSelect(item)}
            className="font-semibold px-4 py-2 hover:bg-yellow-dark hover:text-dark cursor-pointer"
          >
            {item.title || item.name} ({getYear(item)})
            <span className="text-yellow-light text-xs bg-gray-dark rounded-full px-2 py-1 ml-2">
              {item.media_type === "movie" ? "Película" : "Serie"}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
