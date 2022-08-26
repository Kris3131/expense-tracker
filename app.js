const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('err', () => console.log(`Mongoose connected to MONGODB Error`))
db.once('open', () => console.log(`Mongoose connected to MONGODB Success`))

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
	res.render('index')
})

app.listen(port, () => {
	console.log(`localhost-> http://localhost:${port}`)
})
