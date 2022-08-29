const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const routes = require('./routes/index')

require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('err', () => console.log(`Mongoose connected to MONGODB Error`))
db.once('open', () => console.log(`Mongoose connected to MONGODB Success`))

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
)

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
	console.log(`localhost-> http://localhost:${port}`)
})
