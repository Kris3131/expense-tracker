const express = require('express')
const routes = express.Router()
const User = require('../../models/User')

routes.get('/register', (req, res) => {
	res.render('register')
})

routes.post('/register', (req, res) => {
	const { name, email, password } = req.body
	User.create({ name, email, password })
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = routes
