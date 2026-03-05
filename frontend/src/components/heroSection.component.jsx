export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg-layer1" />
      <div className="hero__bg-grid" />
      <div className="hero__bg-grain" />

      <span className="hero__ornament hero__ornament--tl">✦</span>
      <span className="hero__ornament hero__ornament--tr">✦</span>
      <span className="hero__ornament hero__ornament--bl">✦</span>
      <span className="hero__ornament hero__ornament--br">✦</span>

      <div className="hero__inner">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="hero__eyebrow-text">La bibliothèque des récits infinis</span>
          <span className="hero__eyebrow-line" />
        </div>

        <h1 className="hero__title">
          Explorez des univers
          <br />
          <em>sans frontières</em>
        </h1>

        <p className="hero__description">
          Des milliers de scénarios soigneusement archivés — fantastique, science-fiction,
          thriller, romance — prêts à nourrir vos tables de jeu, vos plumes et vos imaginaires.
        </p>

        <div className="hero__ctas">
          <a href="#" className="hero__cta--primary">
            Parcourir la collection
          </a>
          <a href="#" className="hero__cta--secondary">
            Contribuer un scénario
          </a>
        </div>

        <div className="hero__stats">
          {[
            { value: "4 200+", label: "Scénarios" },
            { value: "18",     label: "Genres" },
            { value: "850+",   label: "Auteurs" },
          ].map((stat, i) => (
            <div key={i} className="hero__stat">
              <span className="hero__stat-value">{stat.value}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero__bottom-fade" />
    </section>
  );
}