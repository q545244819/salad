const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const dataCtrl = require('../controllers/data')

router
  .get('/', wrap(dataCtrl.find))
  .post('/', wrap(dataCtrl.create))
  .put('/:id', wrap(dataCtrl.update))
  .delete('/:id', wrap(dataCtrl.delete))
  .put('/vote/:id', wrap(dataCtrl.vote))

module.exports = router