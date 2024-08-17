"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import { Series } from "@/types/series";
import SeriesCard from "../SeriesCard";
import ReactLoading from "react-loading";
import Navbar from "../../../components/navbar/page";

type Category = string;

export default function SeriesList() {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category>("Series");

  useEffect(() => {
    getSeries();
  }, []);
  const getSeries = async () => {
    await axios({
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/tv",
      params: {
        api_key: "eabdfc6fc4fac646d5b41dc98dd4414e",
        language: "pt-br",
        first_air_date_year: "2024",
        with_origin_country: "US",
      },
    }).then((response) => {
      setSeries(response.data.results);
      console.log(response);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    console.log(`Categoria atual: ${category}`);
  }, [category]);

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
      <ul className="series-list">
        {series.map((serie) => (
          <SeriesCard series={serie} key={serie.id} />
        ))}
      </ul>
    </>
  );
}
