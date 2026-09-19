import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites =
      localStorage.getItem('shopHubFavorites')

    if (savedFavorites) {
      return JSON.parse(savedFavorites)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem(
      'shopHubFavorites',
      JSON.stringify(favorites)
    )
  }, [favorites])

  const toggleFavorite = (productId) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite =
        currentFavorites.includes(productId)

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (id) => id !== productId
        )
      }

      return [
        ...currentFavorites,
        productId,
      ]
    })
  }

  const isFavorite = (productId) => {
    return favorites.includes(productId)
  }

  const favoriteCount = favorites.length

  return (
    <WishlistContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoriteCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}