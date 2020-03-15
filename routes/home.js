const express = require('express')
const router = express.Router()
const { authenticated } = require('../middleware/auth')

router.get('/', authenticated, (req, res) => {
  res.render('index')
})

router.get('/search', authenticated, (req, res) => {
})

module.exports = router