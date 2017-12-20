const ROOT         = process.cwd()

const validator    = require('validator')
const eventproxy   = require('eventproxy')

const config       = require(ROOT + '/config')
const loggers      = require(ROOT + '/lib/logger.lib')
const tools        = require(ROOT + '/app/utils/tools')
const resJSON      = tools.resJSON
const cache        = require(ROOT + '/app/utils/cache')

const ArticleModel = require(ROOT + '/app/models').Article
const UserModel    = require(ROOT + '/app/models').User
const CatetoryModel    = require(ROOT + '/app/models').Catetory

const CatetoryProxy= require(ROOT + '/app/proxy').Catetory

/**
 * @name delItem
 * @desc 删除单个项目
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.delItem = function(req, res, next) {
  let deleteId = validator.trim(req.body.deleteId || '')
  let deleteType = validator.trim(req.body.deleteType || '').toLocaleUpperCase()

  if (deleteId === '') {
    return resJSON(res, true, 10005, 'deleteId 不能为空')
  }
  if (deleteType === '') {
    return resJSON(res, true, 10005, 'deleteType 不能为空')
  }
  if (!validator.isMongoId(deleteId)) {
    return resJSON(res, true, 10007, '不是有效的ID')
  }
  let ep = eventproxy()
  ep.fail(next)

  let Type
  if (deleteType === 'ARTICLE') {
    Type = ArticleModel
  } else if (deleteType === 'CATETORY') {
    Type = CatetoryModel
  }
  ep.on('delete_ok', function (Item){
    if (deleteType !== 'CATETORY' && deleteType !== 'COMMENT') {
      cache.set(validator.trim(deleteType).toLowerCase() + '_' + deleteId, Item, tools.time.M(true))
    }
    resJSON(res, true, 10000, '删除成功')
  })
  ep.on('query_ok', function (Item) {
    if (!Item) {
      return resJSON(res, true, 10008, 'ID不存在或已被删除')
    }
    // 判断是否为默认分类
    if (Item.isDefault) {
      return resJSON(res, true, 10006, '默认分类只允许修改，不允许被删除')
    }

    Item.deleted = true
    Item.save()

    if (deleteType !== 'CATETORY' && deleteType !== 'COMMENT') {
      CatetoryModel.findOne({_id: Item.catetory_id}, function(err, catetory) {
        if (err) next(err)
        if (catetory) {
          catetory.content_count.pop(deleteId)
          catetory.save()
        }
        ep.emit('delete_ok', Item)
      })
    } else if (deleteType === 'CATETORY') {
      let contents = Item.content_count

      ep.on('catetory_get', function (id) {
        // 清空原有分类内容
        Item.content_count = []
        Item.save()
        // 将所有内容移至 默认目录中
        CatetoryModel.findOne({_id: id}, function(err, catetory) {
          if (err) next(err)
          if (catetory) {
            contents.forEach((item) => {
              // 更新内容的分类所属
              ArticleModel.findById(item, function (err, article) {
                if (err) next(err)
                article.catetory_id = id
                article.save()
              })
              catetory.content_count.push(item)
              catetory.save()
            })
          }
          ep.emit('delete_ok', Item)
        })
      })
      // 查找默认目录
      CatetoryProxy.getDefault(function(id){
        ep.emit('catetory_get', id)
      }, next)

    } else {
      ep.emit('delete_ok', Item)
    }
  })
  Type.findOne({_id: deleteId, deleted: false}, ep.done('query_ok'))
}
