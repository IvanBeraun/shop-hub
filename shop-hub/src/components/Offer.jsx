import { Link } from 'react-router-dom'

function Offer() {
  return (
    <section
      id="ofertas"
      className="offer-section"
    >
      <div className="offer-content">
        <p className="section-tag">
          OFERTA ESPECIAL
        </p>

        <h2>
          Tecnología que vale la pena.
        </h2>

        <p>
          Descubre descuentos seleccionados en productos
          destacados de ShopHub.
        </p>

        <Link
          to="/productos"
          className="primary-button"
        >
          Ver ofertas
        </Link>
      </div>
    </section>
  )
}

export default Offer