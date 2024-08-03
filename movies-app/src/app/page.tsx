"use client";

import React, { useState } from "react";
import MovieList from "./components/MovieList";
import SeriesList from "./components/SeriesList";
import Navbar from "./components/navbar";

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
