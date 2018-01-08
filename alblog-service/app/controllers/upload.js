const validator      = require('validator')
const eventproxy     = require('eventproxy')
const uuid           = require('node-uuid')
const utility        = require('utility')
const ROOT           = process.cwd()

const config         = require(ROOT + '/config')
const loggers        = require(ROOT + '/lib/logger.lib')

const tools          = require('../utils/tools')
const resJSON        = tools.resJSON
const cache          = require('../utils/cache')

exports.upload = function (req, res, next) {
  
}