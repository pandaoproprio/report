/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'utfs.io', 'lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

export default nextConfig
