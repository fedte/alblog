const mongoose = require('mongoose');
const config   = require('../../config');
const logger   = require('../../lib/logger.lib')

// const mongoConfig = 'mongodb://' + config.db.user + ':' + config.db.pass + '@' + config.db.host + ':' + config.db.port + '/' + config.db.db,
const mongoConfig = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.db
mongoose.connect(mongoConfig, {
  server: {poolSize: 20},
  // user: config.db.user,
  // pass: config.db.pass
}, function (err) {
  if (err) {
    logger.database('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user.model');

exports.User         = mongoose.model('User');
