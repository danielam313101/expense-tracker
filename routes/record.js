const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../middleware/auth')

router.get('/', (_req, res) =>
  res.redirect('/')
)

router.get('/new', authenticated, (_req, res) => {
  res.render('new')
})

router.post('/', authenticated, (req, res) => {
  console.log('req', req.body)
  const record = new Record({...req.body, user: req.user._id})

  console.log(record.validateSync())

  return res.redirect(`/records`)
  // record.save()
  // .then(_record => res.redirect(`/records/`))
  // .catch(err => {
  //   console.error(err)
  //   return res.send(`something went wrong: ${err}`)
  // })
})


module.exports = router