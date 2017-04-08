const express = require('express')
const wrap = require('co-express')
const router = express.Router()

const dataCtrl = require('../controllers/data')

router
  .get('/', wrap(dataCtrl.index))

module.exports = router