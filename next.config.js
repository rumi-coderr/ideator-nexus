/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // static HTML export for GitHub Pages
}

module.exports = nextConfig

// Add basePath for GitHub Pages deployment
tempConfig = {
  ...nextConfig,
  basePath: process.env.NODE_ENV === 'production' ? '/ideator-nexus' : '',
};
module.exports = tempConfig;
