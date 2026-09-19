function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-content">
        <p className="hero-tag">TECNOLOGÍA PARA TI</p>

        <h1>
          Encuentra la tecnología
          <span> que necesitas.</span>
        </h1>

        <p className="hero-description">
          Descubre laptops, componentes, periféricos y accesorios
          diseñados para llevar tu experiencia al siguiente nivel.
        </p>

        <div className="hero-buttons">
          <a href="#productos" className="primary-button">
            Ver productos
          </a>

          <a href="#categorias" className="secondary-button">
            Explorar categorías
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <div className="hero-card-icon">
            <i className="bi bi-laptop"></i>
          </div>

          <h3>Potencia para cada desafío</h3>

          <p>
            Componentes y equipos seleccionados para estudiar,
            trabajar y jugar.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero