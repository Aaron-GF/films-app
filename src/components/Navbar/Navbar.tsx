"use client";
import Searchbar from "@/components/Navbar/Searchbar";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center fixed top-0 z-50 px-10 py-4 w-full border-b border-yellow-dark bg-dark">
      <h1 className="text-2xl font-bold text-yellow-dark">Filmix</h1>
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
      <Searchbar />
    </header>
  );
}
