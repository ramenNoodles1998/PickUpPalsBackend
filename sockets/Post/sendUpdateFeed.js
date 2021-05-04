const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')
const Subscriptions = require('../../model/subscription-model.js')

exports.sendUpdateFeed = (io) => {
    return async ({ post }) => {
        let foundPost = await Post.findOne({_id: post._id}).exec()
        let postCreator = await User.findOne({_id: foundPost.creatorId}).exec()
        let subscription = await Subscriptions.findOne({title: foundPost.sport}).exec()

        for(let friend of postCreator.friends) {
            io.emit(`updateFeed/${friend}`)
        }
        
        io.emit(`updateFeed/${postCreator._id}`)

        for(let sub of subscription.subscribers) {
            io.emit(`updateFeed/${sub}`)
        }
    }
}