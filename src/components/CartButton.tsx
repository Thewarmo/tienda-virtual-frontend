 'use client'
  import { useEffect, useState } from 'react'
  import { useCartStore } from '@/hooks/useCartStore'
  import { ShoppingCart } from 'lucide-react'

  

  export default function CartButton() {
    const { openCart, getTotalItems, items } = useCartStore()
    const [itemCount, setItemCount] = useState(0)
    const [mounted, setMounted] = useState(false)

    // Evitar problemas de hidratación
    useEffect(() => {
      setMounted(true)
    }, [])

    // Actualizar contador cuando cambien los items del carrito
    useEffect(() => {
      if (mounted) {
        setItemCount(getTotalItems())
      }
    }, [items, mounted, getTotalItems])

    const handleClick = () => {
      openCart()
    }

    // No renderizar el contador hasta que esté montado
    if (!mounted) {
      return (
        <button
          onClick={handleClick}
          className="fixed bottom-6 right-6 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300
  hover:scale-105 z-40 group"
          style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
        >
          <div className="relative">
            <ShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </div>
        </button>
      )
    }

    return (
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 text-white p-4 rounded-2xl shadow-2xl transition-all duration-300
  hover:scale-105 z-40 group"
        style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #E8A4C5, #D68BB0)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(to right, #EFBACC, #E8A4C5)'
        }}
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          {itemCount > 0 && (
            <span
              className="absolute -top-3 -right-3 text-white text-xs font-bold rounded-full h-6 w-6 flex
  items-center justify-center shadow-lg animate-pulse"
              style={{background: 'linear-gradient(to right, #D68BB0, #C67AA3)'}}
            >
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent
  transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0
  group-hover:opacity-100"></div>
      </button>
    )
  }