const express = require('express')
const router = express.Router()
const registerController = require('./register-controller.js')

router.post('/register', registerController.index)

module.exports = router