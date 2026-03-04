import { useState } from "react";

const CATEGORIES = [
  { id: "all", label: "Tous", icon: "✦" },
  { id: "fantasy", label: "Fantastique", icon: "🏰" },
  { id: "scifi", label: "Science-Fiction", icon: "🚀" },
  { id: "thriller", label: "Thriller", icon: "🔪" },
  { id: "horror", label: "Horreur", icon: "💀" },
  { id: "romance", label: "Romance", icon: "🌹" },
  { id: "historical", label: "Historique", icon: "⚔️" },
  { id: "mystery", label: "Mystère", icon: "🔍" },
];

export default function CategoryFilter({ onSelect }) {
  const [active, setActive] = useState("all");

  function handleSelect(id) {
    setActive(id);
    if (onSelect) onSelect(id);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <div style={styles.divider} />
        <span style={styles.label}>Explorer par genre</span>
        <div style={styles.divider} />
      </div>

      <div style={styles.pills}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            style={{
              ...styles.pill,
              ...(active === cat.id ? styles.pillActive : {}),
            }}
          >
            <span style={styles.pillIcon}>{cat.icon}</span>
            <span style={styles.pillLabel}>{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "48px 24px 0",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "28px",
  },
  divider: {
    flex: 1,
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.3), transparent)",
  },
  label: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "12px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#6a5c4a",
    flexShrink: 0,
  },
  pills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  pill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    letterSpacing: "0.05em",
    color: "#8a7d6a",
    backgroundColor: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(201, 168, 76, 0.15)",
    borderRadius: "100px",
    padding: "8px 18px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  pillActive: {
    color: "#0d0b08",
    backgroundColor: "#c9a84c",
    borderColor: "#c9a84c",
  },
  pillIcon: {
    fontSize: "14px",
  },
  pillLabel: {
    fontWeight: 500,
  },
};