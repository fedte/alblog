/**
 * 评论
 */
const mongoose  = require('mongoose')
const BaseModel = require("./base_model")
const Schema    = mongoose.Schema
const ObjectId  = Schema.ObjectId
const utility   = require('utility');

const CommentSchema = new Schema({
  article_id: { type: ObjectId},
  content: { type: String },
  author_name: { type: String },
  author_email: { type: String },
  author_website: { type: String },
  reply_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean, default: false },
  digg_count: { type: Number, default: 0 },
  ups: [ Schema.Types.ObjectId ],
  deleted: {type: Boolean, default: false},
})

CommentSchema.plugin(BaseModel)
CommentSchema.index({article_id: 1})
CommentSchema.index({author_id: 1, create_at: -1})

CommentSchema.virtual('avatar_url').get(function () {
  let url = ('https://gravatar.com/avatar/' + utility.md5(this.author_email.toLowerCase()) + '?size=48')

  // www.gravatar.com 被墙
  url = url.replace('www.gravatar.com', 'gravatar.com')

  // 让协议自适应 protocol，使用 `//` 开头
  if (url.indexOf('http:') === 0) {
    url = url.slice(5)
  }

  // 如果是 github 的头像，则限制大小
  if (url.indexOf('githubusercontent') !== -1) {
    url += '&s=120';
  }

  return url
})

mongoose.model('Comment', CommentSchema)
