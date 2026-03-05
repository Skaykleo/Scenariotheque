/**
 * @param {Object}   props
 * @param {string}   props.title      - Titre du scénario
 * @param {string}   props.genre      - Genre principal
 * @param {string}   props.author     - Nom de l'auteur
 * @param {string}   props.excerpt    - Résumé court
 * @param {string[]} props.tags       - Liste de tags
 * @param {number}   props.rating     - Note sur 5
 * @param {number}   props.pageCount  - Nombre de pages
 * @param {boolean}  props.featured   - Si le scénario est mis en avant
 * @param {Function} props.onOpen     - Callback pour ouvrir la modal de détail
 */
export default function ScenarioCard({
  title      = "Le Manoir des Ombres",
  genre      = "Horreur",
  author     = "A. Delacroix",
  excerpt    = "Une demeure oubliée, des secrets enfouis sous trois générations de silence. Les murs parlent — si l'on sait comment les écouter.",
  tags       = ["investigatif", "gothique", "4–6 joueurs"],
  rating     = 4.3,
  pageCount  = 48,
  featured   = false,
  onOpen,
  // Props passés en plus pour la modal (optionnels, enrichis dans BrowsePage)
  ...rest
}) {
  const GENRE_COLORS = {
    "Horreur":         "#8b2a2a",
    "Fantastique":     "#2a5a8b",
    "Science-Fiction": "#1a6b5a",
    "Thriller":        "#5a3a8b",
    "Romance":         "#8b3a5a",
    "Historique":      "#6b5a2a",
    "Mystère":         "#2a4a6b",
  };

  const genreColor = GENRE_COLORS[genre] || "#5a4a3a";

  function handleOpen(e) {
    e.preventDefault();
    if (onOpen) onOpen({ title, genre, author, excerpt, tags, rating, pageCount, featured, ...rest });
  }

  return (
    <article
      className={`scenario-card${featured ? " scenario-card--featured" : ""}`}
      onClick={handleOpen}
      style={{ cursor: "pointer" }}
    >
      {/* Featured badge */}
      {featured && (
        <div className="scenario-card__featured-badge">
          ✦ En vedette
        </div>
      )}

      {/* Genre ribbon — backgroundColor reste inline car dynamique */}
      <div className="scenario-card__genre-ribbon" style={{ backgroundColor: genreColor }}>
        <span className="scenario-card__genre-text">{genre}</span>
      </div>

      {/* Body */}
      <div className="scenario-card__body">
        <h3 className="scenario-card__title">{title}</h3>
        <p className="scenario-card__author">par {author}</p>

        {/* Separator */}
        <div className="scenario-card__sep">
          <span
            className="scenario-card__sep-line"
            style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.25), transparent)" }}
          />
        </div>

        <p className="scenario-card__excerpt">{excerpt}</p>

        <div className="scenario-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="scenario-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="scenario-card__footer">
        <div className="scenario-card__meta">
          <span className="scenario-card__meta-item">
            <StarIcon />
            <span className="scenario-card__meta-value scenario-card__meta-value--rating">
              {rating.toFixed(1)}
            </span>
          </span>
          <span className="scenario-card__meta-dot">·</span>
          <span className="scenario-card__meta-item">
            <span className="scenario-card__meta-value">{pageCount}</span>
            <span className="scenario-card__meta-unit"> p.</span>
          </span>
        </div>

        {/* Bouton qui stoppe la propagation du clic parent */}
        <button
          className="scenario-card__read-btn"
          onClick={handleOpen}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          Voir le détail →
        </button>
      </div>

      {/* Hover glow — géré en CSS via :hover sur .scenario-card */}
      <div className="scenario-card__hover-glow" />
    </article>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#c9a84c" style={{ flexShrink: 0 }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}