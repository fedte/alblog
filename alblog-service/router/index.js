const express = require('express')
const router = express.Router()

const UserSign = require('../app/controllers/sign')
const Auth = require('../app/middlewares/auth')

// test by falost
router.get('/test', function (req, res) {
  console.log('test')
  res.json({test: true})
})
router.post('/signup', UserSign.signup)
router.post('/login', UserSign.login)
router.post('/islogin', Auth.authUser)
module.exports = router
