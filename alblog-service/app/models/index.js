const mongoose = require('mongoose')
const ROOT     = process.cwd()
const config   = require(ROOT + '/config')
const logger   = require(ROOT + '/lib/logger.lib')

// const mongoConfig = 'mongodb://' + config.db.user + ':' + config.db.pass + '@' + config.db.host + ':' + config.db.port + '/' + config.db.db,
const mongoConfig = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.db
// mongoose.Promise = global.Promise
mongoose.connect(mongoConfig, {
  server: {poolSize: 20},
  user: config.db.user,
  pass: config.db.pass
}, function (err) {
  if (err) {
    logger.database('connect to %s error: ', config.db, err.message)
    process.exit(1)
  }
})

// models
require('./user.model')
require('./article.model')
require('./catetory.model')
require('./comment.model')

exports.User         = mongoose.model('User')
exports.Article      = mongoose.model('Article')
exports.Catetory     = mongoose.model('Catetory')
exports.Comment      = mongoose.model('Comment')
