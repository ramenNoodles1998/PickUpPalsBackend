const { setEnvironment } = require('./config/env.js')
const { registerRoutes } = require('./routes.js')
const { connectToDB } = require('./config/db.js')
const { onPost } = require('./sockets/Post/onPost.js')
const { joinGame } = require('./sockets/Game/joinGame.js')
const { sendFriendRequest } = require('./sockets/Friend/sendFriendRequest.js')
const { sendFriendRequestAdded } = require('./sockets/Friend/sendFriendRequestAdded.js')
const { sendFriendRequestDeclined } = require('./sockets/Friend/sendFriendRequestDeclined.js')
const { sendUpdateFeed } = require('./sockets/Post/sendUpdateFeed.js')

const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: '*'
  }
})

setEnvironment(app)
connectToDB()
registerRoutes(app)

const port = process.env.PORT || 8081

app.get('/healthCheck', (req, res) => {
  res.send('healthy server')
})

io.on('connection', (client) => {
  client.on('onPost', onPost(io))
  client.on('joinGame', joinGame(io))
  client.on('sendFriendRequest', sendFriendRequest(io))
  client.on('sendFriendRequestAdded', sendFriendRequestAdded(io))
  client.on('sendFriendRequestDeclined', sendFriendRequestDeclined(io))
  client.on('sendUpdateFeed', sendUpdateFeed(io))
  client.on('end', () => {
    client.disconnect()
  })
})

server.listen(port, () => {
  console.log(`Example app listenings at ${port}`)
})

module.exports = app