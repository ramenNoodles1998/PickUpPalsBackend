const registerRoutes = require('./api/register/register-routes.js')
const authRoutes = require('./api/auth/auth-routes.js')
const subscriptionRoutes = require('./api/subscriptions/subscriptions-routes.js')
const userRoutes = require('./api/Feed/feed-routes.js')

exports.registerRoutes = (app) => {
    app.use('/api', registerRoutes)
    app.use('/api', authRoutes)
    app.use('/api', subscriptionRoutes)
    app.use('/api', userRoutes)
}