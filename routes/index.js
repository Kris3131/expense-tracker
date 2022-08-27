const express = require('express')
const home = require('../routes/modules/home')
const records = require('./modules/records')

const Router = express.Router()

Router.use('/records', records)
Router.use('/', home)

module.exports = Router
