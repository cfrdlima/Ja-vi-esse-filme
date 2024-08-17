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
        <div className="navbar-itens-container">
          <div className="navbar-itens">
            <li>
              <a
                className={currentCategory === "Inicio" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCategory("Inicio");
                  window.location.href = "/Pages/Inicio";
                }}
              >
                Início
              </a>
            </li>
            <li>
              <a
                className={currentCategory === "Filmes" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setCategory("Filmes");
                  window.location.href = "/Pages/MovieList";
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
                  window.location.href = "/Pages/SeriesList";
                }}
              >
                Séries
              </a>
            </li>
          </div>
        </div>
      </ul>
    </nav>
  );
}
