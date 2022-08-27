const express = require('express')
const Record = require('../../models/Record')

const routes = express.Router()

routes.get('/new', (req, res) => {
	res.render('new')
})
routes.post('', (req, res) => {
	const { name, date, category, amount } = req.body
	Record.create({ name, date, category, amount })
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = routes
