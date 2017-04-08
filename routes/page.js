const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const pageCtrl = require('../controllers/page')

router
  .get('/', wrap(pageCtrl.index))

module.exports = router