import { useState } from "react";

/**
 * @param {Object} props
 * @param {string}   props.title      - Titre du scénario
 * @param {string}   props.genre      - Genre principal
 * @param {string}   props.author     - Nom de l'auteur
 * @param {string}   props.excerpt    - Résumé court
 * @param {string[]} props.tags       - Liste de tags
 * @param {number}   props.rating     - Note sur 5
 * @param {number}   props.pageCount  - Nombre de pages
 * @param {boolean}  props.featured   - Si le scénario est mis en avant
 * @param {string}   props.accentColor - Couleur d'accent optionnelle
 */
export default function ScenarioCard({
  title = "Le Manoir des Ombres",
  genre = "Horreur",
  author = "A. Delacroix",
  excerpt = "Une demeure oubliée, des secrets enfouis sous trois générations de silence. Les murs parlent — si l'on sait comment les écouter.",
  tags = ["investigatif", "gothique", "4–6 joueurs"],
  rating = 4.3,
  pageCount = 48,
  featured = false,
  accentColor = "#c9a84c",
}) {
  const [hovered, setHovered] = useState(false);

  const GENRE_COLORS = {
    "Horreur": "#8b2a2a",
    "Fantastique": "#2a5a8b",
    "Science-Fiction": "#1a6b5a",
    "Thriller": "#5a3a8b",
    "Romance": "#8b3a5a",
    "Historique": "#6b5a2a",
    "Mystère": "#2a4a6b",
  };

  const genreColor = GENRE_COLORS[genre] || "#5a4a3a";

  return (
    <article
      style={{
        ...styles.card,
        ...(hovered ? styles.cardHovered : {}),
        ...(featured ? styles.cardFeatured : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Featured badge */}
      {featured && (
        <div style={styles.featuredBadge}>
          <span>✦ En vedette</span>
        </div>
      )}

      {/* Genre ribbon */}
      <div style={{ ...styles.genreRibbon, backgroundColor: genreColor }}>
        <span style={styles.genreText}>{genre}</span>
      </div>

      {/* Card body */}
      <div style={styles.body}>
        {/* Title */}
        <h3 style={styles.title}>{title}</h3>

        {/* Author */}
        <p style={styles.author}>par {author}</p>

        {/* Separator */}
        <div style={styles.sep}>
          <span style={{ ...styles.sepLine, background: `linear-gradient(90deg, ${accentColor}40, transparent)` }} />
        </div>

        {/* Excerpt */}
        <p style={styles.excerpt}>{excerpt}</p>

        {/* Tags */}
        <div style={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.meta}>
          <span style={styles.metaItem}>
            <StarIcon color={accentColor} />
            <span style={{ ...styles.metaValue, color: accentColor }}>{rating.toFixed(1)}</span>
          </span>
          <span style={styles.metaDot}>·</span>
          <span style={styles.metaItem}>
            <span style={styles.metaValue}>{pageCount}</span>
            <span style={styles.metaUnit}> p.</span>
          </span>
        </div>

        <a href="#" style={styles.readBtn}>
          Lire →
        </a>
      </div>

      {/* Hover glow */}
      <div
        style={{
          ...styles.hoverGlow,
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}15 0%, transparent 70%)`,
        }}
      />
    </article>
  );
}

function StarIcon({ color }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const styles = {
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#161410",
    border: "1px solid rgba(201, 168, 76, 0.12)",
    borderRadius: "4px",
    overflow: "hidden",
    transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
  },
  cardHovered: {
    transform: "translateY(-4px)",
    borderColor: "rgba(201, 168, 76, 0.35)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 168, 76, 0.1)",
  },
  cardFeatured: {
    borderColor: "rgba(201, 168, 76, 0.3)",
    gridColumn: "span 2",
  },
  featuredBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    fontFamily: "'EB Garamond', serif",
    fontSize: "11px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#c9a84c",
    backgroundColor: "rgba(13, 11, 8, 0.85)",
    border: "1px solid rgba(201, 168, 76, 0.4)",
    padding: "4px 10px",
    borderRadius: "2px",
    zIndex: 1,
  },
  genreRibbon: {
    padding: "6px 16px",
  },
  genreText: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "11px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(240, 230, 204, 0.85)",
  },
  body: {
    padding: "20px 20px 16px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#f0e6cc",
    margin: 0,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  author: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    fontStyle: "italic",
    color: "#6a5c4a",
    margin: 0,
  },
  sep: {
    padding: "2px 0",
  },
  sepLine: {
    display: "block",
    height: "1px",
    width: "100%",
  },
  excerpt: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "15px",
    lineHeight: 1.65,
    color: "#8a7d6a",
    margin: 0,
    flex: 1,
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "4px",
  },
  tag: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "11px",
    letterSpacing: "0.08em",
    color: "#6a5c4a",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    padding: "3px 8px",
    borderRadius: "2px",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  metaValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "14px",
    color: "#f0e6cc",
  },
  metaUnit: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    color: "#6a5c4a",
  },
  metaDot: {
    color: "#3a3020",
    fontSize: "16px",
  },
  readBtn: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    letterSpacing: "0.08em",
    color: "#c9a84c",
    textDecoration: "none",
    transition: "opacity 0.2s",
  },
  hoverGlow: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    transition: "opacity 0.3s ease",
    zIndex: 0,
  },
};