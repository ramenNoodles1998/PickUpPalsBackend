const User = require('../../model/user-model.js')
const { getLoggedInUser } = require('../../services/auth-services.js')

exports.getFriendsList = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let users

    users = await User.find({
         _id: {
            $nin: loggedInUser.sentPendingFriends.concat(loggedInUser.pendingFriends.concat(loggedInUser.friends.concat(loggedInUser._id)))
        } 
    }).limit(60).select('username').exec()

    return res.status(200).json(users)
}

exports.addFriend = async (req, res) => {
    let friend = await User.findOne({username: req.params.username}).exec()
    let loggedInUser = await getLoggedInUser(req)

    if(loggedInUser.friends.indexOf(friend._id) < 0 && friend._id.toString() !== loggedInUser._id.toString()) {
        loggedInUser.friends.push(friend._id)

        loggedInUser.save(error => {
            if(error) {
                return res.status(500).json({message: error.toString()})
            }
            return res.status(200).json({message: 'success'})
        })
    } else {
        return res.status(500).json({message: 'Friend is already added.'})
    }
    
}

exports.getFriends = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)

    if(loggedInUser) {
        let friendArray = []

        for(let friend of loggedInUser.friends) {
            friendArray.push(User.findOne({_id: friend}).exec())
        }
        
        friendArray = await Promise.all(friendArray)

        return res.status(200).json(friendArray)
    } else {
        return res.status(200).json({message: 'not logged in'})
    }
}


exports.getPendingFriends = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let pendingFriends = []

    if (loggedInUser) {
        for(let pendingFriend of loggedInUser.pendingFriends) {
            pendingFriends.push(User.findOne({_id: pendingFriend}).exec())
        }
    
        pendingFriends = await Promise.all(pendingFriends)
    
        return res.status(200).json(pendingFriends)
    }
    
    return res.status(200).json({message: 'not logged in'})
}


exports.getSentPendingFriends = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let sentPendingFriends = []

    if (loggedInUser) {
        for(let sentPendingFriend of loggedInUser.sentPendingFriends) {
            sentPendingFriends.push(User.findOne({_id: sentPendingFriend}).exec())
        }
    
        sentPendingFriends = await Promise.all(sentPendingFriends)
    
        return res.status(200).json(sentPendingFriends)
    }
    
    return res.status(200).json({message: 'not logged in'})
}

exports.addPendingFriend = async (req, res) => {
    let friend = await User.findOne({_id: req.params.friendId}).exec()
    let loggedInUser = await getLoggedInUser(req)
    let pendingFriends = []

    loggedInUser.pendingFriends.push(friend._id)
    
    for(let pendingFriend of loggedInUser.pendingFriends) {
        pendingFriends.push(User.findOne({_id: pendingFriend}).exec())
    }

    pendingFriends = await Promise.all(pendingFriends)

    loggedInUser.save()

    return res.status(200).json(pendingFriends)
}