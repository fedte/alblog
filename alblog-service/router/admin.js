'use strict'

const express = require('express')
const router = express.Router()

const Auth = require('../app/middlewares/auth')

// test by falost
router.get('/test', function (req, res) {
  res.json({test: true})
})
router.post('/isAdmin', Auth.adminRequired, function (req, res){
  res.json({
    success: true,
    code: 10000,
    message: '管理员权限',
    entity: {}
  })
})

module.exports = router
