const User = require('../../model/user-model.js')
const Post = require('../../model/post-model.js')
const { getLoggedInUser } = require('../../services/auth-services.js')

exports.getAccount = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let accountId = req.params.accountId

    account = await User.findOne({ _id: accountId }).exec()

    let response = JSON.parse(JSON.stringify(account))

    response.recentGames = await Post.find({ _id: {$in: account.currentGames} }).gt('spotsAvailable', 0).limit(2).exec()
    response.recentPosts = await Post.find({ _id: {$nin: loggedInUser.currentGames}, creatorId: accountId }).gt('spotsAvailable', 0).limit(2).exec()

    return res.status(200).json(response)
}

exports.editAccount = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let account = req.query
    let filter = { _id: loggedInUser._id }
    let user = await User.findOneAndUpdate(filter, account, {new: true})

    await user.save()

    return res.status(200).json(user)
}