const _            = require('lodash')
const validator    = require('validator')
const eventproxy   = require('eventproxy')
const utility      = require('utility')

const ROOT         = process.cwd()

const config       = require(ROOT + '/config')
const loggers      = require(ROOT + '/lib/logger.lib')
const tools        = require(ROOT + '/app/utils/tools')
const resJSON      = tools.resJSON
const cache        = require(ROOT + '/app/utils/cache')

const CatetoryProxy= require(ROOT + '/app/proxy').Catetory

/**
 * @name getALL
 * @desc 获取所有分类列表
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.getAll = function (req, res, next) {
  CatetoryProxy.getAll(function(err, catetory) {
    if (err) next(err)
    if (!catetory.length > 0) {
      // 如果没有分类列表就创建默认分类
      CatetoryProxy.getDefault(function(id) {
        // 将默认分类信息返回
        CatetoryProxy.getByCatetoryId(id, function(err, catetory) {
          catetory = _.pick(catetory, ['id', 'alias', 'name', 'content_count', 'create_at', 'update_at'])
          return resJSON(res, true, 10000, '获取分类成功', { catetory: [catetory] })
        })
      })
    } else {
      catetorys = catetory.map((item) => _.pick(item, ['id', 'alias', 'name', 'content_count', 'create_at', 'update_at']) )
      return resJSON(res, true, 10000, '获取分类成功', {catetory: catetorys})
    }
  })
}

/**
 * @name create
 * @desc 新增分类
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.create = function (req, res, next) {
  let name = validator.trim(req.body.name || '').toLowerCase()
  let type = validator.trim(req.body.type || '')
  let alias = validator.trim(req.body.alias || '')

  // 验证
  let message
  if (name === '') {
    message = '目录不能为空'
  } else if (alias === '') {
    message = '名称不可为空'
  }
  // END 验证
  if (message) {
    return resJSON(res, true, 10200, message)
  }
  if (!validator.isAlpha(name)) {
    return resJSON(res, true, 10005, "目录只允许为字母")
  }
  if (type && !validator.isAlpha(type)) {
    return resJSON(res, true, 10005, "类型只允许为字母")
  }
  let ep = eventproxy()
  ep.fail(next)
  let catetorys = {
    name: name,
    type: type,
    alias: alias
  }
  ep.all('create_ok', function (catetory) {
    catetory = _.pick(catetory, ['id', 'alias', 'name', 'content_count', 'create_at', 'update_at'])
    return resJSON(res, true, 10000, '添加成功', { catetory })
  })
  ep.on('catetory_get', function(catetory) {
    if (catetory.length > 0) {
      return resJSON(res, true, 10206, '目录已经存在')
    } else {
      CatetoryProxy.create(catetorys, ep.done('create_ok'))
    }
  })
  CatetoryProxy.getCatetoryByQuery({'name': name}, {}, ep.done('catetory_get'))
}

/**
 * @name upadte
 * @desc 更新分类
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.update = function (req, res, next) {
  let name = validator.trim(req.body.name || '').toLowerCase()
  let type = validator.trim(req.body.type || '')
  let alias = validator.trim(req.body.alias || '')
  let id = validator.trim(req.body.id || '')
  let catetoryId = validator.trim(req.body.id || '')

  if (!validator.isMongoId(catetoryId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }

  // 验证
  let message
  if (name === '') {
    message = '目录不能为空'
  } else if (alias === '') {
    message = '名称不可为空'
  }

  // END 验证
  if (message) {
    return resJSON(res, true, 10200, message)
  }
  if (!validator.isAlpha(name)) {
    return resJSON(res, true, 10005, "目录只允许为字母")
  }
  let ep = eventproxy()
  ep.fail(next)
  let catetorys = {
    name: name,
    type: type,
    alias: alias,
    id: catetoryId
  }
  ep.all('create_ok', function (catetory) {
    catetory = _.pick(catetory, ['id', 'alias', 'name', 'content_count', 'create_at', 'update_at'])
    return resJSON(res, true, 10000, '更新成功', { catetory })
  })
  CatetoryProxy.update(catetorys, ep.done('create_ok'))
}

/**
 * @name get
 * @desc 获取分类详情
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.get = function (req, res, next) {
  let catetoryId = validator.trim(req.body.id || '')

  if (!validator.isMongoId(catetoryId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }

  CatetoryProxy.getByCatetoryId(catetoryId, function(err, catetory) {
    if (err) {
      next(err)
    }
    if (catetory) {
      catetory = _.pick(catetory, ['id', 'alias', 'name', 'content_count', 'create_at', 'update_at'])
      return resJSON(res, true, 10000, '获取成功', { catetory })
    } else {
      return resJSON(res, true, 10008, 'ID不存在或已被删除')
    }
  })
}
