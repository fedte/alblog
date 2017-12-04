const validator      = require('validator')
const eventproxy     = require('eventproxy')
const uuid           = require('node-uuid')
const utility        = require('utility')
const ROOT        = process.cwd()

const config         = require(ROOT + '/config')
const loggers        = require(ROOT + '/lib/logger.lib')

const User           = require('../proxy').User
// const mail           = require('../utils/mail')
const tools          = require('../utils/tools')
const resJSON        = tools.resJSON
const cache          = require('../utils/cache')
// const authMiddleWare = require('../middlewares/auth');

/**
 * 用户注册
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Fcuntion} next
 */
exports.signup = function (req, res, next) {
  // 当前是否允许注册新用户
  if (!config.user.reg){
    return resJSON(res, true, 10100, "暂未开放新用户注册")
  }
  let loginname
  let email
  let pass
  try {
    loginname = validator.trim(req.body.loginname).toLowerCase();
    email     = validator.trim(req.body.email).toLowerCase();
    pass      = validator.trim(req.body.pass);
  } catch (error) {
    if (error) {
      loggers.system()
      return resJSON(res, true, 10005, '参数错误')
    }
  }

  var ep = new eventproxy();
  ep.fail(next);
  ep.on('prop_err', function (code,msg) {
    return resJSON(res, true, code, msg, {loginname: loginname, email: email})
  });

  // 验证信息的正确性
  if ([loginname, pass, email].some(function (item) { return item === ''; })) {
    ep.emit('prop_err', 10103,'信息不完整。')
    return;
  }
  if (loginname.length < 3) {
    ep.emit('prop_err', 10104, '用户名至少需要3个字符。')
    return;
  }
  if (!tools.validateId(loginname)) {
    return ep.emit('prop_err', 10105, '用户名不合法。')
  }
  if (!validator.isEmail(email)) {
    return ep.emit('prop_err', 10106, '邮箱不合法。')
  }

  // END 验证信息的正确性

  User.getUsersByQuery({'$or': [
    {'loginname': loginname},
    {'email': email}
  ]}, {}, function (err, users) {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      ep.emit('prop_err', 10107, '用户名或邮箱已被使用。');
      return;
    }

    tools.bhash(pass, ep.done(function (passhash) {
      // create gravatar
      var avatarUrl = User.makeGravatar(email);
      User.newAndSave(loginname, loginname, passhash, email, avatarUrl, config.user.active, function (err) {
        if (err) {
          return next(err);
        }
        resJSON(res, true, 10000, '注册成功', {})

        // 发送邮件
        // mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secret), loginname);
        // res.render('sign/signup', {
        //   success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
        // });
      });

    }));
  });
};
/**
 * 用户登录
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Fcuntion} next
 */
exports.login = function (req, res, next) {
  let loginname
  let pass
  let ep      = new eventproxy()
  try {
    loginname = validator.trim(req.body.name).toLowerCase()
    pass      = validator.trim(req.body.pass)
  } catch (error) {
    return resJSON(res, true, 10005, '参数错误')
  }

  ep.fail(next);

  if (!loginname) {
    return resJSON(res, true, 10130, '用户名不能为空')
  } else if (!pass) {
    return resJSON(res, true, 10131, '密码不能为空')
  }

  let getUser;
  if (loginname.indexOf('@') !== -1) {
    getUser = User.getUserByMail;
  } else {
    getUser = User.getUserByLoginName;
  }

  ep.on('login_error', function (login_error) {
    res.status(200);
    return resJSON(res, true, 10132, '用户名或密码错误')
  });

  getUser(loginname, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return ep.emit('login_error');
    }
    let passhash = user.pass;
    tools.bcompare(pass, passhash, ep.done(function (bool) {
      if (!bool) {
        return ep.emit('login_error');
      }
      user.last_login_at = new Date()
      user.save()
      let uuid = tools.uuid(loginname, passhash)

      let entity = {
        user: {
          uuid,
          "id": user._id,
          "avatar": user.avatar,
          "email": user.email,
          "name": user.name,
          "update_at": user.update_at,
          "create_at": user.create_at,
          "last_login_at": user.last_login_at
        }
      }
      req.session.user = entity.user
      gen_session(user, res)
      cache.set('user_' + user._id, uuid, tools.time.m() * 30 / 1000)
      return resJSON(res, true, 10000, '登录成功', entity)
    }));
  });
};

function gen_session(user, res) {
  var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔

  res.cookie(config.auth_cookie_name, auth_token, config.cookie); //cookie 有效期30天
}
