import { Link } from 'react-router-dom'

import { useCart } from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart()

  const formattedTotal = new Intl.NumberFormat(
    'es-PE',
    {
      style: 'currency',
      currency: 'PEN',
    }
  ).format(cartTotal)

  if (cartItems.length === 0) {
    return (
      <section className="cart-section empty-cart">
        <i className="bi bi-cart-x"></i>

        <h1>
          Tu carrito está vacío
        </h1>

        <p>
          Agrega algunos productos para comenzar
          tu compra.
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
    <section className="cart-section">
      <div className="catalog-header">
        <p className="section-tag">
          TU COMPRA
        </p>

        <h1>
          Carrito de compras
        </h1>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity

            const formattedItemTotal =
              new Intl.NumberFormat('es-PE', {
                style: 'currency',
                currency: 'PEN',
              }).format(itemTotal)

            return (
              <article
                key={item.id}
                className="cart-item"
              >
                <div className="cart-item-image">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                    />
                  ) : (
                    <i
                      className={`bi ${item.icon}`}
                    ></i>
                  )}
                </div>

                <div className="cart-item-info">
                  <p className="product-category">
                    {item.category}
                  </p>

                  <h2>
                    {item.name}
                  </h2>

                  <p>
                    {item.description}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong>
                    {formattedItemTotal}
                  </strong>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              </article>
            )
          })}

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Vaciar carrito
          </button>
        </div>

        <aside className="cart-summary">
          <h2>
            Resumen de compra
          </h2>

          <div className="summary-row">
            <span>
              Productos
            </span>

            <span>
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="summary-row total-row">
            <span>
              Total
            </span>

            <strong>
              {formattedTotal}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Continuar compra
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default Cart