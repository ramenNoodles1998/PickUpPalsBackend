const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    creatorId: mongoose.Schema.Types.ObjectId,
    creatorUsername: String,
    description: String,
    sport: String,
    address: String,
    zip: String,
    city: String,
    state: String,
    spotsAvailable: Number,
    dateTime: Date
})
postSchema.set('timestamps', true)

module.exports = mongoose.model('post', postSchema)