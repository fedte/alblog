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

const CommentProxy = require(ROOT + '/app/proxy').Comment
const ArticleModel = require(ROOT + '/app/models').Article
const CommentModel = require(ROOT + '/app/models').Comment

exports.digg = function(req, res, next) {
  let id = validator.trim(req.body.id || '')
  let type = validator.trim(req.body.type || '')

  type = type.toLocaleUpperCase()

  if (id === '') {
    return resJSON(res, true, 10005, 'ID不能为空')
  } else if (type === '') {
    return resJSON(res, true, 10005, '类型不能为空')
  } else if (!validator.isMongoId(id)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }
  let modelType
  if (type === 'COMMENT') {
    modelType = CommentModel
  } else if (type === 'ARTICLE') {
    modelType = ArticleModel
  } else {
    return resJSON(res, true, 10009, '不是有效的数据类型')
  }
  modelType.update({_id: id}, {$inc: {digg_count: 1}}, function (err, result) {
    if (err) next(err)
    if (result.nModified) {
      return resJSON(res, true, 10000, '点赞成功')
    } else {
      return resJSON(res, true, 10010, '点赞失败')      
    }
  })
}

exports.upload = function (req, res, next) {
  
}