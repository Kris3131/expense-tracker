const express = require('express')
const Record = require('../../models/Record')

const routes = express.Router()

routes.get('/new', (req, res) => {
	res.render('new')
})

module.exports = routes
