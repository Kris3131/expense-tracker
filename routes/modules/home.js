const express = require('express')
const routes = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

routes.get('/', (req, res, next) => {
	const userId = req.user._id
	const filterCategory = req.query.filterCategory
	let totalAmount = 0
	if (!filterCategory) {
		Record.find({ userId })
			.populate('categoryId')
			.sort({ _id: 'asc' })
			.lean()
			.then((record) => {
				record.forEach((item) => {
					totalAmount = totalAmount + item.amount
					item.date = item.date.toLocaleDateString()
					Category.findById(item.categoryId)
						.then((category) => {
							return (icon = category.icon)
						})
						.catch((err) => next(err))
				})
				return res.render('index', {
					record,
					totalAmount,
					// icon,
					filterCategory,
				})
			})
			.catch((err) => next(err))
	} else {
		Category.findOne({ name: filterCategory }).then((category) => {
			icon = category.icon
			const categoryId = category._id
			Record.find({ categoryId })
				.lean()
				.then((record) => {
					record.forEach((item) => {
						// 加總
						totalAmount = totalAmount + item.amount
						// 調整date格式
						item.date = item.date.toLocaleDateString()
					})

					res.render('index', { record, totalAmount, icon, filterCategory })
				})
				.catch((err) => next(err))
		})
	}
})

module.exports = routes
