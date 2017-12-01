const express = require('express')
const cors = require('cors')
const config = require('./config')
const apiRouter = require('./router')
const apiAdminRouter = require('./router/admin')
const app = express()
const loggers = require('./lib/logger.lib')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// 记录日志
app.use(loggers.access())

// url参数 by falost
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 上传处理
app.use(require('connect-multiparty')())
// cookie处理 by falost
app.use(cookieParser())

// router by falost
app.use('/api/v1', cors(), apiRouter)
app.use('/admin/api/v1', cors(), apiAdminRouter)
app.listen(config.port, function () {
  console.log('启动成功')
  console.log('listen port to :' + config.port)
})
