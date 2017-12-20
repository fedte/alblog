const express = require('express')
const router = express.Router()

const UserSign = require('../app/controllers/sign')
const Auth = require('../app/middlewares/auth')
const Article = require('../api/v1/web/article')
const Comments = require('../api/v1/web/comment')

// test by falost
router.get('/test', function (req, res) {
  res.json({test: true, user: req.session.user})
})

router.post('/signup', UserSign.signup)
router.post('/login', UserSign.login)
router.post('/islogin', Auth.authUser)

router.get('/article/list', Article.list)
router.get('/article/:id', Article.get)
router.post('/article/get', Article.get)
router.post('/comment/save', Comments.save)
router.post('/comment/get', Comments.get)

module.exports = router
