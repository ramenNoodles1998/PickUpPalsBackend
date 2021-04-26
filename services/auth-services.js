const jwt = require('jsonwebtoken')
const User = require('../model/user-model.js')

exports.generateJWT = (user) => {
    const tokenData = {username: user.username, id: user._id}
    return jwt.sign({user: tokenData}, process.env.TOKEN_SECRET)
}

exports.decodeToken = (req) => {
    const token = req.headers.authorization || req.headers['authorization']

    if(!token) {
        return null
    }
    
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(error) {
        return null
    }
}

exports.requireLogin = (req, res, next) => {
    const token = this.decodeToken(req)

    if(!token) {
        return res.status(401).json({ message: 'Your have to be logged in.'})
    }
    next()
}

exports.getUsername = (req) => {
    const token = this.decodeToken(req)

    if(!token) {
        return null
    }

    return token.user.username
}

exports.getUserId = (req) => {
    const token = this.decodeToken(req)

    if(!token) {
        return null
    }

    return token.user.id
}

exports.getLoggedInUser = (req) => {
    const token = this.decodeToken(req)

    if(!token) {
        return null
    }

    return User.findOne({_id: token.user.id}).exec()
}
