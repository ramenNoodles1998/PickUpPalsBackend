const express = require('express')
const router = express.Router()
const subscriptionController = require('./subscriptions-controller.js')

router.get('/subscriptions', subscriptionController.index)
router.get('/subscriptions/:userId', subscriptionController.userSubscriptions)
router.post('/subscriptions/:userId', subscriptionController.addUserSubscription)
router.delete('/subscriptions/:userId', subscriptionController.deleteUserSubscription)




module.exports = router