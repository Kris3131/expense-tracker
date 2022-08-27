const express = require('express')
const routes = express.Router()
const Record = require('../../models/Record')

routes.get('/', (req, res) => {
	Record.find()
		.lean()
		.then((record) => {
			res.render('index', { record })
		})
		.catch((err) => console.log(err))
})

module.exports = routes
