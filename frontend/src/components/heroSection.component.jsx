export default function HeroSection() {
  return (
    <section style={styles.section}>
      {/* Ambient background layers */}
      <div style={styles.bgLayer1} />
      <div style={styles.bgLayer2} />
      <div style={styles.bgGrain} />

      {/* Decorative corner ornaments */}
      <span style={{ ...styles.ornament, top: "32px", left: "40px" }}>✦</span>
      <span style={{ ...styles.ornament, top: "32px", right: "40px" }}>✦</span>
      <span style={{ ...styles.ornament, bottom: "32px", left: "40px", fontSize: "10px" }}>✦</span>
      <span style={{ ...styles.ornament, bottom: "32px", right: "40px", fontSize: "10px" }}>✦</span>

      <div style={styles.inner}>
        {/* Eyebrow */}
        <div style={styles.eyebrow}>
          <span style={styles.eyebrowLine} />
          <span style={styles.eyebrowText}>La bibliothèque des récits infinis</span>
          <span style={styles.eyebrowLine} />
        </div>

        {/* Title */}
        <h1 style={styles.title}>
          Explorez des univers
          <br />
          <em style={styles.titleEm}>sans frontières</em>
        </h1>

        {/* Description */}
        <p style={styles.description}>
          Des milliers de scénarios soigneusement archivés — fantastique, science-fiction,
          thriller, romance — prêts à nourrir vos tables de jeu, vos plumes et vos imaginaires.
        </p>

        {/* CTA Buttons */}
        <div style={styles.ctas}>
          <a href="#" style={styles.primaryCta}>
            Parcourir la collection
          </a>
          <a href="#" style={styles.secondaryCta}>
            Contribuer un scénario
          </a>
        </div>

        {/* Stats row */}
        <div style={styles.stats}>
          {[
            { value: "4 200+", label: "Scénarios" },
            { value: "18", label: "Genres" },
            { value: "850+", label: "Auteurs" },
          ].map((stat, i) => (
            <div key={i} style={styles.stat}>
              <span style={styles.statValue}>{stat.value}</span>
              <span style={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={styles.bottomFade} />
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    minHeight: "88vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#0d0b08",
  },
  bgLayer1: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(139, 58, 42, 0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 80% 60%, rgba(201, 168, 76, 0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  bgLayer2: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  bgGrain: {
    position: "absolute",
    inset: 0,
    opacity: 0.04,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "200px 200px",
    pointerEvents: "none",
  },
  ornament: {
    position: "absolute",
    color: "#c9a84c",
    fontSize: "14px",
    opacity: 0.4,
  },
  inner: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    maxWidth: "760px",
    margin: "0 auto",
    padding: "80px 24px",
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  eyebrowLine: {
    display: "block",
    width: "48px",
    height: "1px",
    backgroundColor: "#c9a84c",
    opacity: 0.6,
  },
  eyebrowText: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c9a84c",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(42px, 7vw, 80px)",
    fontWeight: 700,
    lineHeight: 1.1,
    color: "#f0e6cc",
    margin: "0 0 24px",
    letterSpacing: "-0.01em",
  },
  titleEm: {
    fontStyle: "italic",
    fontWeight: 400,
    color: "#c9a84c",
  },
  description: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "18px",
    lineHeight: 1.75,
    color: "#a89880",
    maxWidth: "560px",
    margin: "0 auto 40px",
  },
  ctas: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "56px",
  },
  primaryCta: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "15px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#0d0b08",
    backgroundColor: "#c9a84c",
    padding: "14px 32px",
    borderRadius: "2px",
    textDecoration: "none",
    transition: "all 0.2s",
    fontWeight: 600,
  },
  secondaryCta: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "15px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#c9a84c",
    backgroundColor: "transparent",
    border: "1px solid rgba(201, 168, 76, 0.5)",
    padding: "14px 32px",
    borderRadius: "2px",
    textDecoration: "none",
    transition: "all 0.2s",
  },
  stats: {
    display: "flex",
    gap: "48px",
    justifyContent: "center",
    flexWrap: "wrap",
    borderTop: "1px solid rgba(201, 168, 76, 0.15)",
    paddingTop: "32px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    alignItems: "center",
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "28px",
    fontWeight: 700,
    color: "#f0e6cc",
    letterSpacing: "-0.02em",
  },
  statLabel: {
    fontFamily: "'EB Garamond', serif",
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#6a5c4a",
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "120px",
    background: "linear-gradient(to bottom, transparent, #0d0b08)",
    pointerEvents: "none",
  },
};