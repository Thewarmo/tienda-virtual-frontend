import { Product, Promotion } from '@/types'

  const API_BASE = '/api'

  export const fetchProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`)
    if (!response.ok) throw new Error('Error al cargar productos')
    return response.json()
  }

  export const fetchPromotions = async (): Promise<Promotion[]> => {
    const response = await fetch(`${API_BASE}/promocion`)
    if (!response.ok) throw new Error('Error al cargar promociones')
    return response.json()
  }

  // Para imágenes, usar directamente tu API externa
  export const getProductImageUrl = (productId: number): string => {
    return `https://tienda-virtual-insumos-production.up.railway.app/api/files/stream/producto/${productId}`
  }