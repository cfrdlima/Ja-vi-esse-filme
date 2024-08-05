"use client";

import React, { useState } from "react";
import MovieList from "./pages/MovieList/page";
import SeriesList from "./pages/SeriesList/page";
import Navbar from "./pages/navbar";

type Category = "movies" | "series";

export default function Home() {
  const [category, setCategory] = useState<Category>("movies");

  return (
    <div>
      <Navbar currentCategory={category} setCategory={setCategory} />
      {category === "movies" ? <MovieList /> : <SeriesList />}
    </div>
  );
}
