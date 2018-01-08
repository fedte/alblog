const EventProxy = require('eventproxy');
const models     = require('../models');
const Article    = models.Article;

// const Reply      = require('./reply');
const tools      = require('../utils/tools');
const _          = require('lodash');

const CatetoryProxy= require('./catetory')
const UserProxy    = require('./user')

/**
 * 根据主题ID获取主题
 * Callback:
 * - err, 数据库错误
 * - topic, 主题
 * - author, 作者
 * - lastReply, 最后回复
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getArticleById = function (id, callback) {
  var proxy = new EventProxy();
  var events = ['article', 'author', 'last_reply'];
  proxy.assign(events, function (article, author, last_reply) {
    if (!author) {
      return callback(null, null, null, null);
    }
    return callback(null, article, author, last_reply);
  }).fail(callback);

  Article.findOne({_id: id}, proxy.done(function (article) {
    if (!article) {
      proxy.emit('article', null);
      proxy.emit('author', null);
      proxy.emit('last_reply', null);
      return;
    }
    proxy.emit('article', article);

    User.getUserById(article.author_id, proxy.done('author'));

    if (article.last_reply) {
      Reply.getReplyById(article.last_reply, proxy.done(function (last_reply) {
        proxy.emit('last_reply', last_reply);
      }));
    } else {
      proxy.emit('last_reply', null);
    }
  }));
};

/**
 * 获取关键词能搜索到的主题数量
 * Callback:
 * - err, 数据库错误
 * - count, 主题数量
 * @param {String} query 搜索关键词
 * @param {Function} callback 回调函数
 */
exports.getCountByQuery = function (query, callback) {
  Article.count(query, callback);
};

/**
 * 根据关键词，获取文章列表
 * Callback:
 * - err, 数据库错误
 * - count, 文章列表
 * @param {String} query 搜索关键词
 * @param {Object} opt 搜索选项
 * @param {Function} callback 回调函数
 */
exports.getArticleByQuery = function (query, opt, callback) {
  query.deleted = false;
  Article.find(query, {}, opt, function (err,  article) {
    if (err) {
      return callback(err);
    }
    if (article.length === 0) {
      return callback(null, []);
    }

    let proxy = new EventProxy();
    proxy.after('article_ready', article.length, function () {
      article = _.compact(article); // 删除不合规的 topic
      return callback(null, article);
    });
    proxy.fail(callback);

    topics.forEach(function (topic, i) {
      let ep = new EventProxy();
      ep.all('author', 'reply', function (author, reply) {
        // 保证顺序
        // 作者可能已被删除
        if (author) {
          topic.author = author;
          topic.reply = reply;
        } else {
          topics[i] = null;
        }
        proxy.emit('topic_ready');
      });

      User.getUserById(topic.author_id, ep.done('author'));
      // 获取主题的最后回复
      Reply.getReplyById(topic.last_reply, ep.done('reply'));
    });
  });
}

// for sitemap
exports.getLimit5w = function (callback) {
  Article.find({deleted: false}, '_id', {limit: 50000, sort: '-create_at'}, callback);
}

/**
 * 根据文章ID，查找一条文章
 * @param {String} id 文章ID
 * @param {Function} callback 回调函数
 */
exports.getArticle = function (id, type, callback) {
  let ep = EventProxy()
  if (typeof type === 'function') {
    callback = type;
    type  = null;
  }
  Article.findOne({_id: id}, function (err, article) {
    // callback(err, article)
    if (err) {
      return callback(err)
    }
    if (!article || article.deleted) {
      return callback(null, article)
    }
    if (type === 'get') {
      article.visit_count += 1
    } else if (type === 'comment') {
      article.reply_count += 1
    }
    article.save()
    ep.all('author_get', 'catetory_get', function (author, catetory){
      article = _.extend(author, catetory)
      article = _.pick(article, ['id', 'author_id', 'catetory_id', 'catetory', 'content', 'title', 'tag', 'good', 'top', 'reply_count', 'visit_count', 'digg_count', 'create_at', 'author'])
      
      return callback(null, article)
    })
    UserProxy.getUserById(article.author_id, ep.done(function (author) {
      article.author = _.pick(author, ['loginname', 'avatar_url'])
      ep.emit('author_get', article)
    }))
    CatetoryProxy.getByCatetoryId(article.catetory_id, ep.done(function (catetory) {
      // 获取分类信息
      article.catetory = _.pick(catetory, ['name', 'alias'])
      ep.emit('catetory_get', article)
    }))
  })
}
/**
 * @name create
 * @desc 添加创建文章
 * @param {String} title 标题
 * @param {String} content 文章内容
 * @param {String} catetory 分类ID
 * @param {Array} tag 标签
 * @param {String} authorId 作者ID
 * @param {Function} callback 回调函数
 */
exports.create = function (title, content, catetory, tag, authorId, callback) {
  let article       = new Article()
  article.title     = title
  article.content   = content
  article.tag       = tag
  article.author_id = authorId
  article.catetory_id  = catetory

  article.save(callback)
};
