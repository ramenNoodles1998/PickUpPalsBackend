const User = require('../../model/user-model.js')
const Subscription = require('../../model/subscription-model.js')
const { getLoggedInUser } = require('../../services/auth-services.js')

exports.index = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)
    let allSubs = await Subscription.find({_id: {$nin: loggedInUser.subscriptions}}).exec()
    return res.status(200).json(allSubs)
}

exports.userSubscriptions = async (req, res) => {
    let user = await User.findById(req.params.userId)
    let userSubs = await Subscription.find({
        '_id': {$in: user.subscriptions}
    }).exec()

    return res.status(200).json(userSubs)
}

exports.addUserSubscription = async (req, res) => {
    let loggedInUser = await getLoggedInUser(req)

    loggedInUser.subscriptions = [...loggedInUser.subscriptions, String(req.body.subscriptionId)]

    loggedInUser.save()

    let subscription = await Subscription.findOne({_id: String(req.body.subscriptionId)}).exec()
    subscription.subscribers.push(loggedInUser._id)

    subscription.save()

    return res.status(200).json({message: 'success'})
}

exports.deleteUserSubscription = async (req, res) => {
    await User.findById(req.params.userId, async (err, user) => {
        if(err) {
            return res.status(400)
        }

        user.subscriptions.splice(user.subscriptions.indexOf(String(req.body.subscriptionId)), 1)

        user.save(error => {
            if(error) {
                return res.status(500).json({message: error.toString()})
            }
            return res.status(200).json({message: 'success'})
        })
    }).exec()
}