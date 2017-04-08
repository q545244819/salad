const AV = require('leanengine')
const Data = AV.Object.extend('Data')

exports.create = function* (req, res) {
  const body = req.body
  const data = new Data({
    title: data.title,
    content: data.content,
    user: AV.Object.createWithoutData('Data', req.session.user.objectId)
  })
  const newData = yield data.save()

  res.send(newData)
}

exports.update = function* (req, res) {
  const body = req.body
  const params = req.params
  const data = AV.Object.createWithoutData('Data', params.id)
  
  data.set('title', data.title)
  data.set('content', data.content)

  const newData = yield data.save()

  res.send(newData)
}

exports.delete = function* (req, res) {
  const params = req.params
  const data = AV.Object.createWithoutData('Data', params.id)
  
  yield data.remove()

  res.send('deleted!')
}

exports.vote = function* (req, res) {
  const params = req.params
  const data = AV.Object.createWithoutData('Data', params.id)

  yield data.increment('vote', 1)

  res.send('voted!')
}