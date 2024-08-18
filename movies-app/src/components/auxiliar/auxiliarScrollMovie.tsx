import { useRef } from "react";
import { Movie } from "@/types/movie";
import "./auxiliarScrollMovie.scss";

export interface Props {
  movies: Movie[];
}

export default function AuxiliarScrollMovie({ movies }: Props) {
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

  return (
    <div className="movie-list-container">
      <ul className="movie-list" ref={movieListRef}>
        {movies.map((movie) => (
          <li className="movie-card" key={movie.id}>
            <div className="movie-poster">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
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
