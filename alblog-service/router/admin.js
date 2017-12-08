'use strict'

const express = require('express')
const router = express.Router()

const Auth = require('../app/middlewares/auth')
const Catetory = require('../api/v1/admin/catetory')
const Article = require('../api/v1/admin/article')
const Delete = require('../api/v1/admin/delete')
// test by falost
router.all('/test', function (req, res) {
  res.json({test: true, user: req.session.user})
})
router.post('/isAdmin', Auth.adminRequired, function (req, res){
  res.json({
    success: true,
    code: 10000,
    message: '管理员权限',
    entity: {}
  })
})

router.post('/article/save', Auth.adminRequired, Article.create)
router.put('/article/save', Auth.adminRequired, Article.update)
router.post('/article/get', Auth.adminRequired, Article.get)
router.post('/article/list', Auth.adminRequired, Article.list)

router.post('/catetory/save', Auth.adminRequired, Catetory.create)
router.put('/catetory/save', Auth.adminRequired, Catetory.update)
router.post('/catetory/get', Auth.adminRequired, Catetory.get)
router.post('/catetory/list', Auth.adminRequired, Catetory.getAll)

router.delete('/delete/item', Auth.adminRequired, Delete.delItem)

module.exports = router
