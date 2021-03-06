const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')
const Subscriptions = require('../../model/subscription-model.js')

exports.joinGame = (io) => {
    return async ({ userId, post }) => {
        let loggedInUser = await User.findOne({_id: userId}).exec()

        loggedInUser.currentGames.push(post._id)
        let foundPost = await Post.findOne({_id: post._id}).exec()

        foundPost.spotsAvailable--
        let postCreator = await User.findOne({_id: foundPost.creatorId}).exec()

        await foundPost.save()
        await loggedInUser.save()

        for(let friend of postCreator.friends) {
            io.emit(`updateFeed/${friend}`)
        }

        io.emit(`updateFeed/${postCreator._id}`)

        let subscription = await Subscriptions.findOne({title: foundPost.sport}).exec()

        for(let sub of subscription.subscribers) {
            io.emit(`updateFeed/${sub}`)
        }
    }
}