import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tmdbApi from "@/api/tmdbApi";

interface MovieDetail {
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: { id: number; name: string }[];
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Back
      </button>
      <div className="flex flex-col md:flex-row gap-4">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            {movie.release_date}
          </p>
          <p className="mt-4">{movie.overview}</p>
          <h2 className="mt-4 text-xl font-semibold">Genres</h2>
          <ul className="list-disc list-inside">
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
