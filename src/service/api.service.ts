import type { Movie } from "../interface/Movie";

const BASE_URL = import.meta.env.VITE_APP_TMDB_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const fetchPopularMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=10751&language=en-US&page=1`,
    {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    }
  );
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  if (!response.ok) {
    throw new Error(`${response.status}`);
  }
  return await response.json();
};
