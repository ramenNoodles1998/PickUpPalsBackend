const express = require('express')
const router = express.Router()
const gameController = require('./games-controller.js')

router.get('/games/getGames', gameController.getGames)
router.get('/games/leaveGame/:gameId', gameController.leaveGame)

module.exports = router