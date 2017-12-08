const mongoose   = require('mongoose')
const UserModel  = mongoose.model('User')
const eventproxy = require('eventproxy')
const validator   = require('validator')
const UserProxy  = require('../proxy').User

const config     = require('../../config')
const tools      = require('../utils/tools')
const resJSON    = tools.resJSON
const cache      = require('../utils/cache')

/**
 * @name adminRequired
 * @desc 需要管理员权限
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.adminRequired = function (req, res, next) {
  let userId   = validator.trim(req.body.userId || '')
  let uuid     = validator.trim(req.body.uuid || '')
  // 验证
  let message
  if (userId === '') {
    message = 'userId 不能为空';
  } else if (uuid === '') {
    message = 'uuid 不能为空';
  }
  // END 验证

  if (message) {
    return resJSON(res, true, 10005, message,  {isLogin: false});
  }
  let ep = new eventproxy()
  ep.fail(next)

  ep.on('login_err', function (code, msg) {
    return resJSON(res, true, code, msg, {isLogin: false})
  });

  ep.on('get_user', function (user) {
    if (!config.admins.hasOwnProperty(user.loginname)) {
      return resJSON(res, true, 10151, "需要管理员权限")
    }
    next()
  });
  // 在缓存中读取登录状态
  cache.get('user_' + userId, function(err, res) {
    if (err) {
      ep.emit("login_err", 10140, "登录超时")
    }
    if (uuid === res) {
      cache.set('user_' + userId, uuid, tools.time.m() * 30 / 1000)
      UserProxy.getUserById(userId, ep.done('get_user'))
    } else {
      ep.emit("login_err", 10140, "登录超时")
    }
  })
}

/**
 * @name userRequired
 * @desc 需要用户登录
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.userRequired = function (req, res, next) {
  let userId   = validator.trim(req.body.userId || '')
  let uuid     = validator.trim(req.body.uuid || '')
  // 验证
  let message
  if (userId === '') {
    message = 'userId 不能为空';
  } else if (uuid === '') {
    message = 'uuid 不能为空';
  }
  // END 验证

  if (message) {
    return resJSON(res, true, 10005, message,  {isLogin: false});
  }
  let ep = new eventproxy()
  ep.fail(next)

  ep.on('login_err', function (code, msg) {
    return resJSON(res, true, code, msg, {isLogin: false})
  });
  ep.on('get_user', function(){
    next();
  })
  // 在缓存中读取登录状态
  cache.get('user_' + userId, function(err, res) {
    if (err) {
      ep.emit("login_err", 10140, "登录超时")
    }
    if (uuid === res) {
      cache.set('user_' + userId, uuid, tools.time.m() * 30 / 1000)
      ep.emit('get_user')
    } else {
      ep.emit("login_err", 10140, "登录超时")
    }
  })
}

/**
 * @name authUser
 * @desc 验证用户是否为登录状态
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.authUser = function (req, res, next) {
  let userId   = validator.trim(req.body.userId || '')
  let uuid     = validator.trim(req.body.uuid || '')
  // 验证
  let message
  if (userId === '') {
    message = 'userId 不能为空';
  } else if (uuid === '') {
    message = 'uuid 不能为空';
  }
  // END 验证

  if (message) {
    return resJSON(res, true, 10005, message,  {isLogin: false});
  }

  let ep = new eventproxy()
  ep.fail(next)

  ep.on('login_err', function (code, msg) {
    return resJSON(res, true, code, msg, {isLogin: false})
  });
  ep.on('get_user', function(){
    return resJSON(res, true, 10000, "登录正常", {isLogin: true})
  })
  // 在缓存中读取登录状态
  cache.get('user_' + userId, function(err, res) {
    if (err) {
      ep.emit("login_err", 10140, "登录超时")
    }
    if (uuid === res) {
      cache.set('user_' + userId, uuid, tools.time.m() * 30 / 1000)
      ep.emit('get_user')
    } else {
      ep.emit("login_err", 10140, "登录超时")
    }
  })
}
