"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMoviesDetails } from "@/hooks/useMovieDetails";
import Navbar from "@/components/navbar/page";
import "./movieDetail.scss";
import StarRating from "@/components/StarRating/indext";
import ReactLoading from "react-loading";

type Category = string;

export default function MovieDetail() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const movieId = query ? Number(query) : 0;
  const { movie, isLoading } = useMoviesDetails(movieId);
  const [category, setCategory] = useState<Category>(
    `Filme: Título não disponível`
  );

  useEffect(() => {
    if (movie) {
      setCategory(`Filme: ${movie.title}`);
    }
  }, [movie]);

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
  };

  const statusTranslations: Record<string, string> = {
    Released: "Lançado",
    "Post Production": "Pós-Produção",
    Production: "Produção",
    "In Production": "Em Produção",
    Planned: "Planejado",
    Canceled: "Cancelado",
    Rumored: "Rumorado",
    Unknown: "Desconhecido",
  };

  const getTranslatedStatus = (status: string) => {
    return statusTranslations[status] || status; // Retorna o status traduzido ou o status original se não estiver no mapeamento
  };

  return (
    <>
      <Navbar currentCategory={category} setCategory={setCategory} />
      <ul className="movie-details">
        {isLoading ? (
          <div className="loading-container">
            <ReactLoading
              type="spin"
              color="#6046ff"
              height={"5%"}
              width={"5%"}
            />
          </div>
        ) : movie ? (
          <>
            <li>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
              />
            </li>
            <li>
              <strong>Título:</strong> {movie.title}
            </li>
            <li>
              <strong>Sinopse:</strong> {movie.overview}
            </li>
            <li>
              <strong>Avaliação: </strong>
              <StarRating rating={movie.vote_average} />
            </li>
            <li>
              <strong>Orçamento:</strong> ${movie.budget.toLocaleString()}
            </li>
            <li>
              <strong>Bilheteria:</strong> ${movie.revenue.toLocaleString()}
            </li>
            <li>
              <strong>Duração:</strong> {movie.runtime} min
            </li>
            <li>
              <strong>Situação:</strong> {getTranslatedStatus(movie.status)}
            </li>
            <li>
              <strong>Genres: </strong>
              {movie.genres.map((genre) => genre.name).join(", ")}
            </li>
            <li>
              <strong>País: </strong>
              {movie.origin_country}
            </li>
            <li>
              <strong>Data de Lançamento:</strong>{" "}
              {formatDate(movie.release_date)}
            </li>
          </>
        ) : (
          <p>Detalhes do filme não disponíveis.</p>
        )}
      </ul>
    </>
  );
}
