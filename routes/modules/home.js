const express = require('express')
const routes = express.Router()
const Record = require('../../models/Record')

routes.get('/', (req, res) => {
	const userId = req.user._id
	Record.find({ userId })
		.lean()
		.then((record) => {
			res.render('index', { record })
		})
		.catch((err) => console.log(err))
})

module.exports = routes
