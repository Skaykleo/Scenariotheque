import { useState } from "react";

const CATEGORIES = [
  { id: "all",        label: "Tous",           icon: "✦" },
  { id: "fantasy",    label: "Fantastique",     icon: "🏰" },
  { id: "scifi",      label: "Science-Fiction", icon: "🚀" },
  { id: "thriller",   label: "Thriller",        icon: "🔪" },
  { id: "horror",     label: "Horreur",         icon: "💀" },
  { id: "romance",    label: "Romance",         icon: "🌹" },
  { id: "historical", label: "Historique",      icon: "⚔️" },
  { id: "mystery",    label: "Mystère",         icon: "🔍" },
];

export default function CategoryFilter({ onSelect }) {
  const [active, setActive] = useState("all");

  function handleSelect(id) {
    setActive(id);
    if (onSelect) onSelect(id);
  }

  return (
    <div className="category-filter">
      <div className="category-filter__header">
        <div className="category-filter__divider" />
        <span className="category-filter__label">Explorer par genre</span>
        <div className="category-filter__divider" />
      </div>

      <div className="category-filter__pills">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`category-filter__pill${active === cat.id ? " category-filter__pill--active" : ""}`}
          >
            <span className="category-filter__pill-icon">{cat.icon}</span>
            <span className="category-filter__pill-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}