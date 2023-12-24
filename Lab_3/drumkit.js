document.addEventListener('keypress', onKeyPress)

let currentChannel = null
let channels = [[],[],[],[]]

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

document.getElementById('1Record').addEventListener('click', () => startRecord(0))
document.getElementById('2Record').addEventListener('click', () => startRecord(1))
document.getElementById('3Record').addEventListener('click', () => startRecord(2))
document.getElementById('4Record').addEventListener('click', () => startRecord(3))

document.getElementById('1Play').addEventListener('click', () => playChannel(0))
document.getElementById('2Play').addEventListener('click', () => playChannel(1))
document.getElementById('3Play').addEventListener('click', () => playChannel(2))
document.getElementById('4Play').addEventListener('click', () => playChannel(3))

const channelChecks = [
    document.getElementById('1Check'),
    document.getElementById('2Check'),
    document.getElementById('3Check'),
    document.getElementById('4Check')
]

document.getElementById('stopRecord').addEventListener('click', stopRecord)
document.getElementById('playSelected').addEventListener('click', playSelected)

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    playSound(sound)

    if(currentChannel != null) {
        channels[currentChannel].push({ time: Date.now(), sound })
        console.log(`added sound ${sound}`)
    }
}

function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function startRecord(channel) {
    console.log(`set channel to ${channel}`)
    currentChannel = channel
    channels[channel] = []
}

function stopRecord() {
    currentChannel = null
}

function playChannel(channel) {
    channels[channel].forEach(({time, sound}) => {
        setTimeout(() => playSound(sound), time - channels[channel][0].time)
    })
}

function playSelected() {
    channelChecks.forEach(function (channel, index) {
        console.log(`channel ${channel}  index ${index}`)
        channel.checked ? playChannel(index) : null
    })
}

//metronome
let metronomeInterval
let metronomeState

document.getElementById('metronomeSwitch').addEventListener('click', () => {
    metronomeState = !metronomeState

    if(metronomeState) {
        const bpm = parseInt(document.getElementById('bpmInput').value)
        const interval = 60 / bpm * 1000;
        metronomeInterval = setInterval(() => playMetronomeSound(), interval)
    } else {
        clearInterval(metronomeInterval)
    }
});

function playMetronomeSound() {
    const metronomeSound = new Audio('./sounds/tink.wav')
    metronomeSound.play()
}
