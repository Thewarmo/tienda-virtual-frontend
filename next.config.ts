const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tienda-virtual-catalogo-afb-20250814.s3.us-east-1.amazonaws.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'tienda-virtual-insumos-production.up.railway.app',
          port: '',
          pathname: '/**',
        }
      ],
    },
  }

export default nextConfig
