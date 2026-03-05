import { useState } from "react";
import AuthButton from "./authButton.component";

export default function Navbar({ onProfile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", href: "/" },
    { label: "Parcourir", href: "parcourir" },
    // { label: "Genres", href: "#" },
    // { label: "Auteurs", href: "#" },
    // { label: "Nouveautés", href: "#" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar__top-border" />

      <div className="navbar__inner">
        <a href="#" className="navbar__logo">
          <span className="navbar__logo-icon">✦</span>
          <span>
            <span className="navbar__logo-main">Scénario</span>
            <span className="navbar__logo-sub">thèque</span>
          </span>
        </a>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar__link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button className="navbar__search-btn" aria-label="Rechercher">
            <SearchIcon />
          </button>
          <AuthButton onProfile={onProfile} />
        </div>

        <button
          className="navbar__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`navbar__burger-line navbar__burger-line--top${menuOpen ? " is-open" : ""}`}
          />
          <span
            className={`navbar__burger-line navbar__burger-line--mid${menuOpen ? " is-open" : ""}`}
          />
          <span
            className={`navbar__burger-line navbar__burger-line--bot${menuOpen ? " is-open" : ""}`}
          />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar__mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar__mobile-link"
            >
              {link.label}
            </a>
          ))}
          <AuthButton onProfile={onProfile} />
        </div>
      )}
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

