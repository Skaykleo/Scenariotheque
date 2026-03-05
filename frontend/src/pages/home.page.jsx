import { useState } from "react";
import "../index.css";
import Navbar from "../components/navBar.component";
import HeroSection from "../components/heroSection.component";
import CategoryFilter from "../components/categoryFilter.component";
import FeaturedScenarios from "../components/featuredScenarios.component";
import Footer from "../components/footer.component";

export default function HomePage({ onProfile }) {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="homepage">
      <Navbar onProfile={onProfile} />
      <HeroSection />
      <Ornament />
      <CategoryFilter onSelect={setActiveCategory} />
      <FeaturedScenarios activeCategory={activeCategory} />
      <ContributeBanner />
      <Footer />
    </div>
  );
}

function Ornament() {
  return (
    <div className="ornament">
      <span className="ornament__line" />
      <span className="ornament__symbol">⸻ ✦ ⸻</span>
      <span className="ornament__line" />
    </div>
  );
}

function ContributeBanner() {
  return (
    <section className="contribute">
      <div className="contribute__inner">
        <div className="contribute__glow" />
        <span className="contribute__eyebrow">✦ Rejoignez la communauté</span>
        <h2 className="contribute__title">
          Vous avez une histoire
          <br />
          <em>à partager ?</em>
        </h2>
        <p className="contribute__desc">
          La Scénariothèque est une bibliothèque vivante, alimentée par des
          auteurs passionnés. Soumettez vos scénarios et donnez-leur une
          audience.
        </p>
        <a href="#" className="contribute__cta">
          Soumettre un scénario
        </a>
      </div>
    </section>
  );
}

