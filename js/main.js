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
    const newBubble = {bubbleX: getRandomInt(0,90), bubbleY: 0, isPopped: false}
    gBubbles.push(newBubble)
    gGravityInterval = setInterval(updateGravity, 2000, gBubbles.indexOf(newBubble))
    renderBubbles()
}

function updateGravity(bubbleIndex) {
    const currBubble = gBubbles[bubbleIndex]
    if (!currBubble) return
    gBubbles[bubbleIndex].bubbleY += SPEED

    if (currBubble.bubbleY > 5) {
        //once the bubble reaches this low height, remove it
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




