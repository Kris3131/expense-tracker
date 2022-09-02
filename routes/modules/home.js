const express = require('express')
const routes = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

routes.get('/', (req, res) => {
	const sortList = ['amount', '-amount', 'category', 'time']
	const sortOption = sortList.includes(req.query.sort) ? req.query.sort : 'time'
	const userId = req.user._id
	let icon = ''
	let totalAmount = 0
	Record.find({ userId })
		.lean()
		.sort(sortOption)
		.then((record) => {
			record.forEach((item) => {
				totalAmount = totalAmount + item.amount
				item.date = item.date.toLocaleString('zh-tw')
				Category.findById(item.categoryId)
					.then((category) => {
						return (icon = category.icon)
					})
					.catch((err) => console.log(err))
			})
			return res.render('index', { record, totalAmount, icon })
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
