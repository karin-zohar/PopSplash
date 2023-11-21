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
    <li>
    <div class="bubble" style="background-color:#${bubble.color};margin-top:${bubble.bubbleY}%;margin-left:${bubble.bubbleX}%"></div>
    </li>
    `
    )
    const elBubbleList = document.querySelector('.bubbles')
    elBubbleList.innerHTML = strHTML.join('')


}