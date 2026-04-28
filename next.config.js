/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // static HTML export for GitHub Pages
}

module.exports = nextConfig
