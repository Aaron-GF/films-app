import Link from "next/link";
import ContactSection from "@/components/Footer/ContactSection";
import GoToTopButton from "./GoToTopButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full mt-20 bg-linear-to-t from-dark via-gray-dark to-transparent ">
      <div className="max-w-7xl mx-auto px-10 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Sección sobre la aplicación */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-yellow-dark">Filmix</h3>
            <p className="text-light/70 text-sm leading-relaxed">
              Proyecto de desarrollo web construido con React y Next.js.
              Aplicación para explorar películas y series usando la API de TMDB.
            </p>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDB Logo"
              className="pt-2 h-5 opacity-70 transition-opacity hover:opacity-100"
            />
          </section>

          {/* Sección de navegación */}
          <section className="space-y-4" aria-label="Navegación del sitio">
            <h4 className="text-lg font-semibold text-yellow-light">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-light/70 transition-colors hover:text-yellow-dark"
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
            </ul>
          </section>

          {/* Sección de contacto */}
          <ContactSection />

          {/* Botón para volver arriba */}
          <GoToTopButton />
        </div>

        {/* Pie de página */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-yellow-dark/30">
          <p className="text-light/50 text-sm">Filmix © {currentYear}</p>
          <p className="text-light/50 text-sm">
            Hecho por{" "}
            <span className="text-yellow-dark font-semibold">Aaron GF</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
