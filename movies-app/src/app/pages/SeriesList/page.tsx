"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import { Series } from "@/types/series";
import SeriesCard from "../SeriesCard";
import ReactLoading from "react-loading";
import Navbar from "../../../components/navbar/page";
import ButtonPage from "@/components/buttonPage/buttonPage";

type Category = string;

export default function SeriesList() {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>("Series");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>();

  useEffect(() => {
    getSeries(currentPage);
  }, [currentPage]);

  const getSeries = async (page: number) => {
    await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
        language: "pt-br",
        first_air_date_year: "2024",
        page: page,
      },
    }).then((response) => {
      setSeries(response.data.results);
      setLastPage(response.data.total_pages);
    });

    setIsLoading(false);
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
    if (lastPage !== undefined) {
      console.log("Indo para a última página:", lastPage);
      setCurrentPage(lastPage);
    } else {
      console.warn("A última página ainda não foi carregada.");
    }
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
      <Navbar currentCategory={category} setCategory={setCategory} />
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
            lastPageNumber={374}
          />
        </div>
      </div>
    </>
  );
}
