"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovies } from "@/hooks/useSearchMovies";
import "./page.scss";
import Navbar from "../../../components/navbar/page";
import AuxiliarSearchMovie from "@/components/auxiliar/auxiliarSearchMovie";
import { Movie } from "@/types/movie";

type Category = string;

interface SearchResultsProps {
  movies: Movie[];
}

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [category, setCategory] = useState<Category>("Busca");

  const { movies: moviesSearch, isLoading: isLoadingMovieSearch } = useMovies({
    query: `${query}`,
  });

  console.log(moviesSearch);

  return (
    <>
      <Navbar currentCategory={category} setCategory={setCategory} />
      <ul className="movie-list">
        {moviesSearch.map((movie) => (
          <AuxiliarSearchMovie key={movie.id} movie={movie} />
        ))}
      </ul>
    </>
  );
}
