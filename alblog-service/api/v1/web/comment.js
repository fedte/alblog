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
const ArticleProxy = require(ROOT + '/app/proxy').Article

const UserModel = require(ROOT + '/app/models').User

/**
 * @name list
 * @desc 获取游客评论列表
 * @author falost
 * @param {httpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.list = function(req, res, next) {
  let id = validator.trim(req.body.id || '')
  let page     = parseInt(req.body.page, 10) || 1
  page         = page > 0 ? page : 1
  let limit    = Number(req.body.limit) || 10
  let mdrender = (req.body.mdrender || req.query.mdrender) === 'false' ? false : true

  let ep = eventproxy()
  ep.fail(next)
  let options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'}
  ep.on('get_all', function(comments) {
    ep.after('all', comments.length, function() {
      comments = comments.map(function (comment) {
        comment = _.pick(comment, ['id', 'author_name', 'avatar_url', 'author_website', 'content', 'article_id', 'digg_count', 'reply_id', 'top', 'create_at'])
        if (mdrender) {
          comment.content = Helpers.markdown(comment.content)
        }
        return comment
      })
      ep.emit('comments_get', comments)
    })
    comments.forEach(function(comment) {
      if (comment.reply_id) {
        CommentProxy.getCommentById(comment.reply_id, ep.done(function(replyComment) {
          comment.content = '[@' + replyComment.author_name + '](' + (replyComment.author_website  || '#' + replyComment.id) + ') ' + comment.content
          ep.emit('all')
        }))
      } else {
        ep.emit('all')
      }
    })
  })

  ep.all('comments_get', 'pages_get', function(comments, pages) {
    return resJSON(res, true, 10000, '获取评论成功', { list: comments, pages })
  })

  CommentProxy.getCommentsByArticleId(id, options, ep.done('get_all'))

  // 取分页数据
  CommentProxy.getCountByArticleId(id, ep.done(function (allCommentCount) {
    let pageCount = Math.ceil(allCommentCount / limit)
    pages = {
      currentPage: page,
      pageSize: limit,
      pageCount: pageCount,
      countTotal: allCommentCount
    }
    ep.emit('pages_get', pages);
  }))
  /* let pagesCacheKey = id + '_page';
  let pages
  cache.get(pagesCacheKey, ep.done(function (pages) {
    if (pages) {
      ep.emit('pages_get', pages);
    } else {
      CommentProxy.getCountByArticleId(id, ep.done(function (allCommentCount) {
        let pageCount = Math.ceil(allCommentCount / limit)
        pages = {
          currentPage: page,
          pageSize: limit,
          pageCount: pageCount,
          countTotal: allCommentCount
        }
        cache.set(pagesCacheKey, pages, tools.time.m(true) * 10)
        ep.emit('pages_get', pages);
      }))
    }
   })); */
   // END 取分页数据
}

/**
 * @name save
 * @desc 保存游客的评论
 * @author falost
 * @param {httpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.save = function(req, res, next) {
  let author    = req.body.author || {}
  let content   = req.body.content || ''
  let articleId = validator.trim(req.body.id || '')
  let replyId   = req.body.replyId
  let mdrender = (req.body.mdrender || req.query.mdrender) === 'false' ? false : true

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
    ep.on('get', function() {
      if (mdrender) {
        comment.content = Helpers.markdown(comment.content)
      }
      // 更新文章评论数
      ArticleProxy.getArticle(articleId, 'comment', ep.done(function(article) {
        cache.set('article_' + articleId, article, tools.time.M(true))
      }))

      return resJSON(res, true, 10000, '评论成功', { comment })
    })

    comment = _.pick(comment, ['id', 'author_name', 'avatar_url', 'author_website', 'content', 'article_id', 'digg_count', 'reply_id', 'top', 'create_at'])
    if (comment.reply_id) {
      CommentProxy.getCommentById(comment.reply_id, ep.done(function(replyComment) {
        comment.content = '[@' + replyComment.author_name + '](' + (replyComment.author_website  || '') + ') ' + comment.content
        ep.emit('get')
      }))
    } else {
      ep.emit('get')
    }
  })
  CommentProxy.save(content, articleId, author, replyId, ep.done('comment_save'))
}
