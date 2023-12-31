export const utilService = {
    getRandomInt,
    getColor,
    makeId,
    toggleElementVisibility,
    setElementVisibility
}

let gNextIdx = 100

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getColor() {
    const colors = ['ffbe0b','fb5607','ff006e','8338ec','3a86ff']
    return colors[getRandomInt(0, colors.length)]
}

function makeId() {
    gNextIdx++
    return 'b' + gNextIdx
}

function toggleElementVisibility(element) {
    const el = document.querySelector(element)
    el.hidden = !el.hidden
}

function setElementVisibility(element, isVisible) {
    const el = document.querySelector(element)
    // Reversing to make the usage of this function more intuitive -
    // isVisible = false -> element will be hidden.
    // isVisible = true -> element will be visible.
    el.hidden = !isVisible
}