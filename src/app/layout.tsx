import type { Metadata } from 'next'
  import { Inter } from 'next/font/google'
  import './globals.css'
  import { Toaster } from 'react-hot-toast'

  const inter = Inter({ subsets: ['latin'] })

  export const metadata: Metadata = {
    title: 'Tienda Virtual Estética - Productos y Servicios de Belleza',
    description: 'Encuentra los mejores productos y servicios de estética de alta calidad. Desde tratamientos con Botox hasta servicios de depilación láser.',
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="es">
        <body className={inter.className}>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </body>
      </html>
    )
  }