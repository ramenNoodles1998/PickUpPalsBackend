const cors = require('cors')
const bodyParser = require('body-parser')

exports.setEnvironment = (app) => {
    process.env.NODE_ENV = 'production'
    process.env.DB_URL = 'mongodb+srv://roman:vRiB8vahSH9!Vfa@pickuppals.3erwn.mongodb.net/pickuppals?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'my-development-secret'
    console.log('setting production environment')
    app.use(bodyParser.json())
    app.use(cors())
}