import { MetadataRoute } from 'next'

  export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tu-dominio.vercel.app' // Cambia por tu dominio

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      // Puedes agregar más páginas aquí si las tienes
    ]
  }