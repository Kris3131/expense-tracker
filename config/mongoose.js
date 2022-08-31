const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('err', () => console.log(`Mongoose connected to MONGODB Error`))
db.once('open', () => console.log(`Mongoose connected to MONGODB Success`))

module.exports = db
