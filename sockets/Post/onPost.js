const User = require('../../model/user-model')
const Post = require('../../model/post-model.js')

exports.onPost = (io) => {
    return async ({post}) => {
        let loggedInUser = await User.findOne({_id: post.creatorId})
        const newPost = new Post(post)

        newPost.save(error => {
            if(error) {
                return
            }
            
            for(let friend of loggedInUser.friends) {
                io.emit(`friendPost/${friend._id}`, {post})
            }
        })
    }
}