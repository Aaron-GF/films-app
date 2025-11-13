"use server";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_TMDB}`,
  },
};

export async function fetchData(path: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/${path}?&language=es-ES`,
    options
  );
  const data = await response.json();
  console.log(data)
  return data;
}
