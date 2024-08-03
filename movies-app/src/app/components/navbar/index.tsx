"use client";

import React from "react";
import "./index.scss";

interface NavbarProps {
  currentCategory: "movies" | "series";
  setCategory: (category: "movies" | "series") => void;
}

export default function Navbar({ currentCategory, setCategory }: NavbarProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="page-title">Filmes</h1>
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
            href="#"
            className={currentCategory === "movies" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCategory("movies");
            }}
          >
            Filmes
          </a>
        </li>
        <li>
          <a
            href="#"
            className={currentCategory === "series" ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              setCategory("series");
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
