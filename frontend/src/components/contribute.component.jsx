/**
 * @param {Object}   props
 * @param {boolean}  props.isLoggedIn  - L'utilisateur est-il connecté ?
 * @param {string}   props.userName    - Prénom de l'utilisateur (si connecté)
 * @param {Function} props.onDismiss   - Callback appelé quand l'utilisateur ferme le bandeau
 */
export default function ContributeCallout({ isLoggedIn = false, userName = "", onDismiss }) {
  return (
    <div className={`contribute-callout${isLoggedIn ? "" : " contribute-callout--guest"}`}>
      {/* Fonds décoratifs */}
      <div className="contribute-callout__bg" />
      <div className="contribute-callout__deco" aria-hidden="true">
        {isLoggedIn ? "✍" : "✦"}
      </div>

      {/* Bouton fermeture */}
      <button
        className="contribute-callout__dismiss"
        onClick={onDismiss}
        aria-label="Ne plus afficher cette suggestion"
        title="Ne plus afficher lors de cette visite"
      >
        ×
      </button>

      {/* Contenu textuel */}
      <div className="contribute-callout__content">
        <p className="contribute-callout__eyebrow">
          {isLoggedIn ? `Bonjour, ${userName || "auteur"}` : "Rejoignez la bibliothèque"}
        </p>

        {isLoggedIn ? (
          <>
            <h2 className="contribute-callout__title">
              Partagez votre <em>prochain scénario</em>
            </h2>
            <p className="contribute-callout__desc">
              Votre création mérite une audience. Soumettez-la à la Scénariothèque
              et rejoignez les centaines d'auteurs qui font vivre notre bibliothèque.
            </p>
          </>
        ) : (
          <>
            <h2 className="contribute-callout__title">
              Vous avez une histoire <em>à raconter ?</em>
            </h2>
            <p className="contribute-callout__desc">
              Créez un compte gratuit pour soumettre vos scénarios, noter les
              créations de la communauté et bâtir votre bibliothèque personnelle.
            </p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="contribute-callout__actions">
        {isLoggedIn ? (
          <>
            <a href="#" className="contribute-callout__btn--primary">
              <PenIcon />
              Soumettre un scénario
            </a>
            <a href="#" className="contribute-callout__btn--secondary">
              Voir mes publications →
            </a>
          </>
        ) : (
          <>
            <a href="#" className="contribute-callout__btn--primary">
              Créer un compte — c'est gratuit
            </a>
            <a href="#" className="contribute-callout__btn--secondary">
              Déjà membre ? Se connecter →
            </a>
          </>
        )}
      </div>
    </div>
  );
}

function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}