const Webpack = require('webpack')

const config = require('./webpack.config.js')

config.plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

  new Webpack.optimize.UglifyJsPlugin(),

]

module.exports = config

