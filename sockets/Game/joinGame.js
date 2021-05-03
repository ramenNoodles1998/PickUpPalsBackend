const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')

exports.joinGame = (io) => {
    return async ({ userId, post }) => {
        let loggedInUser = await User.findOne({_id: userId})

        loggedInUser.currentGames.push(post._id)
        let foundPost = await Post.findOne({_id: post._id}).exec()

        foundPost.spotsAvailable--

        foundPost.save()
        loggedInUser.save()
        
        io.emit(`joinedGame/${userId}`, {game: foundPost})
    }
}