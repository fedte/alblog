/* const ExtractTextPlugin = require('extract-text-webpack-plugin')
const sassResources = require('../src/scss')

let loaders = {}
if (false && process.env.NODE_ENV === 'production') {
  loaders = {
    css: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader' }),
    less: ExtractTextPlugin.extract({ fallback: 'vue-style-loader', use: 'css-loader!postcss-loader!less-loader' }),
    scss: ExtractTextPlugin.extract({ 
      fallback: 'vue-style-loader', 
      // use: 'css-loader!postcss-loader!sass-loader'
      use: [
        "css-loader",
        'postcss-loader',
        'sass-loader',
        'scss-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: sassResources
          }
        }
      ]
    })
  }
} else {
  loaders = {
    css: 'vue-style-loader!css-loader',
    less: 'vue-style-loader!css-loader!postcss-loader!less-loader',
    scss: [
      "vue-style-loader",
      "css-loader",
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: sassResources
        }
      }
    ]
  }
}
module.exports = {
  loaders
} */


'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction,
    usePostCSS: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
