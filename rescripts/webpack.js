const { appendWebpackPlugin } = require('@rescripts/utilities') // eslint-disable-line import/no-extraneous-dependencies
const CircularDependencyPlugin = require('circular-dependency-plugin') // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  webpack: config => {
    let nextConfig = config

    nextConfig = appendWebpackPlugin(
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: true,
      }),
      config,
    )

    const { rules } = nextConfig.module
    const loaders = rules.find(rule => rule.oneOf)

    loaders.oneOf.unshift({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      options: {
        name: '[path][name].[ext]',
      },
    })

    nextConfig.optimization.splitChunks.name = true

    return nextConfig
  },
}
