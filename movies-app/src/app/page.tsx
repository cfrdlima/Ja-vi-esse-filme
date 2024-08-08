"use client";

import React, { useState } from "react";
import sofaImage from "./assets/sofa.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./page.scss";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <div className="card">
        <Image className="logo" src={sofaImage} alt="sofa" />
        <h2>Bem Vindo</h2>
        <form className="form">
          <input type="email" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button type="button" onClick={() => router.push("/Pages/MovieList")}>
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
