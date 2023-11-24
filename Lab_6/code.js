window.addEventListener('deviceorientation', onDeviceMove)

let ball = document.querySelector('#ball')

const ballRad = 15
const holeRad = 25

let direction = 1
let speed = 5

let ballTemp = {
    x: 0,
    y: 0
}

let holeTemp = {
    x: 0,
    y: 0
}

function onDeviceMove(event) {

}

function animate() {
    
}

ball.style.transform = 'translate(400, 500)'

function succ(ball, hole) {
    return pit(ball.x - hole.x, ball.y - hole.y) < ballRad + holeRad ? true : false
}

function pit(a, b) {
    return Math.sqrt(a^2 + b^2)
}