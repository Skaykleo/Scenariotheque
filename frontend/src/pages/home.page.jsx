import { useState } from "react";
import "../index.css";
import Navbar from "../components/navBar.component";
import HeroSection from "../components/heroSection.component";
import CategoryFilter from "../components/categoryFilter.component";
import FeaturedScenarios from "../components/featuredScenarios.component";
import Footer from "../components/footer.component";
import DetailModal from "../components/detailModal.component";
import SubmitScenarioModal from "../components/submitScenarioModal.component";
import { useAuth } from "../context/AuthContext";
import createScenario from "../services/scenario.service";

export default function HomePage({ onProfile }) {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [activeCategory, setActiveCategory] = useState("all");

  // ── Modal de détail (scénario / genre / auteur / système) ──
  const [modal, setModal] = useState(null); // { type, data } | null

  function openModal(type, data) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  // ── Modal de soumission ──
  const [submitOpen, setSubmitOpen] = useState(false);

  return (
    <div className="homepage">
      {/* ── Modals — montées au niveau page pour un z-index propre ── */}
      <DetailModal
        isOpen={!!modal}
        onClose={closeModal}
        type={modal?.type}
        data={modal?.data}
      />
      <SubmitScenarioModal
        isOpen={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={async (formData) => {
          await createScenario(formData);
          setSubmitOpen(false);
        }}
      />

      <Navbar onProfile={onProfile} />

      {/* HeroSection reçoit les callbacks — elle n'a plus de state modal */}
      <HeroSection
        onSubmitClick={() => setSubmitOpen(true)}
        onCardClick={openModal}
      />

      <Ornament />

      <CategoryFilter onSelect={setActiveCategory} />

      {/* FeaturedScenarios reçoit onCardClick pour ouvrir la DetailModal */}
      <FeaturedScenarios
        activeCategory={activeCategory}
        onCardClick={(data) => openModal("scenario", data)}
      />

      <ContributeBanner
        isLoggedIn={isLoggedIn}
        onSubmitClick={() => setSubmitOpen(true)}
      />

      <Footer />
    </div>
  );
}

// ─── Ornement séparateur ──────────────────────────────────────
function Ornament() {
  return (
    <div className="ornament">
      <span className="ornament__line" />
      <span className="ornament__symbol">⸻ ✦ ⸻</span>
      <span className="ornament__line" />
    </div>
  );
}

// ─── Bannière de contribution ─────────────────────────────────
/**
 * @param {boolean}  isLoggedIn    - Afficher le CTA "Soumettre" si connecté
 * @param {Function} onSubmitClick - Ouvre la SubmitScenarioModal
 */
function ContributeBanner({ isLoggedIn, onSubmitClick }) {
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

        {isLoggedIn ? (
          /* Utilisateur connecté → bouton qui ouvre la modal */
          <button className="contribute__cta" onClick={onSubmitClick}>
            Soumettre un scénario
          </button>
        ) : (
          /* Visiteur → lien d'inscription */
          <a href="/inscription" className="contribute__cta">
            Rejoindre la bibliothèque
          </a>
        )}
      </div>
    </section>
  );
}