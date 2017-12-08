const MD5 = require('utility').md5
const bcrypt = require('bcryptjs')
const moment = require('moment')
const config = require('../../config')
const uuid =  require('node-uuid')
const _ = require('lodash')
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
/**
 * 获取基础时间值
 * @name M 月
 * @name D 天
 * @name H 小时
 * @name m 分钟
 * @name s 秒
 * @param {Boolean} s 单位 true为s false为ms 默认为false
 */
exports.time = {
  M: (s = false) => s ? 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24 * 30,
  D: (s = false) => s ? 60 * 60 * 24 : 1000 * 60 * 60 * 24,
  H: (s = false) => s ? 60 * 60 : 1000 * 60 * 60,
  m: (s = false) => s ? 60 : 1000 * 60,
  s: (s = false) => s ? 1 : 1000
}
/**
 * 根据文本内容，替换为数据库中的数据
 * Callback:
 * - err, 数据库异常
 * - text, 替换后的文本内容
 * @param {String} text 文本内容
 * @param {Function} callback 回调函数
 */
exports.linkUsers = function (text, callback) {
  let users = fetchUsers(text);
  for (let i = 0, l = users.length; i < l; i++) {
    let name = users[i];
    text = text.replace(new RegExp('@' + name + '\\b(?!\\])', 'g'), '[@' + name + '](/user/' + name + ')');
  }
  if (!callback) {
    return text;
  }
  return callback(null, text);
};

/**
 * 从文本中提取出@username 标记的用户名数组
 * @param {String} text 文本内容
 * @return {Array} 用户名数组
 */
const fetchUsers = function (text) {
  if (!text) {
    return [];
  }

  let ignoreRegexs = [
    /```.+?```/g, // 去除单行的 ```
    /^```[\s\S]+?^```/gm, // ``` 里面的是 pre 标签内容
    /`[\s\S]+?`/g, // 同一行中，`some code` 中内容也不该被解析
    /^    .*/gm, // 4个空格也是 pre 标签，在这里 . 不会匹配换行
    /\b\S*?@[^\s]*?\..+?\b/g, // somebody@gmail.com 会被去除
    /\[@.+?\]\(\/.+?\)/g, // 已经被 link 的 username
  ];

  ignoreRegexs.forEach(function (ignore_regex) {
    text = text.replace(ignore_regex, '');
  });

  let results = text.match(/@[a-z0-9\-_]+\b/igm);
  let names = [];
  if (results) {
    for (let i = 0, l = results.length; i < l; i++) {
      let s = results[i];
      //remove leading char @
      s = s.slice(1);
      names.push(s);
    }
  }
  names = _.uniq(names);
  return names;
};
exports.fetchUsers = fetchUsers;
