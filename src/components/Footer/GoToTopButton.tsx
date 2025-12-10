"use client";

export default function GoToTopButton() {
  return (
    <div className="flex items-center gap-2 ml-auto mt-auto">
      <span className="text-light/70 text-sm">Volver al inicio</span>
      <button
        className="flex items-center justify-center size-10 rounded-full text-yellow-dark bg-yellow-dark/10 transition-all duration-normal hover:scale-105 hover:bg-yellow-dark hover:text-dark"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Volver al inicio"
        aria-label="Volver al inicio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
        </svg>
      </button>
    </div>
  );
}
