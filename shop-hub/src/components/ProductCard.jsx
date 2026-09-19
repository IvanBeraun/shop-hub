import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductCard({
  id,
  category,
  name,
  description,
  price,
  icon,
  image,
  stock,
}) {
  const { addToCart } = useCart()

  const {
    toggleFavorite,
    isFavorite,
  } = useWishlist()

  const formattedPrice = new Intl.NumberFormat(
    'es-PE',
    {
      style: 'currency',
      currency: 'PEN',
    }
  ).format(price)

  const outOfStock = stock === 0
  const lowStock = stock > 0 && stock <= 3
  const favorite = isFavorite(id)

  return (
    <article className="product-card">
      <Link
        to={`/productos/${id}`}
        className="product-card-link"
      >
        <div className="product-image">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
            />
          ) : (
            <i className={`bi ${icon}`}></i>
          )}
        </div>

        <div className="product-info">
          <p className="product-category">
            {category}
          </p>

          <h3>{name}</h3>

          <p className="product-description">
            {description}
          </p>

          <div className="product-stock-wrapper">
            {outOfStock ? (
              <span className="stock-badge stock-out">
                Agotado
              </span>
            ) : lowStock ? (
              <span className="stock-badge stock-low">
                Últimas {stock} unidades
              </span>
            ) : (
              <span className="stock-badge stock-available">
                En stock
              </span>
            )}
          </div>

          <div className="product-bottom">
            <span className="product-price">
              {formattedPrice}
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        className={`favorite-button ${
          favorite ? 'favorite-active' : ''
        }`}
        onClick={() => toggleFavorite(id)}
        aria-label={
          favorite
            ? `Quitar ${name} de favoritos`
            : `Agregar ${name} a favoritos`
        }
      >
        <i
          className={
            favorite
              ? 'bi bi-heart-fill'
              : 'bi bi-heart'
          }
        ></i>
      </button>

      <button
        type="button"
        className="add-button"
        disabled={outOfStock}
        onClick={() => addToCart(
          {
            id,
            category,
            name,
            description,
            price,
            icon,
            image,
            stock,
          },
          1
        )}
        aria-label={
          outOfStock
            ? `${name} agotado`
            : `Agregar ${name} al carrito`
        }
      >
        <i
          className={
            outOfStock
              ? 'bi bi-x-lg'
              : 'bi bi-cart-plus'
          }
        ></i>
      </button>
    </article>
  )
}

export default ProductCard