import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'

function Checkout() {
  const navigate = useNavigate()

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    paymentMethod: 'card',
  })

  const [errors, setErrors] = useState({})

  const formattedTotal = new Intl.NumberFormat(
    'es-PE',
    {
      style: 'currency',
      currency: 'PEN',
    }
  ).format(cartTotal)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ingresa tu nombre completo.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Ingresa tu correo electrónico.'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Ingresa tu número de teléfono.'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Ingresa tu dirección.'
    }

    if (!formData.district.trim()) {
      newErrors.district = 'Ingresa tu distrito.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const orderNumber = `SH-${Date.now().toString().slice(-6)}`

    clearCart()

    navigate('/pedido-confirmado', {
      state: {
        orderNumber,
        customerName: formData.name,
        total: cartTotal,
      },
    })
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-empty">
        <i className="bi bi-cart-x"></i>

        <h1>
          No puedes continuar con la compra
        </h1>

        <p>
          Tu carrito está vacío.
        </p>

        <Link
          to="/productos"
          className="primary-button"
        >
          Ver productos
        </Link>
      </section>
    )
  }

  return (
    <section className="checkout-section">
      <div className="checkout-header">
        <Link
          to="/carrito"
          className="back-link"
        >
          <i className="bi bi-arrow-left"></i>
          Volver al carrito
        </Link>

        <p className="section-tag">
          CHECKOUT
        </p>

        <h1>
          Finaliza tu compra
        </h1>

        <p>
          Completa tus datos para procesar tu pedido.
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="checkout-card">
            <div className="checkout-card-header">
              <div className="checkout-step">
                1
              </div>

              <div>
                <h2>
                  Datos personales
                </h2>

                <p>
                  Información para la entrega.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">
                  Nombre completo
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ej. Juan Perez"
                  value={formData.name}
                  onChange={handleChange}
                />

                {errors.name && (
                  <span className="form-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Correo electrónico
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                />

                {errors.email && (
                  <span className="form-error">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Teléfono
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="987654321"
                  value={formData.phone}
                  onChange={handleChange}
                />

                {errors.phone && (
                  <span className="form-error">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="district">
                  Distrito
                </label>

                <input
                  id="district"
                  name="district"
                  type="text"
                  placeholder="Ej. San Miguel"
                  value={formData.district}
                  onChange={handleChange}
                />

                {errors.district && (
                  <span className="form-error">
                    {errors.district}
                  </span>
                )}
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">
                  Dirección
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Av. Principal 123"
                  value={formData.address}
                  onChange={handleChange}
                />

                {errors.address && (
                  <span className="form-error">
                    {errors.address}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-header">
              <div className="checkout-step">
                2
              </div>

              <div>
                <h2>
                  Método de pago
                </h2>

                <p>
                  Selecciona una opción para esta demostración.
                </p>
              </div>
            </div>

            <div className="payment-options">
              <label
                className={`payment-option ${
                  formData.paymentMethod === 'card'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />

                <div className="payment-icon">
                  <i className="bi bi-credit-card"></i>
                </div>

                <div>
                  <strong>
                    Tarjeta
                  </strong>

                  <span>
                    Crédito o débito
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  formData.paymentMethod === 'yape'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="yape"
                  checked={formData.paymentMethod === 'yape'}
                  onChange={handleChange}
                />

                <div className="payment-icon">
                  <i className="bi bi-phone"></i>
                </div>

                <div>
                  <strong>
                    Yape / Plin
                  </strong>

                  <span>
                    Pago móvil
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  formData.paymentMethod === 'cash'
                    ? 'selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={formData.paymentMethod === 'cash'}
                  onChange={handleChange}
                />

                <div className="payment-icon">
                  <i className="bi bi-cash-stack"></i>
                </div>

                <div>
                  <strong>
                    Pago contra entrega
                  </strong>

                  <span>
                    Paga al recibir
                  </span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="checkout-submit"
          >
            <i className="bi bi-lock-fill"></i>

            Finalizar pedido
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>
            Resumen del pedido
          </h2>

          <div className="checkout-products">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="checkout-product"
              >
                <div className="checkout-product-image">
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

                <div className="checkout-product-info">
                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Cantidad: {item.quantity}
                  </p>
                </div>

                <strong>
                  {new Intl.NumberFormat(
                    'es-PE',
                    {
                      style: 'currency',
                      currency: 'PEN',
                    }
                  ).format(
                    item.price * item.quantity
                  )}
                </strong>
              </div>
            ))}
          </div>

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
        </aside>
      </div>
    </section>
  )
}

export default Checkout