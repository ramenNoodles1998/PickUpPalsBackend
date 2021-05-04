const User = require('../../model/user-model.js')

exports.sendFriendRequestDeclined = (io) => {
    return async ({ userId, friend }) => {
        let loggedInUser = await User.findOne({_id: userId}).exec()
        let userFriend = await User.findOne({_id: friend._id}).exec()

        loggedInUser.pendingFriends.splice(loggedInUser.pendingFriends.indexOf(userFriend._id))

        userFriend.sentPendingFriends.splice(userFriend.sentPendingFriends.indexOf(loggedInUser._id))

        await loggedInUser.save()
        await userFriend.save()

        io.emit(`friendRequestDeclined/${friend._id}`,{ userFriend: loggedInUser })
        io.emit(`declinedRequest/${userId}`)
    }
}