const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const userCtrl = require('../controllers/user')

router
  .post('/', wrap(userCtrl.signIn))
  .post('/register', wrap(userCtrl.register))

module.exports = router