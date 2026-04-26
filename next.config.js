module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'fraction.js/dist/fraction.js': require.resolve('fraction.js'),
    }
    return config
  },
}