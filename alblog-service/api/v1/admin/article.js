const _            = require('lodash')
const fs           = require('fs')
const path         = require('path')
const ROOT         = process.cwd()

const validator    = require('validator')
const eventproxy   = require('eventproxy')
const uuid         = require('node-uuid')
const utility      = require('utility')

const config       = require(ROOT + '/config')
const loggers      = require(ROOT + '/lib/logger.lib')
const tools        = require(ROOT + '/app/utils/tools')
const resJSON      = tools.resJSON
const cache        = require(ROOT + '/app/utils/cache')

const UserProxy    = require(ROOT + '/app/proxy').User
const ArticleProxy = require(ROOT + '/app/proxy').Article
const CatetoryProxy= require(ROOT + '/app/proxy').Catetory

/**
* @name get
* @desc 获取文章信息
* @param {HttpRequest} req
* @param {HttpResponse} res
* @param {Function} next
*/
exports.get = function(req, res, next) {
  let articleId = validator.trim(req.body.id || '')
  let ep      = new eventproxy()
  if (articleId === '') {
    return resJSON(res, true, 10200, '文章ID不能为空')
  }
  if (!validator.isMongoId(articleId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }
  ep.on('article_get', function () {
    ArticleProxy.getArticle(articleId, function (err, article){
      if (err) {
        next(err)
      }
      if (!article || article.deleted) {
        return resJSON(res, true, 10008, 'ID不存在或已被删除')
      }
      article = {
        "id": article.id,
        "title": article.title,
        "author_id": article.author_id,
        "catetory": article.catetory,
        "content": article.content,
        "update_at": article.update_at,
        "create_at": article.create_at,
        "reply_count": article.reply_count,
        "top": article.top,
        "tag": article.tag
      }
      cache.set('article_' + articleId, article)
      return resJSON(res, true, 10000, '获取文章成功', {article})
    })
  })
  cache.get('article_' + articleId, function (article) {
    console.log('----------------')
    console.log(article)
    console.log('------ End------')
    if (!article || article.deleted) {
      ep.emit('article_get')
    } else {
      return resJSON(res, true, 10000, '获取文章成功', {article})
    }
  })

}

/**
 * @name create
 * @desc 创建文章
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.create = function (req, res, next) {
  let title   = validator.trim(req.body.title || '');
  let tag     = validator.trim(req.body.tag || '');
  let content = validator.trim(req.body.content || '');
  let catetory= validator.trim(req.body.catetory || '')
  let userId  = validator.trim(req.body.userId)
  // 验证
  let message
  if (title === '') {
    message = '标题不能为空'
  } else if (title.length < 5) {
    message = '标题不可少于5个字符'
  } else if (title.length > 100) {
    message = '标题太长了'
  } else if (content === '') {
    message = '内容不可为空'
  } else if (content.length < 10) {
    message = '内容不可少于10个字符'
  }
  // END 验证

  if (message) {
    return resJSON(res, true, 10200, message)
  }
  if (tag !== '') {
    tag = _.words(tag)
  }

  let ep = new eventproxy()
  ep.fail(next)

  ep.all('score_saved', function (article) {
    article = {
      "id": article.id,
      "title": article.title,
      "author_id": article.author_id,
      "catetory": article.catetory,
      "content": article.content,
      "update_at": article.update_at,
      "create_at": article.create_at,
      "reply_count": article.reply_count,
      "top": article.top,
      "tag": article.tag
    }

    cache.set('article_' + article.id, article)
    return resJSON(res, true, 10000, '发布成功', {article: article})
  })
  // 判断是否有分类 by falost
  if (!catetory) {
    CatetoryProxy.getDefault(function(id) {
      if (id) {
        catetory = id
        ep.emit('article_save')
      } else {
        return resJSON(res, true, 10205, '发布失败')
      }
    })
  } else {
    ep.emit('article_save')
  }

  ep.on('article_save', function () {
    ArticleProxy.create(title, content, catetory, tag, userId, function (err, article) {
      if (err) {
        return next(err)
      }
      CatetoryProxy.getByCatetoryId(catetory, ep.done(function (catetory) {
        catetory.content_count.push(article.id)
        catetory.save()
      }))

      UserProxy.getUserById(userId, ep.done(function (user) {
        user.article_count += 1
        user.save()
        req.user = user
        ep.emit('score_saved', article)
      }))
      //发送at消息
      // at.sendMessageToMentionUsers(content, topic.id, req.user.id);
    });
  })
}

/**
 * @name update
 * @desc 文章更新
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.update = function (req, res, next) {
  let title     = validator.trim(req.body.title || '')
  let tag       = validator.trim(req.body.tag || '')
  let content   = validator.trim(req.body.content || '')
  let catetory  = validator.trim(req.body.catetory || '')
  let userId    = validator.trim(req.body.userId)
  let articleId = validator.trim(req.body.id)

  if (!validator.isMongoId(articleId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }

  // 验证
  let message
  if (articleId === '') {
    message = '文章ID不能为空'
  } else if (title === '') {
    message = '标题不能为空'
  } else if (title.length < 5) {
    message = '标题不可少于5个字符';
  } else if (title.length > 100) {
    message = '标题太长了'
  } else if (content === '') {
    message = '内容不可为空'
  } else if (content.length < 10) {
    message = '内容不可少于10个字符'
  }
  // END 验证

  if (message) {
    return resJSON(res, true, 10200, message);
  }
  if (tag !== '') {
    tag = _.words(tag)
  }

  let ep = new eventproxy()
  ep.fail(next)

  ep.all('article_saved', function (article) {
    article = {
      "id": article.id,
      "title": article.title,
      "author_id": article.author_id,
      "catetory": article.catetory,
      "content": article.content,
      "update_at": article.update_at,
      "create_at": article.create_at,
      "reply_count": article.reply_count,
      "top": article.top,
      "tag": article.tag
    }
    cache.set('article_' + article.id, article)
    return resJSON(res, true, 10000, '更新成功', {article: article})
  })
  // 判断是否有分类 by falost
  if (!catetory) {
    CatetoryProxy.getDefault(function(id) {
      if (id) {
        catetory = id
        ep.emit('article_save')
      } else {
        return resJSON(res, true, 10205, '更新失败')
      }
    })
  } else {
    ep.emit('article_save')
  }

  ep.on('article_save', function () {
    ArticleProxy.getArticle(articleId, function(err, article){
      if (err) {
        next(err)
      }
      if (!article) {
        return resJSON(res, true, 10008, 'ID不存在或已被删除')
      }
      article.title     = title
      article.content   = content
      article.tag       = tag
      article.update_at = new Date()
      // 判断当前分类是否需要更新 by falost
      if (catetory != article.catetory) {
        article.catetory  = catetory
        CatetoryProxy.getByCatetoryId(catetory, ep.done(function (catetory) {
          catetory.content_count.push(article.id)
          catetory.save()
        }))
      }
      article.save(function (err, article) {
        ep.emit('article_saved', article)
      })
    })
  })
}
