export interface Product {
    id: number
    codigo: string
    nombre: string
    descripcion: string
    precio: number
    stock: number
    categoriaId: number
    tipoItem: 'PRODUCTO' | 'SERVICIO'
    activo: boolean
    urlImagen: string | null
  }

  export interface Promotion {
    id: number
    nombre: string
    descripcion: string
    porcentajeDescuento: number
    fechaInicio: string
    fechaFin: string
    activa: boolean
    productoId: number
    nombreProducto: string
  }

  export interface CartItem {
    product: Product
    quantity: number
  }

  export interface CustomerData {
    name: string
    phone: string
    location: string
  }

  // Tipos para manejar las APIs
  export interface ApiResponse<T> {
    data: T
    loading: boolean
    error: string | null
  }