/* Componentes */
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import HeroCarousel from "@/components/Carousels/HeroCarousel";

/* Endpoints */
import {
  getMovies,
  getSeries,
  getDiscover,
  getTrending,
} from "@/lib/endpoints";

export default async function Home() {
  // Tendencias en series y películas
  const trending = await getTrending("all", "week");

  // Estrenos en cartelera
  const nowPlayingMovies = await getMovies.list("now_playing");

  // Series populares
  const popularSeries = await getSeries.list("popular");

  // Películas con mejores valoraciones
  const bestRatedMovies = await getMovies.list("top_rated");

  return (
    <main className="flex flex-col gap-8 mx-auto p-4 md:p-10 mt-20">
      <HeroCarousel media={trending.results} />
      <h2 className="text-2xl font-bold">Lo más popular de la semana</h2>
      <MediaCarousel media={popularSeries.results} />
      <h2 className="text-2xl font-bold">Estrenos en cartelera</h2>
      <MediaCarousel media={nowPlayingMovies.results} />
      <h2 className="text-2xl font-bold">Series más vistas</h2>
      <MediaCarousel media={popularSeries.results} />
      <h2 className="text-2xl font-bold">Peliculas mejor valoradas</h2>
      <MediaCarousel media={bestRatedMovies.results} />
    </main>
  );
}
