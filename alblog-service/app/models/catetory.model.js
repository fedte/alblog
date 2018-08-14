const mongoose  = require('mongoose');
const BaseModel = require("./base_model");
const Schema    = mongoose.Schema;
const ObjectId  = Schema.ObjectId;
const ROOT      = process.cwd()
const config    = require(ROOT + '/config');
const _         = require('lodash');

const CatetorySchema = new Schema({
  name: { type: String },
  type: { type: String },
  alias:{ type: String },
  content_count: [{ type: ObjectId }],
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  isDefault: { type: Boolean, default: false }
}, {
  usePushEach: true
})

CatetorySchema.plugin(BaseModel);
CatetorySchema.index({create_at: -1});
CatetorySchema.index({name: 1}, {unique: true})

mongoose.model('Catetory', CatetorySchema);
