const Path = require('path')
const Webpack = require('webpack')

const BUILD_DIR = Path.resolve(__dirname, 'public/script')

module.exports = {
  entry: {
    bundle: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/import-export-visualization/script/__webpack_hmr',
      './app/App.jsx',
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/import-export-visualization/script/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-2'],
            plugins: ['react-hot-loader/babel'],
          }
        }
      },

      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            url: false
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }

    ]
  
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  // NB: Plugins object is *replaced* in production!
  // See webpack.prod.config.js
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
    }),
  ]
}
