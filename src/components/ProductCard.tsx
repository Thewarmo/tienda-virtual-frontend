'use client'
  import { useState } from 'react'
  import { Product } from '@/types'
  import { useCartStore } from '@/hooks/useCartStore'
  import { getProductImageUrl } from '@/utils/api'
  import { ShoppingCart, Package, Wrench, Star, Heart } from 'lucide-react'
  import Image from 'next/image'
  import toast from 'react-hot-toast'

  interface ProductCardProps {
    product: Product
  }

  export default function ProductCard({ product }: ProductCardProps) {
    const [imageError, setImageError] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
      if (!product.activo) {
        toast.error('Producto no disponible', { icon: '⚠️' })
        return
      }

      addItem(product)
      toast.success(`${product.nombre} añadido al carrito`, { icon: '🛒' })
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(price)
    }

    const getImageSrc = () => {
      if (product.urlImagen && !imageError) {
        return product.urlImagen
      }
      return getProductImageUrl(product.id)
    }

    const isAvailable = product.activo && (product.tipoItem === 'SERVICIO' || product.stock > 0)

    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform
  hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Imagen del producto */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200">
          {product.urlImagen || !imageError ? (
            <Image
    src={getImageSrc()}
    alt={product.nombre}
    width={320}
    height={224}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    onError={() => setImageError(true)}
  />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200
  to-gray-300">
              {product.tipoItem === 'PRODUCTO' ? (
                <Package className="h-20 w-20 text-gray-400" />
              ) : (
                <Wrench className="h-20 w-20 text-gray-400" />
              )}
            </div>
          )}

          {/* Badge de tipo mejorado */}
          <div className="absolute top-3 left-3">
            <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg
  backdrop-blur-sm ${
              product.tipoItem === 'PRODUCTO'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-gradient-to-r from-green-500 to-teal-600 text-white'
            }`}>
              {product.tipoItem === 'PRODUCTO' ? (
                <Package className="h-3 w-3" />
              ) : (
                <Wrench className="h-3 w-3" />
              )}
              {product.tipoItem}
            </span>
          </div>

          {/* Botón de favorito */}
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg
  hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>

          {/* Badge de stock mejorado */}
          {product.tipoItem === 'PRODUCTO' && (
            <div className="absolute bottom-3 right-3">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${
                product.stock > 0
                  ? 'bg-green-500/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>
          )}
        </div>

        {/* Contenido mejorado */}
        <div className="p-5">
          {/* Header con rating */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-rose-600
  transition-colors">
              {product.nombre}
            </h3>
            <div className="flex items-center gap-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
            {product.descripcion}
          </p>

          {/* Precio con descuento simulado */}
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.precio)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(Math.round(product.precio * 1.15))}
              </span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                -15%
              </span>
            </div>
            <p className="text-xs text-gray-500 font-mono">
              SKU: {product.codigo}
            </p>
          </div>

           {/* Botón mejorado */}
  <button
    onClick={handleAddToCart}
    disabled={!isAvailable}
    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center
  justify-center gap-2 ${
      isAvailable
        ? 'text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
    }`}
    style={isAvailable ? {
      background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'
    } : {}}
    onMouseEnter={(e) => {
      if (isAvailable) {
        e.currentTarget.style.background = 'linear-gradient(to right, #E8A4C5, #D68BB0)'
      }
    }}
    onMouseLeave={(e) => {
      if (isAvailable) {
        e.currentTarget.style.background = 'linear-gradient(to right, #EFBACC, #E8A4C5)'
      }
    }}
  >
    <ShoppingCart className="h-4 w-4" />
    {isAvailable ? 'Agregar al carrito' : 'No disponible'}
  </button>
        </div>
      </div>
    )
  }