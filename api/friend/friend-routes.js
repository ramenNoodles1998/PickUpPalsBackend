const express = require('express')
const router = express.Router()
const friendController = require('./friend-controller.js')

router.get('/friend/friendsList', friendController.getFriendsList)
router.get('/friend/getFriends', friendController.getFriends)
router.post('/friend/addFriend/:username', friendController.addFriend)
router.get('/friend/addPendingFriend/:friendId', friendController.addPendingFriend)
router.get('/friend/getPendingFriends', friendController.getPendingFriends)
router.get('/friend/getSentPendingFriends', friendController.getSentPendingFriends)
router.delete('/friend/deleteFriend/:friendId', friendController.deleteFriend)

module.exports = router