const User = require('../../model/user-model.js')

exports.sendFriendRequestAdded = (io) => {
    return async ({ userId, friend }) => {
        let loggedInUser = await User.findOne({_id: userId}).exec()
        let userFriend = await User.findOne({_id: friend._id}).exec()

        loggedInUser.pendingFriends.splice(loggedInUser.pendingFriends.indexOf(userFriend._id))
        loggedInUser.friends.push(userFriend._id)

        userFriend.sentPendingFriends.splice(userFriend.sentPendingFriends.indexOf(loggedInUser._id))
        userFriend.friends.push(loggedInUser._id)

        await loggedInUser.save()
        await userFriend.save()

        io.emit(`friendRequestAccepted/${friend._id}`, { userFriend: loggedInUser })
        io.emit(`acceptedRequest/${userId}`)
    }
}