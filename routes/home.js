const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../middleware/auth')

router.get('/', authenticated, (req, res) => {
  const { category } = req.query
  const categoryFilter = category || ''
  Record.find({user: req.user._id, category: {
    $regex: categoryFilter, $options:'i'
  }})
    .lean()
    .then(records => {
    let totalAmount = 0
    if (records.length > 0) {
      totalAmount = records.map(record => parseInt(record.amount)).reduce((a, b) => a + b)
    }
      return res.render('index', {records, totalAmount, category: category ? category : '不設類別'})})
    .catch(err => {
      let errors = []
      errors.push({ message: `發生錯誤: ${err}` })
      return res.render('index', {errors})
    })
})

router.get('/search', authenticated, (req, res) => {
})

module.exports = router