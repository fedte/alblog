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
const Helpers      = require(ROOT + '/app/utils/helpers')

const UserProxy    = require(ROOT + '/app/proxy').User
const CommentProxy = require(ROOT + '/app/proxy').Comment

const UserModel = require(ROOT + '/app/models').User

exports.get = function(req, res, next) {
  let id = validator.trim(req.body.id || '')

  console.log('----------------')
  console.log(id)
  console.log('------ End------')
  let ep = eventproxy()
  ep.fail(next)

  ep.on('get_all', function(comments) {
    console.log('--------comments--------')
    console.log(comments)
    console.log('------comments End------')
    return resJSON(res, true, 10000, '获取评论成功', { list: comments })
  })
  CommentProxy.getCommentsByArticleId(id, ep.done('get_all'))
}

exports.save = function(req, res, next) {
  let author    = req.body.author || {}
  let content   = req.body.content || ''
  let articleId = validator.trim(req.body.id || '')
  let replyId   = req.body.replyId

  console.log('--------replyId--------')
  console.log(replyId)
  console.log('------replyId End------')
  if (content === '') {
    return resJSON(res, true, 10005, '评论内容不能为空')

  } else if (_.isEmpty(author.name)) {
    return resJSON(res, true, 10005, '不可以匿名哦')

  } else if (articleId === '') {
    return resJSON(res, true, 10005, '评论的内容ID不能为空')

  } else if (!validator.isMongoId(articleId)) {
    return resJSON(res, true, 10007, 'articleId 不是有效的ID')

  } else if (replyId && !validator.isMongoId(replyId)) {
    return resJSON(res, true, 10007, 'replyId 不是有效的ID')

  }
  let ep = eventproxy()
  ep.fail(next)

  ep.on('comment_save', function(comment) {
    comment = _.pick(comment, ['id', 'author_name', 'avatar_url', 'author_website', 'content', 'article_id', 'digg_count', 'reply_id', 'top', 'create_at'])
    return resJSON(res, true, 10000, '评论成功', { comment })
  })
  CommentProxy.save(content, articleId, author, replyId, ep.done('comment_save'))
}
