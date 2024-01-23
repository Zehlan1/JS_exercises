document.addEventListener("DOMContentLoaded", function () {
    startSim()
    updateInfo()
    setInterval(updateInfo, 1000)
})

let sensors = {
    alpha: 0,
    beta: 0,
    gamma: 0
}
window.addEventListener('deviceorientation', (event) => {
    sensors = {
        alpha: event.alpha, // Not important, Game assumes device lays flat
        beta: event.beta, // Top-Down movement in range -90 inclusive and 90 inclusive
        gamma: event.gamma // Left-Right movement in range -90 inclusive and 90 exclusive
    }
})

const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

let timerBlock = document.querySelector('.timer')
let scoreBlock = document.querySelector('.score')
let deathsBlock = document.querySelector('.deaths')
let recordsBlock = document.querySelector('.records')

let holes = []
let theHole
let ball
let deaths = 0
let score = 0
let timer = 0
let records = []
const ballRadius = 20
const holeRadius = 40
const holeAmount = 15
const ballSpeedRange = 2

function startSim() {
    createHoles()
    createBall()
    createTheHole()
    drawHoles()
    drawBall()
    animate()
}

function resetSim() {
    holes = []
    ball = null
    theHole = null
    createHoles()
    createBall()
    createTheHole()
    drawHoles()
    drawBall()
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateBall()
    drawHoles()
    drawBall()
    checkLoss()
    checkSucc()

    animationFrame = requestAnimationFrame(animate)
}

function createHoles() {
    for (let i = 0; i < holeAmount-1; i++) {
        holes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        })
    }
}

function createBall() {
    ball = {
        x: Math.floor(canvas.width/2),
        y: Math.floor(canvas.height/2),
        dx: 0,
        dy: 0
    }
}

function createTheHole() {
    theHole = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    }
}

function updateBall() {
    ballMomentum = normalizeSensors(sensors)
    ball.dx
    ball.x += ballMomentum.x
    ball.y += ballMomentum.y

    if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
        ball.x -= ballMomentum.x
    }
    if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
        ball.y -= ballMomentum.y
    }
}

function normalizeSensors(sensors) {
    // Ranges ar symmetrical to 0 so they only need one value
    const inputRange = 90;
    const outputRange = 3;

    // Normalize the input value
    const normalizedGamma = (sensors.gamma + inputRange) / (inputRange*2) * (outputRange*2) - outputRange;
    const normalizedBeta = (sensors.beta + inputRange) / (inputRange*2) * (outputRange*2) - outputRange;

    // Ensure the result is within the output range
    ballMomentum = {
        x: Math.max(-outputRange, Math.min(outputRange, normalizedGamma)),
        y: Math.max(-outputRange, Math.min(outputRange, normalizedBeta))
    }
    return ballMomentum
}

function drawHoles() {
    holes.forEach((hole) => {
        ctx.beginPath()
        ctx.fillStyle = '#000000';
        ctx.arc(hole.x, hole.y, holeRadius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    })

    ctx.beginPath()
    ctx.fillStyle = '#00FF00';
    ctx.arc(theHole.x, theHole.y, holeRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}

function drawBall() {
    ctx.beginPath()
    ctx.fillStyle = '#FF0000';
    ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
}


function checkLoss() {
    timer > 60 ? updateScores() : null
    for (let i = 0; i < holes.length; i++) {
        const distance = ballDistance(holes[i], ball)
  
        if (distance < holeRadius-ballRadius) {
            deaths++
            resetSim()
        }
    }
}

function checkSucc() {
    const distance = ballDistance(theHole, ball)
  
    if (distance < holeRadius-ballRadius) {
        score++
        resetSim()
    }
}

function updateScores() {
    records.push({
        score: score,
        deaths: deaths
    })
    records.sort((a, b) => {
        return b.score - a.score;
    });
    if(records.length > 3) {
        records.pop()
    }
    score=0
    timer=0
    deaths=0
    recordsBlock.innerHTML = `<div>Records</div>`
    records.forEach((record) => {
        const recordElem = document.createElement('div')
        recordElem.innerHTML = `Score: ${record.score} Deaths: ${record.deaths}`
        recordsBlock.appendChild(recordElem)
    })
    resetSim()
}

function updateInfo() {
    timer++
    timerBlock.innerHTML= `Time: ${timer} seconds (One minute limit)`
    scoreBlock.innerHTML= `Score: ${score}`
    deathsBlock.innerHTML= `Deaths: ${deaths}`
}

function ballDistance(ballA, ballB) {
    return Math.sqrt((ballA.x - ballB.x)**2 + (ballA.y - ballB.y)**2)
}