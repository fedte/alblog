const mongoose  = require('mongoose');
const BaseModel = require("./base_model");
const Schema    = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
const ROOT      = process.cwd()
const config    = require(ROOT + '/config');
const _         = require('lodash');

const ArticleSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  catetory: { type: ObjectId },
  tag: { type: Array, default: [] },
  top: { type: Boolean, default: false },
  reply_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  deleted: { type: Boolean, default: false },
});

ArticleSchema.plugin(BaseModel);
ArticleSchema.index({create_at: -1});
ArticleSchema.index({top: -1, last_reply_at: -1});
ArticleSchema.index({author_id: 1, create_at: -1});

mongoose.model('Article', ArticleSchema);
