// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Activa Turbopack (estable en Next.js 15)
  turbopack: {},

  images: {
    domains: [
      "i.pravatar.cc",
      "tile.openstreetmap.org",
      "basemaps.cartocdn.com",
    ],
  },

  env: {
    NEXT_PUBLIC_MAP_TOKEN: process.env.NEXT_PUBLIC_MAP_TOKEN,
    NEXT_PUBLIC_MAP_STYLE: process.env.NEXT_PUBLIC_MAP_STYLE,
  },

  // Puedes añadir rewrites/redirects aquí:
  // async rewrites() { return [{ source: '/old', destination: '/' }]; },
  // async redirects() { return [{ source: '/logout', destination: '/', permanent: true }]; },
};

export default nextConfig;
