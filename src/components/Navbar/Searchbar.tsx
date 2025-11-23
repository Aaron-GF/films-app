"use client";

import { useState, useRef } from "react";

interface SearchbarProps {
  value: string;
  onSearch: (query: string) => void;
}

export default function Searchbar({ value, onSearch }: SearchbarProps) {
  const [input, setInput] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInput(text);

    // Debounce: Cancela el timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSearch(text);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-gray-dark rounded-full px-4 py-2"
    >
      <input
        type="search"
        placeholder="¿Que estás buscando?"
        className="outline-none placeholder:text-sm"
        value={input}
        onChange={handleTextChange}
      />
      <button type="submit">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 115.196 5.196a7.5 7.5 0 0110.607 10.607z"
          />
        </svg>
      </button>
    </form>
  );
}
