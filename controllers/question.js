const AV = require('leanengine')
const Question = AV.Object.extend('Question')

exports.create = function* (req, res) {
  const body = req.body
  const question = new Question({
    title: body.title,
    content: body.content,
    user: AV.Object.createWithoutData(req.session.user.objectId)
  })
  const newQuestion = yield question.save()

  res.send(newQuestion)
}

exports.delete = function* (req, res) {
  const params = req.params
  const question = AV.Object.createWithoutData(params.id)

  yield question.remove()

  res.send('deleted!')
}

exports.update = function* (req, res) {
  const body = req.body
  const params = req.params
  const question = AV.Object.createWithoutData(params.id)

  question.set('title', body.title)
  question.set('content', body.content)

  const newQuestion = question.save()

  res.send(newQuestion)
}