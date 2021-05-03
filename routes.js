const registerRoutes = require('./api/register/register-routes.js')
const authRoutes = require('./api/auth/auth-routes.js')
const subscriptionRoutes = require('./api/subscriptions/subscriptions-routes.js')
const friendRoutes = require('./api/friend/friend-routes.js')
const postRoutes = require('./api/post/post-routes.js')
const gamesRoutes = require('./api/games/games-routes.js')
const accountRoutes = require('./api/account/account-routes.js')

exports.registerRoutes = (app) => {
    app.use('/api', registerRoutes)
    app.use('/api', authRoutes)
    app.use('/api', subscriptionRoutes)
    app.use('/api', friendRoutes)
    app.use('/api', gamesRoutes)
    app.use('/api', postRoutes)
    app.use('/api', accountRoutes)
}