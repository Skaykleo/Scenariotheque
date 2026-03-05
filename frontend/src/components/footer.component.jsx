export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Bibliothèque",
      links: ["Parcourir", "Nouveautés", "Populaires", "Coups de cœur"],
    },
    {
      title: "Genres",
      links: ["Fantastique", "Science-Fiction", "Thriller", "Horreur", "Mystère"],
    },
    {
      title: "Contribuer",
      links: ["Soumettre un scénario", "Guide d'écriture", "Charte éditoriale"],
    },
    {
      title: "Communauté",
      links: ["Forum", "Discord", "Newsletter", "À propos"],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__top-border" />

      <div className="footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo-row">
            <span className="footer__logo-icon">✦</span>
            <span>
              <span className="footer__logo-main">Scénario</span>
              <span className="footer__logo-sub">thèque</span>
            </span>
          </div>
          <p className="footer__brand-desc">
            La bibliothèque collaborative des récits à jouer, à lire et à partager.
          </p>
          <div className="footer__socials">
            {["Discord", "Twitter", "Mastodon"].map((s) => (
              <a key={s} href="#" className="footer__social-link">
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Columns */}
        <div className="footer__columns">
          {columns.map((col) => (
            <div key={col.title} className="footer__column">
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__col-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom-bar">
        <p className="footer__copyright">
          © {year} Scénariothèque — Tous droits réservés
        </p>
        <div className="footer__legal-links">
          {["Mentions légales", "CGU", "Confidentialité"].map((l) => (
            <a key={l} href="#" className="footer__legal-link">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}