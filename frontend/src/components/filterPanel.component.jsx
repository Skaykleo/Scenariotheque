import { useState } from "react";

// ─── Données de référence ────────────────────────────────────
const GENRES = [
  { id: "fantastique",     label: "Fantastique",     count: 1240 },
  { id: "horreur",         label: "Horreur",          count: 873 },
  { id: "science-fiction", label: "Science-Fiction",  count: 652 },
  { id: "thriller",        label: "Thriller",         count: 521 },
  { id: "mystere",         label: "Mystère",          count: 418 },
  { id: "historique",      label: "Historique",       count: 314 },
  { id: "romance",         label: "Romance",          count: 182 },
];

const SYSTEMS = [
  { id: "dnd5e",        label: "D&D 5e",              count: 892 },
  { id: "coc",          label: "L'Appel de Cthulhu",  count: 634 },
  { id: "pathfinder2",  label: "Pathfinder 2e",       count: 445 },
  { id: "powered",      label: "Powered by the Apocalypse", count: 310 },
  { id: "savage",       label: "Savage Worlds",       count: 287 },
  { id: "gumshoe",      label: "GUMSHOE",             count: 201 },
  { id: "systemless",   label: "Indépendant",         count: 533 },
];

const SOURCES = [
  { id: "casus",    label: "Casus Belli",      count: 428 },
  { id: "jdr",      label: "Revue JDR Mag",    count: 312 },
  { id: "jeux",     label: "Jeux Désirés",     count: 194 },
  { id: "original", label: "Création originale", count: 2654 },
  { id: "scenario", label: "Scénario officiel", count: 614 },
];

const YEAR_OPTIONS = [
  "Toutes", "Avant 2000", "2000–2009", "2010–2014",
  "2015–2019", "2020–2022", "2023–2024", "2025",
];

const PLAYER_COUNTS = [
  { id: "solo",   label: "Solo" },
  { id: "2-3",    label: "2–3 joueurs" },
  { id: "4-6",    label: "4–6 joueurs" },
  { id: "7+",     label: "7+ joueurs" },
];

// ─── Composant principal ─────────────────────────────────────
/**
 * @param {Object}   props
 * @param {Object}   props.filters         - État courant des filtres
 * @param {Function} props.onFilterChange  - Callback (key, value)
 * @param {Function} props.onReset         - Réinitialiser tous les filtres
 * @param {boolean}  props.mobileOpen      - Panneau ouvert sur mobile
 */
export default function FilterPanel({
  filters = {},
  onFilterChange,
  onReset,
  mobileOpen = false,
}) {
  return (
    <aside className={`filter-panel${mobileOpen ? " filter-panel--mobile-open" : ""}`}>
      {/* En-tête */}
      <div className="filter-panel__header">
        <h3 className="filter-panel__title">Filtres</h3>
        <button className="filter-panel__reset" onClick={onReset}>
          Tout réinitialiser
        </button>
      </div>

      {/* Tags actifs */}
      <ActiveTags filters={filters} onFilterChange={onFilterChange} />

      {/* Sections */}
      <FilterSection title="Genre" defaultOpen>
        {GENRES.map((g) => (
          <CheckboxItem
            key={g.id}
            id={`genre-${g.id}`}
            label={g.label}
            count={g.count}
            checked={!!filters.genres?.[g.id]}
            onChange={(v) => onFilterChange("genres", { ...filters.genres, [g.id]: v })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Système de jeu" defaultOpen>
        {SYSTEMS.map((s) => (
          <CheckboxItem
            key={s.id}
            id={`system-${s.id}`}
            label={s.label}
            count={s.count}
            checked={!!filters.systems?.[s.id]}
            onChange={(v) => onFilterChange("systems", { ...filters.systems, [s.id]: v })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Source de parution">
        {SOURCES.map((src) => (
          <CheckboxItem
            key={src.id}
            id={`source-${src.id}`}
            label={src.label}
            count={src.count}
            checked={!!filters.sources?.[src.id]}
            onChange={(v) => onFilterChange("sources", { ...filters.sources, [src.id]: v })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Année de publication">
        <select
          className="filter-select"
          value={filters.year || "Toutes"}
          onChange={(e) => onFilterChange("year", e.target.value)}
          aria-label="Année de publication"
        >
          {YEAR_OPTIONS.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </FilterSection>

      <FilterSection title="Nombre de joueurs">
        {PLAYER_COUNTS.map((p) => (
          <CheckboxItem
            key={p.id}
            id={`players-${p.id}`}
            label={p.label}
            checked={!!filters.players?.[p.id]}
            onChange={(v) => onFilterChange("players", { ...filters.players, [p.id]: v })}
          />
        ))}
      </FilterSection>

      <FilterSection title="Durée estimée">
        <select
          className="filter-select"
          value={filters.duration || ""}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          aria-label="Durée estimée"
        >
          <option value="">Toutes durées</option>
          <option value="short">Courte (1–2h)</option>
          <option value="medium">Moyenne (3–5h)</option>
          <option value="long">Longue (6h+)</option>
          <option value="campaign">Campagne</option>
        </select>
      </FilterSection>

      <FilterSection title="Note minimale">
        <select
          className="filter-select"
          value={filters.minRating || ""}
          onChange={(e) => onFilterChange("minRating", e.target.value)}
          aria-label="Note minimale"
        >
          <option value="">Toutes notes</option>
          <option value="3">3+ ★</option>
          <option value="3.5">3.5+ ★</option>
          <option value="4">4+ ★</option>
          <option value="4.5">4.5+ ★</option>
        </select>
      </FilterSection>
    </aside>
  );
}

// ─── Sous-composants internes ─────────────────────────────────

function FilterSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="filter-section">
      <button
        className="filter-section__toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="filter-section__label">{title}</span>
        <span className={`filter-section__chevron${open ? " filter-section__chevron--open" : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <div className="filter-section__body">
          {children}
        </div>
      )}
    </div>
  );
}

function CheckboxItem({ id, label, count, checked, onChange }) {
  return (
    <label className="filter-checkbox" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        className="filter-checkbox__input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="filter-checkbox__label">{label}</span>
      {count !== undefined && (
        <span className="filter-checkbox__count">{count.toLocaleString("fr")}</span>
      )}
    </label>
  );
}

function ActiveTags({ filters, onFilterChange }) {
  const tags = [];

  // Genres actifs
  Object.entries(filters.genres || {}).forEach(([id, active]) => {
    if (active) {
      const g = GENRES.find((x) => x.id === id);
      if (g) tags.push({ key: "genre", id, label: g.label });
    }
  });

  // Systèmes actifs
  Object.entries(filters.systems || {}).forEach(([id, active]) => {
    if (active) {
      const s = SYSTEMS.find((x) => x.id === id);
      if (s) tags.push({ key: "system", id, label: s.label });
    }
  });

  // Source
  Object.entries(filters.sources || {}).forEach(([id, active]) => {
    if (active) {
      const s = SOURCES.find((x) => x.id === id);
      if (s) tags.push({ key: "source", id, label: s.label });
    }
  });

  // Année
  if (filters.year && filters.year !== "Toutes") {
    tags.push({ key: "year", id: "year", label: filters.year });
  }

  if (tags.length === 0) return null;

  function removeTag(tag) {
    if (tag.key === "genre") {
      onFilterChange("genres", { ...filters.genres, [tag.id]: false });
    } else if (tag.key === "system") {
      onFilterChange("systems", { ...filters.systems, [tag.id]: false });
    } else if (tag.key === "source") {
      onFilterChange("sources", { ...filters.sources, [tag.id]: false });
    } else if (tag.key === "year") {
      onFilterChange("year", "Toutes");
    }
  }

  return (
    <div className="filter-panel__active-tags">
      {tags.map((tag) => (
        <span key={`${tag.key}-${tag.id}`} className="filter-panel__active-tag">
          {tag.label}
          <button onClick={() => removeTag(tag)} aria-label={`Supprimer le filtre ${tag.label}`}>
            ×
          </button>
        </span>
      ))}
    </div>
  );
}