import { useState } from "react";

const CATEGORIES = [
  { id: "all",        label: "Tous",           icon: "✦" },
  { id: "Fantastique",    label: "Fantastique",     icon: "🏰" },
  { id: "Science-Fiction",      label: "Science-Fiction", icon: "🚀" },
  { id: "Thriller",   label: "Thriller",        icon: "🔪" },
  { id: "Horreur",     label: "Horreur",         icon: "💀" },
  { id: "romance",    label: "Romance",         icon: "🌹" },
  { id: "Historique", label: "Historique",      icon: "⚔️" },
  { id: "Mystère",    label: "Mystère",         icon: "🔍" },
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