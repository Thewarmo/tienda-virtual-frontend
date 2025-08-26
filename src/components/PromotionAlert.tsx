  'use client'
  import { useState, useEffect } from 'react'
  import { Promotion } from '@/types'
  import { fetchPromotions } from '@/utils/api'
  import { X, Gift, Clock, Percent, Sparkles } from 'lucide-react'

  export default function PromotionAlert() {
    const [promotion, setPromotion] = useState<Promotion | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasShownFirst, setHasShownFirst] = useState(false)

    useEffect(() => {
      let firstTimer: NodeJS.Timeout
      let recurringTimer: NodeJS.Timeout

      const loadPromotions = async () => {
        try {
          const promotions = await fetchPromotions()
          const activePromotions = promotions.filter(p => p.activa)

          if (activePromotions.length > 0) {
            // Función para mostrar una promoción aleatoria
            const showRandomPromotion = () => {
              const randomPromotion = activePromotions[
                Math.floor(Math.random() * activePromotions.length)
              ]
              setPromotion(randomPromotion)
              setIsVisible(true)
            }

            if (!hasShownFirst) {
              // Primera promoción después de 5 minutos
              firstTimer = setTimeout(() => {
                showRandomPromotion()
                setHasShownFirst(true)

                // Promociones recurrentes cada 10 minutos
                recurringTimer = setInterval(() => {
                  showRandomPromotion()
                }, 10 * 60 * 1000) // 10 minutos

              }, 5 * 60 * 1000) // 5 minutos
            }
          }
        } catch (error) {
          console.error('Error loading promotions:', error)
        }
      }

      loadPromotions()

      return () => {
        if (firstTimer) clearTimeout(firstTimer)
        if (recurringTimer) clearInterval(recurringTimer)
      }
    }, [hasShownFirst])

    const handleClose = () => {
      setIsVisible(false)
      setTimeout(() => setPromotion(null), 300)
    }

    if (!promotion || !isVisible) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay con nueva paleta */}
        <div
          className="absolute inset-0 backdrop-blur-sm transition-opacity duration-300"
          style={{background: 'linear-gradient(45deg, rgba(239,186,204,0.3), rgba(232,164,197,0.4))'}}
          onClick={handleClose}
        />

        {/* Modal mejorado con nueva paleta */}
        <div
          className={`text-white p-6 rounded-3xl shadow-2xl max-w-md w-full transform transition-all duration-300
  relative overflow-hidden ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          style={{background: 'linear-gradient(135deg, #EFBACC, #E8A4C5, #D68BB0)'}}
        >
          {/* Decoración de fondo sutil */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="h-8 w-8 animate-pulse" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Gift className="h-6 w-6 text-yellow-200" />
              </div>
              <span className="font-bold text-lg">¡PROMOCIÓN ESPECIAL!</span>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenido */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">{promotion.nombre}</h3>
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Percent className="h-8 w-8 text-yellow-200" />
                </div>
                <span className="text-4xl font-bold text-yellow-200">
                  {promotion.porcentajeDescuento}% OFF
                </span>
              </div>
            </div>

            <p className="text-sm text-white/90 text-center leading-relaxed">
              {promotion.descripcion}
            </p>

            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/30">
              <p className="text-xs font-medium mb-1 text-white/80">Producto en promoción:</p>
              <p className="font-bold text-lg">{promotion.nombreProducto}</p>
            </div>

            {/* Fechas */}
            <div className="flex items-center justify-center gap-2 text-sm bg-white/10 rounded-full py-2 px-4">
              <Clock className="h-4 w-4" />
              <span>
                Válida hasta: {new Date(promotion.fechaFin).toLocaleDateString('es-CO')}
              </span>
            </div>

            {/* Botón de acción */}
            <button
              onClick={handleClose}
              className="w-full bg-white font-bold py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02]
  shadow-lg text-lg"
              style={{color: '#D68BB0'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f8f9fa'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white'
              }}
            >
              🛍️ ¡Ver productos ahora!
            </button>
          </div>
        </div>
      </div>
    )
  }