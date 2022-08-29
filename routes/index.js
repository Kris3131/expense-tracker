const express = require('express')
const home = require('../routes/modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

const Router = express.Router()

Router.use('/records', records)
Router.use('/users', users)
Router.use('/', home)

module.exports = Router
