const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport')
const flash = require('connect-flash')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/records', {
  useNewUrlParser: true,
  useCreateIndex: true
})

const db = mongoose.connection

db.on('error', ()=>{
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = 3000

var hbsHelpers = exphbs.create({
  helpers: require("./helper/handlebars.js").helpers,
  defaultLayout: 'main',
  extname: '.handlebars'
});
app.engine('.handlebars', hbsHelpers.engine);
app.set('view engine', '.handlebars');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(session({
  secret: 'mySecretKey123098qwerty',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)


app.use(flash())
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', require('./routes/home'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/user'))
app.use('/records', require('./routes/record'))

app.listen(process.env.PORT || port, () => {
  console.log(`App is running at port ${port}`)
})