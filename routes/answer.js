const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const answerCtrl = require('../controllers/answer')

router
  .post('/', wrap(answerCtrl.create))
  .put('/:id', wrap(answerCtrl.update))
  .delete('/:id', wrap(answerCtrl.delete))

module.exports = router