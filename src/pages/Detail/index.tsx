import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tmdbApi from "@/api/tmdbApi";

interface MovieDetail {
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
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
    return <p className="text-center mt-4">Loading movie details...</p>;
  }

  if (!movie) {
    return <p className="text-center mt-4">Movie not found</p>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div
        className="relative bg-cover bg-center h-64 md:h-96"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            {movie.title}
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
        >
          Back
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-80 rounded shadow-lg"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2 text-gray-700 dark:text-gray-300">
              {movie.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {movie.release_date}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {movie.overview}
            </p>
            <h3 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Genres
            </h3>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-800 dark:text-white"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
