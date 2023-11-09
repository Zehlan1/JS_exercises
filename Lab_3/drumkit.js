document.addEventListener('keypress', onKeyPress)

const TrackText = {
    1: document.querySelector('#nfo1'),
    2: document.querySelector('#nfo2'),
    3: document.querySelector('#nfo3'),
    4: document.querySelector('#nfo4')
}

const RecBtn = {
    1: document.querySelector('#rec1'),
    2: document.querySelector('#rec2'),
    3: document.querySelector('#rec3'),
    4: document.querySelector('#rec4')
}

const StopBtn = {
    1: document.querySelector('#stop1'),
    2: document.querySelector('#stop2'),
    3: document.querySelector('#stop3'),
    4: document.querySelector('#stop4')
}

const PlayBtn = {
    1: document.querySelector('#play1'),
    2: document.querySelector('#play2'),
    3: document.querySelector('#play3'),
    4: document.querySelector('#play4')
}

let track1 = {}
let track2 = {}
let track3 = {}
let track4 = {}

let timernum = 0

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
rec2.addEventListener('click', () => {record(2)})
rec3.addEventListener('click', () => {record(3)})
rec4.addEventListener('click', () => {record(4)})

function record(channel) {
    StopBtn[channel].style.display = 'flex'
    RecBtn[channel].style.display = 'none'
    const timer = setInterval(
        () => {
            timernum += 1
            TrackText[channel].innerHTML = `${timernum}`
            StopBtn[channel].addEventListener('click', () => {
                clearInterval(timer)
                StopBtn[channel].style.display = 'none'
                RecBtn[channel].style.display = 'flex'
                TrackText[channel].innerHTML = ``
                timernum = 0
            })
        },
        1
    )
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}