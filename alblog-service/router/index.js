const express = require('express')
const router = express.Router()

const UserSign = require('../app/controllers/sign')
const Auth = require('../app/middlewares/auth')
const Article = require('../api/v1/web/article')
// test by falost
router.get('/test', function (req, res) {
  res.json({test: true, user: req.session.user})
})

router.post('/signup', UserSign.signup)
router.post('/login', UserSign.login)
router.post('/islogin', Auth.authUser)

router.get('/article/list', Article.list)
router.get('/article/:id', Article.get)

module.exports = router
