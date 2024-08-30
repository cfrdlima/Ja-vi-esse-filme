"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMoviesDetails } from "@/hooks/useMovieDetails";
import Navbar from "@/components/navbar/page";
import "./movieDetail.scss";
import StarRating from "@/components/StarRating/indext";
import ReactLoading from "react-loading";
import { useWatchProviders } from "@/hooks/useWatchProviders";

type Category = string;

export default function MovieDetail() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const movieId = query ? Number(query) : 0;
  const { movie: watchProviders, isLoading: watchProvidersLoading } =
    useWatchProviders(movieId);
  const { movie, isLoading } = useMoviesDetails(movieId);
  const [category, setCategory] = useState<Category>(
    `Filme: Título não disponível`
  );

  useEffect(() => {
    if (movie) {
      setCategory(`Filme:  ${movie.title}`);
      console.log(watchProviders);
    }
  }, [movie]);

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
    return statusTranslations[status] || status;
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
            <section className="movie-detail-container-section">
              <div className="movie-detail-poster-background">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </div>
              <div className="movie-detail-poster-container">
                <div className="movie-detail-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
                <div className="movie-detail-providers">
                  {watchProvidersLoading ? (
                    <ReactLoading
                      type="spin"
                      color="#6046ff"
                      height={"5%"}
                      width={"5%"}
                    />
                  ) : (
                    watchProviders
                      .flat()
                      .map((provider) => (
                        <img
                          key={provider.provider_id}
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      ))
                  )}
                </div>
              </div>
              <div className="movie-detail-container">
                <div className="movie-detail-titulo-aux-1">
                  <p>{movie.title}</p>
                  <h2>{movie.genres.map((genre) => genre.name).join(", ")}</h2>
                </div>
                <div className="movie-detail-avaliacao-aux-2">
                  <div className="movie-detail-vote">
                    <p>Avaliação: </p>
                    <StarRating rating={movie.vote_average} />
                  </div>
                </div>
                <div className="movie-detail-data-aux-3">
                  <div className="movie-detail-data">
                    <p>Data de Lançamento:</p> {formatDate(movie.release_date)}
                  </div>
                </div>
                <div className="movie-detail-sinopse-aux-4">
                  <p>Sinopse:</p> {movie.overview}
                </div>
                <div className="movie-detail-orcamento-aux-5">
                  <div className="movie-detail-orcamento">
                    <p>Orçamento:</p> ${movie.budget.toLocaleString()}
                  </div>
                </div>
                <div className="movie-detail-bilheteria-aux-6">
                  <div className="movie-detail-bilheteria">
                    <p>Bilheteria:</p> ${movie.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="movie-detail-duracao-aux-7">
                  <div className="movie-detail-duracao">
                    <p>Duração:</p> {movie.runtime} min
                  </div>
                </div>
                <div className="movie-detail-situacao-aux-8">
                  <div className="movie-detail-situacao">
                    <p>Situação:</p> {getTranslatedStatus(movie.status)}
                  </div>
                </div>
                <div className="movie-detail-pais-aux-9">
                  <div className="movie-detail-pais">
                    <p>País: </p>
                    {movie.origin_country}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <p>Detalhes do filme não disponíveis.</p>
        )}
      </ul>
    </>
  );
}
