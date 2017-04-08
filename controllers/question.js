const AV = require('leanengine')
const moduleQuestion = require('../modules/question')
const Question = AV.Object.extend('Question')

exports.find = function* (req, res) {
  const query = req.query
  const results = yield moduleQuestion.search(query.q, parseInt(query.page))

  res.send(results)
}

exports.create = function* (req, res) {
  const body = req.body
  const question = new Question({
    title: body.title,
    content: body.content,
    user: AV.Object.createWithoutData('_User', req.session.user.objectId)
  })
  const newQuestion = yield question.save()

  res.redirect(`/question/${newQuestion.get('id')}`)
}

exports.delete = function* (req, res) {
  const params = req.params
  const question = AV.Object.createWithoutData('Question', params.id)

  yield question.destroy()

  res.send('deleted!')
}

exports.update = function* (req, res) {
  const body = req.body
  const params = req.params
  const question = AV.Object.createWithoutData('Question', params.id)

  question.set('title', body.title)
  question.set('content', body.content)

  const newQuestion = yield question.save()

  res.send(newQuestion)
}