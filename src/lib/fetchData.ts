"use server";

const options: RequestInit = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN_TMDB}`,
  },
};

export async function fetchData() {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?&language=es-ES`,
    options
  );
  const data = await response.json();
  console.log(data)
  return data;
}
