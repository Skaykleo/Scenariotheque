/**
 * @param {Object}   props
 * @param {string}   props.value           - Valeur courante de la recherche
 * @param {Function} props.onChange        - Callback sur changement
 * @param {boolean}  props.filterPanelOpen - État d'ouverture du panneau de filtres (mobile)
 * @param {Function} props.onToggleFilter  - Ouvrir/fermer le panneau (mobile)
 * @param {number}   props.activeFilters   - Nombre de filtres actifs (pour le badge)
 * @param {number}   props.resultCount     - Nombre de résultats à afficher
 */
export default function SearchBar({
  value = "",
  onChange,
  filterPanelOpen = false,
  onToggleFilter,
  activeFilters = 0,
  resultCount = 0,
}) {
  return (
    <div>
      <div className="search-bar">
        {/* Input */}
        <div className="search-bar__input-wrapper">
          <span className="search-bar__icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="search-bar__input"
            placeholder="Rechercher un scénario, un auteur, un système…"
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            aria-label="Rechercher"
          />
          {value && (
            <button
              className="search-bar__clear"
              onClick={() => onChange && onChange("")}
              aria-label="Effacer la recherche"
            >
              ×
            </button>
          )}
        </div>

        {/* Bouton filtres — visible sur mobile uniquement (CSS) */}
        <button
          className={`search-bar__filter-btn${filterPanelOpen ? " search-bar__filter-btn--active" : ""}`}
          onClick={onToggleFilter}
          aria-label="Filtres avancés"
        >
          <FilterIcon />
          Filtres
          {activeFilters > 0 && (
            <span className="search-bar__badge">{activeFilters}</span>
          )}
        </button>
      </div>

      {/* Compteur de résultats */}
      <p className="search-bar__results-count">
        <strong>{resultCount}</strong> scénario{resultCount !== 1 ? "s" : ""} trouvé{resultCount !== 1 ? "s" : ""}
        {value && <> pour « <strong>{value}</strong> »</>}
      </p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}