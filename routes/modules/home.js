const express = require('express')
const routes = express.Router()
const Record = require('../../models/Record')

routes.get('/', (req, res) => {
	const sortList = ['amount', '-amount', 'category', 'time']
	const sortOption = sortList.includes(req.query.sort) ? req.query.sort : 'time'
	const userId = req.user._id
	Record.find({ userId })
		.lean()
		.sort(sortOption)
		.then((record) => {
			res.render('index', { record })
		})
		.catch((err) => console.log(err))
})

routes.get('/search', (req, res) => {
	const keyword = req.query.keyword
	if (!keyword) {
		res.redirect('/')
	}
	const keywordLowerCase = keyword.trim().toLowerCase()
	Record.find()
		.lean()
		.then((record) => {
			const filterRecord = record.filter(
				(item) =>
					item.name.trim().toLowerCase().includes(keywordLowerCase) ||
					item.name.includes(keywordLowerCase)
			)
			res.render('index', { record: filterRecord, keyword })
		})
		.catch((err) => console.log(err))
})

module.exports = routes
