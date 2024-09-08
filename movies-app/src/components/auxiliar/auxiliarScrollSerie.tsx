import "./auxiliarScrollMovie.scss";
import { Series } from "@/types/series";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface Props {
  series: Series[];
}

export default function AuxiliarScrollMovie({ series }: Props) {
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

  const handleSeeMore = (serie: Series) => {
    const searchQuery = new URLSearchParams({
      q: serie.id.toString(),
    }).toString();
    window.location.href = `/pages/serieDetail?${searchQuery}`;
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {series.map((serie) => (
          <div
            key={serie.id}
            className="movie-slide"
            onClick={() => handleSeeMore(serie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
              alt={serie.name}
              className="movie-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
