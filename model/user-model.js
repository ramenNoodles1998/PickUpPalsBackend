const mongoose = require('mongoose')
const { StringUtil } = require('../utilities/string-util.js')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    username: String,
    first: String,
    last: String,
    password: String,
    subscriptions: Array,
    friends: Array,
    pendingFriends: Array,
    sentPendingFriends: Array,
    status: String,
    currentGames: Array
})
userSchema.statics.passwordsMatch = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}
userSchema.set('timestamps', true)
userSchema.virtual('fullName').get(() => {
    const first = StringUtil.capitalize(this.first.toLowerCase())
    const last = StringUtil.capitalize(this.last.toLowerCase())

    return `${first} ${last}`
})


module.exports = mongoose.model('user', userSchema)