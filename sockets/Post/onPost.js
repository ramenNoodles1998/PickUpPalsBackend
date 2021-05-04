const User = require('../../model/user-model')
const Post = require('../../model/post-model.js')
const Subscription = require('../../model/subscription-model.js')

exports.onPost = (io) => {
    return async ({post}) => {
        let loggedInUser = await User.findOne({_id: post.creatorId})
        const newPost = new Post(post)

        newPost.save().then(async () => {
            for(let friend of loggedInUser.friends) {
                io.emit(`updateFeed/${friend}`)
            }
    
            let subscription = await Subscription.findOne({title: newPost.sport}).exec()
    
            for(let sub of subscription.subscribers) {
                io.emit(`updateFeed/${sub}`)
            }
    
            io.emit(`updateFeed/${loggedInUser._id}`)
        })
    }
}