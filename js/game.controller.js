function onStartGame() {
    startGame()
    renderlives()
}

function renderlives() {
    const elLives = document.querySelector('.lives span')
    elLives.innerHTML = LIFE.repeat(gGame.lives)
}

function renderBubbles() {
    let strHTML = gBubbles.map(bubble => `
    <li class="bubble" style="background-color:#${bubble.color};top:${bubble.bubbleY}%;margin-left:${bubble.bubbleX}%">
    ${bubble.bubbleY}
    </li>
    `
    )
    const elBubbleList = document.querySelector('.bubbles')
    elBubbleList.innerHTML = strHTML.join('')


}