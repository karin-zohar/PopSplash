import { utilService } from './util.service.js'
import { gameService } from './game.service.js'
import { eventBusService } from './event-bus.service.js'

export const bubbleService = {
    addBubble,
    removeBubble,
    getBubbles,
    getBubbleById,
    removeAllBubbles
}

let gGravityInterval
let gBubbles = []

function addBubble() {
    const newBubble = { id: utilService.makeId() , bubbleX: utilService.getRandomInt(0, 70), bubbleY: 0, color: utilService.getColor()}
    gBubbles.push(newBubble)
    gGravityInterval = setInterval(() => updateGravity(newBubble.id), 100)
    //DONE: emit "bubbles changed" event
    eventBusService.publish('gBubblesChanged', gBubbles)
}

function removeBubble(bubbleId) {
    gBubbles = gBubbles.filter(bubble => bubble.id !== bubbleId)
    eventBusService.publish('gBubblesChanged', gBubbles) 
}

function getBubbleById(bubbleId) {
    const bubbleIdx = gBubbles.findIndex(bubble => bubble.id === bubbleId)
    return gBubbles[bubbleIdx]
}

function updateGravity(bubbleId) {
    const currBubble = getBubbleById(bubbleId)
    if (!currBubble) return
    const currBubbleIdx = gBubbles.indexOf(currBubble)
    gBubbles[currBubbleIdx].bubbleY += gameService.getSpeed()

    if (currBubble.bubbleY > 85) {
        //once the bubble reaches this low, remove it
        removeBubble(bubbleId)
        gameService.updateLives()
    }
    //DONE: emit "bubbles changed" event
    eventBusService.publish('gBubblesChanged', gBubbles)
}

function getBubbles() {
    return gBubbles
}

function removeAllBubbles() {
    gBubbles = []
}