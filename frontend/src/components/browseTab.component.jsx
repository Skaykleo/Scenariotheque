const TABS = [
  { id: "scenarios", label: "Scénarios",      icon: "📖", count: 4200 },
  { id: "genres",    label: "Genres",          icon: "🏷️",  count: 18 },
  { id: "authors",   label: "Auteurs",         icon: "✍️",  count: 850 },
  { id: "systems",   label: "Systèmes de jeu", icon: "🎲",  count: 47 },
];

/**
 * @param {Object}   props
 * @param {string}   props.active    - ID de l'onglet actif
 * @param {Function} props.onChange  - Callback sur changement d'onglet
 */
export default function BrowseTabs({ active = "scenarios", onChange }) {
  return (
    <nav className="browse-tabs" role="tablist" aria-label="Parcourir par catégorie">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          className={`browse-tabs__tab${active === tab.id ? " browse-tabs__tab--active" : ""}`}
          onClick={() => onChange && onChange(tab.id)}
        >
          <span className="browse-tabs__tab-icon">{tab.icon}</span>
          {tab.label}
          <span className="browse-tabs__tab-count">
            {tab.count.toLocaleString("fr")}
          </span>
        </button>
      ))}
    </nav>
  );
}