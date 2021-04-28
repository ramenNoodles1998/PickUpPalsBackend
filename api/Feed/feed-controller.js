const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')
const Subcription = require('../../model/subscription-model')
const { getLoggedInUser } = require('../../services/auth-services.js')
exports.getFriendsList = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    console.log(loggedInUser.friends.concat(loggedInUser._id))
    let users = await User.find({ _id: {$nin: loggedInUser.friends.concat(loggedInUser._id)}}).limit(60).select('username').exec()

    return res.status(200).json(users)
}

exports.getPosts = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let postPromises = []
    

    if(loggedInUser.friends.length > 0) {
        for(let friend of loggedInUser.friends) {
            //TODO: change this to search for posts in cetain time frame.
            postPromises.push(Post.findOne({creatorId: friend._id}))
        }
    
        postPromises = await Promise.all(postPromises)
    
        filteredPosts = postPromises.filter((post) => {
            return post != null;
        })
    
        return res.status(200).json(filteredPosts)
    }

    return res.status(200)
}

exports.getUserPosts = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let posts = []

    posts = await Post.find({creatorId: loggedInUser._id})

    return res.status(200).json(posts)
}

exports.getSubscriptionPosts = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let postPromises = []

    for(let sub of loggedInUser.subscriptions) {
        //TODO: change this to search for posts in cetain time frame.
        let subscription = await Subcription.findOne({_id: sub})
        postPromises.push(Post.find({
            sport: subscription.title.toLowerCase(),
            creatorId: {$ne: loggedInUser._id}
        }))
    }

    postPromises = await Promise.all(postPromises)
    postPromises = postPromises.flat()

    filteredPosts = postPromises.filter((post) => {
        return post != null;
    })

    return res.status(200).json(filteredPosts)
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

exports.findFriends = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)

    if(loggedInUser) {
        let friendArray = []

        for(let friend of loggedInUser.friends) {
            friendArray.push(User.find({_id: friend}, '_id username').exec())
        }
        
        return Promise.all(friendArray).then((values) => {
            return res.status(200).json(values)
        }) 


    } else {
        return res.status(500).json({message: 'error'})
    }
    
}