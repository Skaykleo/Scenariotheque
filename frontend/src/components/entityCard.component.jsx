/**
 * Carte générique pour Genres, Auteurs et Systèmes de jeu.
 *
 * @param {Object}   props
 * @param {string}   props.name        - Nom de l'entité
 * @param {string}   props.icon        - Emoji ou caractère décoratif
 * @param {string}   props.meta        - Ligne de description courte
 * @param {number}   props.count       - Nombre de scénarios liés
 * @param {string}   props.countLabel  - Label du compteur ("scénario", "publication"…)
 * @param {string}   props.accentColor - Couleur de l'accent supérieur (inline car dynamique)
 * @param {Function} props.onOpen      - Callback pour ouvrir la modal de détail
 */
export default function EntityCard({
  name        = "Fantastique",
  icon        = "🏰",
  meta        = "Magie, créatures, mondes imaginaires",
  count       = 1240,
  countLabel  = "scénario",
  accentColor = "#c9a84c",
  onOpen,
  // Toutes les autres props passées à la modal
  ...rest
}) {
  function handleClick() {
    if (onOpen) onOpen({ name, icon, meta, count, countLabel, accentColor, ...rest });
  }

  return (
    <div
      className="entity-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${name} — ${count} ${countLabel}s`}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClick(); }}
    >
      {/* Bande de couleur en haut — dynamique selon genre */}
      <div
        className="entity-card__accent"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      {/* Icône */}
      <span className="entity-card__icon">{icon}</span>

      {/* Nom */}
      <h3 className="entity-card__name">{name}</h3>

      {/* Méta */}
      <p className="entity-card__meta">{meta}</p>

      {/* Compteur */}
      <span className="entity-card__count">
        {count.toLocaleString("fr")} {countLabel}{count > 1 ? "s" : ""}
      </span>

      {/* Glow au hover */}
      <div className="entity-card__bg-glow" />
    </div>
  );
}