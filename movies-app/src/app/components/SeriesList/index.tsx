"use client";

import { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import { Series } from "@/types/series";
import SeriesCard from "../SeriesCard";
import ReactLoading from "react-loading";

export default function SeriesList() {
  const [series, setSeries] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      },
    }).then((response) => {
      setSeries(response.data.results);
      console.log(response);
    });

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading type="spin" color="#6046ff" height={"5%"} width={"5%"} />
      </div>
    );
  }

  return (
    <ul className="series-list">
      {series.map((serie) => (
        <SeriesCard series={serie} key={serie.id} />
      ))}
    </ul>
  );
}
