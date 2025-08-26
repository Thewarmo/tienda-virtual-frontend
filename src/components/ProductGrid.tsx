'use client'
  import { useState, useEffect } from 'react'
  import { Product } from '@/types'
  import { fetchProducts } from '@/utils/api'
  import ProductCard from './ProductCard'
  import { AlertCircle, Package, Filter, Grid3X3, Sparkles } from 'lucide-react'

  export default function ProductGrid() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<'ALL' | 'PRODUCTO' | 'SERVICIO'>('ALL')

    useEffect(() => {
      loadProducts()
    }, [])

    const loadProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProducts()
        const activeProducts = data.filter(product => product.activo)
        setProducts(activeProducts)
      } catch (err) {
        setError('Error al cargar los productos. Intenta nuevamente.')
        console.error('Error loading products:', err)
      } finally {
        setLoading(false)
      }
    }

    const filteredProducts = products.filter(product => {
      if (filter === 'ALL') return true
      return product.tipoItem === filter
    })

    const productCount = filteredProducts.filter(p => p.tipoItem === 'PRODUCTO').length
    const serviceCount = filteredProducts.filter(p => p.tipoItem === 'SERVICIO').length

    if (loading) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
            <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8
  text-rose-500 animate-pulse" />
          </div>
          <p className="text-gray-600 mt-6 text-lg">Cargando productos exclusivos...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando la mejor selección para ti</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-red-50
  to-pink-50 rounded-2xl p-8">
          <div className="bg-red-100 rounded-full p-4 mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Ups! Algo salió mal</h3>
          <p className="text-red-600 mb-6 text-center max-w-md">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white
  px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Reintentar carga
          </button>
        </div>
      )
    }

    if (products.length === 0) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50
  to-gray-100 rounded-2xl p-8">
          <div className="bg-gray-200 rounded-full p-4 mb-4">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay productos disponibles</h3>
          <p className="text-gray-500">Pronto tendremos nuevos productos para ti</p>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {/* Header de sección */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Grid3X3 className="h-6 w-6 text-rose-500 mr-2" />
            <span className="text-sm font-medium text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
              Catálogo Premium
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productos y Servicios Exclusivos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección cuidadosamente elegida de productos de estética de la más alta calidad
          </p>
        </div>

        {/* Estadísticas y filtros */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600">{products.length}</div>
                <div className="text-sm text-gray-500">Total disponible</div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{productCount}</div>
                <div className="text-sm text-gray-500">Productos</div>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{serviceCount}</div>
                <div className="text-sm text-gray-500">Servicios</div>
              </div>
            </div>

            {/* Filtros mejorados */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === 'ALL'
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilter('PRODUCTO')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === 'PRODUCTO'
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Productos
                </button>
                <button
                  onClick={() => setFilter('SERVICIO')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    filter === 'SERVICIO'
                      ? 'bg-white text-gray-900 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Servicios
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mensaje cuando no hay resultados del filtro */}
        {filteredProducts.length === 0 && filter !== 'ALL' && (
          <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No hay {filter === 'PRODUCTO' ? 'productos' : 'servicios'} disponibles
            </h3>
            <p className="text-gray-500 mb-4">
              Prueba con otro filtro o explora todas nuestras opciones
            </p>
            <button
              onClick={() => setFilter('ALL')}
              className="text-rose-600 hover:text-rose-700 font-medium"
            >
              Ver todos los productos →
            </button>
          </div>
        )}
      </div>
    )
  }