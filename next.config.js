/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'fraction.js/dist/fraction.js': 'fraction.js',
    }
    return config
  },
}

module.exports = nextConfig