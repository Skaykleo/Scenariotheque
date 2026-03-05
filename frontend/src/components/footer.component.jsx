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
    <footer style={styles.footer}>
      {/* Top border */}
      <div style={styles.topBorder} />

      <div style={styles.inner}>
        {/* Brand block */}
        <div style={styles.brand}>
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>✦</span>
            <span>
              <span style={styles.logoMain}>Scénario</span>
              <span style={styles.logoSub}>thèque</span>
            </span>
          </div>
          <p style={styles.brandDesc}>
            La bibliothèque collaborative des récits à jouer, à lire et à partager.
          </p>
          <div style={styles.socials}>
            {["Discord", "Twitter", "Mastodon"].map((s) => (
              <a key={s} href="#" style={styles.socialLink}>
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        <div style={styles.columns}>
          {columns.map((col) => (
            <div key={col.title} style={styles.column}>
              <h4 style={styles.colTitle}>{col.title}</h4>
              <ul style={styles.colList}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={styles.colLink}>
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
      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © {year} Scénariothèque — Tous droits réservés
        </p>
        <div style={styles.legalLinks}>
          {["Mentions légales", "CGU", "Confidentialité"].map((l) => (
            <a key={l} href="#" style={styles.legalLink}>
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0a0906",
    borderTop: "1px solid rgba(201, 168, 76, 0.1)",
  },
  topBorder: {
    height: "1px",
    background: "linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.4), transparent)",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "64px 24px 48px",
    display: "flex",
    gap: "80px",
    flexWrap: "wrap",
  },
  brand: {
    minWidth: "220px",
    flex: "0 0 220px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  logoIcon: {
    color: "#c9a84c",
    fontSize: "18px",
  },
  logoMain: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#f0e6cc",
  },
  logoSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    fontWeight: 400,
    fontStyle: "italic",
    color: "#c9a84c",
  },
  brandDesc: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#5a4c3a",
    margin: "0 0 20px",
  },
  socials: {
    display: "flex",
    gap: "16px",
  },
  socialLink: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "12px",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#5a4c3a",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  columns: {
    flex: 1,
    display: "flex",
    gap: "48px",
    flexWrap: "wrap",
  },
  column: {
    minWidth: "120px",
  },
  colTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#f0e6cc",
    margin: "0 0 16px",
  },
  colList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  colLink: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "14px",
    color: "#5a4c3a",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  bottomBar: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 24px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  copyright: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    color: "#3a2e20",
    margin: 0,
  },
  legalLinks: {
    display: "flex",
    gap: "24px",
  },
  legalLink: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "12px",
    color: "#3a2e20",
    textDecoration: "none",
  },
};