document.addEventListener('keypress', onKeyPress)

const nfo1 = document.querySelector('#nfo1')
const nfo2 = document.querySelector('#nfo2')
const nfo3 = document.querySelector('#nfo3')
const nfo4 = document.querySelector('#nfo4')

const rec1 = document.querySelector('#rec1')
const rec2 = document.querySelector('#rec2')
const rec3 = document.querySelector('#rec3')
const rec4 = document.querySelector('#rec4')

let timer = 0

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9')
}

rec1.addEventListener('click', () => {record(1)})

function record(channel) {
    let good = true
    const timer = setInterval(
        () => {
            timernum += 1
            nfo1.innerHTML = `${timernum}`
            good ? null : clearInterval(timer)
        },
        1000
    )
    playSound(sound)
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}