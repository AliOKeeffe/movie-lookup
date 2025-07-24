import { useParams } from "react-router";
import { fetchMovieDetails } from "../service/api.service";
import type { Movie } from "../interface/Movie";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { CircularProgress } from "@mui/material";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovieDetails() {
      setIsLoading(true);
      try {
        const movieDetails = await fetchMovieDetails(id);
        setMovie(movieDetails);
      } catch {
        navigate("/NotFoundPage", { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    loadMovieDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }
  if (!movie) return <p>Movie not Found</p>;

  const posterUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-sm lg:max-w-4xl grid grid-cols-1 items-start gap-x-8 gap-y-16 sm:gap-y-24 lg:grid-cols-2">
          <div className="rounded-2xl bg-gray-900">
            <img
              alt={movie.title}
              src={posterUrl}
              className="rounded-2xl object-cover w-full"
            />
          </div>

          <div>
            <div className="text-base/7 text-center lg:text-left text-gray-700 lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {movie.title}
              </h1>

              <p className="mt-6">{movie.overview}</p>
            </div>
            <p className="mt-10 text-center lg:text-left">
              <strong>Release Date: </strong> {movie.release_date}
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back to All Movies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
