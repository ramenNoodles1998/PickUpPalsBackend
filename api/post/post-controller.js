const Post = require('../../model/post-model.js')
const Subcription = require('../../model/subscription-model')
const { getLoggedInUser } = require('../../services/auth-services.js')

exports.getPosts = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let postPromises = []

    if(loggedInUser && loggedInUser.friends && loggedInUser.friends.length > 0) {
        for(let friend of loggedInUser.friends) {
            //TODO: change this to search for posts in cetain time frame.
            postPromises.push(Post.find({
                _id: {$nin: loggedInUser.currentGames},
                creatorId: friend._id, 
            }))
        }
    
        postPromises = await Promise.all(postPromises)
    
        filteredPosts = postPromises.filter((post) => {
            return post != null;
        })

        filteredPosts = filteredPosts.flat()
    
        return res.status(200).json(filteredPosts)
    }

    return res.status(200).json({message: 'no friends'})
}

exports.getAllPosts = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let postPromises = []

    for(let sub of loggedInUser.subscriptions) {
        //TODO: change this to search for posts in cetain time frame.
        let subscription = await Subcription.findOne({_id: sub})
        postPromises.push(Post.find({
            _id: {$nin: loggedInUser.currentGames},
            sport: subscription.title,
            creatorId: {$ne: loggedInUser._id}
        }).where('spotsAvailable').gt(0))
    }
    postPromises = await Promise.all(postPromises)
    let idArray = postPromises.flat(1).map((post) => { return post._id })

    for(let friend of loggedInUser.friends) {
        //TODO: change this to search for posts in cetain time frame.
        postPromises.push(Post.find({
            _id: {$nin: loggedInUser.currentGames.concat(idArray)},
            creatorId: friend._id
        }).where('spotsAvailable').gt(0))
    }

    postPromises = await Promise.all(postPromises)
    postPromises = postPromises.flat(1)

    return res.status(200).json(postPromises)
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
            _id: {$nin: loggedInUser.currentGames},
            sport: subscription.title,
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

exports.deletePost = async (req, res) => {
    let postId = req.params.postId

    let post = await Post.findOneAndDelete({ _id: postId }).exec()

    return res.status(200).json(post)
}

exports.editPost = async (req, res) => {
    let post = JSON.parse(req.query.post)
    await Post.findOneAndReplace({ _id: post._id }, post).exec()

    return res.status(200).json(post)
}