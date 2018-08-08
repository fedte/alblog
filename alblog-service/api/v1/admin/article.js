const _            = require('lodash')
const ROOT         = process.cwd()

const validator    = require('validator')
const eventproxy   = require('eventproxy')
const utility      = require('utility')

const config       = require(ROOT + '/config')
const loggers      = require(ROOT + '/lib/logger.lib')
const tools        = require(ROOT + '/app/utils/tools')
const resJSON      = tools.resJSON
const cache        = require(ROOT + '/app/utils/cache')
const Helpers      = require(ROOT + '/app/utils/helpers')

const UserProxy    = require(ROOT + '/app/proxy').User
const ArticleProxy = require(ROOT + '/app/proxy').Article
const CatetoryProxy= require(ROOT + '/app/proxy').Catetory

const ArticleModel = require(ROOT + '/app/models').Article
const UserModel    = require(ROOT + '/app/models').User
const CatetoryModel    = require(ROOT + '/app/models').Catetory

/**
* @name get
* @desc 获取文章信息
* @author falost
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
      article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'content', 'title', 'tag', 'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author'])
      // cache.set('article_' + articleId, article, tools.time.M(true))
      return resJSON(res, true, 10000, '获取文章成功', {article})
    })
  })
  ep.emit('article_get')
  // cache.get('article_' + articleId, function (article) {
  //   console.log('----------------')
  //   console.log(article)
  //   console.log('------ End------')
  //   if (!article || article.deleted) {
  //     ep.emit('article_get')
  //   } else {
  //     return resJSON(res, true, 10000, '获取文章成功', {article})
  //   }
  // })
}

/**
* @name list
* @desc 获取文章列表
* @author falost
* @param {HttpRequest} req
* @param {HttpResponse} res
* @param {Function} next
*/
exports.list = function (req, res, next) {
  var page     = parseInt(req.body.page, 10) || 1
  page         = page > 0 ? page : 1
  var catetory_id      = req.body.catetory || 'all'
  var limit    = Number(req.body.limit) || 10
  var mdrender = req.body.mdrender === 'true' ? true : false

  var query = {}
  if (catetory_id && catetory_id !== 'all') {
    if (catetory_id === 'good') {
      query.good = true
    } else {
      query.catetory_id = catetory_id
    }
  }
  query.deleted = false
  var options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'}

  var ep = new eventproxy()
  ep.fail(next)

  ArticleModel.find(query, '', options, ep.done('articles'))
  ep.all('articles_get', 'pages_get', function(articles, pages) {
    pages = {
      currentPage: page,
      pageSize: limit,
      pageCount: pages.pageCount,
      countTotal: pages.countTotal
    }
    resJSON(res, true, 10000, '获取列表成功', {data: articles, pages })
  })
  ep.on('articles', function (articles) {
    articles.forEach(function (article) {
      UserProxy.getUserById(article.author_id, ep.done(function (author) {
        // 是否解析文章内容
        if (mdrender) {
          article.content = Helpers.markdown(tools.linkUsers(article.content))
        }
        // 获取作者信息
        article.author = _.pick(author, ['loginname', 'avatar_url'])
        CatetoryProxy.getByCatetoryId(article.catetory_id, ep.done(function (catetory) {
          // 获取分类信息
          article.catetory = _.pick(catetory, ['name', 'alias'])
          ep.emit('all')
        }))
      }))
    });
    ep.after('all', articles.length, function (caaa) {
      articles = articles.map(function (article) {
        article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'tag', 'content', 'title', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])

        cache.set('article_' + article.id, article, tools.time.M(true))
        return article
      })
      ep.emit('articles_get', articles)
    })
  })
  // 取分页数据
  let pagesCacheKey = catetory_id + '_pages'
  let pages
  cache.get(pagesCacheKey, ep.done(function (pages) {
    if (pages) {
      ep.emit('pages_get', pages);
    } else {
      ArticleProxy.getCountByQuery(query, ep.done(function (allArticleCount) {
        let pageCount = Math.ceil(allArticleCount / limit)
        pages = {
          pageCount: pageCount,
          countTotal: allArticleCount
        }
        cache.set(pagesCacheKey, pages, tools.time.m(true) * 10)
        ep.emit('pages_get', pages)
      }))
    }
   }));
   // END 取分页数据
}

/**
 * @name create
 * @desc 创建文章
 * @author falost
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.create = function (req, res, next) {
  let catetory= validator.trim(req.body.catetory || '')
  let userId  = validator.trim(req.body.userId)
  let title   = validator.trim(req.body.title || '')
  let tag     = validator.trim(req.body.tag || '')
  let content = validator.trim(req.body.content || '')
  // 验证
  let message
  if (title === '') {
    message = '标题不能为空'
  } else if (title.length < 3) {
    message = '标题不可少于3个字符'
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
    tag = _.words(tag, /[^,]+/g)
  } else {
    tag = []
  }
  let ep = new eventproxy()
  ep.fail(next)

  ep.all('user_saved', 'catetory_saved', function (user, catetory) {
    // 拼接两个返回的数据，确保返回的是一个完整的数据
    article = _.extend(user, catetory)
    // 设置缓存数据
    cache.set('article_' + article.id, article, tools.time.M(true))
    return resJSON(res, true, 10000, '发布成功', { article })
  })

  ep.on('article_save', function () {
    // 创建文章内容
    ArticleProxy.create(title, content, catetory, tag, userId, function (err, article) {
      if (err) {
        return next(err)
      }
      article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'content', 'title', 'tag', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])
      // 更新分类信息
      CatetoryProxy.getByCatetoryId(catetory, ep.done(function (catetory) {
        if (catetory) {
          catetory.content_count.push(article.id)
          catetory.save()
          // 获取分类信息
          article.catetory = _.pick(catetory, ['name', 'alias'])
        }
        ep.emit('catetory_saved', article)
      }))

      UserProxy.getUserById(userId, ep.done(function (user) {
        user.article_count += 1
        user.save()
        // 获取作者信息
        article.author = _.pick(user, ['loginname', 'avatar_url'])
        ep.emit('user_saved', article)
      }))
    });
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
}

/**
 * @name update
 * @desc 文章更新
 * @author falost
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.update = function (req, res, next) {
  let title     = validator.trim(req.body.title || '')
  let tag       = validator.trim(req.body.tag || '')
  let content   = validator.trim(req.body.content || '')
  let catetory  = validator.trim(req.body.catetory || '')
  let articleId = validator.trim(req.body.id || '')
  let userId    = validator.trim(req.body.userId)

  if (!validator.isMongoId(articleId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }

  // 验证
  let message
  if (articleId === '') {
    message = '文章ID不能为空'
  } else if (title === '') {
    message = '标题不能为空'
  } else if (title.length < 3) {
    message = '标题不可少于3个字符';
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
    tag = _.words(tag, /[^,]+/g)
  } else {
    tag = []
  }
  
  let ep = new eventproxy()
  ep.fail(next)

  ep.all('article_saved', 'user_saved', function (article, user) {
    // 拼接两个返回的数据，确保返回的是一个完整的数据
    article = _.extend(article, user)
    // 更新缓存数据
    cache.set('article_' + article.id, article, tools.time.M(true))
    return resJSON(res, true, 10000, '更新成功', {article})
  })
  ep.on('article_save', function () {
    ArticleModel.findById(articleId, function(err, article){
      if (err) {
        next(err)
      }
      if (!article) {
        return resJSON(res, true, 10008, 'ID不存在或已被删除')
      }
      let oldCatetory = article.catetory_id

      article.title     = title
      article.content   = content
      article.tag       = tag
      article.update_at = new Date()
      article.catetory_id  = catetory
      article.save()

      article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'content', 'title', 'tag', 'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author'])

      // 判断当前分类是否需要更新 by falost
      if (catetory != oldCatetory) {
        // 删除原有分类内容
        CatetoryProxy.getByCatetoryId(oldCatetory, ep.done(function (catetory) {
          if (catetory) {
            catetory.content_count.pop(article.id)
            catetory.save()
          }
        }))
        // 更新修改之后的分类内容
        CatetoryProxy.getByCatetoryId(catetory, ep.done(function (catetory) {
          catetory.content_count.push(article.id)
          catetory.save()
          // 获取分类详情
          article.catetory = _.pick(catetory, ['name', 'alias'])
          ep.emit('article_saved', article)
        }))
      } else {
        ep.emit('article_saved', article)
      }
      // 获取作者详情
      UserProxy.getUserById(article.author_id, ep.done(function (user) {
        article.author = _.pick(user, ['loginname', 'avatar_url'])
        ep.emit('user_saved', article)
      }))
    })
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
    }, next)
  } else {
    ep.emit('article_save')
  }
}
