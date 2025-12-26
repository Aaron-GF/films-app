"use client";

import { useState } from "react";
import type { Genre } from "@/types/tmdb";

interface FilterBarProps {
  categories: { value: string; label: string }[];
  genres: Genre[];
  selectedCategory: string;
  selectedGenre: number | null;
  selectedYear: number | null;
  onCategoryChange: (category: string) => void;
  onGenreChange: (genreId: number | null) => void;
  onYearChange: (year: number | null) => void;
}

export default function FilterBar({
  categories,
  genres,
  selectedCategory,
  selectedGenre,
  selectedYear,
  onCategoryChange,
  onGenreChange,
  onYearChange,
}: FilterBarProps) {
  const [showGenres, setShowGenres] = useState(false);
  const [showYears, setShowYears] = useState(false);

  // Generate year options (current year to 1900)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, i) => currentYear - i
  );

  return (
    <div className="sticky top-20 z-navbar bg-dark/95 backdrop-blur-md border-b border-yellow-dark/20 md:py-4 py-2">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Filtros de categoría */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => onCategoryChange(category.value)}
              className={`sm:px-4 px-2 sm:py-2 py-1 rounded-lg font-medium transition-all text-sm sm:text-base ${
                selectedCategory === category.value
                  ? "bg-yellow-dark text-dark"
                  : "bg-dark/50 text-light hover:bg-yellow-dark/20 hover:text-yellow-light"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Filtros de género y año */}
        <div className="flex flex-wrap gap-2">
          {/* Filtro de género */}
          <div className="relative">
            <button
              onClick={() => setShowGenres(!showGenres)}
              className="sm:px-4 px-2 sm:py-2 py-1 rounded-lg font-medium bg-dark/50 text-light hover:bg-yellow-dark/20 hover:text-yellow-light transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              {selectedGenre
                ? genres.find((g) => g.id === selectedGenre)?.name
                : "Todos los géneros"}
              <svg fill="none" stroke="currentColor" className={`size-4 transition-transform ${
                  showGenres ? "rotate-180" : ""
                }`} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" strokeWidth={2}/></svg>
            </button>

            {/* Dropdown de géneros */}
            {showGenres && (
              <div className="absolute top-full mt-2 bg-dark/95 backdrop-blur-md border border-yellow-dark/20 rounded-lg shadow-lg max-h-60 overflow-y-auto z-dropdown">
                {[{ id: null, name: "Todos los géneros" }, ...genres].map(
                  (option) => (
                    <button
                      key={option.id ?? "all"}
                      onClick={() => {
                        onGenreChange(option.id as number | null);
                        setShowGenres(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-yellow-dark/20 transition-colors ${
                        selectedGenre === option.id
                          ? "bg-yellow-dark/30 text-yellow-light"
                          : "text-light"
                      }`}
                    >
                      {option.name}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Filtro de año */}
          <div className="relative">
            <button
              onClick={() => setShowYears(!showYears)}
              className="sm:px-4 px-2 sm:py-2 py-1 rounded-lg font-medium bg-dark/50 text-light hover:bg-yellow-dark/20 hover:text-yellow-light transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              {selectedYear ? selectedYear : "Todos los años"}
              <svg fill="none" stroke="currentColor" className={`size-4 transition-transform ${
                  showYears ? "rotate-180" : ""
                }`} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" strokeWidth={2}/></svg>
            </button>

            {/* Dropdown de años */}
            {showYears && (
              <div className="absolute top-full mt-2 bg-dark/95 backdrop-blur-md border border-yellow-dark/20 rounded-lg shadow-lg max-h-60 overflow-y-auto z-dropdown min-w-[150px]">
                <button
                  onClick={() => {
                    onYearChange(null);
                    setShowYears(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-yellow-dark/20 transition-colors ${
                    selectedYear === null
                      ? "bg-yellow-dark/30 text-yellow-light"
                      : "text-light"
                  }`}
                >
                  Todos los años
                </button>
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      onYearChange(year);
                      setShowYears(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-yellow-dark/20 transition-colors ${
                      selectedYear === year
                        ? "bg-yellow-dark/30 text-yellow-light"
                        : "text-light"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
