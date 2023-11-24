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
}

const SPEED = 1
const gGame = {
    lives: 4,
    score: 0
}

let gNewBubbleInterval


function startGame() {
    console.log('starting game');
    console.log('gGame: ', gGame)
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
}
