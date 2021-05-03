const User = require('../../model/user-model.js')

exports.sendFriendRequest = (io) => {
    return async ({ userId, friendId }) => {
        let loggedInUser = await User.findOne({_id: userId}).exec()
        let friend = await User.findOne({_id: friendId}).exec()

        loggedInUser.sentPendingFriends.push(friendId)
        friend.pendingFriends.push(userId)

        loggedInUser.save()
        friend.save()

        io.emit(`gotFriendRequest/${friendId}`)
        io.emit(`friendRequestSent/${loggedInUser._id}`)
    }
}