"use client";

import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Movie } from "@/types/movie";
import MovieCard from "../MovieCard";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies();
  }, []);
  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
        language: "pt-br",
      },
    }).then((response) => {
      setMovies(response.data.results);
      console.log(response);
    });
  };

  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}
