const products = [
  {
    id: 1,
    name: 'Laptop Pro 15',
    category: 'Laptop',
    description: 'Potencia y rendimiento para todo tipo de tareas.',
    price: 3299,
    stock: 8,
    icon: 'bi-laptop',
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 2,
    name: 'Headset Pro X',
    category: 'Audio',
    description: 'Audio envolvente y comodidad durante horas.',
    price: 349,
    stock: 2,
    icon: 'bi-headphones',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 3,
    name: 'Keyboard RGB',
    category: 'Periféricos',
    description: 'Teclado mecánico para máxima precisión.',
    price: 259,
    stock: 0,
    icon: 'bi-keyboard',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 4,
    name: 'Mouse Gaming X',
    category: 'Periféricos',
    description: 'Precisión, velocidad y ergonomía para gaming.',
    price: 179,
    stock: 5,
    icon: 'bi-mouse',
    image:
      'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&q=80',
    featured: true,
  },
  {
    id: 5,
    name: 'Monitor UltraView 27',
    category: 'Monitores',
    description: 'Monitor de 27 pulgadas para productividad y gaming.',
    price: 899,
    stock: 3,
    icon: 'bi-display',
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
  {
    id: 6,
    name: 'Gaming PC Pro',
    category: 'Gaming',
    description:
      'Equipo preparado para jugar y trabajar con alto rendimiento.',
    price: 4599,
    stock: 1,
    icon: 'bi-pc-display',
    image:
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=900&q=80',
    featured: false,
  },
]

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured)
}

export const getAllProducts = () => {
  return products
}

export const getProductById = (id) => {
  return products.find(
    (product) => product.id === Number(id)
  )
}