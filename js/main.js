const LIFE = '💗'
const SPEED = 1
const gGame = {
    lives: 4,
    score: 0
}

const gBubbles = []

let gNewBubbleInterval
let gGravityInterval

function onInit() {
    console.log('hello')
}

function startGame() {
    console.log('starting game');
    console.log('gGame: ', gGame)
    gNewBubbleInterval = setInterval(addBubble, 3000)

}

function addBubble() {
    const newBubble = {bubbleX: getRandomInt(0,70), bubbleY: 0, color: getColor() ,isPopped: false}
    gBubbles.push(newBubble)
    gGravityInterval = setInterval(updateGravity, 200, gBubbles.indexOf(newBubble))
    renderBubbles()
}

function updateGravity(bubbleIndex) {
    const currBubble = gBubbles[bubbleIndex]
    if (!currBubble) return
    gBubbles[bubbleIndex].bubbleY += SPEED

    if (currBubble.bubbleY > 85) {
        //once the bubble reaches this low, remove it
        console.log('currBubble.bubbleY: ', currBubble.bubbleY)
        console.log('currBubble.color: ', currBubble.color)
        gBubbles.splice(bubbleIndex,1) 
    }
    renderBubbles()
}

function updateLives() {
    gGame.lives--
    renderlives()
}

function gameOver() {
    console.log('game is over')
    clearInterval(gNewBubbleInterval)
    //displayGameOver()
}




