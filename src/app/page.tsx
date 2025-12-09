/* Componentes */
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import HeroCarousel from "@/components/Carousels/HeroCarousel";

/* Endpoints */
import { getMovies, getSeries, getTrending } from "@/lib/endpoints";

export default async function Home() {
  const trending = await getTrending("all", "week"); // Tendencias en series y películas
  const nowPlayingMovies = await getMovies.list("now_playing"); // Estrenos en cartelera
  const popularSeries = await getSeries.list("popular"); // Series populares
  const newEpisodes = await getSeries.list("on_the_air"); // Series con nuevos episodios esta semana
  const upcomingMovies = await getMovies.list("upcoming"); // Proximos estrenos de películas

  return (
    <main className="flex flex-col gap-8 mx-auto p-4 md:p-10 mt-20">
      <HeroCarousel media={trending.results} />
      <h2 className="text-2xl font-bold">Nuevos episodios</h2>
      <MediaCarousel media={newEpisodes.results} />
      <h2 className="text-2xl font-bold">En cartelera</h2>
      <MediaCarousel media={nowPlayingMovies.results} />
      <h2 className="text-2xl font-bold">Proximos estrenos de películas</h2>
      <MediaCarousel media={upcomingMovies.results} />
      <h2 className="text-2xl font-bold">Series populares</h2>
      <MediaCarousel media={popularSeries.results} />
    </main>
  );
}
