import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Parcourir", href: "#" },
    { label: "Genres", href: "#" },
    { label: "Auteurs", href: "#" },
    { label: "Nouveautés", href: "#" },
  ];

  return (
    <nav style={styles.nav}>
      {/* Decorative top border */}
      <div style={styles.topBorder} />

      <div style={styles.inner}>
        {/* Logo */}
        <a href="#" style={styles.logo}>
          <span style={styles.logoIcon}>✦</span>
          <span>
            <span style={styles.logoMain}>Scénario</span>
            <span style={styles.logoSub}>thèque</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul style={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} style={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div style={styles.actions}>
          <button style={styles.searchBtn} aria-label="Rechercher">
            <SearchIcon />
          </button>
          <a href="#" style={styles.ctaBtn}>
            Connexion
          </a>
        </div>

        {/* Mobile burger */}
        <button
          style={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span style={{ ...styles.burgerLine, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ ...styles.burgerLine, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...styles.burgerLine, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={styles.mobileLink}>
              {link.label}
            </a>
          ))}
          <a href="#" style={{ ...styles.ctaBtn, marginTop: "12px", display: "inline-block" }}>
            Connexion
          </a>
        </div>
      )}
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "rgba(13, 11, 8, 0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(201, 168, 76, 0.2)",
  },
  topBorder: {
    height: "2px",
    background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "68px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "32px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoIcon: {
    color: "#c9a84c",
    fontSize: "20px",
  },
  logoMain: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0e6cc",
    letterSpacing: "0.02em",
  },
  logoSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "22px",
    fontWeight: 400,
    fontStyle: "italic",
    color: "#c9a84c",
  },
  links: {
    display: "flex",
    gap: "32px",
    listStyle: "none",
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: "center",
  },
  link: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "15px",
    color: "#a89880",
    textDecoration: "none",
    letterSpacing: "0.05em",
    transition: "color 0.2s",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexShrink: 0,
  },
  searchBtn: {
    background: "none",
    border: "none",
    color: "#a89880",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
  },
  ctaBtn: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#0d0b08",
    backgroundColor: "#c9a84c",
    padding: "8px 20px",
    borderRadius: "2px",
    textDecoration: "none",
    transition: "background-color 0.2s",
  },
  burger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  burgerLine: {
    display: "block",
    width: "22px",
    height: "1.5px",
    backgroundColor: "#c9a84c",
    transition: "all 0.3s",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 24px 20px",
    gap: "12px",
    borderTop: "1px solid rgba(201, 168, 76, 0.15)",
    backgroundColor: "#0d0b08",
  },
  mobileLink: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "16px",
    color: "#a89880",
    textDecoration: "none",
    padding: "4px 0",
  },
};