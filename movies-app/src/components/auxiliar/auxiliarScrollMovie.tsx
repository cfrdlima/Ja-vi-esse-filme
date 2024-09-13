import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movie } from "@/types/movie";
import "./auxiliarScrollMovie.scss";

export interface Props {
  movies: Movie[];
}

function AuxiliarScrollMovie({ movies }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 11,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleSeeMore = (movie: Movie) => {
    const searchQuery = new URLSearchParams({
      q: movie.id.toString(),
    }).toString();
    window.location.href = `/pages/movieDetail?${searchQuery}`;
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-slide"
            onClick={() => handleSeeMore(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="movie-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AuxiliarScrollMovie;
