const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const bgoCtrl = require('../controllers/bgo')

router
  .get('/', wrap(function* (req, res) {
    res.render('bgo/index')
  }))
  .get('/data', wrap(function * (req, res) {
    res.render('bgo/data')
  }))
  .post('/data', wrap(bgoCtrl.saveData))

module.exports = router