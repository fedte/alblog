
let config = {
  debug: true,
  port: 3000,
  // mongodb 配置
  db: {
    host: '127.0.0.1',
    port: '27017',
    db: 'alblog',
    user: 'alblog',
    pass: '123456'
  },
  // redis 配置，默认是本地
  redis: {
    host: '127.0.0.1',
    port: 6379,
    db: 0,
    password: '',
  },
  // 用户设置
  user: {
    active: true, // 默认用户是否为激活状态
    reg: true, // 是否允许注册新用户
    salt: 'djklfjoptie'
  },
  // 管理员设置
  admins: {
    falost: true
  },
  session_secret: 'alblog', // 务必修改
  auth_cookie_name: 'alblog',
  // cookid配置
  cookie:{
    domain:'',
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    // signed: true,
    // secure:true,
    // httpOnly: false
  },
}
module.exports = config
