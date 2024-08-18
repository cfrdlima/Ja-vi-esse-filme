"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovies } from "@/hooks/useSearchMovies";
import "./page.scss";
import Navbar from "../../../components/navbar/page";
import AuxiliarSearchMovie from "@/components/auxiliar/auxiliarSearchMovie";
import { Movie } from "@/types/movie";

type Category = string;

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [category, setCategory] = useState<Category>("Busca");

  const { movies: moviesSearch, isLoading: isLoadingMovieSearch } = useMovies({
    query: `${query}`,
  });

  if (isLoadingMovieSearch) {
    return <div className="loading-message">Carregando...</div>;
  }

  if (moviesSearch.length === 0) {
    return <div className="no-movies-message">Nenhum filme encontrado</div>;
  }

  return (
    <>
      <Navbar currentCategory={category} setCategory={setCategory} />
      <ul className="movie-list">
        {moviesSearch.map((movie: Movie) => (
          <AuxiliarSearchMovie key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}
