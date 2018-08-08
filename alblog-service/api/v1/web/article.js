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
const ArticleProxy = require(ROOT + '/app/proxy').Article
const CatetoryProxy= require(ROOT + '/app/proxy').Catetory

const ArticleModel = require(ROOT + '/app/models').Article
const UserModel = require(ROOT + '/app/models').User

/**
* @name get
* @desc 获取文章信息
* @author falost
* @param {HttpRequest} req
* @param {HttpResponse} res
* @param {Function} next
*/
exports.get = function(req, res, next) {
  let articleId = validator.trim(req.params.id || req.body.id || '')
  let mdrender = (req.body.mdrender || req.query.mdrender) === 'false' ? false : true

  let ep      = new eventproxy()
  if (articleId === '') {
    return resJSON(res, true, 10200, '文章ID不能为空')
  }
  if (!validator.isMongoId(articleId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }
  ep.on('article_get', function () {
    ArticleProxy.getArticle(articleId, 'get', function (err, article){
      if (err) {
        next(err)
      }
      if (!article || article.deleted) {
        return resJSON(res, true, 10008, 'ID不存在或已被删除')
      }
      cache.set('article_' + articleId, article, tools.time.M(true))

      if (mdrender) {
        article.content = Helpers.markdown(tools.linkUsers(article.content))
      }
      return resJSON(res, true, 10000, '获取文章成功', {article})

      /* ep.all('author_get', 'catetory_get', function (author, catetory){
        article = _.extend(author, catetory)

        article.visit_count += 1
        
        article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'content', 'title', 'tag', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])
        
        article.save()
        cache.set('article_' + articleId, article, tools.time.M(true))
        

        if (mdrender) {
          article.content = Helpers.markdown(tools.linkUsers(article.content))
        }
        return resJSON(res, true, 10000, '获取文章成功', {article})
      })
      UserProxy.getUserById(article.author_id, ep.done(function (author) {
        article.author = _.pick(author, ['loginname', 'avatar_url'])
        ep.emit('author_get', article)
      }))
      CatetoryProxy.getByCatetoryId(article.catetory_id, ep.done(function (catetory) {
        // 获取分类信息
        article.catetory = _.pick(catetory, ['name', 'alias'])
        ep.emit('catetory_get', article)
      })) */
    })
  })
  cache.get('article_' + articleId, function (err, article) {

    if (!article || article.deleted) {
      ep.emit('article_get')
    } else {
      if (mdrender) {
        article.content = Helpers.markdown(tools.linkUsers(article.content))
      }
      ArticleProxy.getArticle(articleId, 'get', ep.done(function (article){
        if(article) {
          cache.set('article_' + articleId, article, tools.time.M(true))
        }
      }))
      return resJSON(res, true, 10000, '获取文章成功', { article })
    }
  })
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
  let page     = Number(req.body.page, 10) || 1
  page         = page > 0 ? page : 1
  let limit    = Number(req.body.limit) || 10
  let catetory_id      = validator.trim(req.body.catetory || '')
  let type     = validator.trim(req.body.type || '')
  let tags     = validator.trim(req.body.tags || '')
  tags         =  _.words(tags, /[^,]+/g)
  let mdrender = req.body.mdrender === 'true' ? true : false

  let query = {}
  if (type === 'tag' && tags.length > 0) {
    query = {
      tag: {'$all': tags} 
    }
  } else if (type === 'catetory' && catetory_id) {
    query.catetory_id = catetory_id
  }
  query.deleted = false
  let options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'}

  let ep = new eventproxy()
  ep.fail(next)

  ArticleModel.find(query, '', options, ep.done('articles'))

  ep.all('articles_get', 'pages_get', function(articles, page) {
    resJSON(res, true, 10000, '获取列表成功', {data: articles, page })
  })

  ep.on('articles', function (articles) {
    articles.forEach(function (article) {
      UserProxy.getUserById(article.author_id, ep.done(function (author) {
        // 获取作者信息
        article.author = _.pick(author, ['loginname', 'avatar_url'])
        CatetoryProxy.getByCatetoryId(article.catetory_id, ep.done(function (catetory) {
          // 获取分类信息
          article.catetory = _.pick(catetory, ['name', 'alias'])
          ep.emit('all')
        }))
      }))
    })
    ep.after('all', articles.length, function () {
      articles = articles.map(function (article) {
        article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'tag', 'content', 'title', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])

        cache.set('article_' + article.id, article, tools.time.M(true))
        // 是否解析文章内容
        if (mdrender) {
          article.content = Helpers.markdown(tools.linkUsers(article.content))
        }
        return article
      })
      ep.emit('articles_get', articles)
    })
  })
  // 取分页数据
  let pagesCacheKey = catetory_id + '_pages';
  let pages
  cache.get(pagesCacheKey, ep.done(function (pages) {
    if (pages) {
      ep.emit('pages_get', pages);
    } else {
      ArticleProxy.getCountByQuery(query, ep.done(function (allArticleCount) {
        let pageCount = Math.ceil(allArticleCount / limit)
        pages = {
          currentPage:page,
          pageSize: limit,
          pageCount: pageCount,
          countTotal: allArticleCount
        }
        cache.set(pagesCacheKey, pages, tools.time.m(true) * 10)
        ep.emit('pages_get', pages);
      }))
    }
  }));
  // END 取分页数据
}

/**
 * @name searchArticleListByTag
 * @desc 根据标签进行搜索文章列表
 * @param {HttpRequest} req 
 * @param {HttpResponse} res 
 * @param {Function} next 
 */
exports.searchArticleListByTag = function (req, res, next) {
  let tags    = req.body.tags || ''
  tags        = _.words(tags, /[^,]+/g)
  let page    = parseInt(req.body.page, 10) || 1
  page        = page > 0 ? page : 1
  let limit   = Number(req.body.limit) || 10
  let mdrender= req.body.mdrender === 'true' ? true : false  
  let query   = {}

  if (tags.length > 0) {
    query = {
      tag: {'$all': tags} 
    }
  } else {
    query = {}
  }

  query.deleted = false
  let options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'}

  let ep = new eventproxy()
  ep.fail(next)

  ep.all('articles_get', 'pages_get', function(articles, page) {
    resJSON(res, true, 10000, '获取列表成功', {data: articles, page })
  })

  ep.on('articles', function (articles) {
    articles.forEach(function (article) {
      UserProxy.getUserById(article.author_id, ep.done(function (author) {
        // 获取作者信息
        article.author = _.pick(author, ['loginname', 'avatar_url'])
        CatetoryProxy.getByCatetoryId(article.catetory_id, ep.done(function (catetory) {
          // 获取分类信息
          article.catetory = _.pick(catetory, ['name', 'alias'])
          ep.emit('all')
        }))
      }))
    })
    ep.after('all', articles.length, function () {
      articles = articles.map(function (article) {
        article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'tag', 'content', 'title', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])

        cache.set('article_' + article.id, article, tools.time.M(true))
        // 是否解析文章内容
        if (mdrender) {
          article.content = Helpers.markdown(tools.linkUsers(article.content))
        }
        return article
      })
      ep.emit('articles_get', articles)
    })
  })
  // 取分页数据
  let pagesCacheKey = 'tags_pages';
  let pages
  ArticleProxy.getCountByQuery(query, ep.done(function (allArticleCount) {
    let pageCount = Math.ceil(allArticleCount / limit)
    pages = {
      currentPage:page,
      pageSize: limit,
      pageCount: pageCount,
      countTotal: allArticleCount
    }
    ep.emit('pages_get', pages);
  }))
  /* cache.get(pagesCacheKey, ep.done(function (pages) {
    if (pages) {
      ep.emit('pages_get', pages);
    } else {
      ArticleProxy.getCountByQuery(query, ep.done(function (allArticleCount) {
        let pageCount = Math.ceil(allArticleCount / limit)
        pages = {
          currentPage:page,
          pageSize: limit,
          pageCount: pageCount,
          countTotal: allArticleCount
        }
        cache.set(pagesCacheKey, pages, tools.time.m(true) * 10)
        ep.emit('pages_get', pages);
      }))
    }
  })); */
  // END 取分页数据

  ArticleModel.find(query, '', options, ep.done('articles'))

}