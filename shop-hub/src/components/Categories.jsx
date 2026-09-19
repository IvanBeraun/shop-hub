import CategoryCard from './CategoryCard'

function Categories() {
  return (
    <section id="categorias" className="section">
      <div className="section-header">
        <div>
          <p className="section-tag">EXPLORA</p>
          <h2>Categorías</h2>
        </div>

        <a href="#" className="view-all">
          Ver todas →
        </a>
      </div>

      <div className="categories-grid">
        <CategoryCard
          icon="bi-laptop"
          title="Laptops"
          description="Equipos para estudio, trabajo y entretenimiento."
        />

        <CategoryCard
          icon="bi-controller"
          title="Gaming"
          description="Todo lo necesario para llevar tus juegos al máximo."
        />

        <CategoryCard
          icon="bi-display"
          title="Monitores"
          description="Pantallas para productividad, diseño y gaming."
        />

        <CategoryCard
          icon="bi-keyboard"
          title="Periféricos"
          description="Teclados, mouse, audífonos y mucho más."
        />
      </div>
    </section>
  )
}

export default Categories