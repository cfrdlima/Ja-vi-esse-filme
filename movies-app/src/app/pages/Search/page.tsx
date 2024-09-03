"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMoviesAndSeries } from "@/hooks/useSearchMovies";
import "./page.scss";
import Navbar from "../../../components/navbar/page";
import AuxiliarSearchMovie from "@/components/auxiliar/auxiliarSearchMovie";
import { Multi } from "@/types/multi";

type Category = string;

export default function Search() {
  // Envolver o uso do useSearchParams dentro de um limite de Suspense
  return (
    <Suspense fallback={<div>Carregando parâmetros de busca...</div>}>
      <SearchContent />
    </Suspense>
  );
}

// Extrair a lógica para um componente separado para manter o código mais claro
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const stringSearch = `Busca relacionada a ${query}`;
  const [category, setCategory] = useState<Category>(stringSearch);

  const { movies: moviesSearch, isLoading: isLoadingMovieSearch } =
    useMoviesAndSeries({
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
        {moviesSearch.map((multi: Multi) => (
          <AuxiliarSearchMovie key={multi.id} multi={multi} />
        ))}
      </ul>
    </>
  );
}
