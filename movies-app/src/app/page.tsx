"use client";

import React, { useState } from "react";
import sofaImage from "./assets/sofa.png";
import Image from "next/image";
import "./page.scss";

export default function Home() {
  return (
    <div>
      <div className="card">
        <Image className="logo" src={sofaImage} alt="sofa" />
        <h2>Bem Vindo ao Já vi esse filme?</h2>
        <form className="form">
          <input type="email" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button
            type="button"
            onClick={() => (window.location.href = "/Pages/Inicio")}
          >
            Entrar
          </button>
        </form>
        <footer>
          Precisa de uma conta?
          <a href="https://www.themoviedb.org/?language=pt-BR"> Crie já!</a>
        </footer>
      </div>
    </div>
  );
}
