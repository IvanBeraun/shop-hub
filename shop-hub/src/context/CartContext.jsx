import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('shopHubCart')

        if (savedCart) {
            return JSON.parse(savedCart)
        }

        return []
    })

    useEffect(() => {
        localStorage.setItem(
            'shopHubCart',
            JSON.stringify(cartItems)
        )
    }, [cartItems])

    const addToCart = (product, quantity) => {
        if (product.stock <= 0) {
            return
        }

        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            )

            if (existingItem) {
                const newQuantity = Math.min(
                    existingItem.quantity + quantity,
                    product.stock
                )

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: newQuantity,
                        }
                        : item
                )
            }

            const newQuantity = Math.min(
                quantity,
                product.stock
            )

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: newQuantity,
                },
            ]
        })
    }

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        )
    }

    const updateQuantity = (productId, quantity) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id !== productId) {
                    return item
                }

                if (quantity < 1) {
                    return item
                }

                const newQuantity = Math.min(
                    quantity,
                    item.stock
                )

                return {
                    ...item,
                    quantity: newQuantity,
                }
            })
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const cartTotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    )

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}