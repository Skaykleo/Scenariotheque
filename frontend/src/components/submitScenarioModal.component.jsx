import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import ScenarioCard from "./scenarioCard.component";

// ─── Référentiels ─────────────────────────────────────────────

const GENRES = [
  { id: "fantastique",     label: "Fantastique",          icon: "🏰" },
  { id: "horreur",         label: "Horreur",              icon: "💀" },
  { id: "science-fiction", label: "Science-Fiction",      icon: "🚀" },
  { id: "thriller",        label: "Thriller",             icon: "🔍" },
  { id: "mystere",         label: "Mystère",              icon: "🕯️" },
  { id: "historique",      label: "Historique",           icon: "⚔️" },
  { id: "romance",         label: "Romance",              icon: "🌹" },
  { id: "post-apo",        label: "Post-Apocalyptique",   icon: "☢️" },
  { id: "contemporain",    label: "Contemporain",         icon: "🌆" },
  { id: "western",         label: "Western",              icon: "🤠" },
];

const SYSTEMS = [
  { id: "dnd5e",    label: "D&D 5e",                    icon: "🐉" },
  { id: "coc",      label: "L'Appel de Cthulhu",         icon: "🐙" },
  { id: "pf2e",     label: "Pathfinder 2e",              icon: "⚔️" },
  { id: "pbta",     label: "Powered by the Apocalypse",  icon: "📖" },
  { id: "savage",   label: "Savage Worlds",              icon: "🌪️" },
  { id: "gumshoe",  label: "GUMSHOE",                    icon: "🔎" },
  { id: "gurps",    label: "GURPS",                      icon: "📐" },
  { id: "wod",      label: "World of Darkness",          icon: "🌑" },
  { id: "sr",       label: "Shadowrun",                  icon: "🤖" },
  { id: "free",     label: "Indépendant / Systemless",   icon: "✦" },
];

const SOURCES = [
  "Création originale",
  "Casus Belli",
  "Jeux Désirés",
  "Revue JDR Mag",
  "Scénario officiel éditeur",
  "Fanzine",
  "Autre",
];

const DURATIONS = [
  { value: "short",    label: "Courte (1–2h)" },
  { value: "medium",   label: "Moyenne (3–5h)" },
  { value: "long",     label: "Longue (6–10h)" },
  { value: "campaign", label: "Campagne (multi-sessions)" },
];

const DIFFICULTIES = [
  { value: "debutant",      label: "Débutant" },
  { value: "intermediaire", label: "Intermédiaire" },
  { value: "experimente",   label: "Expérimenté" },
  { value: "expert",        label: "Expert" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1979 }, (_, i) => CURRENT_YEAR - i);

const STEPS = [
  { number: 1, label: "Informations" },
  { number: 2, label: "Classification" },
  { number: 3, label: "Fichier & aperçu" },
];

// ─── État initial ─────────────────────────────────────────────
const INITIAL_FORM = {
  // Étape 1
  title:       "",
  synopsis:    "",
  authors:     [],           // string[]

  // Étape 2
  genres:      [],           // string[] (ids)
  systems:     [],           // string[] (ids)
  tags:        [],           // string[]
  players_min: "",
  players_max: "",
  duration:    "",
  difficulty:  "",
  source:      "Création originale",
  source_url:  "",
  year:        String(CURRENT_YEAR),
  language:    "Français",

  // Étape 3
  file:        null,
};

// ─── Composant principal ──────────────────────────────────────

/**
 * @param {Object}   props
 * @param {boolean}  props.isOpen   - Modal ouverte ?
 * @param {Function} props.onClose  - Callback de fermeture
 * @param {Function} props.onSubmit - Callback de soumission (reçoit formData)
 */
export default function SubmitScenarioModal({ isOpen, onClose, onSubmit }) {
  const [step,     setStep]     = useState(1);
  const [form,     setForm]     = useState(INITIAL_FORM);
  const [errors,   setErrors]   = useState({});
  const [closing,  setClosing]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef(null);

  // ── Fermeture avec animation ──
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setStep(1);
      setForm(INITIAL_FORM);
      setErrors({});
      setSuccess(false);
      onClose();
    }, 180);
  }, [onClose]);

  // ── Escape + verrouillage scroll ──
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  // ── Focus ──
  useEffect(() => {
    if (isOpen && modalRef.current) modalRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  // ── Helpers formulaire ──
  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  }

  function toggleArray(key, id) {
    setForm((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id],
      };
    });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: null }));
  }

  // ── Validation par étape ──
  function validate(targetStep) {
    const errs = {};

    if (targetStep === 1) {
      if (!form.title.trim())       errs.title    = "Le titre est obligatoire.";
      if (form.title.length > 120)  errs.title    = "120 caractères maximum.";
      if (!form.synopsis.trim())    errs.synopsis  = "Le synopsis est obligatoire.";
      if (form.synopsis.length > 1200) errs.synopsis = "1 200 caractères maximum.";
      if (form.authors.length === 0) errs.authors  = "Ajoutez au moins un auteur.";
    }

    if (targetStep === 2) {
      if (form.genres.length === 0)  errs.genres  = "Sélectionnez au moins un genre.";
      if (form.systems.length === 0) errs.systems = "Sélectionnez au moins un système.";
      if (form.duration === "")      errs.duration = "Indiquez une durée.";

      // URL optionnelle mais doit être valide si renseignée
      if (form.source_url.trim()) {
        try {
          new URL(form.source_url.trim());
        } catch {
          errs.source_url = "L'URL n'est pas valide (ex. : https://exemple.com).";
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validate(step)) setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  // ── Soumission ──
  async function handleSubmit() {
    if (!validate(3)) return;
    setSubmitting(true);
    try {
      // Appel à l'API (ou callback parent)
      const payload = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "file" && v) { payload.append("file", v); return; }
        if (Array.isArray(v))  { v.forEach((item) => payload.append(`${k}[]`, item)); return; }
        payload.append(k, v ?? "");
      });

      if (onSubmit) await onSubmit(payload);
      else await new Promise((r) => setTimeout(r, 1200)); // simulation

      setSuccess(true);
    } catch (e) {
      setErrors({ global: "Une erreur est survenue. Veuillez réessayer." });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Calcul de la progression ──
  const progressPct = success ? 100 : ((step - 1) / STEPS.length) * 100 + (100 / STEPS.length) * 0.6;

  // ── Données pour la carte de prévisualisation ──
  const previewGenreLabel = GENRES.find((g) => g.id === form.genres[0])?.label || "Genre";
  const previewCard = {
    title:     form.title     || "Titre du scénario",
    genre:     previewGenreLabel,
    author:    form.authors[0] || "Auteur",
    excerpt:   form.synopsis  || "Synopsis du scénario…",
    tags:      form.tags.slice(0, 3).length > 0 ? form.tags.slice(0, 3) : ["tag"],
    rating:    0,
    pageCount: 0,
    featured:  false,
  };

  return createPortal(
    <div
      className={`modal-overlay${closing ? " modal-overlay--closing" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Soumettre un scénario"
    >
      <div
        className={`modal modal--submit${closing ? " modal--closing" : ""}`}
        ref={modalRef}
        tabIndex={-1}
      >
        {/* Bouton fermeture */}
        {

        }
        <button className="modal__close" onClick={handleClose} aria-label="Fermer">×</button>

        {/* Barre de progression */}
        <div className="submit-progress">
          <div className="submit-progress__bar" style={{ width: `${progressPct}%` }} />
        </div>

        {/* Stepper */}
        {!success && (
          <Stepper currentStep={step} steps={STEPS} />
        )}

        {/* ── Contenu ── */}
        {success ? (
          <SuccessView onClose={handleClose} />
        ) : (
          <>
            <div className="modal__body">
              {step === 1 && (
                <Step1
                  form={form} set={set}
                  errors={errors}
                />
              )}
              {step === 2 && (
                <Step2
                  form={form} set={set}
                  toggleArray={toggleArray}
                  errors={errors}
                />
              )}
              {step === 3 && (
                <Step3
                  form={form} set={set}
                  errors={errors}
                  previewCard={previewCard}
                />
              )}
            </div>

            {/* Footer navigation */}
            <div className="submit-footer">
              <div className="submit-footer__left">
                {errors.global && (
                  <span style={{ color: "#c9504c", fontSize: "13px" }}>
                    ⚠ {errors.global}
                  </span>
                )}
                {step === 3 && !form.file && (
                  <span style={{ fontStyle: "italic" }}>Le fichier PDF est optionnel</span>
                )}
              </div>

              <div className="submit-footer__right">
                {step > 1 && (
                  <button className="modal__btn--secondary" onClick={handleBack}>
                    ← Retour
                  </button>
                )}
                {step < 3 ? (
                  <button className="modal__btn--primary" onClick={handleNext}>
                    Continuer →
                  </button>
                ) : (
                  <button
                    className="modal__btn--primary"
                    onClick={handleSubmit}
                    disabled={submitting}
                    style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? "wait" : "pointer" }}
                  >
                    {submitting ? "Envoi en cours…" : "✦ Soumettre le scénario"}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}


// ─── Stepper ─────────────────────────────────────────────────
function Stepper({ currentStep, steps }) {
  return (
    <div className="submit-stepper">
      {steps.map((s, i) => {
        const done   = currentStep > s.number;
        const active = currentStep === s.number;
        return (
          <div key={s.number} className="submit-stepper__step">
            <div className={`submit-stepper__bubble${active ? " submit-stepper__bubble--active" : done ? " submit-stepper__bubble--done" : ""}`}>
              {done ? "✓" : s.number}
            </div>
            <span className={`submit-stepper__label${active ? " submit-stepper__label--active" : done ? " submit-stepper__label--done" : ""}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div className={`submit-stepper__connector${done ? " submit-stepper__connector--done" : ""}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}


// ─── Étape 1 — Informations de base ──────────────────────────
function Step1({ form, set, errors }) {
  const SYNOPSIS_MAX = 1200;
  const synopsisLen  = form.synopsis.length;
  const synopsisOver = synopsisLen > SYNOPSIS_MAX;

  return (
    <div className="submit-form">
      {/* Titre */}
      <div className="submit-field">
        <label className="submit-field__label" htmlFor="submit-title">
          Titre du scénario
          <span className="submit-field__required">*</span>
        </label>
        <input
          id="submit-title"
          type="text"
          className={`submit-input${errors.title ? " submit-input--error" : ""}`}
          placeholder="Ex. : Le Manoir des Ombres"
          value={form.title}
          maxLength={120}
          onChange={(e) => set("title", e.target.value)}
          autoFocus
        />
        <div className="submit-field__char-count">
          {form.title.length} / 120
        </div>
        {errors.title && <p className="submit-field__error">⚠ {errors.title}</p>}
      </div>

      {/* Synopsis */}
      <div className="submit-field">
        <label className="submit-field__label" htmlFor="submit-synopsis">
          Synopsis
          <span className="submit-field__required">*</span>
        </label>
        <textarea
          id="submit-synopsis"
          className={`submit-textarea${errors.synopsis ? " submit-textarea--error" : ""}`}
          placeholder="Décrivez l'univers, l'intrigue principale et l'ambiance générale de votre scénario…"
          value={form.synopsis}
          onChange={(e) => set("synopsis", e.target.value)}
          style={{ minHeight: "130px" }}
        />
        <div className={`submit-field__char-count${synopsisOver ? " submit-field__char-count--over" : synopsisLen > 1000 ? " submit-field__char-count--warn" : ""}`}>
          {synopsisLen.toLocaleString("fr")} / {SYNOPSIS_MAX.toLocaleString("fr")}
        </div>
        {errors.synopsis && <p className="submit-field__error">⚠ {errors.synopsis}</p>}
      </div>

      {/* Auteurs */}
      <div className="submit-field">
        <label className="submit-field__label">
          Auteur(s)
          <span className="submit-field__required">*</span>
        </label>
        <TagInput
          tags={form.authors}
          onChange={(tags) => set("authors", tags)}
          placeholder="Prénom Nom — Entrée pour valider"
          hasError={!!errors.authors}
        />
        <p className="submit-field__hint">
          Plusieurs auteurs ? Tapez chaque nom et appuyez sur Entrée ou virgule.
        </p>
        {errors.authors && <p className="submit-field__error">⚠ {errors.authors}</p>}
      </div>
    </div>
  );
}


// ─── Étape 2 — Classification ─────────────────────────────────
function Step2({ form, set, toggleArray, errors }) {
  return (
    <div className="submit-form">

      {/* Genres */}
      <div className="submit-field">
        <label className="submit-field__label">
          Genre(s)
          <span className="submit-field__required">*</span>
        </label>
        <div className="chip-group">
          {GENRES.map((g) => (
            <button
              key={g.id}
              type="button"
              className={`chip${form.genres.includes(g.id) ? " chip--selected" : ""}`}
              onClick={() => toggleArray("genres", g.id)}
              aria-pressed={form.genres.includes(g.id)}
            >
              <span className="chip__icon">{g.icon}</span>
              {g.label}
            </button>
          ))}
        </div>
        <p className="submit-field__hint">Plusieurs genres possibles.</p>
        {errors.genres && <p className="submit-field__error">⚠ {errors.genres}</p>}
      </div>

      {/* Systèmes */}
      <div className="submit-field">
        <label className="submit-field__label">
          Système(s) de jeu
          <span className="submit-field__required">*</span>
        </label>
        <div className="chip-group">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`chip${form.systems.includes(s.id) ? " chip--selected" : ""}`}
              onClick={() => toggleArray("systems", s.id)}
              aria-pressed={form.systems.includes(s.id)}
            >
              <span className="chip__icon">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
        <p className="submit-field__hint">Compatibilité avec plusieurs systèmes ? Cochez-les tous.</p>
        {errors.systems && <p className="submit-field__error">⚠ {errors.systems}</p>}
      </div>

      {/* Tags libres */}
      <div className="submit-field">
        <label className="submit-field__label">Mots-clés / Tags</label>
        <TagInput
          tags={form.tags}
          onChange={(tags) => set("tags", tags)}
          placeholder="investigatif, huis-clos, gothique…"
        />
        <p className="submit-field__hint">
          Aidez les lecteurs à trouver votre scénario. Entrée ou virgule pour valider.
        </p>
      </div>

      {/* Durée + Difficulté */}
      <div className="submit-form__row">
        <div className="submit-field">
          <label className="submit-field__label" htmlFor="submit-duration">
            Durée estimée
            <span className="submit-field__required">*</span>
          </label>
          <select
            id="submit-duration"
            className={`submit-select${errors.duration ? " submit-input--error" : ""}`}
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
          >
            <option value="">— Sélectionner —</option>
            {DURATIONS.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
          {errors.duration && <p className="submit-field__error">⚠ {errors.duration}</p>}
        </div>

        <div className="submit-field">
          <label className="submit-field__label" htmlFor="submit-difficulty">Difficulté</label>
          <select
            id="submit-difficulty"
            className="submit-select"
            value={form.difficulty}
            onChange={(e) => set("difficulty", e.target.value)}
          >
            <option value="">— Sélectionner —</option>
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Joueurs min/max */}
      <div className="submit-field">
        <label className="submit-field__label">Nombre de joueurs</label>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", maxWidth: "200px" }}>
          <input
            type="number"
            className="submit-input"
            placeholder="Min"
            min={1} max={20}
            value={form.players_min}
            onChange={(e) => set("players_min", e.target.value)}
            style={{ textAlign: "center" }}
          />
          <span style={{ color: "var(--color-text-ghost)", fontFamily: "'EB Garamond', serif", flexShrink: 0 }}>
            à
          </span>
          <input
            type="number"
            className="submit-input"
            placeholder="Max"
            min={1} max={20}
            value={form.players_max}
            onChange={(e) => set("players_max", e.target.value)}
            style={{ textAlign: "center" }}
          />
        </div>
        <p className="submit-field__hint">Laissez vide si non applicable.</p>
      </div>

      {/* Source + Année */}
      <div className="submit-form__row">
        <div className="submit-field">
          <label className="submit-field__label" htmlFor="submit-source">Source de parution</label>
          <select
            id="submit-source"
            className="submit-select"
            value={form.source}
            onChange={(e) => set("source", e.target.value)}
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="submit-field">
          <label className="submit-field__label" htmlFor="submit-year">Année de publication</label>
          <select
            id="submit-year"
            className="submit-select"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* URL de la source — toujours visible, optionnel */}
      <div className="submit-field">
        <label className="submit-field__label" htmlFor="submit-source-url">
          Lien vers la source
        </label>
        <div style={{ position: "relative" }}>
          {/* Icône chaîne */}
          <span style={{
            position: "absolute",
            left: "13px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "var(--color-text-ghost)",
            fontSize: "14px",
            lineHeight: 1,
          }}>
            🔗
          </span>
          <input
            id="submit-source-url"
            type="url"
            className={`submit-input${errors.source_url ? " submit-input--error" : ""}`}
            placeholder="https://exemple.com/mon-scenario"
            value={form.source_url}
            onChange={(e) => set("source_url", e.target.value)}
            style={{ paddingLeft: "36px" }}
          />
        </div>
        <p className="submit-field__hint">
          Optionnel — page de la revue, fiche officielle, itch.io, etc.
        </p>
        {errors.source_url && (
          <p className="submit-field__error">⚠ {errors.source_url}</p>
        )}
      </div>

    </div>
  );
}


// ─── Étape 3 — Fichier & aperçu ──────────────────────────────
function Step3({ form, set, errors, previewCard }) {
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file) {
    if (!file) return;
    const allowed = ["application/pdf", "application/zip", "application/x-zip-compressed"];
    if (!allowed.includes(file.type) && !file.name.endsWith(".pdf") && !file.name.endsWith(".zip")) {
      set("file", null);
      return;
    }
    set("file", file);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} o`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }

  // Sélection des labels pour l'affichage récap
  const selectedGenres  = form.genres.map((id) => GENRES.find((g) => g.id === id)?.label).filter(Boolean);
  const selectedSystems = form.systems.map((id) => SYSTEMS.find((s) => s.id === id)?.label).filter(Boolean);

  return (
    <div className="submit-preview">

      {/* Upload */}
      <div>
        <p className="submit-preview__label">Fichier du scénario</p>

        {form.file ? (
          <div className="file-preview">
            <span className="file-preview__icon">📄</span>
            <div className="file-preview__info">
              <p className="file-preview__name">{form.file.name}</p>
              <p className="file-preview__size">{formatSize(form.file.size)}</p>
            </div>
            <button
              className="file-preview__remove"
              onClick={() => set("file", null)}
              aria-label="Supprimer le fichier"
            >
              ×
            </button>
          </div>
        ) : (
          <div
            className={`file-upload${dragOver ? " file-upload--dragover" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          >
            <input
              className="file-upload__input"
              type="file"
              accept=".pdf,.zip"
              onChange={(e) => handleFile(e.target.files[0])}
              aria-label="Choisir un fichier"
            />
            <span className="file-upload__icon">📁</span>
            <p className="file-upload__title">
              Glissez votre fichier ici, ou <span style={{ color: "var(--color-gold)", textDecoration: "underline" }}>parcourir</span>
            </p>
            <p className="file-upload__sub">PDF ou ZIP — 30 Mo maximum. Optionnel.</p>
          </div>
        )}
      </div>

      {/* Aperçu de la carte */}
      <div>
        <p className="submit-preview__label">Aperçu de la carte</p>
        <div className="submit-preview__card-wrap">
          <ScenarioCard {...previewCard} />
        </div>
      </div>

      {/* Récapitulatif */}
      <div>
        <p className="submit-preview__label">Récapitulatif</p>
        <div className="submit-recap">
          <RecapItem k="Titre"       v={form.title} />
          <RecapItem k="Auteur(s)"   v={form.authors.join(", ")} />
          <RecapItem k="Genre(s)"    v={selectedGenres.join(", ")} />
          <RecapItem k="Système(s)"  v={selectedSystems.join(", ")} />
          <RecapItem k="Durée"       v={DURATIONS.find((d) => d.value === form.duration)?.label} />
          <RecapItem k="Difficulté"  v={DIFFICULTIES.find((d) => d.value === form.difficulty)?.label} />
          <RecapItem k="Joueurs"     v={form.players_min && form.players_max ? `${form.players_min}–${form.players_max}` : form.players_min || form.players_max || null} />
          <RecapItem k="Source"      v={form.source} />
          {form.source_url && (
            <RecapItem k="Lien source" v={form.source_url} />
          )}
          <RecapItem k="Année"       v={form.year} />
          <RecapItem k="Langue"      v={form.language} />
          {form.tags.length > 0 && (
            <RecapItem k="Tags" v={form.tags.join(", ")} />
          )}
          <RecapItem k="Fichier"     v={form.file?.name} />
        </div>
      </div>

      {/* Avertissement CGU */}
      <p style={{
        fontFamily: "'EB Garamond', serif",
        fontSize: "13px",
        color: "var(--color-text-ghost)",
        fontStyle: "italic",
        margin: 0,
        lineHeight: 1.6,
      }}>
        En soumettant ce scénario, vous confirmez en être l'auteur ou avoir les droits nécessaires,
        et acceptez les{" "}
        <a href="#" style={{ color: "var(--color-gold)" }}>conditions générales de contribution</a>
        {" "}de la Scénariothèque.
      </p>
    </div>
  );
}

function RecapItem({ k, v }) {
  const empty = !v;
  return (
    <div className="submit-recap__item">
      <span className="submit-recap__key">{k}</span>
      <span className={`submit-recap__value${empty ? " submit-recap__value--empty" : ""}`}>
        {empty ? "Non renseigné" : v}
      </span>
    </div>
  );
}


// ─── Succès ───────────────────────────────────────────────────
function SuccessView({ onClose }) {
  return (
    <div className="submit-success">
      <span className="submit-success__icon">✦</span>
      <h2 className="submit-success__title">Scénario soumis !</h2>
      <p className="submit-success__sub">
        Merci pour votre contribution. Votre scénario est en cours de relecture
        par l'équipe éditoriale. Vous recevrez une notification dès sa publication.
      </p>
      <button className="modal__btn--primary" onClick={onClose} style={{ marginTop: "8px" }}>
        Retour à la bibliothèque
      </button>
    </div>
  );
}


// ─── TagInput ─────────────────────────────────────────────────
/**
 * Champ de saisie multi-valeurs (Entrée ou virgule pour valider).
 */
function TagInput({ tags, onChange, placeholder, hasError }) {
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef(null);

  function addTag(raw) {
    const val = raw.trim().replace(/,$/, "").trim();
    if (!val || tags.includes(val)) return;
    onChange([...tags, val]);
    setInputVal("");
  }

  function removeTag(tag) {
    onChange(tags.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
    if (e.key === "Backspace" && inputVal === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  function handleBlur() {
    if (inputVal.trim()) addTag(inputVal);
  }

  return (
    <div
      className={`tag-input${hasError ? " submit-input--error" : ""}`}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span key={tag} className="tag-input__tag">
          {tag}
          <button
            type="button"
            className="tag-input__tag-remove"
            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
            aria-label={`Supprimer ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="tag-input__field"
        placeholder={tags.length === 0 ? placeholder : ""}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        aria-label={placeholder}
      />
    </div>
  );
}