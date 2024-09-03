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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<{
    genre: any;
    order: any;
    startDate: string | null;
    searchMovie: string;
  }>({
    genre: null,
    order: null,
    startDate: null,
    searchMovie: "",
  });

  useEffect(() => {
    if (!filters.searchMovie || filters.searchMovie.trim() === "") {
      getMovies(currentPage, filters);
    } else {
      getMoviesByName(currentPage, filters);
    }
  }, [currentPage, filters]);

  const getMovies = async (page: number, filters: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
            language: "pt-br",
            page: page,
            with_genres: filters.genre?.id || null,
            sort_by: filters.order?.map || null,
            year: filters.startDate || null,
          },
        }
      );
      const fetchedTotalPages = response.data.total_pages;
      setMovies(response.data.results);
      setTotalPages(fetchedTotalPages > 500 ? 500 : fetchedTotalPages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoviesByName = async (page: number, filters: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
            language: "pt-br",
            page: page,
            query: filters.searchMovie || null,
          },
        }
      );
      const fetchedTotalPages = response.data.total_pages;
      setTotalPages(fetchedTotalPages > 500 ? 500 : fetchedTotalPages);
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
    setCurrentPage(totalPages); // Usa o total de páginas para ir para a última página
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleSearch = (filters: {
    genre: any;
    order: any;
    startDate: string | null;
    searchMovie: string | " ";
  }) => {
    setFilters(filters);
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
          <FilterMovies onSearch={handleSearch} />
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
                lastPageNumber={totalPages}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
