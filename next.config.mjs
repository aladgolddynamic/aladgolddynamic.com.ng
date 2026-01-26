/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/news",
        destination: "/blog",
      },
      {
        source: "/news/:path*",
        destination: "/blog/:path*",
      },
    ]
  },
}

export default nextConfig
