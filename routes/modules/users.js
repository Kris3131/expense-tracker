const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')

const routes = express.Router()
const User = require('../../models/User')

routes.get('/register', (req, res) => {
	res.render('register')
})

routes.post('/register', (req, res) => {
	const { name, email, password, confirmPassword } = req.body
	const errors = []
	if (!name || !email || !password || !confirmPassword) {
		errors.push({ message: '所有欄位都是必填' })
	}
	if (password !== confirmPassword) {
		errors.push({ message: '密碼與確認密碼不同' })
	}
	if (errors.length) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			confirmPassword,
		})
	}

	User.findOne({ email })
		.then((user) => {
			if (user) {
				return res.render('login', {
					email: user.email,
					message: '這個 Email 已經註冊過了',
				})
			}
			return bcrypt
				.genSalt(10)
				.then((salt) => bcrypt.hash(password, salt))
				.then((hash) => User.create({ name, email, password: hash }))
				.then(() => res.redirect('/'))
				.catch((err) => console.log(err))
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
		failureMessage: true,
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
