const models     = require('../models')
const Comment      = models.Comment


const EventProxy = require('eventproxy')
const _          = require('lodash')

const User       = require('./user')
const tools      = require('../utils/tools')
// var at         = require('../common/at')


/**
 * 获取一条回复信息
 * @param {String} id 回复ID
 * @param {Function} callback 回调函数
 */
exports.getReply = function (id, callback) {
  Comment.findOne({_id: id}, callback);
};

/**
 * 根据回复ID，获取回复
 * Callback:
 * - err, 数据库异常
 * - reply, 回复内容
 * @param {String} id 回复ID
 * @param {Function} callback 回调函数
 */
exports.getCommentById = function (id, callback) {
  if (!id) {
    return callback(null, null);
  }
  Comment.findOne({_id: id}, function (err, reply) {
    if (err) {
      return callback(err);
    }
    if (!reply) {
      return callback(err, null);
    }
    return callback(null, reply);
  });
};

/**
 * 根据主题ID，获取回复列表
 * Callback:
 * - err, 数据库异常
 * - comments, 回复列表
 * @param {String} id 主题ID
 * @param {Function} callback 回调函数
 */
exports.getCommentsByArticleId = function (id, opt, callback) {
  Comment.find({article_id: id, deleted: false}, '', opt, function (err, comments) {
    if (err) {
      return callback(err)
    }
    if (comments.length === 0) {
      return callback(null, [])
    }

    let ep = new EventProxy()
    callback(null, comments)
  })
}

/**
 * 创建并保存一条回复信息 
 * @author falost
 * @param {String} content 回复内容
 * @param {String} articleId 主题ID
 * @param {String} author 评论作者对象
 * @param {String} [replyId] 回复ID，当二级回复时设定该值
 * @param {Function} callback 回调函数
 */
exports.save = function (content, articleId, author, replyId, callback) {
  if (typeof replyId === 'function') {
    callback = replyId;
    replyId  = null;
  }
  let comment       = new Comment()
  comment.content   = content
  comment.article_id  = articleId
  comment.author_name = author.name || ''
  comment.author_email = author.email || ''
  comment.author_website = author.website || ''

  if (replyId) {
    comment.reply_id = replyId
  }
  comment.save(function (err) {
    callback(err, comment);
  });
};

/**
 * 根据articleId查询到最新的一条未删除回复
 * @param topicId 主题ID
 * @param callback 回调函数
 */
exports.getLastReplyByTopId = function (articleId, callback) {
  Comment.find({topic_id: articleId, deleted: false}, '_id', {sort: {create_at : -1}, limit : 1}, callback);
};

exports.getRepliesByAuthorId = function (authorId, opt, callback) {
  if (!callback) {
    callback = opt;
    opt      = null;
  }
  Comment.find({author_id: authorId}, {}, opt, callback);
};

// 通过 article_id 获取回复总数
exports.getCountByArticleId = function (articleId, callback) {
  Comment.count({article_id: articleId}, callback);
};
