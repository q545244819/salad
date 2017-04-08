const AV = require('leanengine')

exports.signIn = function* (req, res) {
  const body = req.body
  const user = yield AV.User.logIn(body.username, body.password)

  req.session.user = user

  res.redirect('/')
}

exports.register = function* (req, res) {
  const body = req.body
  const user = new AV.User()

  user.setUsername(body.username)
  user.setPassword(body.password)
  user.setEmail(body.email)

  const register = yield user.signUp()

  req.session.user = user

  res.redirect('/')
}