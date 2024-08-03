import "./index.scss";
import logoImage from "../../assets/sofa.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="page-title">Filmes</h1>
      <img src={logoImage.src} alt="logo" className="navbar-img" />
    </nav>
  );
}
