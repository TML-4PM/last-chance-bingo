const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    // Ignore ESLint warnings during production builds
    ignoreDuringBuilds: true
  }
});
