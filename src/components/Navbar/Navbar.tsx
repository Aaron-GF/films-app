"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Componentes */
import Searchbar from "@/components/Navbar/Searchbar";
import SearchDropdown from "@/components/Navbar/SearchDropdown";
import MobileMenu from "@/components/Navbar/MobileMenu";

/* Endpoints */
import { searchMulti } from "@/lib/endpoints";
import { searchCollection } from "@/lib/endpoints";

/* Utils */
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
  const pathname = usePathname();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

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
    <header className="flex justify-between items-center fixed top-0 z-70 px-2 sm:px-4 md:px-10 h-18 w-full bg-dark pb-1">
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
          <svg fill="none" stroke="currentColor" className={`size-5 transition-transform duration-300 ${ isMobileMenuOpen ? "rotate-180" : "" }`} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
        </button>
      </div>

      {/* Navegación - Desktop */}
      <nav className="hidden md:flex h-full">
        {NAV_LINKS.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));

          return (
            <Link key={link.name} href={link.href} className="h-full">
              <button
                className={`w-28 h-full font-medium transition-all flex items-center justify-center ${
                  isActive
                    ? "bg-yellow-dark/20 text-yellow-light"
                    : "text-yellow-dark hover:bg-yellow-dark/10 hover:text-yellow-light"
                }`}
              >
                {link.name}
              </button>
            </Link>
          );
        })}
      </nav>

      {/* Buscador */}
      <Searchbar onSearch={handleSearch} value={selectedValue} />

      {/* Menú móvil desplegable */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
      />

      {/* Dropdown de sugerencias de búsqueda */}
      {showDropdown && (
        <SearchDropdown results={searchResults} onSelect={handleSelect} />
      )}

      {/* Borde inferior decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-dark to-transparent" />
    </header>
  );
}
