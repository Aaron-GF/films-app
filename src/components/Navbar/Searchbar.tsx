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
      className="flex items-center sm:gap-2 bg-gray-dark rounded-full px-2 sm:px-4 py-1 sm:py-2"
    >
      <input
        type="search"
        placeholder="¿Que estás buscando?"
        className="outline-none placeholder:text-sm sm:placeholder:text-base"
        value={input}
        onChange={handleTextChange}
      />
      <button type="submit" aria-label="Buscar">
        <svg fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 1 5.196 5.196a7.5 7.5 0 0 1 10.607 10.607"/></svg>
      </button>
    </form>
  );
}
