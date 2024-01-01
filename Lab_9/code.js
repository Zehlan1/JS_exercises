const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

const startBtn = document.getElementById('startBtn')
const resetBtn = document.getElementById('resetBtn')
startBtn.addEventListener('click', startSim)
resetBtn.addEventListener('click', resetSim)

let balls = []
const ballRadius = 10
const lineMaxLen = 100
const ballAmount = 100
const ballSpeedRange = 2

function startSim() {
    createBalls()
    drawBalls()
    animate()
    startBtn.disabled = true
}

function resetSim() {
    balls = []
    createBalls()
    drawBalls()
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    balls.forEach((ball) => {
        ball.x += ball.dx
        ball.y += ball.dy

        if (ball.x - ballRadius < 0 || ball.x + ballRadius > canvas.width) {
            ball.dx = -ball.dx
        }
        if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
            ball.dy = -ball.dy
        }
    })

    drawBalls()
    drawLines()

    animationFrame = requestAnimationFrame(animate)
}

function createBalls() {
    for (let i = 0; i < ballAmount; i++) {
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * (ballSpeedRange * 2) - ballSpeedRange,
            dy: Math.random() * (ballSpeedRange * 2) - ballSpeedRange
        })
    }
}

function drawBalls() {
    balls.forEach((ball) => {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    })
}

function drawLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const distance = ballDistance(balls[i], balls[j])
  
            if (distance < lineMaxLen) {
                ctx.beginPath()
                ctx.moveTo(balls[i].x, balls[i].y)
                ctx.lineTo(balls[j].x, balls[j].y)
                ctx.stroke()
                ctx.closePath()
            }
        }
    }
}

function ballDistance(ballA, ballB) {
    return Math.sqrt((ballA.x - ballB.x)**2 + (ballA.y - ballB.y)**2)
}