const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const pageCtrl = require('../controllers/page')

router
  .get('/', wrap(pageCtrl.index))
  .get('/login', wrap(pageCtrl.login))
  .get('/register', wrap(pageCtrl.register))
  .get('/logout', wrap(pageCtrl.logout))
  .get('/search', wrap(pageCtrl.search))
  .get('/list', wrap(pageCtrl.list))
  .get('/question', wrap(pageCtrl.question))
  .get('/question/:id', wrap(pageCtrl.questionDetail))

module.exports = router