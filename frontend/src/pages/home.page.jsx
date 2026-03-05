import { useState } from "react";
import Navbar from "../components/navBar.component";
import HeroSection from "../components/heroSection.component";
import CategoryFilter from "../components/categoryFilter.component";
import FeaturedScenarios from "../components/featuredScenarios.component";
import Footer from "../components/footer.component";

// Injection des fonts Google via une balise <style> dans le composant racine
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #0d0b08;
    color: #f0e6cc;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: rgba(201, 168, 76, 0.25);
    color: #f0e6cc;
  }

  /* Hover states globaux */
  a:hover {
    opacity: 0.8;
  }

  button:hover {
    opacity: 0.85;
  }
`;

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <>
      {/* Styles globaux */}
      <style>{GLOBAL_STYLES}</style>

      <div style={styles.root}>
        {/* Navigation principale */}
        <Navbar />

        {/* Section héro */}
        <HeroSection />

        {/* Séparateur ornemental */}
        <Ornament />

        {/* Filtres par genre */}
        <CategoryFilter onSelect={setActiveCategory} />

        {/* Grille de scénarios */}
        <FeaturedScenarios activeCategory={activeCategory} />

        {/* Bannière d'appel à contribution */}
        <ContributeBanner />

        {/* Pied de page */}
        <Footer />
      </div>
    </>
  );
}

// ─────────────────────────────────────────
// Sous-composants locaux à la HomePage
// ─────────────────────────────────────────

function Ornament() {
  return (
    <div style={ornamentStyles.wrapper}>
      <span style={ornamentStyles.line} />
      <span style={ornamentStyles.symbol}>⸻ ✦ ⸻</span>
      <span style={ornamentStyles.line} />
    </div>
  );
}

const ornamentStyles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    padding: "32px 24px 0",
    maxWidth: "480px",
    margin: "0 auto",
  },
  line: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.25))",
  },
  symbol: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "16px",
    color: "#c9a84c",
    opacity: 0.5,
    letterSpacing: "8px",
    flexShrink: 0,
  },
};

function ContributeBanner() {
  return (
    <section style={bannerStyles.section}>
      <div style={bannerStyles.inner}>
        <div style={bannerStyles.glow} />
        <span style={bannerStyles.eyebrow}>✦ Rejoignez la communauté</span>
        <h2 style={bannerStyles.title}>
          Vous avez une histoire
          <br />
          <em style={bannerStyles.titleEm}>à partager ?</em>
        </h2>
        <p style={bannerStyles.desc}>
          La Scénariothèque est une bibliothèque vivante, alimentée par des auteurs passionnés.
          Soumettez vos scénarios et donnez-leur une audience.
        </p>
        <a href="#" style={bannerStyles.cta}>
          Soumettre un scénario
        </a>
      </div>
    </section>
  );
}

const bannerStyles = {
  section: {
    padding: "0 24px 80px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  inner: {
    position: "relative",
    backgroundColor: "#161410",
    border: "1px solid rgba(201, 168, 76, 0.2)",
    borderRadius: "4px",
    padding: "64px 48px",
    textAlign: "center",
    overflow: "hidden",
  },
  glow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  eyebrow: {
    display: "block",
    fontFamily: "'EB Garamond', serif",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9a84c",
    marginBottom: "20px",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 700,
    color: "#f0e6cc",
    margin: "0 0 20px",
    lineHeight: 1.15,
  },
  titleEm: {
    fontStyle: "italic",
    fontWeight: 400,
    color: "#c9a84c",
  },
  desc: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "17px",
    lineHeight: 1.75,
    color: "#8a7d6a",
    maxWidth: "500px",
    margin: "0 auto 36px",
  },
  cta: {
    display: "inline-block",
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#0d0b08",
    backgroundColor: "#c9a84c",
    padding: "14px 36px",
    borderRadius: "2px",
    textDecoration: "none",
  },
};

const styles = {
  root: {
    minHeight: "100vh",
    backgroundColor: "#0d0b08",
  },
};