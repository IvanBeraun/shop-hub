import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../services/productService'

function Products() {
    const products = getAllProducts()

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('Todas')
    const [sort, setSort] = useState('default')

    const categories = [
        'Todas',
        ...new Set(products.map((product) => product.category)),
    ]

    let filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase())

        const matchesCategory =
            category === 'Todas' ||
            product.category === category

        return matchesSearch && matchesCategory
    })

    if (sort === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price)
    }

    if (sort === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price)
    }

    if (sort === 'name') {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        )
    }

    return (
        <section className="catalog-section">
            <div className="catalog-header">
                <p className="section-tag">
                    CATÁLOGO
                </p>

                <h1>Todos los productos</h1>

                <p>
                    Encuentra el producto que necesitas
                    utilizando la búsqueda y los filtros.
                </p>
            </div>

            <div className="catalog-controls">
                <div className="filter-container search-container">
                    <label htmlFor="search">
                        Buscar
                    </label>

                    <div className="search-input">
                        <i className="bi bi-search"></i>

                        <input
                            id="search"
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>

                <div className="filter-container">
                    <label htmlFor="category">
                        Categoría
                    </label>

                    <select
                        id="category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-container">
                    <label htmlFor="sort">
                        Ordenar
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                    >
                        <option value="default">
                            Predeterminado
                        </option>

                        <option value="price-asc">
                            Precio: menor a mayor
                        </option>

                        <option value="price-desc">
                            Precio: mayor a menor
                        </option>

                        <option value="name">
                            Nombre
                        </option>
                    </select>
                </div>
            </div>

            <div className="catalog-results">
                <p>
                    {filteredProducts.length}{' '}
                    producto(s) encontrado(s)
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="products-grid">
                    {filteredProducts.map((product) => (
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
            ) : (
                <div className="empty-products">
                    <i className="bi bi-search"></i>

                    <h2>
                        No encontramos productos
                    </h2>

                    <p>
                        Intenta cambiar el término de búsqueda
                        o seleccionar otra categoría.
                    </p>
                </div>
            )}
        </section>
    )
}

export default Products