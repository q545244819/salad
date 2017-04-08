const AV = require('leanengine')
const moduleAnswer = require('../modules/answer')
const Answer = AV.Object.extend('Answer')

exports.find = function* (req, res) {
  const query = req.query
  const results = yield moduleAnswer.search(query.q, parseInt(query.page))

  res.send(results)
}

exports.create = function* (req, res) {
  const body = req.body
  const answer = new Answer({
    content: body.content,
    question: AV.Object.createWithoutData('Question', body.questionId),
    user: AV.Object.createWithoutData('_User', req.session.user.objectId)
  })
  const newAnswer = yield answer.save()

  res.send(newAnswer)
}

exports.delete = function* (req, res) {
  const params = req.params
  const answer = AV.Object.createWithoutData('Answer', params.id)

  yield answer.destroy()

  res.send('deleted!')
}

exports.update = function* (req, res) {
  const body = req.body
  const params = req.params
  const answer = AV.Object.createWithoutData('Answer', params.id)

  answer.set('content', body.content)
  
  const newAnswer = yield answer.save()

  res.send(newAnswer)
}