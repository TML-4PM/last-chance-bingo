const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  eslint: {
    // This option disables ESLint errors during production builds.
    ignoreDuringBuilds: true,
  }
});
