/* Componentes */
import MediaCarousel from "@/components/MediaCarousel";
import HeroCarousel from "@/components/HeroCarousel";

/* Endpoints */
import {
  getBestRatedMovies,
  getTrendingAll,
  getRecomendedMovies,
  getNowPlayingMovies,
  getPopularSeries,
} from "@/lib/endpoints";

export default async function Home() {
  const recommendedMovies = await getRecomendedMovies();
  const nowPlayingMovies = await getNowPlayingMovies();
  const bestRatedMovies = await getBestRatedMovies();
  const popularSeries = await getPopularSeries();
  const trendingAll = await getTrendingAll();

  return (
    <main className="flex flex-col gap-8 mx-auto p-4 md:p-10 mt-20">
      <HeroCarousel movies={recommendedMovies.results} />
      <h2 className="text-2xl font-bold">Lo más popular de la semana</h2>
      <MediaCarousel media={trendingAll.results} />
      <h2 className="text-2xl font-bold">Estrenos en cartelera</h2>
      <MediaCarousel media={nowPlayingMovies.results} />
      <h2 className="text-2xl font-bold">Series más vistas</h2>
      <MediaCarousel media={popularSeries.results} />
      <h2 className="text-2xl font-bold">Peliculas mejor valoradas</h2>
      <MediaCarousel media={bestRatedMovies.results} />
    </main>
  );
}
