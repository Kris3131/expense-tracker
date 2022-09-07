const express = require('express')
const Record = require('../../models/Record')
const Category = require('../../models/Category')

const routes = express.Router()

routes.get('/new', (req, res) => {
	res.render('new')
})
routes.post('', (req, res, next) => {
	const userId = req.user._id
	const { name, date, category, amount } = req.body // 找出post form req 的項目
	Category.findOne({ name: category }) // 找出 category 中有沒有出現在 Category Model 中
		.lean()
		.then((category) => {
			// 沒有的->建立一個新的 Category Model 項目
			if (!category) {
				Category.create({ name: req.body.category }) // 在 Category 建立新的項目
					.then((category) => {
						Record.create({
							name,
							date,
							category,
							amount,
							categoryId: category._id,
							userId,
						}) // 建立新的 Record Model 項目
					})
					.then(() => res.redirect('/'))
					.catch((err) => next(err))
			}
			if (category) {
				// 有的話不需要建立一個新的Category Model 項目
				const categoryId = category._id // 直接 Record 的 categoryId 指向到 已經建立的 category 的 id
				Record.create({ name, date, category, amount, categoryId, userId })
					.then(() => res.redirect('/'))
					.catch((err) => next(err))
			}
		})
		.catch((err) => next(err))
})

routes.get('/:id/edit', (req, res, next) => {
	const userId = req.user._id
	const _id = req.params.id
	Record.findOne({ _id, userId })
		.lean()
		.then((record) => {
			res.render('edit', { record })
		})
		.catch((err) => next(err))
})
routes.put('/:id', (req, res, next) => {
	const userId = req.user._id
	const _id = req.params.id
	const { name, date, category, amount } = req.body
	Category.findOne({ name: category })
		.lean()
		.then((category) => {
			if (!category) {
				Category.create({ name: req.body.category })
					.then((category) => {
						const categoryId = category._id
						Record.findByIdAndUpdate(_id, {
							name,
							date,
							categoryId,
							amount,
							userId,
						})
					})
					.then(() => {
						res.redirect('/')
					})
					.catch((err) => next(err))
			}
			if (category) {
				const categoryId = category._id
				Record.findByIdAndUpdate(_id, {
					name,
					date,
					categoryId,
					amount,
					userId,
				})
					.then(() => {
						res.redirect('/')
					})
					.catch((err) => next(err))
			}
		})
		.catch((err) => next(err))
})

routes.delete('/:id', (req, res, next) => {
	const userId = req.user._id
	const _id = req.params.id
	Record.findOneAndRemove({ _id, userId })
		.then(() => {
			res.redirect('/')
		})
		.catch((err) => next(err))
})

module.exports = routes
