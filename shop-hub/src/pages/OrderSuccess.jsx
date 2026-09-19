import { Link, useLocation, Navigate } from 'react-router-dom'

function OrderSuccess() {
  const location = useLocation()

  const order = location.state

  if (!order) {
    return (
      <Navigate
        to="/productos"
        replace
      />
    )
  }

  const formattedTotal = new Intl.NumberFormat(
    'es-PE',
    {
      style: 'currency',
      currency: 'PEN',
    }
  ).format(order.total)

  return (
    <section className="success-section">
      <div className="success-card">
        <div className="success-icon">
          <i className="bi bi-check-lg"></i>
        </div>

        <p className="section-tag">
          PEDIDO CONFIRMADO
        </p>

        <h1>
          ¡Gracias por tu compra, {order.customerName}!
        </h1>

        <p className="success-description">
          Tu pedido ha sido registrado correctamente.
          Esta es una simulación de compra para el
          proyecto ShopHub.
        </p>

        <div className="order-number">
          <span>
            Número de pedido
          </span>

          <strong>
            {order.orderNumber}
          </strong>
        </div>

        <div className="success-total">
          <span>
            Total
          </span>

          <strong>
            {formattedTotal}
          </strong>
        </div>

        <Link
          to="/productos"
          className="primary-button"
        >
          Seguir comprando
        </Link>
      </div>
    </section>
  )
}

export default OrderSuccess