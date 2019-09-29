const express = require('express')
const cors = require('cors')
const config = require('./config')
const apiRouter = require('./router')
const apiAdminRouter = require('./router/admin')
const app = express()
const loggers = require('./lib/logger.lib')
const session = require('./lib/session.lib')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production' || true
const resolve = file => path.resolve(__dirname, file)
const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})
// 记录日志
app.use(loggers.access())

// url参数 by falost
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 上传处理
app.use(require('connect-multiparty')())
// cookie处理 by falost
app.use(cookieParser())

// app.use('/router/path', serve('./file/path'))
// session处理
app.use(session.check(), session.init())

// router by falost
app.use('/admin/api/v1', cors(), apiAdminRouter)
app.use('/api/v1', cors(), apiRouter)

app.listen(config.port, function () {
  console.log('----------------')
  console.log()
  console.log('启动成功')
  console.log('listen port to :' + config.port)
  console.log()
  console.log('------ End------')
})
