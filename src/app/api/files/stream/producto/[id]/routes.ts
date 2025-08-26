import { NextRequest, NextResponse } from 'next/server'

  const EXTERNAL_API = 'https://tienda-virtual-insumos-production.up.railway.app/api'

  export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const response = await fetch(`${EXTERNAL_API}/files/stream/producto/${params.id}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Obtener el tipo de contenido y el stream
      const contentType = response.headers.get('content-type') || 'image/jpeg'
      const imageBuffer = await response.arrayBuffer()

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
          'Access-Control-Allow-Origin': '*',
        },
      })
    } catch (error) {
      console.error('Error fetching image:', error)
      return NextResponse.json(
        { error: 'Error al cargar imagen' },
        { status: 500 }
      )
    }
  }