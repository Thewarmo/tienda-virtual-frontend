'use client'
  import ProductGrid from '@/components/ProductGrid'
  import StoreLayout from '@/components/StoreLayout'
  import { Sparkles, Shield, Clock, ShoppingCart, Package, MessageCircle, Star } from 'lucide-react'

  export default function HomePage() {
    return (
      <StoreLayout>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50" style={{backgroundImage:'linear-gradient(to bottom right, #fdf2f8, #ffffff, #f5e6ed)'}}>
          {/* Hero Section */}
          <section className="relative text-white overflow-hidden" style={{background: 'linear-gradient(to right,#EFBACC, #E8A4C5, #D68BB0)'}}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-white/5bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
            </div>

            <div className="relative container mx-auto px-4 py-16 md:py-24">
              <div className="text-center max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <Sparkles className="h-8 w-8 mr-3 text-yellow-200" />
                  <span className="text-sm font-medium px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                    Productos Premium de Estética
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                  CSA Tienda Estetica
                </h1>

                <p className="text-lg md:text-xl mb-8 leading-relaxed text-white/90">
                  Descubre nuestra selección exclusiva de productos y servicios de estética profesional.
                  <br className="hidden md:block" />
                  Desde tratamientos con Botox hasta servicios de depilación láser.
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Productos Originales</h3>
                    <p className="text-sm text-white/80">Garantía de autenticidad</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-4 flexitems-center justify-center">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Entrega Rápida</h3>
                    <p className="text-sm text-white/80">Contacto inmediato vía WhatsApp</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 w-16 h-16 mx-auto mb-4 flexitems-center justify-center">
                      <Sparkles className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Calidad Premium</h3>
                    <p className="text-sm text-white/80">Los mejores productos del mercado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wave separator */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0,100 C240,0 480,0 720,50 C960,100 1200,100 1440,50 L1440,100 Z"
                  fill="#F5E6ED"
                />
              </svg>
            </div>
          </section>

          {/* Main content */}
          <main className="container mx-auto px-4 py-12">
            <ProductGrid />
          </main>

          {/* Footer mejorado */}
          <footer className="text-black relative overflow-hidden" style={{background: 'linear-gradient(to bottomright, #D68BB0, #C67AA3, #B8699A)'}}>
            {/* Patrón de fondo decorativo */}
            <div className="absolute inset-0 bg-black/5"></div>
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-white/5bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
            </div>

            {/* Wave separator superior */}
            <div className="relative">
              <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,0 Z" fill="#F5E6ED"/>
              </svg>
            </div>

            <div className="relative container mx-auto px-4 py-16">
              <div className="text-center max-w-4xl mx-auto">
                {/* Logo y título */}
                <div className="mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 mr-3">
                      <ShoppingCart className="h-8 w-8 text-black" />
                    </div>
                    <h3 className="text-3xl font-bold">Tienda Virtual Estética</h3>
                  </div>
                  <p className="text-black/90 text-lg">Tu belleza es nuestra prioridad</p>
                </div>

                {/* Características destacadas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flexitems-center justify-center">
                      <Package className="h-8 w-8 text-black" />
                    </div>
                    <h4 className="font-semibold mb-2">Productos Originales</h4>
                    <p className="text-sm text-black/80">Garantía de autenticidad en cada producto</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flexitems-center justify-center">
                      <MessageCircle className="h-8 w-8 text-black" />
                    </div>
                    <h4 className="font-semibold mb-2">Contacto WhatsApp</h4>
                    <p className="text-sm text-black/80">Atención personalizada y rápida</p>
                  </div>

                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <Star className="h-8 w-8 text-black" />
                    </div>
                    <h4 className="font-semibold mb-2">Calidad Premium</h4>
                    <p className="text-sm text-black/80">Los mejores tratamientos estéticos</p>
                  </div>
                </div>

                {/* Separador decorativo */}
                <div className="border-t border-white/20 pt-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-black/90">© 2025 CSA Tienda Estética. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-4 text-sm text-black/70">
                      <span>Productos profesionales</span>
                      <span>•</span>
                      <span>Servicio de calidad</span>
                      <span>•</span>
                      <span>Contacto directo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </StoreLayout>
    )
  }