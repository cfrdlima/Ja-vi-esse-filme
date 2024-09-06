import { useRef } from "react";
import "./auxiliarScrollMovie.scss";
import { Series } from "@/types/series";

export interface Props {
  series: Series[];
}

export default function AuxiliarScrollMovie({ series }: Props) {
  const movieListRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    if (movieListRef.current) {
      movieListRef.current.scrollTo({
        left:
          movieListRef.current.scrollLeft -
          movieListRef.current.clientWidth * 0.5,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (movieListRef.current) {
      movieListRef.current.scrollTo({
        left:
          movieListRef.current.scrollLeft +
          movieListRef.current.clientWidth * 0.5,
        behavior: "smooth",
      });
    }
  };

  const handleSeeMore = (serie: Series) => {
    const searchQuery = new URLSearchParams({
      q: serie.id.toString(),
    }).toString();
    window.location.href = `/pages/serieDetail?${searchQuery}`;
  };

  return (
    <div className="movie-list-container">
      <ul className="movie-list" ref={movieListRef}>
        {series.map((serie) => (
          <li
            className="movie-card"
            key={serie.id}
            onClick={() => handleSeeMore(serie)}
          >
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                alt={serie.name}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="movie-list-nav">
        <button className="prev" onClick={scrollLeft}>
          &#10094;
        </button>
        <button className="next" onClick={scrollRight}>
          &#10095;
        </button>
      </div>
    </div>
  );
}
