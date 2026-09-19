import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Products from './pages/Products'

import ProductDetail from './pages/ProductDetail'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Cart'

import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import { WishlistProvider } from './context/WishlistContext'
import Favorites from './pages/Favorites'

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="app">
            <Navbar />

            <main>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route
                  path="/productos"
                  element={<Products />}
                />

                <Route
                  path="/productos/:id"
                  element={<ProductDetail />}
                />

                <Route
                  path="/carrito"
                  element={<Cart />}
                />

                <Route
                  path="/checkout"
                  element={<Checkout />}
                />

                <Route
                  path="/pedido-confirmado"
                  element={<OrderSuccess />}
                />

                <Route
                  path="/favoritos"
                  element={<Favorites />}
                />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App