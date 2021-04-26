const express = require('express')
const router = express.Router()
const authController = require('./auth-controller.js')

router.post('/auth', authController.index)

module.exports = router