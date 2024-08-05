import { Series } from "@/types/series";
import StarRating from "../StarRating/indext";
import "./index.scss";

export interface Props {
  series: Series;
}

export default function SeriesCard(props: Props) {
  const serie = props.series;
  return (
    <li className="serie-card">
      <div className="serie-poster">
        <img
          src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
          alt={serie.name}
        />
      </div>
      <div className="serie-infos">
        <p className="serie-title">{serie.name}</p>
        {serie.vote_average > 0 && <StarRating rating={serie.vote_average} />}
        <div className="hidden-content">
          {serie.overview && (
            <p className="description">
              {serie.overview.length > 100
                ? `${serie.overview.substring(0, 100)}...`
                : serie.overview}
            </p>
          )}
          <button className="btn-default">Ver mais</button>
        </div>
      </div>
    </li>
  );
}
