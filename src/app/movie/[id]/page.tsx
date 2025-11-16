import { getMovieDetails } from "@/lib/endpoints";

export default async function MovieDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const movie = await getMovieDetails(id);
    console.log(movie);
    return <div>{movie.title}</div>;
}
