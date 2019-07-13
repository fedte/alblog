const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
const resolve = file => path.resolve(__dirname, file)

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      '@': resolve('../src'),
      'src': resolve('../src'),
      'utils': resolve('../src/utils'),
      'views': resolve('../src/views'),
      'assets': resolve('../src/assets'),
      'config': resolve('../config'),
      'components': resolve('../src/components')
    }
  },

  output: {
    path: resolve('../output'),
    publicPath: '/output/',
    filename: 'client-bundle.[chunkhash].js'
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.vue$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: vueConfig
      // },
      ...(config.dev.useEslint ? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.(sass|scss)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ],
        include: [resolve('../src')]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('../src'),
          resolve('../test')
        ],
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: {
        // use custom postcss plugins
        postcss: [require('autoprefixer')()]
      }
    })
  ]
}
