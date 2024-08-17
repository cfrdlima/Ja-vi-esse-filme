"use client";

import React, { useState } from "react";
import "./page.scss";
import Image from "next/image";
import Navbar from "@/components/navbar/page";
import { BiSearchAlt2 } from "react-icons/bi";
import movieBackground from "../../assets/movie_background.jpg";
import { IoIosArrowForward } from "react-icons/io";
import ReactLoading from "react-loading";
import AuxiliarMovie from "@/components/auxiliar/auxiliarMovie";
import { useMovies } from "@/hooks/useMovies";

export default function HomePage() {
  const [category, setCategory] = useState<string>("Inicio");

  const { movies: movies2024, isLoading: isLoading2024 } = useMovies({
    primary_release_year: "2024",
  });

  const { movies: horrorMovies, isLoading: isLoadingHorror } = useMovies({
    primary_release_year: "2024",
    with_genres: "27",
    sort_by: "popularity.desc",
    include_adult: "true",
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
        <div className="homePage-form">
          <form>
            <input type="text" placeholder="Busque um filme" />
            <button type="submit">
              <BiSearchAlt2 className="homePage-icon" />
            </button>
          </form>
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Últimos Lançamentos</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div className="homePage-movieList-card">
          <AuxiliarMovie movies={movies2024} />
        </div>
      </section>
      <section className="homePage-movieList">
        <div className="homePage-title-container">
          <div className="homePage-movieList-title">
            <h1>Últimos lançamentos terror</h1>
            <IoIosArrowForward className="homePage-iconArrow" />
          </div>
        </div>
        <div className="homePage-movieList-card">
          <AuxiliarMovie movies={horrorMovies} />
        </div>
      </section>
    </>
  );
}
