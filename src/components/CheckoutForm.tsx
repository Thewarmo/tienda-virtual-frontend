 'use client'
  import { useState } from 'react'
  import { useCartStore } from '@/hooks/useCartStore'
  import { CustomerData } from '@/types'
  import { X, User, Phone, MapPin, MessageCircle, ShoppingBag, Sparkles } from 'lucide-react'

  interface CheckoutFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (customerData: CustomerData) => void
  }

  export default function CheckoutForm({ isOpen, onClose, onSubmit }: CheckoutFormProps) {
    const { getTotalPrice, getCartSummary } = useCartStore()
    const [customerData, setCustomerData] = useState<CustomerData>({
      name: '',
      phone: '',
      location: '',
    })
    const [errors, setErrors] = useState<Partial<CustomerData>>({})

    const validateForm = (): boolean => {
      const newErrors: Partial<CustomerData> = {}

      if (!customerData.name.trim()) {
        newErrors.name = 'El nombre es requerido'
      }

      if (!customerData.phone.trim()) {
        newErrors.phone = 'El teléfono es requerido'
      } else if (!/^\+?[\d\s-()]+$/.test(customerData.phone)) {
        newErrors.phone = 'Formato de teléfono inválido'
      }

      if (!customerData.location.trim()) {
        newErrors.location = 'La ubicación es requerida'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()

      if (validateForm()) {
        onSubmit(customerData)
      }
    }

    const handleInputChange = (field: keyof CustomerData, value: string) => {
      setCustomerData(prev => ({ ...prev, [field]: value }))

      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    }

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(price)
    }

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Overlay mejorado */}
        <div
          className="absolute inset-0 backdrop-blur-md transition-opacity duration-300"
          style={{background: 'linear-gradient(45deg, rgba(239,186,204,0.4), rgba(232,164,197,0.5))'}}
          onClick={onClose}
        />

        {/* Modal mejorado */}
        <div className="absolute inset-x-4 top-4 bottom-4 md:inset-x-auto md:left-1/2 md:transform
  md:-translate-x-1/2 md:w-full md:max-w-lg bg-white shadow-2xl rounded-3xl flex flex-col border border-pink-100
  overflow-hidden">
          {/* Header mejorado */}
          <div
            className="flex items-center justify-between p-6 text-white rounded-t-3xl"
            style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
          >
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Finalizar Pedido</h2>
                <p className="text-sm text-white/80">Solo un paso más para completar tu compra</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Resumen del pedido mejorado */}
            <div
              className="rounded-2xl p-5 border"
              style={{
                background: 'linear-gradient(135deg, #F5E6ED, #EFBACC)',
                borderColor: '#E8A4C5'
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5" style={{color: '#D68BB0'}} />
                <h3 className="font-bold text-gray-800">Resumen del pedido</h3>
              </div>

              <div className="space-y-3 text-sm text-gray-700 mb-4">
                <p className="leading-relaxed">{getCartSummary()}</p>
              </div>

              <div className="border-t border-pink-300/50 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold" style={{color: '#D68BB0'}}>
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
              </div>
            </div>

            {/* Formulario mejorado */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5" style={{color: '#D68BB0'}} />
                <h3 className="font-bold text-gray-800">Información de contacto</h3>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <User className="h-4 w-4 inline mr-2" style={{color: '#D68BB0'}} />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none text-black
  ${
                    errors.name
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-pink-200 focus:border-pink-400 bg-pink-50/30'
                  } focus:ring-4 focus:ring-pink-100`}
                  placeholder="Ingresa tu nombre completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-2 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Phone className="h-4 w-4 inline mr-2" style={{color: '#D68BB0'}} />
                  Número de WhatsApp *
                </label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none text-black
  ${
                    errors.phone
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-pink-200 focus:border-pink-400 bg-pink-50/30'
                  } focus:ring-4 focus:ring-pink-100`}
                  placeholder="+57 300 123 4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-2 font-medium">{errors.phone}</p>
                )}
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  Nos contactaremos contigo por WhatsApp
                </p>
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="h-4 w-4 inline mr-2" style={{color: '#D68BB0'}} />
                  Ubicación *
                </label>
                <textarea
                  value={customerData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none text-black
  resize-none ${
                    errors.location
                      ? 'border-red-400 focus:border-red-500 bg-red-50'
                      : 'border-pink-200 focus:border-pink-400 bg-pink-50/30'
                  } focus:ring-4 focus:ring-pink-100`}
                  placeholder="Dirección completa, barrio, ciudad, puntos de referencia..."
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-2 font-medium">{errors.location}</p>
                )}
              </div>

              {/* Botón submit mejorado */}
              <button
                type="submit"
                className="w-full text-white py-4 rounded-2xl font-bold transition-all duration-300 flex
  items-center justify-center gap-3 hover:scale-[1.02] shadow-xl text-lg"
                style={{background: 'linear-gradient(to right, #EFBACC, #E8A4C5)'}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #E8A4C5, #D68BB0)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #EFBACC, #E8A4C5)'
                }}
              >
                <MessageCircle className="h-6 w-6" />
                Enviar pedido por WhatsApp
              </button>
            </form>

            {/* Footer informativo */}
            <div className="text-center p-4 bg-pink-50/50 rounded-2xl border border-pink-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                🔒 Tu información es segura. Al enviar tu pedido, serás redirigido a WhatsApp
                con todos los detalles para confirmar tu compra.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }