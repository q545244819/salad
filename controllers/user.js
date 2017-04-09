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
  let user = null

  if (body.code) {
    user = new AV.User()

    user.setUsername(body.username)
    user.setPassword(body.password)
    user.setMobilePhoneNumber(body.phone)
    user.set('name', body.name)
  }

  try {
    const register = body.code ? yield AV.User.signUpOrlogInWithMobilePhone(body.phone, body.code) : yield user.signUp()
    const roleQuery = new AV.Query('_Role')

    roleQuery.equalTo('name', body.role)
    
    const role = yield roleQuery.first()

    role.getUsers().add(register)
    
    yield role.save()

    if (body.code) {
      const updateUser = AV.Object.createWithoutData('_User', register.get('id'))

      updateUser.set('username', body.username)
      updateUser.set('password', body.password)
      updateUser.set('name', body.name)

      user = yield updateUser.save()
    }

    req.session.user = user || register

    res.redirect('/')
  } catch(e) {
    console.error(e)

    res.redirect('/register')
  }
}

exports.requestSmsCode = function* (req, res) {
  const query = req.query

  return AV.Cloud.requestSmsCode(query.phone)
}