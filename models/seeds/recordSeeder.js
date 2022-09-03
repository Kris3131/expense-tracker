require('dotenv').config()
const db = require('../../config/mongoose')
const Category = require('../Category')
const User = require('../User')
const Record = require('../Record')
const bcrypt = require('bcryptjs')

const userList = require('./userList.json')
const recordList = require('./recordList.json')

db.once('open', async () => {
	// 先把 Category 資料載進來
	const categorySeed = Category.find().lean()
	// record 需要 userId / categoryId

	await Promise.all(
		// 建立 user -> userId
		userList.map(async (user) => {
			const { name, email, password } = user
			const userSeed = await User.create({
				name,
				email,
				password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
			})
			console.log('user create!')
			await Promise.all(
				// 建立 record
				recordList.map(async (record) => {
					// recordList -> 把物件丟出來
					const { name, date, amount, category } = record

					// 把 categoryId 抓出來 -> 建立 record
					const categoryItem = categorySeed.find({ name: category })
					await Record.create({
						name,
						date,
						amount,
						userId: userSeed._id,
						categoryId: categoryItem._id,
					})
				})
			)
		})
	)
})
