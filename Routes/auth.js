const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth')


router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)
router.post('/logout',authController.postLogout)
router.get('/Register',authController.getRegister)
router.post('/Register',authController.postRegister)



module.exports = router


