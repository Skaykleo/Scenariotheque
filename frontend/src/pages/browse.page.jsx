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
import SubmitScenarioModal from "../components/submitScenarioModal.component";
import { useAuth } from "../context/AuthContext";
import createScenario from "../services/scenario.service";

// ─── Mock data ────────────────────────────────────────────────
//
// Champs filtrables ajoutés sur chaque scénario :
//   genreId  → id du genre, aligné sur les ids de GENRES dans FilterPanel
//   system   → id du système, aligné sur les ids de SYSTEMS dans FilterPanel
//   source   → id de la source, aligné sur les ids de SOURCES dans FilterPanel
//   year     → année numérique, convertie en tranche par getYearBucket()
//   duration → "short" | "medium" | "long" | "campaign"
//   players  → tableau des formats joueurs applicables (ex. ["4-6", "7+"])
//
const MOCK_SCENARIOS = [
  {
    id: 1,  title: "Le Manoir des Ombres",
    genre: "Horreur",         genreId: "horreur",
    system: "coc",            source: "original",
    year: 2021,               duration: "medium",   players: ["4-6"],
    author: "A. Delacroix",   rating: 4.7,          pageCount: 52,  featured: false,
    excerpt: "Une demeure oubliée, des secrets sous trois générations de silence.",
    tags: ["investigatif", "gothique", "4–6 joueurs"],
  },
  {
    id: 2,  title: "Éclipse sur Kaïros",
    genre: "Science-Fiction", genreId: "science-fiction",
    system: "savage",         source: "original",
    year: 2023,               duration: "medium",   players: ["2-3", "4-6"],
    author: "M. Fontaine",    rating: 4.5,          pageCount: 38,  featured: false,
    excerpt: "Une station orbitale. Seize survivants. Une IA qui sait trop.",
    tags: ["huis-clos", "sf", "3–5 joueurs"],
  },
  {
    id: 3,  title: "La Confrérie du Voile",
    genre: "Fantastique",     genreId: "fantastique",
    system: "dnd5e",          source: "original",
    year: 2019,               duration: "long",     players: ["4-6", "7+"],
    author: "C. Marchand",    rating: 4.2,          pageCount: 66,  featured: false,
    excerpt: "Une guilde secrète et une cité médiévale sous malédiction silencieuse.",
    tags: ["magie", "politique", "5–8 joueurs"],
  },
  {
    id: 4,  title: "Dernière Valse à Prague",
    genre: "Thriller",        genreId: "thriller",
    system: "gumshoe",        source: "casus",
    year: 2018,               duration: "medium",   players: ["2-3", "4-6"],
    author: "B. Novak",       rating: 4.8,          pageCount: 44,  featured: false,
    excerpt: "1938. Une espionne, un violoniste et des documents qui changent tout.",
    tags: ["espionnage", "historique", "2–4 joueurs"],
  },
  {
    id: 5,  title: "Souvenirs d'une Île Morte",
    genre: "Mystère",         genreId: "mystere",
    system: "gumshoe",        source: "jdr",
    year: 2022,               duration: "medium",   players: ["2-3", "4-6"],
    author: "L. Garnier",     rating: 4.1,          pageCount: 41,  featured: false,
    excerpt: "Un archipel coupé du monde. Un corps sans identité sur la grève.",
    tags: ["enquête", "insulaire", "3–6 joueurs"],
  },
  {
    id: 6,  title: "Le Dernier Oracle",
    genre: "Fantastique",     genreId: "fantastique",
    system: "pathfinder2",    source: "scenario",
    year: 2020,               duration: "campaign", players: ["4-6"],
    author: "P. Renaud",      rating: 3.9,          pageCount: 58,  featured: false,
    excerpt: "Les prophéties se taisent depuis dix ans. Une équipe part chercher pourquoi.",
    tags: ["épique", "exploration", "4–5 joueurs"],
  },
  {
    id: 7,  title: "Protocole Mnémos",
    genre: "Science-Fiction", genreId: "science-fiction",
    system: "powered",        source: "original",
    year: 2024,               duration: "short",    players: ["2-3"],
    author: "A. Lefort",      rating: 4.4,          pageCount: 34,  featured: false,
    excerpt: "Des souvenirs implantés. Des identités volées. Qui êtes-vous vraiment ?",
    tags: ["cyberpunk", "identité", "2–4 joueurs"],
  },
  {
    id: 8,  title: "La Rivière des Âmes",
    genre: "Horreur",         genreId: "horreur",
    system: "coc",            source: "jdr",
    year: 2023,               duration: "medium",   players: ["2-3", "4-6"],
    author: "E. Blanc",       rating: 4.6,          pageCount: 49,  featured: false,
    excerpt: "Un village de pêcheurs. Des disparitions. Quelque chose vit dans l'eau.",
    tags: ["rural", "survie", "3–6 joueurs"],
  },
  {
    id: 9,  title: "Les Chevaliers d'Argent",
    genre: "Historique",      genreId: "historique",
    system: "systemless",     source: "casus",
    year: 2017,               duration: "long",     players: ["4-6"],
    author: "D. Perrin",      rating: 4.0,          pageCount: 72,  featured: false,
    excerpt: "Croisade, 1099. Jérusalem approche. Tous les sacrifices valent-ils ?",
    tags: ["guerre", "moral", "4–6 joueurs"],
  },
  {
    id: 10, title: "Minuit Écarlate",
    genre: "Thriller",        genreId: "thriller",
    system: "systemless",     source: "original",
    year: 2025,               duration: "short",    players: ["4-6", "7+"],
    author: "N. Dubois",      rating: 4.3,          pageCount: 31,  featured: false,
    excerpt: "Une soirée mondaine. Un meurtre impossible. Douze suspects.",
    tags: ["whodunit", "social", "6–10 joueurs"],
  },
  {
    id: 11, title: "L'Athanor de Prométhée",
    genre: "Fantastique",     genreId: "fantastique",
    system: "dnd5e",          source: "scenario",
    year: 2016,               duration: "long",     players: ["2-3", "4-6"],
    author: "C. Marchand",    rating: 3.8,          pageCount: 63,  featured: false,
    excerpt: "L'alchimie comme pouvoir ultime. La quête de la pierre philosophale.",
    tags: ["alchimie", "mystique", "3–4 joueurs"],
  },
  {
    id: 12, title: "Station Terminus",
    genre: "Science-Fiction", genreId: "science-fiction",
    system: "savage",         source: "jeux",
    year: 2024,               duration: "short",    players: ["4-6"],
    author: "M. Fontaine",    rating: 4.2,          pageCount: 29,  featured: false,
    excerpt: "La dernière navette vers la Terre part dans 48h. Vous n'êtes pas invités.",
    tags: ["survival", "tension", "4–5 joueurs"],
  },
  {
    id: 13, title: "Seul contre les Ombres",
    genre: "Horreur",         genreId: "horreur",
    system: "coc",            source: "original",
    year: 2022,               duration: "short",    players: ["solo"],
    author: "A. Delacroix",   rating: 4.5,          pageCount: 22,  featured: false,
    excerpt: "Une nuit seul dans un asile abandonné. Vous n'êtes peut-être pas seul.",
    tags: ["solo", "horreur", "1 joueur"],
  },
];

// ─── Helper : année numérique → tranche du FilterPanel ──────────────────────
// Les valeurs retournées doivent correspondre EXACTEMENT aux YEAR_OPTIONS de FilterPanel.
function getYearBucket(year) {
  if (year < 2000)                  return "Avant 2000";
  if (year >= 2000 && year <= 2009) return "2000–2009";
  if (year >= 2010 && year <= 2014) return "2010–2014";
  if (year >= 2015 && year <= 2019) return "2015–2019";
  if (year >= 2020 && year <= 2022) return "2020–2022";
  if (year >= 2023 && year <= 2024) return "2023–2024";
  if (year === 2025)                return "2025";
  return null;
}

const MOCK_GENRES = [
  { id: "fantastique",     name: "Fantastique",        icon: "🏰", meta: "Magie, créatures, mondes imaginaires",        count: 1240, accentColor: "#2a5a8b" },
  { id: "horreur",         name: "Horreur",            icon: "💀", meta: "Suspense, terreur, survie",                   count: 873,  accentColor: "#8b2a2a" },
  { id: "science-fiction", name: "Science-Fiction",    icon: "🚀", meta: "Futur, technologie, espace",                  count: 652,  accentColor: "#1a6b5a" },
  { id: "thriller",        name: "Thriller",           icon: "🔍", meta: "Enquête, tension, retournements",              count: 521,  accentColor: "#5a3a8b" },
  { id: "mystere",         name: "Mystère",            icon: "🕯️", meta: "Investigations, énigmes, secrets",             count: 418,  accentColor: "#6b5a2a" },
  { id: "historique",      name: "Historique",         icon: "⚔️",  meta: "Périodes réelles, reconstitution",            count: 314,  accentColor: "#7a5a1a" },
  { id: "romance",         name: "Romance",            icon: "🌹", meta: "Relations, émotions, intrigues sentimentales", count: 182,  accentColor: "#8b3a5a" },
  { id: "post-apo",        name: "Post-Apocalyptique", icon: "☢️", meta: "Survie, reconstruction, espoir",              count: 267,  accentColor: "#5a4020" },
];

const MOCK_AUTHORS = [
  { id: 1, name: "C. Marchand",  icon: "✍️", meta: "Fantastique, politique",     count: 32, accentColor: "#c9a84c" },
  { id: 2, name: "M. Fontaine",  icon: "✍️", meta: "Science-fiction, huis-clos", count: 28, accentColor: "#c9a84c" },
  { id: 3, name: "A. Delacroix", icon: "✍️", meta: "Horreur, gothique",          count: 21, accentColor: "#c9a84c" },
  { id: 4, name: "B. Novak",     icon: "✍️", meta: "Thriller, historique",       count: 18, accentColor: "#c9a84c" },
  { id: 5, name: "L. Garnier",   icon: "✍️", meta: "Mystère, insulaire",         count: 15, accentColor: "#c9a84c" },
  { id: 6, name: "P. Renaud",    icon: "✍️", meta: "Épique, exploration",        count: 12, accentColor: "#c9a84c" },
  { id: 7, name: "E. Blanc",     icon: "✍️", meta: "Horreur, rural",             count: 11, accentColor: "#c9a84c" },
  { id: 8, name: "D. Perrin",    icon: "✍️", meta: "Historique, guerre",         count: 9,  accentColor: "#c9a84c" },
];

// ids alignés sur ceux du FilterPanel (pathfinder2 / powered / systemless)
// L'ancien fichier avait pf2e / pbta / free → incompatibles avec les checkboxes
const MOCK_SYSTEMS = [
  { id: "dnd5e",       name: "D&D 5e",                   icon: "🐉", meta: "Donjons & Dragons, 5ème édition", count: 892, accentColor: "#8b2a2a" },
  { id: "coc",         name: "L'Appel de Cthulhu",        icon: "🐙", meta: "Horreur lovecraftienne, BRP",     count: 634, accentColor: "#2a4a6b" },
  { id: "pathfinder2", name: "Pathfinder 2e",             icon: "⚔️",  meta: "Fantasy tactique, Paizo",         count: 445, accentColor: "#7a5a1a" },
  { id: "powered",     name: "Powered by the Apocalypse", icon: "📖", meta: "Jeu narratif, fiction first",      count: 310, accentColor: "#3a6b4a" },
  { id: "savage",      name: "Savage Worlds",             icon: "🌪️", meta: "Action, multi-genres",             count: 287, accentColor: "#6b4a1a" },
  { id: "gumshoe",     name: "GUMSHOE",                   icon: "🔎", meta: "Investigation, clues driven",      count: 201, accentColor: "#4a5a6b" },
  { id: "systemless",  name: "Indépendant",               icon: "✦",  meta: "Sans système, universel",          count: 533, accentColor: "#c9a84c" },
];

// ─── Composant principal ──────────────────────────────────────
export default function BrowsePage() {
  const [submitOpen, setSubmitOpen] = useState(false);
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [activeTab,       setActiveTab]       = useState("scenarios");
  const [searchQuery,     setSearchQuery]     = useState("");
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortBy,          setSortBy]          = useState("popular");
  const [view,            setView]            = useState("grid");

  const [filters, setFilters] = useState({
    genres: {}, systems: {}, sources: {}, players: {},
    year: "Toutes", duration: "", minRating: "",
  });

  // ── Modal de détail ──
  const [modal, setModal] = useState(null);
  function openModal(type, data) { setModal({ type, data }); }
  function closeModal()          { setModal(null); }

  // ── Dismissal bannière (sessionStorage) ──
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

  // ── Filtrage complet des scénarios ──────────────────────────
  const filteredScenarios = useMemo(() => {
    let results = [...MOCK_SCENARIOS];

    // 1. Recherche textuelle — titre, auteur, genre, tags
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((s) =>
        s.title.toLowerCase().includes(q)  ||
        s.author.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q)  ||
        s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Genre — OR entre les genres cochés, via genreId (correspondance directe)
    const activeGenres = Object.entries(filters.genres || {})
      .filter(([, v]) => v).map(([k]) => k);
    if (activeGenres.length > 0) {
      results = results.filter((s) => activeGenres.includes(s.genreId));
    }

    // 3. Système de jeu — OR entre les systèmes cochés, via s.system
    const activeSystems = Object.entries(filters.systems || {})
      .filter(([, v]) => v).map(([k]) => k);
    if (activeSystems.length > 0) {
      results = results.filter((s) => activeSystems.includes(s.system));
    }

    // 4. Source de parution — OR entre les sources cochées, via s.source
    const activeSources = Object.entries(filters.sources || {})
      .filter(([, v]) => v).map(([k]) => k);
    if (activeSources.length > 0) {
      results = results.filter((s) => activeSources.includes(s.source));
    }

    // 5. Année — l'année numérique du scénario est convertie en tranche
    //    puis comparée à la tranche sélectionnée dans le select
    if (filters.year && filters.year !== "Toutes") {
      results = results.filter((s) => getYearBucket(s.year) === filters.year);
    }

    // 6. Durée — correspondance directe avec le champ duration
    if (filters.duration) {
      results = results.filter((s) => s.duration === filters.duration);
    }

    // 7. Nombre de joueurs — OR : le scénario doit couvrir au moins un format coché
    //    (ex. un scénario ["4-6", "7+"] répond à "4-6" ou à "7+")
    const activePlayers = Object.entries(filters.players || {})
      .filter(([, v]) => v).map(([k]) => k);
    if (activePlayers.length > 0) {
      results = results.filter((s) =>
        activePlayers.some((p) => s.players.includes(p))
      );
    }

    // 8. Note minimale
    if (filters.minRating) {
      results = results.filter((s) => s.rating >= parseFloat(filters.minRating));
    }

    // 9. Tri
    switch (sortBy) {
      case "rating":     results.sort((a, b) => b.rating - a.rating);                  break;
      case "newest":     results.sort((a, b) => b.year   - a.year);                    break;
      case "oldest":     results.sort((a, b) => a.year   - b.year);                    break;
      case "title-asc":  results.sort((a, b) => a.title.localeCompare(b.title, "fr")); break;
      case "title-desc": results.sort((a, b) => b.title.localeCompare(a.title, "fr")); break;
      default: break; // "popular" = ordre de définition du tableau
    }

    return results;
  }, [searchQuery, filters, sortBy]);

  // ── Handlers ──
  function handleFilterChange(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function handleResetFilters() {
    setFilters({
      genres: {}, systems: {}, sources: {}, players: {},
      year: "Toutes", duration: "", minRating: "",
    });
    setSearchQuery("");
  }

  return (
    <div className="browse-page">
      <Navbar />

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

      <div className="browse-page__layout">

        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          mobileOpen={filterPanelOpen}
        />

        <main className="browse-page__main">

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

          {!calloutDismissed && (
            <Contribute
              isLoggedIn={isLoggedIn}
              userName={user?.firstName}
              onDismiss={handleDismissCallout}
              onSubmitClick={() => setSubmitOpen(true)}
            />
          )}

          <BrowseTabs active={activeTab} onChange={setActiveTab} />

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
                  name={g.name} icon={g.icon} meta={g.meta}
                  count={g.count} countLabel="scénario"
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
                    name={a.name} icon={a.icon} meta={a.meta}
                    count={a.count} countLabel="publication"
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
                  name={s.name} icon={s.icon} meta={s.meta}
                  count={s.count} countLabel="scénario"
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