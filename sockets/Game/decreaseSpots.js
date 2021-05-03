const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')
const Subscription = require('../../model/subscription-model.js')

exports.decreaseSpots = (io) => {
    return async ({ game }) => {
        //get game to decrease spots 
        //from game we get sub emit to all sub followers, and creators friends to decrease spotsAvailable by 1.
        let gameCreator = await User.findOne({_id: game.creatorId})

        for(let friend of gameCreator.friends) {
            io.emit(`decreaseSpot/${friend}`)
        }
    }
}