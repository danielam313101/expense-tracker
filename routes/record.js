const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../middleware/auth')

router.get('/', (_req, _res) =>
  res.redirect('/')
)

router.get('/new', authenticated, (_req, res) => {
  res.render('new')
})

router.get('/:id', authenticated, (req, res) => {
  Record.findOne({_id: req.params.id, user: req.user._id})
    .lean()
    .then(record => res.render('detail', {record}))
    .catch(err => {
      console.error(err)
      return res.send(`something went wrong: ${err}`)
    })
})

router.post('/', authenticated, (req, res) => {
  console.log('req', req.body)
  const record = new Record({...req.body, user: req.user._id})

  record.save()
  .then(record => res.redirect(`/records/${record._id}`))
  .catch(err => {
    console.error(err)
    return res.send(`something went wrong: ${err}`)
  })
})


module.exports = router