const mongoose = require('mongoose')

exports.connectToDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, 
    error => {
        if(error) {
            console.log('unable to connect to database')
            throw error
        } else {
            console.log('connected to database')
        }    
    })
}