const Post = require('../../model/post-model.js')
const { getLoggedInUser } = require('../../services/auth-services.js')

exports.getGames = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req),
            games

    if(loggedInUser) {
        games = await Post.find({ _id: {$in: loggedInUser.currentGames}}).exec()
    }

    return res.status(200).json(games)
}

exports.leaveGame = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let gameId = req.params.gameId

    loggedInUser.currentGames.splice(loggedInUser.currentGames.indexOf(gameId), 1)

    game = await Post.findOne({ _id: gameId}).exec()


    game.spotsAvailable++

    game.save()
    loggedInUser.save()

    return res.status(200).json(game)
}