import { useEffect, useState } from "react";
import type { Movie } from "../interface/Movie";
import { fetchPopularMovies } from "../service/api.service";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

const baseUrl = "https://image.tmdb.org/t/p/w342";

function AllMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovies() {
      setIsLoading(true);

      try {
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);
      } catch {
        navigate("/NotFoundPage", { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }
  if (!movies) return <p>Movies not Found</p>;

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-semibold text-gray-600">
          Popular Kid's Movies
        </h1>
      </div>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {movies.map((movie) => {
          const fullPosterUrl = `${baseUrl}${movie.poster_path}`;
          return (
            <li key={movie.id} className="relative">
              <div className="group overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img
                  alt={movie.title}
                  src={fullPosterUrl}
                  className="pointer-events-none object-cover group-hover:opacity-75"
                />
                <Link to={`/movie/${movie.id}`}>
                  <span className="absolute inset-0"></span>
                </Link>
              </div>
              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                {movie.title}
              </p>
              <p className="pointer-events-none block text-sm font-medium text-gray-500">
                {movie.release_date}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AllMovies;
