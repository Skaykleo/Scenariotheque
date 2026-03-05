const GENRE_COLORS = {
  "Horreur":         "#8b2a2a",
  "Fantastique":     "#2a5a8b",
  "Science-Fiction": "#1a6b5a",
  "Thriller":        "#5a3a8b",
  "Romance":         "#8b3a5a",
  "Historique":      "#6b5a2a",
  "Mystère":         "#2a4a6b",
};

/**
 * @param {string}   props.title      - Titre du scénario
 * @param {string}   props.genre      - Genre principal
 * @param {string}   props.author     - Nom de l'auteur
 * @param {string}   props.excerpt    - Résumé court
 * @param {string[]} props.tags       - Liste de tags
 * @param {number}   props.rating     - Note sur 5
 * @param {number}   props.pageCount  - Nombre de pages
 * @param {boolean}  props.featured   - Mise en avant
 * @param {Function} props.onOpen     - Callback pour ouvrir la DetailModal
 * @param {"grid"|"list"} props.view  - Mode d'affichage
 */
export default function ScenarioCard({
  title     = "Le Manoir des Ombres",
  genre     = "Horreur",
  author    = "A. Delacroix",
  excerpt   = "Une demeure oubliée, des secrets enfouis sous trois générations de silence.",
  tags      = ["investigatif", "gothique", "4–6 joueurs"],
  rating    = 4.3,
  pageCount = 48,
  featured  = false,
  onOpen,
  view      = "grid",
  ...rest
}) {
  const genreColor = GENRE_COLORS[genre] || "#5a4a3a";

  function handleOpen(e) {
    e.stopPropagation();
    if (onOpen) onOpen({ title, genre, author, excerpt, tags, rating, pageCount, featured, ...rest });
  }

  const isList = view === "list";

  return (
    <article
      className={[
        "scenario-card",
        featured ? "scenario-card--featured" : "",
        isList   ? "scenario-card--list"     : "",
      ].filter(Boolean).join(" ")}
      onClick={handleOpen}
      style={{ cursor: "pointer" }}
    >
      {/* ── Ribbon genre ─────────────────────────────────────── */}
      {/* En grille : bande horizontale en haut
          En liste  : barre verticale colorée à gauche (via CSS --list) */}
      <div
        className="scenario-card__genre-ribbon"
        style={{ backgroundColor: genreColor }}
      >
        {/* Masqué en liste par CSS, visible en grille */}
        <span className="scenario-card__genre-text">{genre}</span>
      </div>

      {/* ── Badge "En vedette" ────────────────────────────────── */}
      {featured && (
        <div className="scenario-card__featured-badge">✦ En vedette</div>
      )}

      {/* ── Corps principal ───────────────────────────────────── */}
      <div className="scenario-card__body">
        {/* Pill genre — visible uniquement en liste (CSS) */}
        <span
          className="scenario-card__genre-pill"
          style={{ borderColor: `${genreColor}40` }}
        >
          {genre}
        </span>

        <h3 className="scenario-card__title">{title}</h3>
        <p className="scenario-card__author">par {author}</p>

        {/* Séparateur — masqué en liste par CSS */}
        <div className="scenario-card__sep">
          <span
            className="scenario-card__sep-line"
            style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.25), transparent)" }}
          />
        </div>

        <p className="scenario-card__excerpt">{excerpt}</p>

        <div className="scenario-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="scenario-card__tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* ── Footer grille (note + bouton) ─────────────────────── */}
      {/* Masqué en liste par CSS, remplacé par list-aside */}
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
        <button
          className="scenario-card__read-btn"
          onClick={handleOpen}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
        >
          Voir le détail →
        </button>
      </div>

      {/* ── Aside liste (note + pages + bouton, colonne droite) ── */}
      {/* Affiché uniquement en liste par CSS */}
      <div className="scenario-card__list-aside">
        <div>
          <div className="scenario-card__list-rating">
            <StarIcon />
            {rating.toFixed(1)}
          </div>
          <p className="scenario-card__list-pages">{pageCount} p.</p>
        </div>
        <button className="scenario-card__list-btn" onClick={handleOpen}>
          Voir →
        </button>
      </div>

      {/* Hover glow */}
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