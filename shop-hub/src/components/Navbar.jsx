import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCart } from '../context/CartContext'
import SearchModal from './SearchModal'
import { useWishlist } from '../context/WishlistContext'

function Navbar() {
  const navigate = useNavigate()

  const { cartCount } = useCart()

  const [searchOpen, setSearchOpen] = useState(false)

  const {
    favoriteCount,
  } = useWishlist()

  const goToSection = (sectionId) => {
    navigate('/')

    setTimeout(() => {
      const section = document.getElementById(sectionId)

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            Shop<span>Hub</span>
          </Link>

          <nav className="nav-links">
            <Link to="/">
              Inicio
            </Link>

            <Link to="/productos">
              Productos
            </Link>

            <button
              type="button"
              onClick={() => goToSection('categorias')}
            >
              Categorías
            </button>

            <button
              type="button"
              onClick={() => goToSection('ofertas')}
            >
              Ofertas
            </button>
          </nav>

          <div className="nav-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
            >
              <i className="bi bi-search"></i>
            </button>

            <Link
              to="/favoritos"
              className="favorite-nav-button"
              aria-label="Mis favoritos"
            >
              <i className="bi bi-heart"></i>

              {favoriteCount > 0 && (
                <span className="cart-count">
                  {favoriteCount}
                </span>
              )}
            </Link>

            <Link
              to="/carrito"
              className="cart-button"
              aria-label="Carrito de compras"
            >
              <i className="bi bi-cart3"></i>

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="login-button"
              type="button"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  )
}

export default Navbar