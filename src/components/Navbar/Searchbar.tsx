"use client";

export default function Searchbar() {
  return (
    <div className="flex items-center gap-2 bg-gray-dark rounded-full px-4 py-2">
      <input type="text" placeholder="Search" className="outline-none" />
      <button>
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
    </div>
  );
}
