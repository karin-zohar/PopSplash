export const utilService = {
    getRandomInt,
    getColor
}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

function getColor() {
    const colors = ['ffbe0b','fb5607','ff006e','8338ec','3a86ff']
    return colors[getRandomInt(0, colors.length)]
}