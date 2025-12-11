import Image from "next/image";
import { WatchProvider, WatchProvidersResponse } from "@/types/tmdb";

interface WatchProvidersInfoProps {
  watchProviders: WatchProvidersResponse;
}

interface ProviderCardProps {
  provider: WatchProvider;
}

interface ProviderSectionProps {
  title: string;
  providers: WatchProvider[];
}

// Componente para mostrar proveedor individual
function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <div
      key={provider.provider_id}
      className="flex flex-col items-center gap-2 group"
      title={provider.provider_name}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform group-hover:scale-110 group-hover:shadow-xl">
        <Image
          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
          alt={provider.provider_name}
          width={70}
          height={70}
          className="object-cover"
        />
      </div>
      <span className="max-w-[80px] text-xs text-center">
        {provider.provider_name}
      </span>
    </div>
  );
}

// Componente para sección de proveedores (Streaming, Alquiler, Compra)
function ProviderSection({ title, providers }: ProviderSectionProps) {
  if (!providers || providers.length === 0) {
    return null;
  }

  return (
    <div className="p-6 rounded-lg border bg-dark/50 backdrop-blur-sm border-yellow-dark/20">
      <h3 className="mb-4 text-xl font-semibold text-yellow-light">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {providers.map((provider) => (
          <ProviderCard key={provider.provider_id} provider={provider} />
        ))}
      </div>
    </div>
  );
}

export default function WatchProvidersInfo({
  watchProviders,
}: WatchProvidersInfoProps) {
  // Verificar si hay datos para España
  const countryData = watchProviders?.results?.ES;

  if (!countryData) {
    return null; // No mostrar nada si no hay datos disponibles
  }

  const { flatrate, rent, buy, link } = countryData;

  // Si no hay ningún proveedor disponible, no mostrar el componente
  if (!flatrate && !rent && !buy) {
    return null;
  }

  // Configuración de las secciones
  const sections = [
    {
      title: "Streaming",
      providers: flatrate,
    },
    {
      title: "Alquiler",
      providers: rent,
    },
    {
      title: "Compra",
      providers: buy,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6 my-8">
      <h2 className="mb-6 text-3xl font-bold text-yellow-dark">
        Dónde la puedes ver
      </h2>

      <div className="space-y-6">
        {sections.map((section) => (
          <ProviderSection key={section.title} {...section} />
        ))}

        {/* Enlace a JustWatch */}
        {link && (
          <div className="text-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-yellow-dark transition-colors hover:text-yellow-dark/80"
            >
              Ver más opciones en JustWatch
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/></svg>
            </a>
          </div>
        )}
      </div>

      <p className="text-xs opacity-70 mt-6 text-center">
        Información proporcionada por JustWatch. La disponibilidad puede variar
        según tu ubicación.
      </p>
    </section>
  );
}
