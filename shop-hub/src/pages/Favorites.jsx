import { Link } from 'react-router-dom'

import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../services/productService'
import { useWishlist } from '../context/WishlistContext'

function Favorites() {
  const products = getAllProducts()

  const {
    favorites,
  } = useWishlist()

  const favoriteProducts = products.filter(
    (product) =>
      favorites.includes(product.id)
  )

  if (favoriteProducts.length === 0) {
    return (
      <section className="favorites-empty">
        <i className="bi bi-heart"></i>

        <h1>
          Aún no tienes favoritos
        </h1>

        <p>
          Guarda los productos que te interesen
          para encontrarlos fácilmente.
        </p>

        <Link
          to="/productos"
          className="primary-button"
        >
          Explorar productos
        </Link>
      </section>
    )
  }

  return (
    <section className="favorites-section">
      <div className="catalog-header">
        <p className="section-tag">
          MI LISTA
        </p>

        <h1>
          Mis favoritos
        </h1>

        <p>
          Productos que has guardado para después.
        </p>
      </div>

      <div className="products-grid">
        {favoriteProducts.map((product) => (
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

export default Favorites