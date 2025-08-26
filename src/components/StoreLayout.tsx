'use client'
import { useState } from 'react'
import { useCartStore } from '@/hooks/useCartStore'
import { CustomerData } from '@/types'
import CartModal from './CartModal'
import CartButton from './CartButton'
import CheckoutForm from './CheckoutForm'
import PromotionAlert from './PromotionAlert'
import { generateWhatsAppMessage, sendToWhatsApp } from '@/utils/whatsapp'
import Swal from 'sweetalert2'

interface StoreLayoutProps {
  children: React.ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const { items, getTotalPrice, clearCart } = useCartStore()

  // Número de WhatsApp de la tienda (reemplaza con el tuyo)
  const STORE_WHATSAPP = '+57 320 3374724' // Cambia este número

  const handleCheckout = (customerData: CustomerData) => {
    // Generar mensaje de WhatsApp
    const message = generateWhatsAppMessage(
      customerData,
      items,
      getTotalPrice()
    )

    // Limpiar carrito y cerrar modales
    clearCart()
    setIsCheckoutOpen(false)

    // Usar SweetAlert2 para mostrar un mensaje más atractivo
    Swal.fire({
      title: '¡Pedido enviado con éxito!',
      text: 'En unos segundos serás redirigido a WhatsApp para finalizar tu compra',
      icon: 'success',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#D68BB0',
      background: '#FFF5F8',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then(() => {
      // Enviar a WhatsApp después de que se cierre la alerta
      sendToWhatsApp(STORE_WHATSAPP, message)
    })
  }

  return (
    <>
      {children}

      {/* Componentes flotantes */}
      <CartButton onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CartModal onOpenCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSubmit={handleCheckout}
      />
      <PromotionAlert />
    </>
  )
}