"use client";

import React, { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import { Movie } from "@/types/movie";
import MovieCard from "../MovieCard";
import ReactLoading from "react-loading";
import Navbar from "../../../components/navbar/page";
import ButtonPage from "@/components/buttonPage/buttonPage";
import FilterMovies from "@/components/filter/filterMovies";

type Category = string;

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>("Filmes");
  const [currentPage, setCurrentPage] = useState<number>(1); // Estado para página atual

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage]);

  const getMovies = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
            language: "pt-br",
            primary_release_year: "2024",
            page: page,
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(500);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
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
      <div className="movies-container">
        <section className="movie-navbar-container">
          <Navbar currentCategory={category} setCategory={setCategory} />
        </section>
        <section className="movie-filter-container">
          <FilterMovies />
        </section>
        <section className="movie-list-container">
          <div className="movie-list-container">
            <ul className="movie-list">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </ul>
            <div>
              <ButtonPage
                firstPage={handleFirstPage}
                currentPage={currentPage}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                lastPage={handleLastPage}
                lastPageNumber={499}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
