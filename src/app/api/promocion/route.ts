import { NextResponse } from 'next/server'

  const EXTERNAL_API = 'https://tienda-virtual-insumos-production.up.railway.app/api'

  export async function GET() {
    try {
      const response = await fetch(`${EXTERNAL_API}/promocion`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return NextResponse.json(data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    } catch (error) {
      console.error('Error fetching promotions:', error)
      return NextResponse.json(
        { error: 'Error al cargar promociones' },
        { status: 500 }
      )
    }
  }