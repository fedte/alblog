/**
 * Created by Falost on 2016/9/28.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ArticleSchema = new Schema({
  title: String,
  content: String,
  catetoryName: String,
  tag: String,
  author: String,
  oId: {
    type: Number,
    unique: true,
    default: 0
  },
  pv: {
    type: Number,
    default: 0
  },
  media: {
    type: ObjectId,
    ref: 'Media'
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

ArticleSchema.pre('save', function (next) { // 每次存储就会调用一次这个方法
  if (this.isNew)// 检测是不是新添加的
    { this.meta.createAt = this.meta.updateAt = Date.now()
  } else// 否则就是已经存在了，进行一次更新
  { this.meta.updateAt = Date.now() }
  next()
})
ArticleSchema.statics = {
  fetch: function (cb) {
    return this
    .find({})
    .sort('meta.updateAt')
    .exec(cb)
  },
  findById: function (id, cb) {
    return this
    .findOne({_id: id})
    .exec(cb)
  }
}


mongoose.model('Article', ArticleSchema)
