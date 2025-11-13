"use client";
import Searchbar from "@/components/Navbar/Searchbar";

export default function Navbar() {
    return (
        <header className="flex justify-between items-center fixed top-0 z-50 px-10 py-6 w-full border-b border-yellow-dark bg-dark">
            <h1 className="text-3xl font-bold text-yellow-dark">Filmix</h1>
            <Searchbar />
        </header>
    );
}