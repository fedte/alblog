var EventProxy = require('eventproxy');
var models     = require('../models');
var Catetory   = models.Catetory;
var tools      = require('../utils/tools');
var _          = require('lodash');

/**
 * @name create
 * @desc 创建一个新的分类
 * @param {Object} catetory 分类的基础信息
 * @param {Function} callback 回调函数
 */
exports.create = function (catetory, callback) {
  let _catetory          = new Catetory()

  _catetory.name = catetory.name
  _catetory.type = catetory.type || ''
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
  Catetory.findById(catetory.id, function (err, catetorys) {
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
  if (!id) {
    return callback();
  }
  Catetory.findById(id, callback)
}

/**
 * @name getDefault
 * @desc 获取默认分类ID
 * @param {Function} callback 回调函数
 */
exports.getDefault = function (callback) {
  Catetory.findOne({name: 'default'}, function(err, catetory) {
    if (err) {
      next(err)
    }
    if (!catetory) {
      let _catetory = new Catetory()
      _catetory.name = 'default'
      _catetory.alias = '默认目录'
      _catetory.save(function(err, catetory) {
        if (err) {
          next(err)
        }
        callback(catetory.id)
      })
    } else {
      callback(catetory.id)
    }
  })
}

