import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  releaseDate,
  posterPath,
}) => {
  return (
    <div>
      <Link to={`/movie/${id}`}>
        <img
          className="min-h-72"
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt={title}
        />
        <h3>{title}</h3>
        <p>{releaseDate}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
