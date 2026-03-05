import ScenarioCard from "./scenarioCard.component";

const MOCK_SCENARIOS = [
  {
    id: 1,
    title: "Le Manoir des Ombres",
    genre: "Horreur",
    author: "A. Delacroix",
    excerpt: "Une demeure oubliée, des secrets enfouis sous trois générations de silence. Les murs parlent — si l'on sait comment les écouter.",
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
    excerpt: "Une station orbitale. Seize survivants. Et une intelligence artificielle qui sait trop bien ce qui s'est vraiment passé.",
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
    excerpt: "Une guilde secrète, des rituels anciens et une cité médiévale qui respire sous le joug d'une malédiction silencieuse.",
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
    excerpt: "1938. Une espionne, un violoniste, et des documents qui pourraient changer le cours de la guerre. Trois jours pour tout changer.",
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
    excerpt: "Un archipel coupé du monde. Une communauté hermétique. Et le corps d'un inconnu retrouvé sans identité sur la grève.",
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
    <section className="featured-scenarios">
      <div className="featured-scenarios__header">
        <div>
          <p className="featured-scenarios__section-label">✦ Collection</p>
          <h2 className="featured-scenarios__section-title">Scénarios à la une</h2>
        </div>
        <a href="#" className="featured-scenarios__view-all">
          Voir tout →
        </a>
      </div>

      {filtered.length > 0 ? (
        <div className="featured-scenarios__grid">
          {filtered.map((scenario) => (
            <ScenarioCard key={scenario.id} {...scenario} />
          ))}
        </div>
      ) : (
        <div className="featured-scenarios__empty">
          <span className="featured-scenarios__empty-icon">✦</span>
          <p className="featured-scenarios__empty-text">
            Aucun scénario dans ce genre pour l'instant.
          </p>
        </div>
      )}

      <div className="featured-scenarios__load-more">
        <button className="featured-scenarios__load-more-btn">
          Charger plus de scénarios
        </button>
      </div>
    </section>
  );
}