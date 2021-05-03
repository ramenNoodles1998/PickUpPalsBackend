const express = require('express')
const router = express.Router()
const postController = require('./post-controller.js')

router.get('/post/posts', postController.getPosts)
router.get('/post/subscriptionPosts', postController.getSubscriptionPosts)
router.get('/post/userPosts', postController.getUserPosts)
router.get('/post/getAllPosts', postController.getAllPosts)
router.get(`/post/editPost`, postController.editPost)
router.delete(`/post/deletePost/:postId`, postController.deletePost)

module.exports = router