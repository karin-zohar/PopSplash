import { utilService } from './util.service.js'
import { bubbleService } from './bubble.service.js'
import { eventBusService } from './event-bus.service.js'

export const gameService = {
    startGame,
    updateLives,
    updateScore,
    gameOver,
    getGame,
    getSpeed,
    getSettings,
    toggleSetting
}

const SPEED = 1

const gSettings = { 
    mute: false
}

const INITIAL_GAME = {
    lives: 4,
    score: 0
}

const gGame = {}

let gNewBubbleInterval


function startGame() {
    // Resetting the game stats
    Object.assign(gGame, INITIAL_GAME)
    //adding the first bubble manually so the game doesn't delay
    bubbleService.addBubble()
    //a new bubble will be added every 3 seconds
    gNewBubbleInterval = setInterval(bubbleService.addBubble, 3000)
}

function getGame() {
    return gGame
}

function getSpeed() {
    return SPEED
}

function getSettings() {
    return gSettings
}

function toggleSetting(setting) {
    gSettings[setting] = !gSettings[setting]
    return gSettings[setting] // always a boolean
}

function updateLives() {
    if (!gGame.lives) return
    gGame.lives--
    eventBusService.publish('livesChanged', gGame.lives)
    if (gGame.lives === 0) gameOver() // the game ends when the player runs out of lives
}

function updateScore() {
    gGame.score++
    eventBusService.publish('scoreChanged', gGame.score)
}

function gameOver() {
    console.log('game is over')
    eventBusService.publish('gameIsOver')
    clearInterval(gNewBubbleInterval)
    bubbleService.removeAllBubbles()
}
