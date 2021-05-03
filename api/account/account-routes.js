const express = require('express')
const router = express.Router()
const accountController = require('./account-controller.js')

router.get('/account/getAccount/:accountId', accountController.getAccount)
router.get('/account/editAccount', accountController.editAccount)

module.exports = router