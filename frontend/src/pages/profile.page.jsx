import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Navbar from "../components/navBar.component";
import Footer from "../components/footer.component";
import "./styles/profile.page.css";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [scenarios, setScenarios] = useState([]);
  const [scenariosLoading, setScenariosLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${process.env.REACT_APP_API_URL}/scenarios?userId=${user.id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setScenarios)
      .catch(() => setScenarios([]))
      .finally(() => setScenariosLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="profile-loading">
        <span className="profile-loading__text">Chargement...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-unauth">
        <p className="profile-unauth__text">
          Vous devez être connecté pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-main">
        {/* En-tête profil */}
        <section className="profile-header">
          <div className="profile-header__inner">
            <div className="profile-header__glow" />
            <div className="profile-header__avatar">
              {user.userName.charAt(0).toUpperCase()}
            </div>
            <div className="profile-header__info">
              <span className="profile-header__eyebrow">✦ Profil</span>
              <h1 className="profile-header__name">{user.userName}</h1>
              <p className="profile-header__email">{user.email}</p>
            </div>
          </div>
        </section>

        {/* Séparateur */}
        <div className="profile-ornament">
          <span className="profile-ornament__line" />
          <span className="profile-ornament__symbol">⸻ ✦ ⸻</span>
          <span className="profile-ornament__line" />
        </div>

        {/* Scénarios publiés */}
        <section className="profile-scenarios">
          <div className="profile-scenarios__inner">
            <div className="profile-scenarios__header">
              <p className="profile-scenarios__label">Contributions</p>
              <h2 className="profile-scenarios__title">Scénarios publiés</h2>
            </div>

            {scenariosLoading ? (
              <p className="profile-scenarios__loading">
                Chargement des scénarios...
              </p>
            ) : scenarios.length === 0 ? (
              <div className="profile-scenarios__empty">
                <span className="profile-scenarios__empty-icon">✦</span>
                <p className="profile-scenarios__empty-text">
                  Aucun scénario publié pour le moment.
                </p>
              </div>
            ) : (
              <ul className="profile-scenarios__list">
                {scenarios.map((scenario) => (
                  <li key={scenario.id} className="profile-scenario-item">
                    <div className="profile-scenario-item__left">
                      <span className="profile-scenario-item__type">
                        {scenario.type}
                      </span>
                      <h3 className="profile-scenario-item__title">
                        {scenario.titre}
                      </h3>
                      <p className="profile-scenario-item__desc">
                        {scenario.description}
                      </p>
                    </div>
                    <div className="profile-scenario-item__right">
                      <span className="profile-scenario-item__year">
                        {new Date(scenario.anneePublication).getFullYear()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
