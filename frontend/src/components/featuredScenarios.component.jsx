import ScenarioCard from "./scenarioCard.component";

const MOCK_SCENARIOS = [
  {
    id: 1,
    title: "Le Manoir des Ombres",
    genre: "Horreur",
    author: "A. Delacroix",
    excerpt:
      "Une demeure oubliée, des secrets enfouis sous trois générations de silence. Les murs parlent — si l'on sait comment les écouter.",
    tags: ["investigatif", "gothique", "4–6 joueurs"],
    rating: 4.7,
    pageCount: 52,
    featured: true,
  },
  {
    id: 2,
    title: "Éclipse sur Kaïros",
    genre: "Science-Fiction",
    author: "M. Fontaine",
    excerpt:
      "Une station orbitale. Seize survivants. Et une intelligence artificielle qui sait trop bien ce qui s'est vraiment passé.",
    tags: ["huis-clos", "sf", "3–5 joueurs"],
    rating: 4.5,
    pageCount: 38,
    featured: false,
  },
  {
    id: 3,
    title: "La Confrérie du Voile",
    genre: "Fantastique",
    author: "C. Marchand",
    excerpt:
      "Une guilde secrète, des rituels anciens et une cité médiévale qui respire sous le joug d'une malédiction silencieuse.",
    tags: ["magie", "politique", "5–8 joueurs"],
    rating: 4.2,
    pageCount: 66,
    featured: false,
  },
  {
    id: 4,
    title: "Dernière Valse à Prague",
    genre: "Thriller",
    author: "B. Novak",
    excerpt:
      "1938. Une espionne, un violoniste, et des documents qui pourraient changer le cours de la guerre. Trois jours pour tout changer.",
    tags: ["espionnage", "historique", "2–4 joueurs"],
    rating: 4.8,
    pageCount: 44,
    featured: false,
  },
  {
    id: 5,
    title: "Souvenirs d'une Île Morte",
    genre: "Mystère",
    author: "L. Garnier",
    excerpt:
      "Un archipel coupé du monde. Une communauté hermétique. Et le corps d'un inconnu retrouvé sans identité sur la grève.",
    tags: ["enquête", "insulaire", "3–6 joueurs"],
    rating: 4.1,
    pageCount: 41,
    featured: false,
  },
];

export default function FeaturedScenarios({ activeCategory = "all" }) {
  const filtered =
    activeCategory === "all"
      ? MOCK_SCENARIOS
      : MOCK_SCENARIOS.filter((s) =>
          s.genre.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section style={styles.section}>
      {/* Section header */}
      <div style={styles.header}>
        <div>
          <p style={styles.sectionLabel}>✦ Collection</p>
          <h2 style={styles.sectionTitle}>Scénarios à la une</h2>
        </div>
        <a href="#" style={styles.viewAll}>
          Voir tout →
        </a>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div style={styles.grid}>
          {filtered.map((scenario) => (
            <ScenarioCard key={scenario.id} {...scenario} />
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <span style={styles.emptyIcon}>✦</span>
          <p style={styles.emptyText}>Aucun scénario dans ce genre pour l'instant.</p>
        </div>
      )}

      {/* Load more */}
      <div style={styles.loadMore}>
        <button style={styles.loadMoreBtn}>Charger plus de scénarios</button>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 24px 80px",
  },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: "32px",
    flexWrap: "wrap",
    gap: "16px",
  },
  sectionLabel: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9a84c",
    margin: "0 0 6px",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "32px",
    fontWeight: 700,
    color: "#f0e6cc",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  viewAll: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.08em",
    color: "#c9a84c",
    textDecoration: "none",
    alignSelf: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  empty: {
    textAlign: "center",
    padding: "80px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  emptyIcon: {
    fontSize: "32px",
    color: "#c9a84c",
    opacity: 0.3,
  },
  emptyText: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "16px",
    fontStyle: "italic",
    color: "#6a5c4a",
    margin: 0,
  },
  loadMore: {
    textAlign: "center",
    marginTop: "48px",
  },
  loadMoreBtn: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#8a7d6a",
    backgroundColor: "transparent",
    border: "1px solid rgba(201, 168, 76, 0.2)",
    padding: "12px 40px",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};