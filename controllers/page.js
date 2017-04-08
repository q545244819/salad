exports.index = function* (req, res) {
  res.render('index', {
    user: req.session.user,
    name: 'index'
  })
}

exports.login = function* (req, res) {
  req.session.user = null

  res.render('login')
}

exports.register = function* (req, res) {
  req.session.user = null  

  res.render('register')
}

exports.logout = function* (req, res) {
  req.session.user = null  

  res.redirect('/')
}

exports.search = function* (req, res) {
  res.render('search', {
    user: req.session.user,
    name: 'search'
  })
}

exports.list = function* (req, res) {
  res.render('list', {
    user: req.session.user,
    name: 'list'
  })
}

exports.question = function* (req, res) {
  res.render('question', {
    user: req.session.user,
    name: 'question'
  })
}

exports.questionDetail = function* (req, res) {
  res.render('question_detail', {
    user: req.session.user,
    name: 'questionDetail'
  })
}