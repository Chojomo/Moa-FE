const path = require('path')

module.exports = {
  webpack: (config, { isServer }) => {
    const newConfig = { ...config }

    newConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    if (!isServer) {
      newConfig.resolve.alias.yjs = path.resolve(__dirname, 'node_modules/yjs')
    }

    return newConfig
  },
}
