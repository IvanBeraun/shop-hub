import { Link } from 'react-router-dom'

import ProductCard from './ProductCard'
import { getFeaturedProducts } from '../services/productService'

function FeaturedProducts() {
  const products = getFeaturedProducts()

  return (
    <section
      id="productos"
      className="section products-section"
    >
      <div className="section-header">
        <div>
          <p className="section-tag">
            DESTACADOS
          </p>

          <h2>
            Productos destacados
          </h2>
        </div>

        <Link
          to="/productos"
          className="view-all"
        >
          Ver catálogo →
        </Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.category}
            name={product.name}
            description={product.description}
            price={product.price}
            icon={product.icon}
            image={product.image}
            stock={product.stock}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts