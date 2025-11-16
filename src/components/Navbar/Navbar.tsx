"use client";

import { useState } from "react";
import Link from "next/link";
import Searchbar from "@/components/Navbar/Searchbar";
import { searchMulti } from "@/lib/endpoints";
import { getYear } from "@/utils/getYear";

export default function Navbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSearch = async (query: string) => {
    const res = await searchMulti(query);
    // Filtra los resultados para mostrar solo películas y series
    const filteredResults = res.results
      .filter((item) => item.media_type === "movie" || item.media_type === "tv")
      .slice(0, 6)
      .sort((a, b) => getYear(b) - getYear(a));
    setSearchResults(filteredResults);
    setShowDropdown(true);
  };

  const handleSelect = (value) => {
    setSelectedValue(value.title || value.name);
    setShowDropdown(false); // Cierra el dropdown al seleccionar un valor
    setSearchResults([]); // Limpia los resultados
  };

  return (
    <header className="flex justify-between items-center fixed top-0 z-50 px-10 py-4 w-full border-b border-yellow-dark bg-dark">
      <h1 className="text-2xl font-bold text-yellow-dark">Filmix</h1>

      {/* Botones de navegación */}
      <div className="flex gap-10">
        <button className="text-yellow-dark hover:text-yellow-light transition-colors">
          Películas
        </button>
        <button className="text-yellow-dark hover:text-yellow-light transition-colors">
          Series
        </button>
        <button className="text-yellow-dark hover:text-yellow-light transition-colors">
          Categorias
        </button>
      </div>
      <Searchbar onSearch={handleSearch} value={selectedValue} />

      {/* Dropdown de sugerencias */}
      {showDropdown && (
        <ul className="absolute top-19 right-0 bg-dark w-3/10" tabIndex={-1}>
          {searchResults.map((item) => (
            <Link
              key={item.id}
              href={
                item.media_type === "movie"
                  ? `/movie/${item.id}`
                  : `/tv/${item.id}`
              }
            >
              <li
                key={item.id}
                onClick={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-yellow-dark hover:text-dark hover:font-bold cursor-pointer"
              >
                {item.title || item.name} ({getYear(item)})
                <span className="text-yellow-light text-xs bg-gray-dark rounded-full px-2 py-1 ml-2">
                  {item.media_type === "movie"
                    ? "Película"
                    : item.media_type === "tv"
                    ? "Serie"
                    : "Otro"}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </header>
  );
}
