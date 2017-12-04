'use strict'

const express = require('express')
const router = express.Router()

const Auth = require('../app/middlewares/auth')
const Article = require('../api/v1/admin/article')

// test by falost
router.get('/test', function (req, res) {
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
// router.post('/catetory/save', Auth.adminRequired)
module.exports = router
