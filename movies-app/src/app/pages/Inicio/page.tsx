"use client";

import React, { Suspense, useState } from "react";
import "./page.scss";
import Image from "next/image";
import Navbar from "@/components/navbar/page";
import { BiSearchAlt2 } from "react-icons/bi";
import movieBackground from "../../assets/movie_background.jpg";
import linkedinLogo from "../../assets/icons8-linkedin.svg";
import gitHubLogo from "../../assets/github-mark-white.svg";
import { IoIosArrowForward } from "react-icons/io";
import ReactLoading from "react-loading";
import { useMovies } from "@/hooks/useMovies";
import AuxiliarScrollMovie from "@/components/auxiliar/auxiliarScrollMovie";
import { useMoviesTopRated } from "@/hooks/useTopRatedMovies";
import { useMoviesPopular } from "@/hooks/usePopularMovies";

export default function HomePage() {
  const [category, setCategory] = useState<string>("Inicio");
  const [search, setSearch] = useState("");
  const { movies: moviesTopRated, isLoading } = useMoviesTopRated();
  const { movies: moviesPopular, isLoadingPopular } = useMoviesPopular();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      return;
    } else {
      const searchQuery = new URLSearchParams({ q: search }).toString();
      window.location.href = `/pages/Search?${searchQuery}`;
      setSearch("");
    }
  };

  const { movies: movies2024, isLoading: isLoading2024 } = useMovies({
    primary_release_year: "2024",
    without_genres: "16",
  });

  const { movies: horrorMovies, isLoading: isLoadingHorror } = useMovies({
    primary_release_year: "2024",
    with_genres: "27",
    sort_by: "popularity.desc",
    include_adult: "true",
  });

  const { movies: actionMovies, isLoading: isLoadingAction } = useMovies({
    primary_release_year: "2024",
    with_genres: "28",
    sort_by: "popularity.desc",
    include_adult: "true",
    without_genres: "16",
  });

  if (isLoading2024) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#6046ff" height={"5%"} width={"5%"} />
      </div>
    );
  }

  return (
    <>
      <Navbar currentCategory={category} setCategory={setCategory} />
      <section className="homePage-search">
        <Image
          className="homePage-background"
          src={movieBackground}
          alt="background"
          quality={100}
        />
        <div className="homePage-title">Bem vindo ao Já vi esse filme?</div>
        <Suspense>
          <div className="homePage-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Buscar por filmes ou series"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <button type="submit">
                <BiSearchAlt2 className="homePage-icon" />
              </button>
            </form>
          </div>
        </Suspense>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Últimos Lançamentos</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div>
          <AuxiliarScrollMovie movies={movies2024} />
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Últimos lançamentos terror</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div>
          <AuxiliarScrollMovie movies={horrorMovies} />
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Últimos lançamentos Ação</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div>
          <AuxiliarScrollMovie movies={actionMovies} />
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Melhores Avaliados</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div>
          <AuxiliarScrollMovie movies={moviesTopRated} />
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Filmes Populares</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div>
          <AuxiliarScrollMovie movies={moviesPopular} />
        </div>
      </section>
      <footer className="homePage-footer-container">
        <div className="homePage-footer">
          <div className="homePage-footerTitle">Já vi esse filme?</div>
          <div className="homePage-footerText">
            O Já vi esse filme? é uma plataforma de recomendação de filmes e
            séries, onde você pode ver informações sobre os filmes e séries mais
            populares, melhores avaliados, lançamentos e muito mais.
          </div>
        </div>
        <div className="homePage-footer">
          <div className="homePage-footerTitle">Contato</div>
          <div className="homePage-footerText-contact">
            <div>feedback.portifolio@gmail.com</div>
          </div>
        </div>
        <ul className="homePage-footer-links">
          <ul>
            <a
              href="https://www.linkedin.com/in/claudinei-de-lima-690b4021a/"
              target="_blank"
            >
              <Image
                className="homePage-footer-links-images"
                src={linkedinLogo}
                alt="instagram"
                quality={100}
              />
            </a>
          </ul>
          <ul>
            <a
              href="https://github.com/cfrdlima/Ja-vi-este-filme--"
              target="_blank"
            >
              <Image
                className="homePage-footer-links-images-2"
                src={gitHubLogo}
                alt="repositorio"
                quality={100}
              />
            </a>
          </ul>
        </ul>
        <p className="footer__copyright">
          © 2023 Claudinei de Lima. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
