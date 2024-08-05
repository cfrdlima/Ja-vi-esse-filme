"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./page.scss";

interface NavbarProps {
  currentCategory: string;
  setCategory: (category: string) => void;
}

export default function Navbar({ currentCategory, setCategory }: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="page-title">{currentCategory}</h1>
      <div
        className={`burger-menu ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
        <li>
          <a
            className={currentCategory === "Filmes" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCategory("Filmes");
              router.push("/pages/MovieList");
            }}
          >
            Filmes
          </a>
        </li>
        <li>
          <a
            className={currentCategory === "Series" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCategory("Series");
              router.push("/pages/SeriesList");
            }}
          >
            Séries
          </a>
        </li>
        <li>
          <a href="#">Listas</a>
        </li>
      </ul>
    </nav>
  );
}
