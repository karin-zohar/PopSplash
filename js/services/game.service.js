import { utilService } from './util.service.js'
import { bubbleService } from './bubble.service.js'
import { eventBusService } from './event-bus.service.js'

export const gameService = {
    startGame,
    updateLives,
    gameOver,
    getLives,
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

function getLives() {
    return gGame.lives
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

function gameOver() {
    console.log('game is over')
    clearInterval(gNewBubbleInterval)
}