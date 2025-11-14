/* Componentes */
import MovieCarousel from "@/components/MovieCarousel";
import Navbar from "@/components/Navbar/Navbar";
import HeroCarousel from "@/components/HeroCarousel";

/* Endpoints */
import {
  getBestRatedMovies,
  getUpcomingMovies,
  getRecomendedMovies,
  getNowPlayingMovies,
} from "@/lib/endpoints";

export default async function Home() {
  const recommendedMovies = await getRecomendedMovies();
  const nowPlayingMovies = await getNowPlayingMovies();
  const upcomingMovies = await getUpcomingMovies();
  const bestRatedMovies = await getBestRatedMovies();


  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 mx-auto p-4 md:p-10 mt-20">
        <HeroCarousel movies={recommendedMovies.results} />
        <h2 className="text-2xl font-bold">Próximamente</h2>
        <MovieCarousel movies={upcomingMovies.results} />
        <h2 className="text-2xl font-bold">En cartelera</h2>
        <MovieCarousel movies={nowPlayingMovies.results} />
        <h2 className="text-2xl font-bold">Mejor valoradas</h2>
        <MovieCarousel movies={bestRatedMovies.results} />
      </main>
    </>
  );
}
