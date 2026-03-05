import ScenarioCard from "./scenarioCard.component";

const SORT_OPTIONS = [
  { value: "popular",    label: "Popularité" },
  { value: "rating",     label: "Note" },
  { value: "newest",     label: "Plus récent" },
  { value: "oldest",     label: "Plus ancien" },
  { value: "title-asc",  label: "Titre A→Z" },
  { value: "title-desc", label: "Titre Z→A" },
];

/**
 * @param {Object}   props
 * @param {Array}    props.scenarios    - Liste de scénarios filtrés
 * @param {string}   props.sortBy       - Tri courant
 * @param {Function} props.onSortChange
 * @param {string}   props.view         - "grid" | "list"
 * @param {Function} props.onViewChange
 * @param {Function} props.onCardClick  - Callback modal (reçoit les données du scénario)
 */
export default function ScenarioGrid({
  scenarios = [],
  sortBy = "popular",
  onSortChange,
  view = "grid",
  onViewChange,
  onCardClick,
}) {
  return (
    <div>
      {/* Toolbar */}
      <div className="scenario-grid__toolbar">
        {/* Tri */}
        <div className="scenario-grid__sort">
          <span className="scenario-grid__sort-label">Trier par</span>
          <select
            className="scenario-grid__sort-select"
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            aria-label="Trier les résultats"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vue grille / liste */}
        <div className="scenario-grid__view-toggle">
          <button
            className={`scenario-grid__view-btn${view === "grid" ? " scenario-grid__view-btn--active" : ""}`}
            onClick={() => onViewChange && onViewChange("grid")}
            aria-label="Vue grille"
            aria-pressed={view === "grid"}
          >
            <GridIcon />
          </button>
          <button
            className={`scenario-grid__view-btn${view === "list" ? " scenario-grid__view-btn--active" : ""}`}
            onClick={() => onViewChange && onViewChange("list")}
            aria-label="Vue liste"
            aria-pressed={view === "list"}
          >
            <ListIcon />
          </button>
        </div>
      </div>

      {/* Grille ou liste selon le mode */}
      {scenarios.length > 0 ? (
        <div
          className={`scenario-grid${view === "list" ? " scenario-grid--list" : ""}`}
          style={{ marginTop: "16px" }}
        >
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} {...scenario} view={view} onOpen={onCardClick} />
          ))}
        </div>
      ) : (
        <div className="scenario-grid scenario-grid--empty" style={{ marginTop: "16px" }}>
          <div className="scenario-grid__empty">
            <span className="scenario-grid__empty-icon">✦</span>
            <h3 className="scenario-grid__empty-title">Aucun résultat</h3>
            <p className="scenario-grid__empty-text">
              Aucun scénario ne correspond à vos critères de recherche.
              Essayez d'élargir vos filtres.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function GridIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6"  x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6"  x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}