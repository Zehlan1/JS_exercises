document.addEventListener('keypress', onKeyPress)
document.addEventListener('keypress', writeDown)

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

let recording = false
let currTrack = 0

const Tracks = {
    1: {},
    2: {},
    3: {},
    4: {}
}

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

document.querySelector('#play1').addEventListener('click', () => {play(1)})
play2.addEventListener('click', () => {play(2)})
play3.addEventListener('click', () => {play(3)})
play4.addEventListener('click', () => {play(4)})

function play(channel) {
    let curSound = 1
    const soundsNum = Object.keys(Tracks[channel]).length
    let ownTimer = 0
    const timer = setInterval(
        () => {
            ownTimer += 1
            if(ownTimer in Tracks[channel]){
                playSound(Tracks[channel][ownTimer])
                curSound += 1
            }
            if(curSound>soundsNum){
                clearInterval(timer)
            }
        },
        1
    )
}

function record(channel) {
    StopBtn[channel].style.display = 'flex'
    RecBtn[channel].style.display = 'none'
    recording = true
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
                recording = false
            })
        },
        1
    )
}

function writeDown(event) {
    if(recording){
        Tracks[currTrack].push({
            key: timernum,
            value: KeyToSound[event.key]
        })
    }
}
function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}