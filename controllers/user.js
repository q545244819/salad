const AV = require('leanengine')

exports.signIn = function* (req, res) {
  const body = req.body
  const user = yield AV.User.logIn(body.username, body.password)
  const query = new AV.Query(AV.Role)

  query.equalTo('users', user)

  const role = yield query.first()

  user.set('role', role.get('name'))

  req.session.user = user

  res.redirect('/')
}

exports.register = function* (req, res) {
  const body = req.body
  const user = new AV.User()

  user.setUsername(body.username)
  user.setPassword(body.password)
  user.setMobilePhoneNumber(body.phone)

  if (body.email) {
    user.setEmail(body.email)
  }

  try {
    const register = yield user.signUp()
    const roleQuery = new AV.Query('_Role')

    roleQuery.equalTo('name', body.role)
    
    const role = yield roleQuery.first()

    role.getUsers().add(register)
    
    yield role.save()

    req.session.user = user

    res.redirect('/')
  } catch(e) {
    console.error(e)

    res.redirect('/register')
  }
}