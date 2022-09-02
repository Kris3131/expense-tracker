const express = require('express')
const home = require('../routes/modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

const Router = express.Router()

Router.use('/records', authenticator, records)
Router.use('/users', users)
Router.use('/auth', auth)
Router.use('/', authenticator, home)

module.exports = Router
