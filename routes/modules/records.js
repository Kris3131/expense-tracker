const express = require('express')
const Record = require('../../models/Record')

const routes = express.Router()

routes.get('/new', (req, res) => {
	res.render('new')
})
routes.post('', (req, res) => {
	const { name, date, category, amount } = req.body
	Record.create({ name, date, category, amount })
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})
routes.get('/:id/edit', (req, res) => {
	const _id = req.params.id
	Record.findById(_id)
		.lean()
		.then((record) => {
			res.render('edit', { record })
		})
		.catch((err) => console.log(err))
})
routes.put('/:id', (req, res) => {
	const _id = req.params.id
	const { name, date, category, amount } = req.body
	Record.findByIdAndUpdate(_id, { name, date, category, amount })
		.lean()
		.then(() => {
			res.redirect('/')
		})
		.catch((err) => console.log(err))
})

routes.delete('/:id', (req, res) => {
	const _id = req.params.id
	Record.findByIdAndRemove(_id)
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = routes
