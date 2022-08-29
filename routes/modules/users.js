const express = require('express')
const passport = require('passport')
const routes = express.Router()
const User = require('../../models/User')

routes.get('/register', (req, res) => {
	res.render('register')
})

routes.post('/register', (req, res) => {
	const { name, email, password } = req.body
	User.findOne({ email })
		.then((user) => {
			if (user) {
				res.render('login', { email: user.email })
			} else {
				User.create({ name, email, password })
					.then(() => res.redirect('/'))
					.catch((err) => console.log(err))
			}
		})
		.catch((err) => console.log(err))
})

routes.get('/login', (req, res) => {
	res.render('login')
})
routes.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
	})
)
routes.get('/logout', (req, res) => {
	req.logout((err) => {
		if (err) {
			return next(err)
		}
	})
	res.redirect('/users/login')
})

module.exports = routes
