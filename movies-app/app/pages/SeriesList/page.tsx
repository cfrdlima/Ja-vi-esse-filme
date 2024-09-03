"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import { Series } from "@/types/series";
import SeriesCard from "../SeriesCard";
import ReactLoading from "react-loading";
import Navbar from "../../../components/navbar/page";
import ButtonPage from "@/components/buttonPage/buttonPage";
import FilterSeries from "@/components/filter/filterSeries";

type Category = string;

export default function SeriesList() {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>("Series");
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
      getSeries(currentPage, filters);
    } else {
      getSeriesByName(currentPage, filters);
    }
  }, [currentPage, filters]);

  const getSeries = async (page: number, filters: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/tv",
        {
          params: {
            api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
            language: "pt-br",
            page: page,
            with_genres: filters.genre?.id || null,
            sort_by: filters.order?.map || null,
            first_air_date_year: filters.startDate || null,
          },
        }
      );
      const fetchedTotalPages = response.data.total_pages;
      setTotalPages(fetchedTotalPages > 500 ? 500 : fetchedTotalPages);
      setSeries(response.data.results);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeriesByName = async (page: number, filters: any) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/tv",
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
      setSeries(response.data.results);
    } catch (error) {
      console.error("Error fetching series:", error);
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
    setCurrentPage(totalPages);
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
      <div className="series-container">
        <section className="serie-navbar-container">
          <Navbar currentCategory={category} setCategory={setCategory} />
        </section>
        <section className="serie-filter-container">
          <FilterSeries onSearch={handleSearch} />
        </section>
        <div className="series-list-container">
          <ul className="series-list">
            {series.map((serie) => (
              <SeriesCard series={serie} key={serie.id} />
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
      </div>
    </>
  );
}
