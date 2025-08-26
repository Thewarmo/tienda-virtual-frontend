import { create } from 'zustand'
  import { persist } from 'zustand/middleware'
  import { CartItem, Product } from '@/types'

  interface CartStore {
    items: CartItem[]
    isOpen: boolean

    // Acciones del carrito
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    updateQuantity: (productId: number, quantity: number) => void
    clearCart: () => void

    // Acciones del modal
    openCart: () => void
    closeCart: () => void

    // Getters
    getTotalItems: () => number
    getTotalPrice: () => number
    getCartSummary: () => string
  }

  export const useCartStore = create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],
        isOpen: false,

        addItem: (product) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product.id === product.id
            )

            if (existingItem) {
              return {
                items: state.items.map((item) =>
                  item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              }
            }

            return {
              items: [...state.items, { product, quantity: 1 }],
            }
          }),

        removeItem: (productId) =>
          set((state) => ({
            items: state.items.filter((item) => item.product.id !== productId),
          })),

        updateQuantity: (productId, quantity) =>
          set((state) => {
            if (quantity <= 0) {
              return {
                items: state.items.filter((item) => item.product.id !== productId),
              }
            }

            return {
              items: state.items.map((item) =>
                item.product.id === productId
                  ? { ...item, quantity }
                  : item
              ),
            }
          }),

        clearCart: () => set({ items: [] }),

        openCart: () => set({ isOpen: true }),
        closeCart: () => set({ isOpen: false }),

        getTotalItems: () => {
          const state = get()
          return state.items.reduce((total, item) => total + item.quantity, 0)
        },

        getTotalPrice: () => {
          const state = get()
          return state.items.reduce(
            (total, item) => total + item.product.precio * item.quantity,
            0
          )
        },

        getCartSummary: () => {
          const state = get()
          return state.items
            .map((item) => `${item.quantity}x ${item.product.nombre}`)
            .join(', ')
        },
      }),
      {
        name: 'cart-storage', // nombre en localStorage
      }
    )
  )