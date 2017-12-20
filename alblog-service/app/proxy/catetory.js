const EventProxy = require('eventproxy');
const models     = require('../models');
const Catetory   = models.Catetory;
const tools      = require('../utils/tools');
const _          = require('lodash');
/**
 * 获取所有分类列表
 * @param {Function} callback 回调函数
 */
exports.getAll = function (callback) {
  Catetory.find({deleted: false}, callback)
}
/**
 * @name create
 * @desc 创建一个新的分类
 * @param {Object} catetory 分类的基础信息
 * @param {Function} callback 回调函数
 */
exports.create = function (catetory, callback) {
  let _catetory   = new Catetory()
  _catetory.name  = catetory.name
  _catetory.type  = catetory.type || ''
  _catetory.alias = catetory.alias || catetory.name

  _catetory.save(callback)
}

/**
 * @name update
 * @desc 根据分类ID更新分类
 * @param {Object} catetory 更新分类的基础信息，包含分类ID
 * @param {Function} callback 回调函数
 */
exports.update = function (catetory, callback) {
  Catetory.findById(catetory.id, function (err, _catetory) {
    if (err) console.log(err)

    _catetory.name = catetory.name
    _catetory.type = catetory.type
    _catetory.alias = catetory.alias

    _catetory.save(callback)
  })
}

/**
 * @name getByCatetoryId
 * @desc 根据ID查找分类
 * @param {String} id 需要查找的分类ID
 * @param {Function} callback 回调函数
 */
exports.getByCatetoryId = function (id, callback) {
  Catetory.findById(id, callback)
}
/**
 * 根据关键字，获取分类
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {String} query 关键字
 * @param {Object} opt 选项
 * @param {Function} callback 回调函数
 */
exports.getCatetoryByQuery = function (query, opt, callback) {
  Catetory.find(query, '', opt, callback)
};
/**
 * @name getDefault
 * @desc 获取默认分类ID
 * @param {Function} callback 回调函数
 * @param {Function} next 错误处理
 */
exports.getDefault = function (callback, next) {
  Catetory.findOne({isDefault: true}, function(err, catetory) {
    if (err) {
      next(err)
    }
    if (!catetory) {
      let _catetory = new Catetory()
      _catetory.name = 'default'
      _catetory.alias = '默认目录'
      _catetory.isDefault = true
      _catetory.save(function(err, catetory) {
        if (err) { next(err) }
        callback(catetory.id)
      })
    } else {
      callback(catetory.id)
    }
  })
}

