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
    <div class="bubble"></div>
    </li>
    `
    )
    const elBubbleList = document.querySelector('.bubbles')
    elBubbleList.innerHTML = strHTML.join('')


}