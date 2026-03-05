import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── Données enrichies pour les vues ─────────────────────────

const GENRE_COLORS = {
  "Horreur":         "#8b2a2a",
  "Fantastique":     "#2a5a8b",
  "Science-Fiction": "#1a6b5a",
  "Thriller":        "#5a3a8b",
  "Romance":         "#8b3a5a",
  "Historique":      "#6b5a2a",
  "Mystère":         "#2a4a6b",
};

// Descriptions longues fictives pour les genres
const GENRE_DESCRIPTIONS = {
  "Fantastique":     "Le genre fantastique plonge les joueurs dans des univers où la magie, les créatures mythiques et les lois naturelles tordues ouvrent des horizons infinis. Des épopées héroïques aux intrigues politiques de cour royale, il offre une liberté narrative sans égale.",
  "Horreur":         "Atmosphère pesante, révélations terrifiantes et survie psychologique : l'horreur en jeu de rôle pousse les joueurs dans leurs derniers retranchements. L'enjeu n'est pas toujours de survivre — parfois, comprendre est déjà trop.",
  "Science-Fiction": "Du space opera à la dystopie cyberpunk, la science-fiction explore les conséquences de nos choix technologiques et sociaux projetés dans le futur. Un terrain fertile pour des questionnements éthiques et des aventures galactiques.",
  "Thriller":        "Tension, fausses pistes et retournements de situation : le thriller maintient les joueurs en haleine jusqu'au bout. L'information est une arme, chaque PNJ cache quelque chose, et le temps presse toujours.",
  "Mystère":         "Indices, déductions et vérités enfouies constituent la colonne vertébrale du mystère. Ces scénarios récompensent la curiosité et l'attention au détail, et offrent une satisfaction unique quand les pièces s'assemblent.",
  "Historique":      "S'immerger dans des périodes révolues — Antiquité, Moyen Âge, Belle Époque — pour y vivre des aventures ancrées dans la réalité historique. Le passé devient un décor vivant avec ses propres contraintes et libertés.",
  "Romance":         "Intrigues sentimentales, alliances fragiles et émotions à fleur de peau : la romance au jeu de rôle explore les relations humaines dans toute leur complexité, souvent en filigrane d'une aventure plus grande.",
};

// Biographies fictives pour les auteurs
const AUTHOR_BIOS = {
  "C. Marchand":  "Auteur prolifique spécialisé dans le fantastique politique et les univers médiévaux complexes. Ses scénarios sont reconnus pour leur profondeur narrative et leurs PNJ inoubliables. Il collabore régulièrement avec les éditions Scriptae.",
  "M. Fontaine":  "Passionné de science-fiction dure et de huis-clos psychologiques, M. Fontaine puise son inspiration dans la littérature cyberpunk et les œuvres de Philip K. Dick. Ses scénarios sont souvent salués pour leur tension dramatique.",
  "A. Delacroix": "Spécialiste de l'horreur atmosphérique, A. Delacroix construit ses scénarios autour d'une montée en puissance lente et inexorable. Prix de la meilleure création à Rôle'n'Play 2022.",
  "B. Novak":     "Historien de formation, B. Novak apporte une rigueur documentaire rare à ses scénarios thrillers. Ses récits d'espionnage ont acquis une réputation solide auprès des meneurs chevronnés.",
  "L. Garnier":   "L. Garnier excelle dans les scénarios d'enquête en milieu fermé — île, manoir, station spatiale. Elle signe également des suppléments pour plusieurs jeux officiels.",
  "P. Renaud":    "Créateur de mondes épiques et d'aventures d'exploration, P. Renaud est connu pour ses cartes dessinées à la main incluses dans ses PDF.",
  "E. Blanc":     "Auteur de l'horreur rurale et des folklores régionaux français, E. Blanc transforme des légendes oubliées en expériences de jeu terrifiantes.",
  "D. Perrin":    "Passionné d'histoire médiévale et des croisades, D. Perrin propose des scénarios historiques documentés avec une attention particulière à la morale et aux dilemmes éthiques.",
};

const SYSTEM_DESCRIPTIONS = {
  "D&D 5e":                   "Le système le plus joué au monde. D&D 5e offre une entrée accessible et une richesse de ressources incomparables. Son système de classes et de niveaux encadre bien les scénarios héroïques à longue durée.",
  "L'Appel de Cthulhu":       "Basé sur le BRP (Basic Role-Playing), L'Appel de Cthulhu est le standard du jeu d'horreur investigatif. Son système de santé mentale et ses jets de compétences orientent naturellement vers la découverte et la survie.",
  "Pathfinder 2e":            "Héritier direct de D&D 3.5, Pathfinder 2e propose un système tactique riche avec trois actions par tour. Idéal pour des scénarios longs et des campagnes de fond.",
  "Powered by the Apocalypse": "Famille de jeux narratifs centrés sur la fiction. Les Moves déclenchent des conséquences directes et il n'y a pas d'échec sec — toujours des complications. Parfait pour les récits intenses.",
  "Savage Worlds":            "Un système polyvalent conçu pour le jeu rapide et spectaculaire. Savage Worlds s'adapte à tous les genres grâce à ses suppléments (Deadlands, Rifts, etc.).",
  "GUMSHOE":                  "Système conçu spécifiquement pour les scénarios d'enquête. Les indices ne peuvent jamais être manqués — seule la façon de les utiliser change l'histoire.",
  "Indépendant":              "Scénarios non liés à un système commercial. Ils proposent souvent leurs propres règles légères ou s'adaptent à n'importe quel système au choix du meneur.",
};

// ─── Composant principal ─────────────────────────────────────

/**
 * @param {Object}   props
 * @param {boolean}  props.isOpen   - Modal ouverte ?
 * @param {Function} props.onClose  - Callback de fermeture
 * @param {string}   props.type     - "scenario" | "genre" | "author" | "system"
 * @param {Object}   props.data     - Données de l'entité à afficher
 */
export default function DetailModal({ isOpen, onClose, type, data }) {
  const [closing, setClosing] = useState(false);
  const modalRef = useRef(null);

  // ── Fermeture avec animation sortie ──
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 180);
  }, [onClose]);

  // ── Fermeture sur Escape + trap focus ──
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden"; // bloque le scroll du fond

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  // ── Focus sur la modal à l'ouverture ──
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return createPortal(
    <div
      className={`modal-overlay${closing ? " modal-overlay--closing" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Détail : ${data.title || data.name}`}
    >
      <div
        className={`modal${closing ? " modal--closing" : ""}`}
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Bouton fermeture */}
        <button className="modal__close" onClick={handleClose} aria-label="Fermer">
          ×
        </button>

        {/* Contenu selon le type */}
        {type === "scenario" && <ScenarioView data={data} onClose={handleClose} />}
        {type === "genre"    && <GenreView    data={data} onClose={handleClose} />}
        {type === "author"   && <AuthorView   data={data} onClose={handleClose} />}
        {type === "system"   && <SystemView   data={data} onClose={handleClose} />}
      </div>
    </div>,
    document.body
  );
}


// ─── Vue Scénario ─────────────────────────────────────────────
function ScenarioView({ data, onClose }) {
  const genreColor = GENRE_COLORS[data.genre] || "#5a4a3a";

  const relatedScenarios = [
    { title: "Dans le même genre",     meta: data.genre,       rating: "4.2" },
    { title: "Du même auteur",         meta: `par ${data.author}`, rating: "4.5" },
    { title: "Système similaire",      meta: data.system || "D&D 5e", rating: "4.0" },
  ];

  return (
    <div className="modal__body">
      {/* En-tête */}
      <div className="modal__header">
        <div
          className="modal__header-bg"
          style={{ background: `radial-gradient(ellipse 80% 100% at 0% 50%, ${genreColor}18 0%, transparent 70%)` }}
        />
        {/* Ribbon genre */}
        <div style={{ marginBottom: "14px" }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "'EB Garamond', serif",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,230,204,0.85)",
              backgroundColor: genreColor,
              padding: "4px 12px",
              borderRadius: "2px",
            }}
          >
            {data.genre}
          </span>
        </div>
        <h2 className="modal__header-title">{data.title}</h2>
        <p className="modal__header-sub">par {data.author}</p>
      </div>

      {/* Stats */}
      <div className="modal__stats">
        <div className="modal__stat">
          <span className="modal__stat-value modal__stat-value--gold">
            {data.rating?.toFixed(1) || "—"}
          </span>
          <span className="modal__stat-label">Note</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">{data.pageCount || "—"}</span>
          <span className="modal__stat-label">Pages</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">{data.system || "D&D 5e"}</span>
          <span className="modal__stat-label">Système</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">{data.players || "3–5"}</span>
          <span className="modal__stat-label">Joueurs</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">{data.year || "2023"}</span>
          <span className="modal__stat-label">Année</span>
        </div>
      </div>

      {/* Description */}
      <div className="modal__section">
        <p className="modal__section-title">Synopsis</p>
        <p className="modal__description">
          {data.description ||
            `${data.excerpt} Ce scénario propose une expérience immersive où les choix des joueurs façonnent directement le dénouement. Conçu pour une session unique, il peut également s'intégrer dans une campagne plus longue. Le meneur trouvera dans ces pages des conseils détaillés, des variantes de difficulté et plusieurs fins possibles selon les décisions prises.`}
        </p>
      </div>

      {/* Tags */}
      {data.tags && data.tags.length > 0 && (
        <div className="modal__section">
          <p className="modal__section-title">Mots-clés</p>
          <div className="modal__tags">
            {data.tags.map((tag) => (
              <span key={tag} className="modal__tag">{tag}</span>
            ))}
          </div>
        </div>
      )}

      {/* Infos complémentaires */}
      <div className="modal__section">
        <p className="modal__section-title">Informations</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { label: "Source",   value: data.source   || "Création originale" },
            { label: "Durée",    value: data.duration || "3–4 heures" },
            { label: "Difficulté", value: data.difficulty || "Intermédiaire" },
            { label: "Langue",   value: "Français" },
          ].map((info) => (
            <div key={info.label} style={{ display: "flex", gap: "12px", fontFamily: "'EB Garamond', serif" }}>
              <span style={{ fontSize: "13px", color: "var(--color-text-ghost)", minWidth: "80px" }}>
                {info.label}
              </span>
              <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                {info.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scénarios liés */}
      <div className="modal__section">
        <p className="modal__section-title">Vous pourriez aussi aimer</p>
        <div className="modal__related-grid">
          {relatedScenarios.map((r, i) => (
            <a key={i} href="#" className="modal__related-item" onClick={(e) => e.preventDefault()}>
              <p className="modal__related-item-title">{r.title}</p>
              <span className="modal__related-item-meta">{r.meta}</span>
              <span style={{ color: "var(--color-gold)", fontFamily: "'Playfair Display', serif", fontSize: "13px" }}>
                ★ {r.rating}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="modal__footer">
        <a href="#" className="modal__btn--primary">
          <BookIcon /> Lire le scénario
        </a>
        <button className="modal__btn--secondary">
          <HeartIcon /> Favoris
        </button>
        <button className="modal__btn--secondary">
          <DownloadIcon /> Télécharger
        </button>
        <button className="modal__btn--ghost" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
}


// ─── Vue Genre ────────────────────────────────────────────────
function GenreView({ data, onClose }) {
  const accentColor = data.accentColor || "#c9a84c";
  const description = GENRE_DESCRIPTIONS[data.name] || data.meta;

  const topScenarios = [
    { title: "Le Manoir des Ombres",     meta: "A. Delacroix · 52 p.", rating: "4.7" },
    { title: "La Confrérie du Voile",    meta: "C. Marchand · 66 p.",  rating: "4.2" },
    { title: "La Rivière des Âmes",      meta: "E. Blanc · 49 p.",     rating: "4.6" },
  ];

  return (
    <div className="modal__body">
      {/* En-tête */}
      <div className="modal__header">
        <div
          className="modal__header-bg"
          style={{ background: `radial-gradient(ellipse 60% 120% at 80% 50%, ${accentColor}14 0%, transparent 70%)` }}
        />
        <p className="modal__header-type">
          <span style={{ fontSize: "20px" }}>{data.icon}</span>
          Genre
        </p>
        <h2 className="modal__header-title">{data.name}</h2>
        <p className="modal__header-sub">{data.meta}</p>
      </div>

      {/* Stats */}
      <div className="modal__stats">
        <div className="modal__stat">
          <span className="modal__stat-value modal__stat-value--gold">
            {(data.count || 0).toLocaleString("fr")}
          </span>
          <span className="modal__stat-label">Scénarios</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">42</span>
          <span className="modal__stat-label">Auteurs</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">4.3</span>
          <span className="modal__stat-label">Note moy.</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">8</span>
          <span className="modal__stat-label">Systèmes</span>
        </div>
      </div>

      {/* Description */}
      <div className="modal__section">
        <p className="modal__section-title">À propos du genre</p>
        <p className="modal__description">{description}</p>
      </div>

      {/* Sous-genres */}
      <div className="modal__section">
        <p className="modal__section-title">Sous-genres & thèmes</p>
        <div className="modal__tags">
          {getSubgenres(data.name).map((sg) => (
            <span key={sg} className="modal__tag">{sg}</span>
          ))}
        </div>
      </div>

      {/* Top scénarios */}
      <div className="modal__section">
        <p className="modal__section-title">Scénarios populaires</p>
        <div className="modal__related-grid">
          {topScenarios.map((s, i) => (
            <a key={i} href="#" className="modal__related-item" onClick={(e) => e.preventDefault()}>
              <p className="modal__related-item-title">{s.title}</p>
              <span className="modal__related-item-meta">{s.meta}</span>
              <span style={{ color: "var(--color-gold)", fontFamily: "'Playfair Display', serif", fontSize: "13px" }}>
                ★ {s.rating}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="modal__footer">
        <a href="#" className="modal__btn--primary">
          Explorer {data.name}
        </a>
        <button className="modal__btn--ghost" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}


// ─── Vue Auteur ───────────────────────────────────────────────
function AuthorView({ data, onClose }) {
  const initials = data.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const bio = AUTHOR_BIOS[data.name] || `Auteur prolifique avec ${data.count} publications à la Scénariothèque. Reconnu pour la qualité de ses créations et son investissement dans la communauté.`;

  const publications = [
    { title: "Le Manoir des Ombres",   meta: "Horreur · 52 p.", rating: "4.7" },
    { title: "La Confrérie du Voile",  meta: "Fantastique · 66 p.", rating: "4.2" },
    { title: "L'Athanor de Prométhée", meta: "Fantastique · 63 p.", rating: "3.8" },
  ];

  return (
    <div className="modal__body">
      {/* En-tête */}
      <div className="modal__header">
        <div className="modal__header-bg"
          style={{ background: "radial-gradient(ellipse 50% 100% at 0% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" }}
        />
        <div className="modal__author-avatar">{initials}</div>
        <p className="modal__header-type">✍️ Auteur</p>
        <h2 className="modal__header-title">{data.name}</h2>
        <p className="modal__header-sub">{data.meta}</p>
      </div>

      {/* Stats */}
      <div className="modal__stats">
        <div className="modal__stat">
          <span className="modal__stat-value modal__stat-value--gold">{data.count}</span>
          <span className="modal__stat-label">Publications</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">4.3</span>
          <span className="modal__stat-label">Note moy.</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">2018</span>
          <span className="modal__stat-label">Membre depuis</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">3</span>
          <span className="modal__stat-label">Genres</span>
        </div>
      </div>

      {/* Bio */}
      <div className="modal__section">
        <p className="modal__section-title">Biographie</p>
        <p className="modal__description">{bio}</p>
      </div>

      {/* Spécialités */}
      <div className="modal__section">
        <p className="modal__section-title">Genres de prédilection</p>
        <div className="modal__tags">
          {data.meta.split(", ").map((genre) => (
            <span key={genre} className="modal__tag">{genre}</span>
          ))}
          <span className="modal__tag">Narration</span>
          <span className="modal__tag">Univers détaillés</span>
        </div>
      </div>

      {/* Publications récentes */}
      <div className="modal__section">
        <p className="modal__section-title">Publications récentes</p>
        <div className="modal__related-grid">
          {publications.map((p, i) => (
            <a key={i} href="#" className="modal__related-item" onClick={(e) => e.preventDefault()}>
              <p className="modal__related-item-title">{p.title}</p>
              <span className="modal__related-item-meta">{p.meta}</span>
              <span style={{ color: "var(--color-gold)", fontFamily: "'Playfair Display', serif", fontSize: "13px" }}>
                ★ {p.rating}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="modal__footer">
        <a href="#" className="modal__btn--primary">
          Voir toutes les publications
        </a>
        <button className="modal__btn--secondary">
          Suivre l'auteur
        </button>
        <button className="modal__btn--ghost" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}


// ─── Vue Système ──────────────────────────────────────────────
function SystemView({ data, onClose }) {
  const accentColor = data.accentColor || "#c9a84c";
  const description = SYSTEM_DESCRIPTIONS[data.name] || data.meta;

  const topScenarios = [
    { title: "Éclipse sur Kaïros",       meta: "M. Fontaine · 38 p.", rating: "4.5" },
    { title: "Protocole Mnémos",         meta: "A. Lefort · 34 p.",   rating: "4.4" },
    { title: "Station Terminus",         meta: "M. Fontaine · 29 p.", rating: "4.2" },
  ];

  const compatibleGenres = ["Fantastique", "Horreur", "Science-Fiction", "Thriller"];

  return (
    <div className="modal__body">
      {/* En-tête */}
      <div className="modal__header">
        <div
          className="modal__header-bg"
          style={{ background: `radial-gradient(ellipse 60% 120% at 80% 50%, ${accentColor}14 0%, transparent 70%)` }}
        />
        <p className="modal__header-type">
          <span style={{ fontSize: "20px" }}>{data.icon}</span>
          Système de jeu
        </p>
        <h2 className="modal__header-title">{data.name}</h2>
        <p className="modal__header-sub">{data.meta}</p>
      </div>

      {/* Stats */}
      <div className="modal__stats">
        <div className="modal__stat">
          <span className="modal__stat-value modal__stat-value--gold">
            {(data.count || 0).toLocaleString("fr")}
          </span>
          <span className="modal__stat-label">Scénarios</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">38</span>
          <span className="modal__stat-label">Auteurs</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">4.4</span>
          <span className="modal__stat-label">Note moy.</span>
        </div>
        <div className="modal__stat">
          <span className="modal__stat-value">{compatibleGenres.length}</span>
          <span className="modal__stat-label">Genres</span>
        </div>
      </div>

      {/* Description */}
      <div className="modal__section">
        <p className="modal__section-title">Présentation du système</p>
        <p className="modal__description">{description}</p>
      </div>

      {/* Genres couverts */}
      <div className="modal__section">
        <p className="modal__section-title">Genres compatibles</p>
        <div className="modal__tags">
          {compatibleGenres.map((g) => (
            <span key={g} className="modal__tag">{g}</span>
          ))}
        </div>
      </div>

      {/* Top scénarios */}
      <div className="modal__section">
        <p className="modal__section-title">Scénarios populaires pour ce système</p>
        <div className="modal__related-grid">
          {topScenarios.map((s, i) => (
            <a key={i} href="#" className="modal__related-item" onClick={(e) => e.preventDefault()}>
              <p className="modal__related-item-title">{s.title}</p>
              <span className="modal__related-item-meta">{s.meta}</span>
              <span style={{ color: "var(--color-gold)", fontFamily: "'Playfair Display', serif", fontSize: "13px" }}>
                ★ {s.rating}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="modal__footer">
        <a href="#" className="modal__btn--primary">
          Filtrer par {data.name}
        </a>
        <button className="modal__btn--ghost" onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}


// ─── Helpers ──────────────────────────────────────────────────
function getSubgenres(genre) {
  const map = {
    "Fantastique":      ["Heroic Fantasy", "Dark Fantasy", "Magie & Sorts", "Épique", "Politique", "Fairy Tale"],
    "Horreur":          ["Cosmic Horror", "Survival", "Psychologique", "Folklore", "Gore", "Investigation"],
    "Science-Fiction":  ["Space Opera", "Cyberpunk", "Post-Apo", "Hard SF", "Solarpunk", "Biopunk"],
    "Thriller":         ["Espionnage", "Policier", "Paranoïa", "Politique", "Survie urbaine"],
    "Mystère":          ["Whodunit", "Investigation", "Occulte", "Conspiration", "Cold Case"],
    "Historique":       ["Antiquité", "Médiéval", "Renaissance", "XVIIIe", "Belle Époque", "WWII"],
    "Romance":          ["Intrigue de cour", "Amour impossible", "Rivalités", "Epistolaire"],
  };
  return map[genre] || ["Aventure", "Exploration", "Intrigues"];
}

// ─── Icônes ───────────────────────────────────────────────────
function BookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}