const express = require('express')
const timeout = require('connect-timeout')
const path = require('path')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const AV = require('leanengine')
const middleware = require('./middlewares')

const app = express()

require('dotenv').config()

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

// 设置默认超时时间
app.use(timeout('15s'))

// 加载云引擎中间件
app.use(AV.express())

app.enable('trust proxy', 1)
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cookieSession({
  name: 'session',
  keys: [process.env.secret],
  maxAge: 24 * 60 * 60 * 1000
}))

app.use('/', require('./routes/page'))
app.use('/user', require('./routes/user'))
app.use('/bgo', require('./routes/bgo'))
app.use('/data', middleware, require('./routes/data'))
app.use('/question', middleware, require('./routes/question'))
app.use('/answer', middleware, require('./routes/answer'))

// 可以将一类的路由单独保存在一个文件中

app.use(function (req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  }
})

// error handlers
app.use(function (err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return
  }

  var statusCode = err.status || 500
  if (statusCode === 500) {
    console.error(err.stack || err)
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout)
  }
  res.status(statusCode)
  // 默认不输出异常详情
  var error = {}
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err
  }
  res.render('error', {
    message: err.message,
    error: error,
    user: req.session.user,
    name: 'error'
  })
})

module.exports = app
