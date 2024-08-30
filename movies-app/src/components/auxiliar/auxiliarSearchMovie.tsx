import { Multi } from "@/types/multi";
import StarRating from "../StarRating/indext";
import "./auxiliarSearchMovie.scss";

export interface Props {
  multi: Multi;
}

export default function AuxiliarSearchMovie({ multi }: Props) {
  const handleSeeMore = (multi: Multi) => {
    const searchQuery = new URLSearchParams({
      q: multi.id.toString(),
    }).toString();
    window.location.href = `/Pages/movieDetail?${searchQuery}`;
  };

  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${multi.poster_path}`}
          alt={multi.title}
        />
      </div>
      <div className="movie-infos">
        <p className="movie-title">{multi.title || multi.name}</p>
        {multi.vote_average > 0 && <StarRating rating={multi.vote_average} />}
        <div className="hidden-content">
          {multi.overview && (
            <p className="description">
              {multi.overview.length > 100
                ? `${multi.overview.substring(0, 100)}...`
                : multi.overview}
            </p>
          )}
          <button className="btn-default" onClick={() => handleSeeMore(multi)}>
            Ver mais
          </button>
        </div>
      </div>
    </li>
  );
}
