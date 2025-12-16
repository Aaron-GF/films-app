"use client";

import { useState } from "react";
import type { Genre } from "@/types/tmdb";

interface FilterBarProps {
  categories: { value: string; label: string }[];
  genres: Genre[];
  selectedCategory: string;
  selectedGenre: number | null;
  onCategoryChange: (category: string) => void;
  onGenreChange: (genreId: number | null) => void;
}

export default function FilterBar({
  categories,
  genres,
  selectedCategory,
  selectedGenre,
  onCategoryChange,
  onGenreChange,
}: FilterBarProps) {
  const [showGenres, setShowGenres] = useState(false);

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

        {/* Filtro de género */}
        <div className="relative">
          <button
            onClick={() => setShowGenres(!showGenres)}
            className="sm:px-4 px-2 sm:py-2 py-1 rounded-lg font-medium bg-dark/50 text-light hover:bg-yellow-dark/20 hover:text-yellow-light transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            {selectedGenre
              ? genres.find((g) => g.id === selectedGenre)?.name
              : "Todos los géneros"}
            <svg
              className={`size-4 transition-transform ${
                showGenres ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
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
      </div>
    </div>
  );
}
