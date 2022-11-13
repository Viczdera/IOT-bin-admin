/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  },
}

module.exports = nextConfig
