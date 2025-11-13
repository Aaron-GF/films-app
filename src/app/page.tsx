import MovieCarousel from "@/components/MovieCarousel";
import Navbar from "@/components/Navbar/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import { getPopularMovies, getRecomendedMovies, getLatestMovies } from "@/lib/endpoints";

export default async function Home() {
  const trendingMovies = await getPopularMovies();
  const recommendedMovies = await getRecomendedMovies();
  const latestMovies = await getLatestMovies();

  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8 mx-auto p-10 mt-20">
        <HeroCarousel movies={recommendedMovies.results} />
        <h2 className="text-2xl font-bold">Popular Movies</h2>
        <MovieCarousel movies={trendingMovies.results} />
        <h2 className="text-2xl font-bold">Latest Movies</h2>
        <MovieCarousel movies={latestMovies.results} />
      </main>
    </>
  );
}
