import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-20 bg-linear-to-t from-dark via-gray-dark to-transparent ">
      <div className="max-w-7xl mx-auto px-10 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mb-8">
          {/* Sección sobre la aplicación */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-dark">Filmix</h3>
            <p className="text-light/70 text-sm leading-relaxed">
              Tu plataforma definitiva para descubrir películas y series.
              Explora y encuentra tu próxima obsesión cinematográfica.
            </p>
            {/* Atribución a TMDB */}
            <div className="pt-2">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                className="h-4 opacity-70 hover:opacity-100 transition-opacity"
              />
              <p className="text-xs text-light/50 mt-2">
                Este producto usa la API de TMDB pero no está avalado ni
                certificado por TMDB.
              </p>
            </div>
          </div>

          {/* Sección de navegación */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-light">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-light/70 hover:text-yellow-dark transition-colors text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/movies"
                  className="text-light/70 hover:text-yellow-dark transition-colors text-sm"
                >
                  Películas
                </Link>
              </li>
              <li>
                <Link
                  href="/series"
                  className="text-light/70 hover:text-yellow-dark transition-colors text-sm"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-light/70 hover:text-yellow-dark transition-colors text-sm"
                >
                  Categorías
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de contacto */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-light">
              Contacto
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com/Aaron-GF"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-yellow-dark/10 hover:bg-yellow-dark flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="GitHub"
                title="GitHub"
              >
                <svg
                  className="size-5 text-yellow-dark group-hover:text-dark transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://discord.com/users/886184601104572456"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-yellow-dark/10 hover:bg-yellow-dark flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Discord"
                title="Discord: _aaron.gf"
              >
                <svg
                  className="size-5 text-yellow-dark group-hover:text-dark transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="www.linkedin.com/in/aaron-garcia-fernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-yellow-dark/10 hover:bg-yellow-dark flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <svg
                  className="size-5 text-yellow-dark group-hover:text-dark transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://portfolio-dev-web-aaron-gf.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="size-10 rounded-full bg-yellow-dark/10 hover:bg-yellow-dark flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Portfolio"
                title="Portfolio"
              >
                <svg
                  className="size-5 text-yellow-dark group-hover:text-dark transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div className="pt-8 border-t border-yellow-dark/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-light/50 text-sm">Filmix © {currentYear}</p>
            <p className="text-light/50 text-sm">
              Hecho por{" "}
              <span className="text-yellow-dark font-semibold">Aaron GF</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
