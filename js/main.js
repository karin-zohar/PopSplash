import { gameService } from './services/game.service.js'
import { bubbleService } from "./services/bubble.service.js"
import { eventBusService } from './services/event-bus.service.js'

window.onInit = onInit
window.onStartGame = onStartGame


function onInit() {
    console.log('hello')
}

function onStartGame() {
    console.log('starting game')
    gameService.startGame()
    eventBusService.subscribe('gBubblesChanged', renderBubbles)
    renderLives()
}

function renderLives() {
    const LIFE = '💗'
    const elLives = document.querySelector('.lives span')
    elLives.innerHTML = LIFE.repeat(gameService.getLives())
}

function renderBubbles() {
    const bubbles = bubbleService.getBubbles()
    let strHTML = bubbles.map(bubble => `
    <li class="bubble" style="background-color:#${bubble.color};top:${bubble.bubbleY}%;margin-left:${bubble.bubbleX}%">
    ${bubble.bubbleY}
    </li>
    `
    )
    const elBubbleList = document.querySelector('.bubbles')
    elBubbleList.innerHTML = strHTML.join('')
}
