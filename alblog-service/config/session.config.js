const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const config = require('./index')

module.exports = {
  secret: config.session_secret,
  resave: false,
  cookie: {
    httpOnly: false
  },
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  }),
  saveUninitialized: true
};
