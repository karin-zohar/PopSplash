import { utilService } from './util.service.js'
import { gameService } from './game.service.js'

export const bubbleService = {
    addBubble,
    getBubbles
}

let gGravityInterval

const gBubbles = []

function addBubble() {
    const newBubble = { bubbleX: utilService.getRandomInt(0, 70), bubbleY: 0, color: utilService.getColor(), isPopped: false }
    gBubbles.push(newBubble)
    gGravityInterval = setInterval(() => updateGravity(gBubbles.indexOf(newBubble)), 200)
    // renderBubbles() 
    //TODO: emit "bubbles changed" event
    console.log('gBubbles: ', gBubbles)
}


function updateGravity(bubbleIndex) {
    const currBubble = gBubbles[bubbleIndex]
    if (!currBubble) return
    gBubbles[bubbleIndex].bubbleY += gameService.getSpeed()

    if (currBubble.bubbleY > 85) {
        //once the bubble reaches this low, remove it
        console.log('currBubble.bubbleY: ', currBubble.bubbleY)
        console.log('currBubble.color: ', currBubble.color)
        gBubbles.splice(bubbleIndex, 1)
    }
    // renderBubbles()
    //TODO: emit "bubbles changed" event
}

function getBubbles() {
    return gBubbles
}