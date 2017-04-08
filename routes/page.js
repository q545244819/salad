const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const pageCtrl = require('../controllers/page')

router
  .get('/', wrap(pageCtrl.index))
  .get('/login', wrap(pageCtrl.login))
  .get('/register', wrap(pageCtrl.register))

module.exports = router