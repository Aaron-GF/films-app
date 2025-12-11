"use client";

import { useState } from "react";
import Link from "next/link";

import Searchbar from "@/components/Navbar/Searchbar";
import SearchDropdown from "@/components/Navbar/SearchDropdown";
import { searchMulti } from "@/lib/endpoints";
import { searchCollection } from "@/lib/endpoints";
import { getYear } from "@/utils/getYear";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "collection";
  release_date?: string;
  first_air_date?: string;
}

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Películas", href: "/movies" },
  { name: "Series", href: "/series" },
];

export default function Navbar() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = async (query: string) => {
    // Buscar en películas/series y colecciones en paralelo
    const [multiRes, collectionRes] = await Promise.all([
      searchMulti(query),
      searchCollection(query),
    ]);

    // Filtrar y formatear resultados de películas/series
    const mediaResults = Array.isArray(multiRes.results)
      ? multiRes.results
          .filter(
            (item: any) =>
              item.media_type === "movie" || item.media_type === "tv"
          )
          .slice(0, 4) // Limitar a 4 resultados de media
      : [];

    // Formatear resultados de colecciones
    const collectionResults = Array.isArray(collectionRes.results)
      ? collectionRes.results
          .map((item: any) => ({
            ...item,
            media_type: "collection" as const,
          }))
          .slice(0, 2) // Limitar a 2 colecciones
      : [];

    // Combinar y ordenar todos los resultados
    const allResults = [...mediaResults, ...collectionResults]
      .sort((a: SearchResult, b: SearchResult) => getYear(b) - getYear(a))
      .slice(0, 6); // Máximo 6 resultados totales

    setSearchResults(allResults);
    setShowDropdown(allResults.length > 0);
  };

  const handleSelect = (value: SearchResult) => {
    setSelectedValue(value.title || value.name);
    setShowDropdown(false);
    setSearchResults([]);
  };

  return (
    <header className="flex justify-between items-center fixed top-0 z-navbar px-4 md:px-10 py-4 w-full bg-dark">
      {/* Logo con flecha desplegable en móvil */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <h1 className="text-2xl font-bold text-yellow-dark">Filmix</h1>
        </Link>

        {/* Flecha desplegable - Solo móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-yellow-dark"
          aria-label="Menú de navegación"
          aria-expanded={isMobileMenuOpen}
        >
          <svg fill="none" stroke="currentColor" className="`size-5 transition-transform duration-300 ${ isMobileMenuOpen ? &quot;rotate-180&quot; : &quot;&quot; }`" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
        </button>
      </div>

      {/* Navegación - Desktop */}
      <nav className="hidden md:flex gap-8">
        {NAV_LINKS.map((link) => (
          <Link key={link.name} href={link.href}>
            <button className="text-yellow-dark hover:text-yellow-light transition-colors">
              {link.name}
            </button>
          </Link>
        ))}
      </nav>

      {/* Searchbar */}
      <Searchbar onSearch={handleSearch} value={selectedValue} />

      {/* Menú móvil desplegable */}
      <nav
        className={`md:hidden absolute top-16 left-0 right-0 bg-dark border-t border-yellow-dark/20 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-4 gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <button className="w-full text-left py-2 px-4 text-yellow-dark hover:bg-yellow-dark/10 rounded transition-colors">
                {link.name}
              </button>
            </Link>
          ))}
        </div>
      </nav>

      {/* Dropdown de sugerencias de búsqueda */}
      {showDropdown && (
        <SearchDropdown results={searchResults} onSelect={handleSelect} />
      )}

      {/* Borde inferior decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-dark to-transparent" />
    </header>
  );
}
