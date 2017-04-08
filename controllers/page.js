const moduleData = require('../modules/data')
const moduleQuestion = require('../modules/question')

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
  const query = req.query
  const data = yield moduleData.search(query.q, parseInt(query.page) || 1)
  
  res.render('search', {
    user: req.session.user,
    name: 'search',
    data,
    query
  })
}

exports.list = function* (req, res) {
  const query = req.query
  const data = yield moduleData.search('*', parseInt(query.page) || 1)

  res.render('list', {
    user: req.session.user,
    name: 'list',
    data
  })
}

exports.question = function* (req, res) {
  const query = req.query
  let data = null

  if (query.q) {
    data = yield moduleQuestion.search(query.q, parseInt(query.page) || 1)
  } else {
    data = yield moduleQuestion.find(parseInt(query.page) || 1)    
  }

  res.render('question', {
    user: req.session.user,
    name: 'question',
    data,
    query
  })
}

exports.questionDetail = function* (req, res) {
  res.render('question_detail', {
    user: req.session.user,
    name: 'questionDetail'
  })
}