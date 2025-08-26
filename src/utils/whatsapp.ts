import { CustomerData, CartItem } from '@/types'

  export const generateWhatsAppMessage = (
    customerData: CustomerData,
    cartItems: CartItem[],
    total: number
  ): string => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(price)
    }

    // Header del mensaje
    let message = `🛒 *NUEVO PEDIDO - TIENDA VIRTUAL*\n\n`

    // Datos del cliente
    message += `👤 *DATOS DEL CLIENTE:*\n`
    message += `• Nombre: ${customerData.name}\n`
    message += `• Teléfono: ${customerData.phone}\n`
    message += `• Ubicación: ${customerData.location}\n\n`

    // Detalles del pedido
    message += `📋 *DETALLES DEL PEDIDO:*\n`
    cartItems.forEach((item, index) => {
      const subtotal = item.product.precio * item.quantity
      message += `${index + 1}. *${item.product.nombre}*\n`
      message += `   • Cantidad: ${item.quantity}\n`
      message += `   • Precio unitario: ${formatPrice(item.product.precio)}\n`
      message += `   • Tipo: ${item.product.tipoItem}\n`
      message += `   • Código: ${item.product.codigo}\n`
      message += `   • Subtotal: ${formatPrice(subtotal)}\n\n`
    })

    // Total
    message += `💰 *TOTAL: ${formatPrice(total)}*\n\n`

    // Footer
    message += `📱 Generado desde la tienda virtual\n`
    message += `🕐 ${new Date().toLocaleString('es-CO')}`

    return message
  }

  export const sendToWhatsApp = (
    phoneNumber: string,
    message: string
  ): void => {
    // Limpiar el número de teléfono (remover espacios, guiones, etc.)
    const cleanPhone = phoneNumber.replace(/[\s-()]/g, '')

    // Asegurarse de que tenga código de país (Colombia +57)
    let formattedPhone = cleanPhone
    if (!formattedPhone.startsWith('+')) {
      if (formattedPhone.startsWith('57')) {
        formattedPhone = '+' + formattedPhone
      } else if (formattedPhone.startsWith('3')) {
        formattedPhone = '+57' + formattedPhone
      } else {
        formattedPhone = '+57' + formattedPhone
      }
    }

    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message)

    // Construir URL de WhatsApp
    const whatsappURL = `https://wa.me/${formattedPhone.replace('+', '')}?text=${encodedMessage}`

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank')
  }