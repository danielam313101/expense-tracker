const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../middleware/auth')

router.get('/', authenticated, (req, res) => {
  Record.find({user: req.user._id})
    .lean()
    .then(records => res.render('index', {records}))
    .catch(err => {
      errors.push({ message: `發生錯誤: ${err}` })
      return res.render('index', {errors})
    })
})

router.get('/search', authenticated, (req, res) => {
})

module.exports = router