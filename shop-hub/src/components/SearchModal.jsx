import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllProducts } from '../services/productService'

function SearchModal({ isOpen, onClose }) {
  const [search, setSearch] = useState('')

  const products = getAllProducts()

  const results = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  useEffect(() => {
    if (!isOpen) {
      setSearch('')
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener(
      'keydown',
      handleKeyDown
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <div
      className="search-overlay"
      onClick={onClose}
    >
      <div
        className="search-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="search-modal-header">
          <div className="search-modal-input">
            <i className="bi bi-search"></i>

            <input
              type="text"
              autoFocus
              placeholder="Buscar productos..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <button
            type="button"
            className="search-close"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="search-results">
          {search.trim() === '' ? (
            <div className="search-empty">
              <i className="bi bi-search"></i>

              <p>
                Escribe el nombre de un producto
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="search-results-count">
                {results.length} resultado(s)
              </p>

              <div className="search-results-list">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/productos/${product.id}`}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    <div className="search-result-image">
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </div>

                    <div>
                      <p>
                        {product.category}
                      </p>

                      <h3>
                        {product.name}
                      </h3>

                      <span>
                        {new Intl.NumberFormat(
                          'es-PE',
                          {
                            style: 'currency',
                            currency: 'PEN',
                          }
                        ).format(product.price)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="search-empty">
              <i className="bi bi-search"></i>

              <h3>
                No encontramos resultados
              </h3>

              <p>
                Intenta buscar otro producto.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal