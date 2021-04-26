const { setEnvironment } = require('./config/env.js')
const { registerRoutes } = require('./routes.js')
const { connectToDB } = require('./config/db.js')
const { onPost } = require('./sockets/Post/onPost.js')
const express = require('express')
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: ["http://localhost:8081", "http://localhost:8082"],
    methods: ["GET", "POST"]
  }
})

setEnvironment(app)
connectToDB()
registerRoutes(app)

io.on('connection', (client) => {
  client.on('onPost', onPost(io))
})

server.listen(8080, () => {
  console.log(`Example app listening at 8080`)
})