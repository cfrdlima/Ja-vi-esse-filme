import { Movie } from "@/types/movie";
import StarRating from "../../../components/StarRating/indext";
import "./index.scss";

export interface Props {
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const movie = props.movie;

  const handleSeeMore = () => {
    const searchQuery = new URLSearchParams({
      q: movie.id.toString(),
    }).toString();
    window.location.href = `/Pages/movieDetail?${searchQuery}`;
  };

  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-infos">
        <p className="movie-title">{movie.title}</p>
        {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
        <div className="hidden-content">
          {movie.overview && (
            <p className="description">
              {movie.overview.length > 100
                ? `${movie.overview.substring(0, 100)}...`
                : movie.overview}
            </p>
          )}
          <button className="btn-default" onClick={handleSeeMore}>
            Ver mais
          </button>
        </div>
      </div>
    </li>
  );
}
