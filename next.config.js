/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export', // static HTML export for GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/ideator-nexus' : '', // basePath for GitHub Pages
};

module.exports = nextConfig;
