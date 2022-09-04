const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const usePassport = require('./config/passport')
const exphbs = require('express-handlebars')
const hbshepler = require('handlebars-helpers')()
const methodOverride = require('method-override')
const flash = require('connect-flash')
const PORT = process.env.PORT || 3000

const routes = require('./routes/index')

require('dotenv').config()
require('./config/mongoose')

const app = express()
const port = 3000

app.engine(
	'hbs',
	exphbs.engine({ defaultLayout: 'main', extname: '.hbs', helpers: hbshepler })
)
app.set('view engine', 'hbs')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
			touchAfter: 24 * 3600,
		}),
		cookie: { maxAge: 60 * 1000 },
	})
)
app.use(express.static('publics'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.user = req.user
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	res.locals.error_404_msg = req.flash('error_404_msg')
	res.locals.error_500_msg = req.flash('error_500_msg')
	next()
})
app.use(routes)

app.listen(PORT, () => {
	console.log(`localhost-> http://localhost:${PORT}`)
})
