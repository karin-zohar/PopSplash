const LIFE = '💗'
const gGame = {
    lives: 4,
    score: 0
}

const gBubbles = []

let gBubbleInterval

function onInit() {
    console.log('hello')
}

function startGame() {
    console.log('starting game');
    console.log('gGame: ', gGame)
    gBubbleInterval = setInterval(addBubble, 3000)

}

function addBubble() {
    const newBubble = {bubbleX: 5, bubbleY: 0, isPopped: false}
    gBubbles.push(newBubble)
    renderBubbles()
    console.log('gBubbles: ', gBubbles)
}


function updateLives() {
    gGame.lives--
    renderlives()
}

function gameOver() {
    console.log('game is over')
    clearInterval(gBubbleInterval)
    //displayGameOver()
}




