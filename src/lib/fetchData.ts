"use server"

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_TMDB}`,
  },
};

export async function fetchData<T>(path: string): Promise<T> {
  const url = path.includes("?")
    ? `https://api.themoviedb.org/3/${path}&language=es-ES`
    : `https://api.themoviedb.org/3/${path}?language=es-ES`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
