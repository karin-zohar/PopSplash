import { gameService } from './services/game.service.js'
import { bubbleService } from "./services/bubble.service.js"
import { eventBusService } from './services/event-bus.service.js'
import { utilService } from './services/util.service.js'

window.onInit = onInit
window.onStartGame = onStartGame
window.onBubble = onBubble
window.onToggleModal = onToggleModal
window.onToggleSetting = onToggleSetting


function onInit() {
    console.log('hello')
}

function onStartGame() {
    console.log('starting game')
    gameService.startGame()
    subscribeToEvents()
    renderInitialStats()
    toggleGameUI()
}

function subscribeToEvents() {
    eventBusService.subscribe('gBubblesChanged', renderBubbles)
    eventBusService.subscribe('livesChanged', renderLives)
    eventBusService.subscribe('scoreChanged', renderScore)
    eventBusService.subscribe('gameIsOver', onGameOver)
}

function renderInitialStats() {
    renderLives()
    renderScore()
}

function toggleGameUI() {
    const elementsToToggle = ['.stats', '.game-container', '.tools']
    elementsToToggle.forEach((el) => utilService.toggleElementVisibility(el))
}

function renderLives() {
    const LIFE = '💗'
    const elLives = document.querySelector('.lives .stat-data')
    elLives.innerHTML = LIFE.repeat(gameService.getGame().lives)
}

function renderScore() {
    const elScore = document.querySelector('.score .stat-data')
    elScore.innerHTML = gameService.getGame().score
}

function renderBubbles() {
    const bubbles = bubbleService.getBubbles()
    let strHTML = bubbles.map(bubble => `
    <li 
    data-id="${bubble.id}" 
    onclick="onBubble(this)"
    class="bubble" 
    style="background-color:#${bubble.color};top:${bubble.bubbleY}%;margin-left:${bubble.bubbleX}%"
    >
    ${bubble.bubbleY}
    </li>
    `
    )
    const elBubbleList = document.querySelector('.bubbles')
    elBubbleList.innerHTML = strHTML.join('')
}

function onBubble(bubble) {
    try {
        console.log('Bubble clicked')
        const bubbleId = bubble.getAttribute('data-id')
        gameService.updateScore()
        bubbleService.removeBubble(bubbleId)
        playSound('pop')
    } catch (error) {
        console.error('An error occurred: ', error)
    }
}

function playSound(soundType) {
    if (gameService.getSettings().mute) return
    const sound = new Audio(`assets/sounds/${soundType}.wav`)
    sound.play()
}

function onGameOver() {
    playSound('gameover')
    toggleGameUI()
    displayGameOverTools()
}

function displayGameOverTools() {
    utilService.toggleElementVisibility('.game-over-container')
    const elStartGameBtn = document.querySelector('.start-game-btn')
    elStartGameBtn.innerText = "Play Again"

    const elFinalScore = document.querySelector('.final-score')
    elFinalScore.innerText = gameService.getGame().score
}

function onToggleModal(el) {
    // Open the modal
    utilService.setElementVisibility(`.modal-container`, true)
    // Hide all modal types
    const allModalTypes = document.querySelectorAll('.modal-container article')
    allModalTypes.forEach((modalType) => {
        modalType.classList.remove('active')
    })
    // Set the modal type and make it visible
    const modalType = el.dataset.modal
    const activeModal = document.querySelector(`.${modalType}`)
    activeModal.classList.add('active')
}

function onToggleSetting(el) {
    if (!el) return
    const setting = el.dataset.setting
    const updatedSetting = gameService.toggleSetting(setting) // returns boolean
    console.log('updatedSetting: ', updatedSetting)
    const elSettingIcon = el.querySelector('span.fa')
    if (!elSettingIcon) return
    if (updatedSetting) {
        elSettingIcon.classList.add('active')
    } else {
        elSettingIcon.classList.remove('active')
    }
}