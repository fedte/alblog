const express = require('express')
const router = express.Router()

const UserSign = require('../app/controllers/sign')
const Auth = require('../app/middlewares/auth')

// test by falost
router.get('/test', function (req, res) {
  res.json({test: true, user: req.session.user})
})

router.post('/signup', UserSign.signup)
router.post('/login', UserSign.login)
router.post('/islogin', Auth.authUser)

module.exports = router
