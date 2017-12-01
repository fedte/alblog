
const MD5 = require('utility').md5
const bcrypt = require('bcryptjs')
const moment = require('moment')
const config = require('../../config')
const uuid =  require('node-uuid')
moment.locale('zh-cn'); // 使用中文

// 格式化时间
exports.formatDate = function (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};

exports.validateId = function (str) {
  return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};
/**
 * @name bhash
 * @desc 加密字符串
 * @param {String} str
 * @param {function} callback
 */
exports.bhash = function (str, callback) {
  bcrypt.hash(str, 10, callback);
};
/**
 * @name bcompare
 * @desc 字符串校验
 * @param {String} str
 * @param {String} hash
 * @param {function} callback
 */
exports.bcompare = function (str, hash, callback) {
  bcrypt.compare(str, hash, callback);
};
/**
 * @name resJSON
 * @desc 统一返回数据格式
 * @param {HttpResponse} res
 * @param {Boolean} success
 * @param {Number} code
 * @param {String} message
 * @param {Object} entity
 * @return {Function} res.json()
 */
exports.resJSON = function (res, success = false, code = 10000, message = '', entity = {}) {
  return res.json({
    success: success,
    code: code,
    message: message,
    entity: entity
  })
}
/**
 * @name uuid
 * @desc 根据参数生成一个登录状态的MD5
 * @param {String} loginName
 * @param {String} pass
 * @returns {String} MD5 value
 */
exports.uuid = function (loginName, pass) {
  return MD5(loginName + pass + config.user.salt + uuid() )
}

exports.time = {
  M: () => 1000 * 60 * 60 * 24 *30,
  D: () => 1000 * 60 * 60 * 24,
  H: () => 1000 * 60 * 60,
  m: () => 1000 * 60,
  s: () => 1000
 }
