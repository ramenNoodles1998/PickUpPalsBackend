const express = require('express')
const router = express.Router()
const authController = require('./auth-controller.js')

router.post('/auth/login', authController.login)

module.exports = router