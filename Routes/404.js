const express = require('express')
const Router = express.Router()
const page404Controller = require('../Controllers/page404')


Router.use( page404Controller.page404 )


module.exports=Router