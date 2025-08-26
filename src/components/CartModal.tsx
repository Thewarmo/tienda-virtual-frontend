'use client'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/hooks/useCartStore'
import { getProductImageUrl } from '@/utils/api'
import { X, ShoppingCart, Minus, Plus, Trash2, Package, Wrench } from 'lucide-react'
import Image from 'next/image'
import { Product } from '@/types'

  interface CartModalProps {
    onOpenCheckout?: () => void
  }

   interface CartItemProps {
    item: Product; // O mejor aún, usa el tipo correcto
    updateQuantity: (productId: number, quantity: number) => void;
    removeItem: (productId: number) => void;
    formatPrice: (price: number) => string;
  }

  // Componente separado para cada item del carrito
  function CartItem({ item, updateQuantity, removeItem, formatPrice }: CartItemProps) {
    const [imageError, setImageError] = useState(false)

    const getImageSrc = () => {
      if (item.urlImagen && !imageError) {
        return item.urlImagen
      }
      return getProductImageUrl(item.id)
    }

    return (
      <div className="flex gap-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-100
  hover:shadow-lg transition-all duration-300">
        {/* Imagen del producto mejorada */}
        <div className="w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden shadow-md">
          {item.urlImagen || !imageError ? (
             <Image
              src={getImageSrc()}
              alt={item.nombre}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{background: 'linear-gradient(135deg, #F5E6ED, #EFBACC)'}}
            >
              {item.tipoItem === 'PRODUCTO' ? (
                <Package className="h-8 w-8 text-gray-400" />
              ) : (
                <Wrench className="h-8 w-8 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">
              {item.nombre}
            </h3>
            <button
              onClick={() => removeItem(item.id)}
              className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-xs px-2 py-1 rounded-full font-medium text-white"
              style={{background: item.tipoItem === 'PRODUCTO' ? '#D68BB0' : '#EFBACC'}}
            >
              {item.tipoItem}
            </span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">{item.codigo}</span>
          </div>

          {/* Controles de cantidad */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.stock - 1)}
                className="p-1.5 rounded-lg transition-colors hover:scale-105"
                style={{background: 'linear-gradient(135deg, #F5E6ED, #EFBACC)'}}
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="text-sm font-bold min-w-[2rem] text-center bg-white px-3 py-1 rounded-lg shadow-sm">
                {item.stock}
              </span>

              <button
                onClick={() => updateQuantity(item.id, item.stock + 1)}
                className="p-1.5 rounded-lg transition-colors hover:scale-105"
                style={{background: 'linear-gradient(135deg, #F5E6ED, #EFBACC)'}}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-right">
              <div className="text-xs text-gray-500">
                {formatPrice(item.precio)} c/u
              </div>
              <div className="font-bold text-sm" style={{color: '#D68BB0'}}>
                {formatPrice(item.precio * item.stock)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default function CartModal({ onOpenCheckout }: CartModalProps) {
    const {
      items,
      isOpen,
      closeCart,
      updateQuantity,
      removeItem,
      clearCart,
      getTotalPrice,
      getTotalItems,
    } = useCartStore()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(price)
    }

    if (!isOpen || !mounted) return null

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Overlay mejorado */}
        <div
          className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
          style={{background: 'linear-gradient(45deg, rgba(239,186,204,0.3), rgba(232,164,197,0.4))'}}
          onClick={closeCart}
        />

        {/* Modal mejorado */}
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col
  rounded-l-3xl border-l border-gray-100">
          {/* Header mejorado */}
          <div
            className="flex items-center justify-between p-6 text-white rounded-tl-3xl"
            style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Mi Carrito</h2>
                <p className="text-sm text-white/80">{getTotalItems()} {getTotalItems() === 1 ? 'producto' :
  'productos'}</p>
              </div>
            </div>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div
                  className="rounded-full p-6 mb-6"
                  style={{background: 'linear-gradient(135deg, #F5E6ED, #EFBACC)'}}
                >
                  <ShoppingCart className="h-20 w-20 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</h3>
                <p className="text-gray-500 mb-4">
                  Agrega algunos productos para continuar con tu compra
                </p>
                <button
                  onClick={closeCart}
                  className="text-white px-6 py-2 rounded-lg font-medium transition-all hover:scale-105"
                  style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
                >
                  Explorar productos
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item.product}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer mejorado */}
          {items.length > 0 && (
            <div className="border-t bg-gradient-to-r from-pink-50 to-rose-50 p-6 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold" style={{color: '#D68BB0'}}>
                  {formatPrice(getTotalPrice())}
                </span>
              </div>

              {/* Botones */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    closeCart()
                    onOpenCheckout?.()
                  }}
                  className="w-full text-white py-4 rounded-2xl font-semibold transition-all duration-300
  hover:scale-[1.02] shadow-lg"
                  style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #E8A4C5, #D68BB0)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(to right, #EFBACC, #E8A4C5)'
                  }}
                >
                  Proceder con la compra
                </button>

                <button
                  onClick={clearCart}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-2xl font-medium
  transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }