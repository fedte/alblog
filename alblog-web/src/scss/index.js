const path = require('path')

const resources = [
  '_common.scss'
]

module.exports = resources.map(file => path.resolve(__dirname, file))
