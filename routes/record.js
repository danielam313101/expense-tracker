const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../middleware/auth')
const { validateRecord } = require('../helper/record')

router.get('/', (_req, res) =>
  res.redirect('/')
)

router.get('/new', authenticated, (_req, res) => {
  res.render('new')
})

router.post('/', authenticated, (req, res) => {
  let errors = validateRecord(req, [])
  if (errors.length > 0) {
    return res.render(`new`, {errors, ...req.body})
  }

  const record = new Record({...req.body, user: req.user._id})

  record.save()
  .then(_record => res.redirect(`/records/`))
  .catch(err => {
    let errors = []
    errors.push({ message: `發生錯誤: ${err}` })
    return res.render('index', {errors})
  })
})

router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({_id: req.params.id, user: req.user._id})
    .lean()
    .then(record => console.log(record) || res.render('edit', {...record}))
    .catch(err => {
      let errors = []
      errors.push({ message: `發生錯誤: ${err}` })
      return res.render('index', {errors})
    })
})

router.put('/:id', authenticated, (req, res) => {
  let errors = validateRecord(req, [])
  if (errors.length > 0) {
    return res.render(`edit`, {errors, ...req.body})
  }
  Record.findOne({_id: req.params.id, user: req.user._id})
  .then(record => {
    const {body: {amount, name, date, category}} = req
    record.amount = amount
    record.name = name
    record.date = date
    record.category = category
    return restaurant.save();
  })
  .then(_record => res.redirect(`/records/`))
  .catch(err => {
    let errors = []
    errors.push({ message: `發生錯誤: ${err}` })
    return res.render('index', {errors})
  })
})

router.delete('/:id', authenticated, (req, res) => {
  Record.findOne({_id: req.params.id, user: req.user._id})
  .then(record => {
    record.remove()
  })
  .then(() => res.redirect('/'))
  .catch(err => {
    let errors = []
    errors.push({ message: `發生錯誤: ${err}` })
    return res.render('index', {errors})
  })
})


module.exports = router