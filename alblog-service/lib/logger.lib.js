/**
 * Created by Falost on 2016/8/11.
 */
var log4js = require('log4js');
var config = require('../config/log4js.config');

/**
 * 载入配置
 */
log4js.configure(config);

/**
 * 导出日志接口
 *  Tokens:
 *
 *   - :req[header] ex: :req[Accept]
 *   - :res[header] ex: :res[Content-Length]
 *   - :http-version
 *   - :response-time
 *   - :remote-addr
 *   - :date
 *   - :method
 *   - :url
 *   - :referrer
 *   - :user-agent
 *   - :status
 *
 */
module.exports = {
  access: function () {
    return log4js.connectLogger(log4js.getLogger('access'), { level: 'auto', format: ':remote-addr :method :url :status :response-timems :user-agent :http-version'});
  },
  system: function () {
    return log4js.connectLogger(log4js.getLogger('system'), { level: 'auto', format: ':remote-addr :method :url :status :response-timems :user-agent :http-version'});
  },
  database: function () {
    return log4js.getLogger('database');
  }
};
