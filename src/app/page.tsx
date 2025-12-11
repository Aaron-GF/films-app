/* Componentes */
import MediaCarousel from "@/components/Carousels/MediaCarousel";
import HeroCarousel from "@/components/Carousels/HeroCarousel";
import CollectionsGrid from "@/components/Media/CollectionsGrid";

/* Endpoints */
import {
  getMovies,
  getSeries,
  getTrending,
  getCollection,
} from "@/lib/endpoints";

export default async function Home() {
  const trending = await getTrending("all", "week"); // Tendencias en series y películas
  const nowPlayingMovies = await getMovies.list("now_playing"); // Estrenos en cartelera
  const popularSeries = await getSeries.list("popular"); // Series populares
  const newEpisodes = await getSeries.list("on_the_air"); // Series con nuevos episodios esta semana
  const upcomingMovies = await getMovies.list("upcoming"); // Proximos estrenos de películas

  // Colecciones destacadas
  const collectionIds = [86311, 10, 1241, 119, 328, 263]; // Los Vengadores, Star Wars, Harry Potter, El Señor de los Anillos, Jurassic Park, Batman
  const collectionsPromise = collectionIds.map((id) => getCollection(id));
  const collectionsRaw = await Promise.all(collectionsPromise);
  const collections = collectionsRaw
    .filter((c) => c.poster_path || c.backdrop_path)
    .map((c) => ({
      id: c.id,
      name: c.name,
      poster_path: c.poster_path, // Mantener para fallback
      backdrop_path: c.backdrop_path, // Nuevo: Preferido para el Grid
    }));

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

      <section className="py-8">
        <h2 className="text-3xl font-bold mb-6 text-yellow-dark">
          Colecciones Legendarias
        </h2>
        <CollectionsGrid collections={collections} />
      </section>
    </main>
  );
}
