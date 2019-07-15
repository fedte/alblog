/*
 * @Descripttion: 正式环境打包配置
 * @version:
 * @Author: falost
 * @Date: 2019-07-12 09:19:11
 * @LastEditors: falost
 * @LastEditTime: 2019-07-15 11:03:14
 */
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const fs = require('fs')
const pkg = require('../package.json')
const versions = pkg.version.split('.')
let version = ''

for (let i = 0; i < versions.length; i++) {
  if (i !== versions.length - 1) {
    version += versions[i] + '.'
  } else {
    version += parseInt(versions[versions.length - 1]) + 1
  }
}
pkg.updated = new Date()
pkg.version = version
console.log(pkg)
fs.writeFileSync('package.json', JSON.stringify(pkg, '', '\t'))
fs.writeFileSync('src/components/version.vue', `<template>
  <div class="pt15 pl15 pr15">
    <div><span>Name: </span><span>${pkg.name}</span></div>
    <div><span>Description: </span><span>${pkg.description}</span></div>
    <div><span>Version: </span><span>v${pkg.version}</span></div>
    <div><span>Author: </span><span>${pkg.author}</span></div>
    <div><span>Time: </span><span>${pkg.updated}</span></div>
  </div>
</template>`)

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
