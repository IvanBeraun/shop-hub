import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductDetail() {
  const { id } = useParams()

  const product = getProductById(id)

  const [quantity, setQuantity] = useState(1)

  const { addToCart } = useCart()

  const {
    toggleFavorite,
    isFavorite,
  } = useWishlist()

  const favorite = isFavorite(product.id)

  if (!product) {
    return (
      <section className="product-not-found">
        <i className="bi bi-box-seam"></i>

        <h1>Producto no encontrado</h1>

        <p>
          El producto que estás buscando no existe.
        </p>

        <Link
          to="/productos"
          className="primary-button"
        >
          Volver al catálogo
        </Link>
      </section>
    )
  }

  return (
    <section className="product-detail-section">
      <Link
        to="/productos"
        className="back-link"
      >
        <i className="bi bi-arrow-left"></i>
        Volver al catálogo
      </Link>

      <div className="product-detail">
        <div className="product-detail-image">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
            />
          ) : (
            <i className={`bi ${product.icon}`}></i>
          )}
        </div>

        <div className="product-detail-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <p className="product-detail-description">
            {product.description}
          </p>

          <div className="product-detail-price">
            {new Intl.NumberFormat('es-PE', {
              style: 'currency',
              currency: 'PEN',
            }).format(product.price)}
          </div>

          <div
            className={`product-stock ${product.stock === 0
              ? 'detail-stock-out'
              : product.stock <= 3
                ? 'detail-stock-low'
                : 'detail-stock-available'
              }`}
          >
            <i
              className={
                product.stock === 0
                  ? 'bi bi-x-circle'
                  : product.stock <= 3
                    ? 'bi bi-exclamation-circle'
                    : 'bi bi-check-circle'
              }
            ></i>

            {product.stock === 0
              ? 'Agotado'
              : product.stock <= 3
                ? `Últimas ${product.stock} unidades`
                : 'Disponible'}
          </div>

          <div className="product-detail-actions">
            <button
              type="button"
              className={`detail-favorite-button ${favorite
                  ? 'detail-favorite-active'
                  : ''
                }`}
              onClick={() =>
                toggleFavorite(product.id)
              }
            >
              <i
                className={
                  favorite
                    ? 'bi bi-heart-fill'
                    : 'bi bi-heart'
                }
              ></i>

              {favorite
                ? 'En favoritos'
                : 'Agregar a favoritos'}
            </button>

            <div className="quantity-selector">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity(quantity - 1)
                }
                aria-label="Disminuir cantidad"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="add-to-cart-button"
              disabled={product.stock === 0}
              onClick={() =>
                addToCart(product, quantity)
              }
            >
              <i
                className={
                  product.stock === 0
                    ? 'bi bi-x-lg'
                    : 'bi bi-cart-plus'
                }
              ></i>

              {product.stock === 0
                ? 'Producto agotado'
                : 'Agregar al carrito'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail