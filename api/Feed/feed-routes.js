const express = require('express')
const router = express.Router()
const feedController = require('./feed-controller.js')

router.get('/feed/friendsList', feedController.getFriendsList)
router.get('/feed/findFriends', feedController.findFriends)
router.post('/feed/addFriend/:username', feedController.addFriend)
router.get('/feed/posts', feedController.getPosts)
router.get('/feed/subscriptionPosts', feedController.getSubscriptionPosts)
router.get('/feed/userPosts', feedController.getUserPosts)

module.exports = router