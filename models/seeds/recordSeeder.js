require('dotenv').config()
const db = require('../../config/mongoose')
const Category = require('../Category')
const User = require('../User')
const Record = require('../Record')
const bcrypt = require('bcryptjs')

const SEED_USER = {
	name: 'user1',
	email: 'user1@example.com',
	password: '12345678',
}

db.once('open', () => {
	bcrypt
		.genSalt(10)
		.then((salt) => bcrypt.hash(SEED_USER.password, salt))
		.then((hash) =>
			User.create({
				name: SEED_USER.name,
				email: SEED_USER.email,
				password: hash,
			})
		)
		.then((user) => {
			const userId = user._id
			return Category.find()
				.lean()
				.then((item) => {
					return Promise.all(
						Array.from({ length: item.length }, (_, i) => {
							return Record.create({
								name: '花費',
								date: Date.now(),
								amount: Number((i + 1) * 10),
								userId,
								categoryId: item[i]._id,
							})
						})
					)
				})
				.then(() => {
					console.log('record create')
					process.exit()
				})
		})
})
