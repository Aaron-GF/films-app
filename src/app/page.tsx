import { fetchData } from "@/lib/fetchData";
import { MovieCarousel } from "@/components/MovieCarousel";

export default async function Home() {  
  const data = await fetchData();
  
  // Transform the data to match our Movie interface
  const movies = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path
  }));
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>
      <MovieCarousel movies={movies} />
    </main>
  );
}
