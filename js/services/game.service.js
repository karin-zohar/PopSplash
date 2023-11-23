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
    gNewBubbleInterval = setInterval(bubbleService.addBubble, 3000)

}

function getLives() {
    return gGame.lives
}

function getSpeed() {
    return SPEED
}

function updateLives() {
    gGame.lives--
    // renderLives()
    //TODO: emit 'lives changed' event
}

function gameOver() {
    console.log('game is over')
    clearInterval(gNewBubbleInterval)
}
