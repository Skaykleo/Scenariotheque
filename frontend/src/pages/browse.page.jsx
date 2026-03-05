import { useState, useMemo } from "react";
import Navbar from "../components/navBar.component";
import Footer from "../components/footer.component";
import SearchBar from "../components/searchBar.component";
import FilterPanel from "../components/filterPanel.component";
import BrowseTabs from "../components/browseTab.component";
import ScenarioGrid from "../components/scenarioGrid.component";
import EntityCard from "../components/entityCard.component";
import Contribute from "../components/contribute.component";
import DetailModal from "../components/detailModal.component";

// ─── Mock data ────────────────────────────────────────────────
const MOCK_SCENARIOS = [
  { id: 1,  title: "Le Manoir des Ombres",       genre: "Horreur",          author: "A. Delacroix", excerpt: "Une demeure oubliée, des secrets sous trois générations de silence.",       tags: ["investigatif", "gothique", "4–6 joueurs"], rating: 4.7, pageCount: 52, featured: false },
  { id: 2,  title: "Éclipse sur Kaïros",          genre: "Science-Fiction",  author: "M. Fontaine",  excerpt: "Une station orbitale. Seize survivants. Une IA qui sait trop.",             tags: ["huis-clos", "sf", "3–5 joueurs"],          rating: 4.5, pageCount: 38, featured: false },
  { id: 3,  title: "La Confrérie du Voile",       genre: "Fantastique",      author: "C. Marchand",  excerpt: "Une guilde secrète et une cité médiévale sous malédiction silencieuse.",    tags: ["magie", "politique", "5–8 joueurs"],       rating: 4.2, pageCount: 66, featured: false },
  { id: 4,  title: "Dernière Valse à Prague",     genre: "Thriller",         author: "B. Novak",     excerpt: "1938. Une espionne, un violoniste et des documents qui changent tout.",     tags: ["espionnage", "historique", "2–4 joueurs"], rating: 4.8, pageCount: 44, featured: false },
  { id: 5,  title: "Souvenirs d'une Île Morte",   genre: "Mystère",          author: "L. Garnier",   excerpt: "Un archipel coupé du monde. Un corps sans identité sur la grève.",          tags: ["enquête", "insulaire", "3–6 joueurs"],     rating: 4.1, pageCount: 41, featured: false },
  { id: 6,  title: "Le Dernier Oracle",           genre: "Fantastique",      author: "P. Renaud",    excerpt: "Les prophéties se taisent depuis dix ans. Une équipe part chercher pourquoi.", tags: ["épique", "exploration", "4–5 joueurs"],   rating: 3.9, pageCount: 58, featured: false },
  { id: 7,  title: "Protocole Mnémos",            genre: "Science-Fiction",  author: "A. Lefort",    excerpt: "Des souvenirs implantés. Des identités volées. Qui êtes-vous vraiment ?",   tags: ["cyberpunk", "identité", "2–4 joueurs"],   rating: 4.4, pageCount: 34, featured: false },
  { id: 8,  title: "La Rivière des Âmes",         genre: "Horreur",          author: "E. Blanc",     excerpt: "Un village de pêcheurs. Des disparitions. Quelque chose vit dans l'eau.",   tags: ["rural", "survie", "3–6 joueurs"],          rating: 4.6, pageCount: 49, featured: false },
  { id: 9,  title: "Les Chevaliers d'Argent",     genre: "Historique",       author: "D. Perrin",    excerpt: "Croisade, 1099. Jérusalem approche. Tous les sacrifices valent-ils ?",       tags: ["guerre", "moral", "4–6 joueurs"],          rating: 4.0, pageCount: 72, featured: false },
  { id: 10, title: "Minuit Écarlate",             genre: "Thriller",         author: "N. Dubois",    excerpt: "Une soirée mondaine. Un meurtre impossible. Douze suspects.",                tags: ["whodunit", "social", "6–10 joueurs"],      rating: 4.3, pageCount: 31, featured: false },
  { id: 11, title: "L'Athanor de Prométhée",      genre: "Fantastique",      author: "C. Marchand",  excerpt: "L'alchimie comme pouvoir ultime. La quête de la pierre philosophale.",       tags: ["alchimie", "mystique", "3–4 joueurs"],    rating: 3.8, pageCount: 63, featured: false },
  { id: 12, title: "Station Terminus",            genre: "Science-Fiction",  author: "M. Fontaine",  excerpt: "La dernière navette vers la Terre part dans 48h. Vous n'êtes pas invités.", tags: ["survival", "tension", "4–5 joueurs"],     rating: 4.2, pageCount: 29, featured: false },
];

const MOCK_GENRES = [
  { id: "fantastique",    name: "Fantastique",    icon: "🏰", meta: "Magie, créatures, mondes imaginaires",     count: 1240, accentColor: "#2a5a8b" },
  { id: "horreur",        name: "Horreur",        icon: "💀", meta: "Suspense, terreur, survie",                count: 873,  accentColor: "#8b2a2a" },
  { id: "science-fiction",name: "Science-Fiction",icon: "🚀", meta: "Futur, technologie, espace",               count: 652,  accentColor: "#1a6b5a" },
  { id: "thriller",       name: "Thriller",       icon: "🔍", meta: "Enquête, tension, retournements",           count: 521,  accentColor: "#5a3a8b" },
  { id: "mystere",        name: "Mystère",        icon: "🕯️", meta: "Investigations, énigmes, secrets",          count: 418,  accentColor: "#6b5a2a" },
  { id: "historique",     name: "Historique",     icon: "⚔️",  meta: "Périodes réelles, reconstitution",         count: 314,  accentColor: "#7a5a1a" },
  { id: "romance",        name: "Romance",        icon: "🌹", meta: "Relations, émotions, intrigues sentimentales", count: 182, accentColor: "#8b3a5a" },
  { id: "post-apo",       name: "Post-Apocalyptique", icon: "☢️", meta: "Survie, reconstruction, espoir",        count: 267,  accentColor: "#5a4020" },
];

const MOCK_AUTHORS = [
  { id: 1, name: "C. Marchand",  icon: "✍️", meta: "Fantastique, politique",  count: 32, accentColor: "#c9a84c" },
  { id: 2, name: "M. Fontaine",  icon: "✍️", meta: "Science-fiction, huis-clos", count: 28, accentColor: "#c9a84c" },
  { id: 3, name: "A. Delacroix", icon: "✍️", meta: "Horreur, gothique",       count: 21, accentColor: "#c9a84c" },
  { id: 4, name: "B. Novak",     icon: "✍️", meta: "Thriller, historique",    count: 18, accentColor: "#c9a84c" },
  { id: 5, name: "L. Garnier",   icon: "✍️", meta: "Mystère, insulaire",      count: 15, accentColor: "#c9a84c" },
  { id: 6, name: "P. Renaud",    icon: "✍️", meta: "Épique, exploration",     count: 12, accentColor: "#c9a84c" },
  { id: 7, name: "E. Blanc",     icon: "✍️", meta: "Horreur, rural",          count: 11, accentColor: "#c9a84c" },
  { id: 8, name: "D. Perrin",    icon: "✍️", meta: "Historique, guerre",      count: 9,  accentColor: "#c9a84c" },
];

const MOCK_SYSTEMS = [
  { id: "dnd5e",    name: "D&D 5e",                   icon: "🐉", meta: "Donjons & Dragons, 5ème édition", count: 892, accentColor: "#8b2a2a" },
  { id: "coc",      name: "L'Appel de Cthulhu",        icon: "🐙", meta: "Horreur lovecraftienne, BRP",     count: 634, accentColor: "#2a4a6b" },
  { id: "pf2e",     name: "Pathfinder 2e",             icon: "⚔️",  meta: "Fantasy tactique, Paizo",         count: 445, accentColor: "#7a5a1a" },
  { id: "pbta",     name: "Powered by the Apocalypse", icon: "📖", meta: "Jeu narratif, fiction first",      count: 310, accentColor: "#3a6b4a" },
  { id: "savage",   name: "Savage Worlds",             icon: "🌪️", meta: "Action, multi-genres",            count: 287, accentColor: "#6b4a1a" },
  { id: "gumshoe",  name: "GUMSHOE",                   icon: "🔎", meta: "Investigation, clues driven",      count: 201, accentColor: "#4a5a6b" },
  { id: "free",     name: "Indépendant",               icon: "✦",  meta: "Sans système, universel",          count: 533, accentColor: "#c9a84c" },
];

// ─── Composant principal ──────────────────────────────────────
export default function BrowsePage() {
  // Simulation de l'état de connexion — à remplacer par votre auth
  const [isLoggedIn] = useState(false);

  // Navigation
  const [activeTab,  setActiveTab]  = useState("scenarios");

  // Recherche
  const [searchQuery, setSearchQuery] = useState("");

  // Filtres
  const [filters, setFilters] = useState({
    genres: {}, systems: {}, sources: {},
    year: "Toutes", duration: "", minRating: "", players: {},
  });
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Tri & vue
  const [sortBy, setSortBy] = useState("popular");
  const [view,   setView]   = useState("grid");

  // ── Modal de détail ──
  // { type: "scenario"|"genre"|"author"|"system", data: {...} } ou null
  const [modal, setModal] = useState(null);

  function openModal(type, data) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  // ── Dismissal du Contribute (persisté en sessionStorage) ──
  // sessionStorage = dure le temps de l'onglet/session navigateur
  const DISMISS_KEY = "scenariotheque_callout_dismissed";
  const [calloutDismissed, setCalloutDismissed] = useState(
    () => sessionStorage.getItem(DISMISS_KEY) === "1"
  );

  function handleDismissCallout() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setCalloutDismissed(true);
  }

  // ── Comptage des filtres actifs ──
  const activeFilterCount = useMemo(() => {
    let n = 0;
    n += Object.values(filters.genres  || {}).filter(Boolean).length;
    n += Object.values(filters.systems || {}).filter(Boolean).length;
    n += Object.values(filters.sources || {}).filter(Boolean).length;
    n += Object.values(filters.players || {}).filter(Boolean).length;
    if (filters.year && filters.year !== "Toutes") n++;
    if (filters.duration)  n++;
    if (filters.minRating) n++;
    return n;
  }, [filters]);

  // ── Filtrage des scénarios ──
  const filteredScenarios = useMemo(() => {
    let results = [...MOCK_SCENARIOS];

    // Recherche textuelle
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.author.toLowerCase().includes(q) ||
          s.genre.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filtre genre
    const activeGenres = Object.entries(filters.genres || {})
      .filter(([, v]) => v).map(([k]) => k);
    if (activeGenres.length > 0) {
      results = results.filter((s) =>
        activeGenres.some((g) => s.genre.toLowerCase().replace(/[\s-]/g, "") === g.replace(/[\s-]/g, ""))
      );
    }

    // Filtre note
    if (filters.minRating) {
      results = results.filter((s) => s.rating >= parseFloat(filters.minRating));
    }

    // Tri
    switch (sortBy) {
      case "rating":     results.sort((a, b) => b.rating    - a.rating);    break;
      case "newest":     results.sort((a, b) => b.id        - a.id);        break;
      case "oldest":     results.sort((a, b) => a.id        - b.id);        break;
      case "title-asc":  results.sort((a, b) => a.title.localeCompare(b.title, "fr")); break;
      case "title-desc": results.sort((a, b) => b.title.localeCompare(a.title, "fr")); break;
      default: break; // popular = ordre par défaut
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  // ── Handlers ──
  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleResetFilters() {
    setFilters({
      genres: {}, systems: {}, sources: {},
      year: "Toutes", duration: "", minRating: "", players: {},
    });
    setSearchQuery("");
  }

  return (
    <div className="browse-page">
      <Navbar />

      {/* ── Modal de détail ── */}
      <DetailModal
        isOpen={!!modal}
        onClose={closeModal}
        type={modal?.type}
        data={modal?.data}
      />

      {/* En-tête de la page */}
      <header className="browse-page__header">
        <div className="browse-page__header-bg" />
        <p className="browse-page__eyebrow">Bibliothèque</p>
        <h1 className="browse-page__title">
          Parcourir la <em>collection</em>
        </h1>
        <p className="browse-page__subtitle">
          Explorez plus de 4 200 scénarios par genre, auteur ou système de jeu.
          Trouvez exactement ce que vous cherchez grâce aux filtres avancés.
        </p>
      </header>

      {/* Layout sidebar + contenu */}
      <div className="browse-page__layout">

        {/* ── Sidebar filtres ── */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          mobileOpen={filterPanelOpen}
        />

        {/* ── Contenu principal ── */}
        <main className="browse-page__main">

          {/* Barre de recherche */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            filterPanelOpen={filterPanelOpen}
            onToggleFilter={() => setFilterPanelOpen(!filterPanelOpen)}
            activeFilters={activeFilterCount}
            resultCount={
              activeTab === "scenarios" ? filteredScenarios.length :
              activeTab === "genres"    ? MOCK_GENRES.length :
              activeTab === "authors"   ? MOCK_AUTHORS.length :
              MOCK_SYSTEMS.length
            }
          />

          {/* Bannière de contribution — cachée si l'utilisateur l'a fermée */}
          {!calloutDismissed && (
            <Contribute
              isLoggedIn={isLoggedIn}
              userName="Romaric"
              onDismiss={handleDismissCallout}
            />
          )}

          {/* Onglets */}
          <BrowseTabs active={activeTab} onChange={setActiveTab} />

          {/* Contenu selon onglet actif */}
          {activeTab === "scenarios" && (
            <ScenarioGrid
              scenarios={filteredScenarios}
              sortBy={sortBy}
              onSortChange={setSortBy}
              view={view}
              onViewChange={setView}
              onCardClick={(data) => openModal("scenario", data)}
            />
          )}

          {activeTab === "genres" && (
            <div className="entity-grid" style={{ marginTop: "8px" }}>
              {MOCK_GENRES.map((g) => (
                <EntityCard
                  key={g.id}
                  name={g.name}
                  icon={g.icon}
                  meta={g.meta}
                  count={g.count}
                  countLabel="scénario"
                  accentColor={g.accentColor}
                  onOpen={(data) => openModal("genre", data)}
                />
              ))}
            </div>
          )}

          {activeTab === "authors" && (
            <div className="entity-grid" style={{ marginTop: "8px" }}>
              {MOCK_AUTHORS
                .filter((a) =>
                  !searchQuery ||
                  a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  a.meta.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((a) => (
                  <EntityCard
                    key={a.id}
                    name={a.name}
                    icon={a.icon}
                    meta={a.meta}
                    count={a.count}
                    countLabel="publication"
                    accentColor={a.accentColor}
                    onOpen={(data) => openModal("author", data)}
                  />
                ))}
            </div>
          )}

          {activeTab === "systems" && (
            <div className="entity-grid" style={{ marginTop: "8px" }}>
              {MOCK_SYSTEMS.map((s) => (
                <EntityCard
                  key={s.id}
                  name={s.name}
                  icon={s.icon}
                  meta={s.meta}
                  count={s.count}
                  countLabel="scénario"
                  accentColor={s.accentColor}
                  onOpen={(data) => openModal("system", data)}
                />
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  );
}