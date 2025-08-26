import type { Metadata } from 'next'
  import { Inter } from 'next/font/google'
  import './globals.css'
  import { Toaster } from 'react-hot-toast'

  const inter = Inter({ subsets: ['latin'] })

  export const metadata: Metadata = {
    title: 'CSA Tienda Estética - Productos y Servicios Premium de Belleza',
    description: 'Encuentra los mejores productos de estética profesional: Botox, Sculptra, depilación láser y más. Calidad garantizada, atención personalizada vía WhatsApp.',
    keywords: [
      'productos estética',
      'botox colombia',
      'sculptra',
      'depilación láser',
      'tratamientos belleza',
      'estética profesional',
      'productos originales',
      'belleza colombia'
    ],
    authors: [{ name: 'Tienda Virtual Estética' }],
    creator: 'Tienda Virtual Estética',
    publisher: 'Tienda Virtual Estética',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: 'https://tu-dominio.vercel.app',
      title: 'Tienda Virtual Estética - Productos Premium de Belleza',
      description: 'Productos de estética profesional con calidad garantizada. Botox, Sculptra, depilación láser ymás.',
      siteName: 'Tienda Virtual Estética',
      images: [
        {
          url: '/og-image.jpg', // Crearemos esta imagen
          width: 1200,
          height: 630,
          alt: 'Tienda Virtual Estética - Productos Premium',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Tienda Virtual Estética - Productos Premium de Belleza',
      description: 'Productos de estética profesional con calidad garantizada.',
      images: ['/og-image.jpg'],
    },
    verification: {
      google: 'tu-codigo-de-verificacion-google', // Reemplaza cuando tengas el código
    },
  }

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="es">
        <head>
          <link rel="canonical" href="https://tu-dominio.vercel.app" />
          <meta name="theme-color" content="#EFBACC" />
          <meta name="msapplication-TileColor" content="#EFBACC" />
        </head>
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
