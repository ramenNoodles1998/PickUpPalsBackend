const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    title: String,
    icon: String
})

module.exports = mongoose.model('subscription', subscriptionSchema)