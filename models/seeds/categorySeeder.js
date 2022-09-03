require('dotenv').config()
const db = require('../../config/mongoose')

const Category = require('../Category')
const categoryList = require('../seeds/categoryList.json')

db.once('open', () => {
	Category.create(categoryList)
		.then(() => {
			console.log('Category created')
			process.exit()
		})
		.catch((error) => console.log(error))
})
