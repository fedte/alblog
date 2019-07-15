const fs = require('fs')
const moment = require('moment')
var archiver = require('archiver')

const pkg = require('../package.json')
const config = require('../config')

const path = config.build.assetsRoot

let fileName = `${path}/${pkg.name}_h5_prod_v${pkg.version}_${moment().format("YYYYMMDDHHmm")}.zip`
let output = fs.createWriteStream(fileName)
let archive = archiver('zip')

archive.on('error', function(err){
  throw err
})
archive.on('finish', function(err){
  console.log('----------------')
  console.log('打包完成')
  console.log(fileName)
  console.log('------ End------')
})
archive.pipe(output)

archive.directory(`${path}/h5`, 'h5')
archive.file(`${config.build.index}`, { name: `h5-index.html` })
archive.file(`${config.build.update}`, { name: `update.html` })
archive.finalize();