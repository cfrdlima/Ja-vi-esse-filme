"use client";

import React, { useEffect, useState } from "react";
import "./page.scss";
import Image from "next/image";
import Navbar from "../navbar/page";
import { BiSearchAlt2 } from "react-icons/bi";
import movieBackground from "../../assets/movie_background.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { Movie } from "@/types/movie";
import axios from "axios";
import ReactLoading from "react-loading";
import AuxiliarMovie from "../auxiliar/auxiliarMovie";
import { useRouter } from "next/navigation";

export interface Props {
  movie: Movie;
}

export default function HomePage() {
  const [category, setCategory] = useState<string>("Inicio");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
            language: "pt-br",
            primary_release_year: "2024",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
          <AuxiliarMovie movies={movies} />
        </div>
      </section>
    </>
  );
}
