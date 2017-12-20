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
  Reply.findOne({_id: id}, callback);
};

/**
 * 根据回复ID，获取回复
 * Callback:
 * - err, 数据库异常
 * - reply, 回复内容
 * @param {String} id 回复ID
 * @param {Function} callback 回调函数
 */
exports.getReplyById = function (id, callback) {
  if (!id) {
    return callback(null, null);
  }
  Reply.findOne({_id: id}, function (err, reply) {
    if (err) {
      return callback(err);
    }
    if (!reply) {
      return callback(err, null);
    }

    var author_id = reply.author_id;
    User.getUserById(author_id, function (err, author) {
      if (err) {
        return callback(err);
      }
      reply.author = author;
      // TODO: 添加更新方法，有些旧帖子可以转换为markdown格式的内容
      if (reply.content_is_html) {
        return callback(null, reply);
      }
      at.linkUsers(reply.content, function (err, str) {
        if (err) {
          return callback(err);
        }
        reply.content = str;
        return callback(err, reply);
      });
    });
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
exports.getCommentsByArticleId = function (id, callback) {
  Comment.find({article_id: id, deleted: false}, '', {sort: 'create_at'}, function (err, comments) {
    if (err) {
      return callback(err)
    }
    if (comments.length === 0) {
      return callback(null, [])
    }

    let ep = new EventProxy()
    callback(null, comments)
    ep.after('reply_find', comments.length, function () {
    })
    /* for (let j = 0; j < comments.length; j++) {
      (function (i) {
        let author_id = comments[i].author_id
        User.getUserById(author_id, function (err, author) {
          if (err) {
            return callback(err)
          }
          comments[i].author = author || { _id: '' }
          if (comments[i].content_is_html) {
            return ep.emit('reply_find')
          }
          tools.linkUsers(comments[i].content, function (err, str) {
            if (err) {
              return callback(err)
            }
            comments[i].content = str
            ep.emit('reply_find')
          })
        })
      })(j)
    } */
  })
}

/**
 * 创建并保存一条回复信息
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
  comment.author_nmae = author.name || ''
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
  Reply.find({topic_id: articleId, deleted: false}, '_id', {sort: {create_at : -1}, limit : 1}, callback);
};

exports.getRepliesByAuthorId = function (authorId, opt, callback) {
  if (!callback) {
    callback = opt;
    opt      = null;
  }
  Reply.find({author_id: authorId}, {}, opt, callback);
};

// 通过 author_id 获取回复总数
exports.getCountByAuthorId = function (authorId, callback) {
  Reply.count({author_id: authorId}, callback);
};
