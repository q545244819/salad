const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const questionCtrl = require('../controllers/question')

router
  .get('/', wrap(questionCtrl.find))
  .post('/', wrap(questionCtrl.create))
  .put('/:id', wrap(questionCtrl.update))
  .delete('/:id', wrap(questionCtrl.delete))

module.exports = router