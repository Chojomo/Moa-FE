const path = require('path')

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moa.ichubtou.com',
        port: '',
        pathname: '/api/v1/diaries/**',
      },
      {
        protocol: 'http',
        hostname: '39.115.81.249',
        port: '9000',
        pathname: '/moa/diaries/**',
      },
      {
        protocol: 'https',
        hostname: 'image.ichubtou.com',
        port: '',
        pathname: '/moa/diaries/**',
      },
      {
        protocol: 'https',
        hostname: 'gjs-photoday-practice.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
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
