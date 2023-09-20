/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    ROOT_API: process.env.ROOT_API
  }
}

module.exports = nextConfig
