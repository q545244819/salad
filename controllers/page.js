exports.index = function* (req, res) {
  res.render('index', {
    user: req.session.user
  })
}

exports.login = function* (req, res) {
  res.render('login')
}

exports.register = function* (req, res) {
  res.render('register')
}

exports.search = function* (req, res) {
  res.render('search')
}

exports.list = function* (req, res) {
  res.render('list')
}

exports.question = function* (req, res) {
  res.render('question')
}

exports.questionDetail = function* (req, res) {
  res.render('question_detail')
}