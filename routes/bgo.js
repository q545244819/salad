const express = require('express')
const wrap = require('co-express')
const router = express.Router()

router
  .get('/', wrap(function* (req, res) {
    res.render('bgo/index')
  }))
  .get('/data', wrap(function * (req, res) {
    res.render('bgo/data')
  }))

module.exports = router