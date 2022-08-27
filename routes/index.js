const express = require('express')
const home = require('../routes/modules/home')
const amounts = require('../routes/modules/amounts')

const Router = express.Router()

Router.use('/amounts', amounts)
Router.use('/', home)

module.exports = Router
