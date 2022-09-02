const express = require('express')
const home = require('../routes/modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

const Router = express.Router()

Router.use('/records', authenticator, records)
Router.use('/users', users)
Router.use('/auth', auth)
Router.use('/', authenticator, home)

// 404 error
Router.get('*', (req, res) => {
	res
		.status(404)
		.render('error', { error: req.flash('error_404_msg', '找不到頁面！') })
})
// 500 error
Router.get('*', (err, req, res, next) => {
	console.log(err)
	res
		.status(500)
		.render('error', { error: req.flash('error_500_msg', '請稍後再試！') })
})
module.exports = Router
