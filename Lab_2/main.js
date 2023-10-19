const main = document.querySelector('main')
const slides = document.querySelector('.slides')
const leftBtn = document.querySelector('#left')
const rightBtn = document.querySelector('#right')

const firstBtn = document.querySelector('#pic1')
const secondBtn = document.querySelector('#pic2')
const thirdBtn = document.querySelector('#pic3')
const fourthBtn = document.querySelector('#pic4')
const fifthBtn = document.querySelector('#pic5')

rightBtn.addEventListener('click', () => {move(true)})
leftBtn.addEventListener('click', () => {move(false)})

firstBtn.addEventListener('click', () => {nav(0)})
secondBtn.addEventListener('click', () => {nav(1)})
thirdBtn.addEventListener('click', () => {nav(2)})
fourthBtn.addEventListener('click', () => {nav(3)})
fifthBtn.addEventListener('click', () => {nav(4)})

// wykonywanie kodu co określony czas
let licznik = 0
const pics = [0, 600, 1200, 1800, 2400]
const stepInit = 8
let current = 0

function move(next) {
    switch (current | next) {
        case 4 | true:
            current = 0
            next = false
            amp = 5
            break
        case 0 | false:
            current = 4
            next = true
            amp = 5
            break
        default:
            amp = 1
            next ? current+=1 : current-=1
    }

    animate(next, stepInit*amp)
}

function nav(dest) {
    if(current == dest) {
        return
    }
    if(Math.max(current, dest) == current) {
        current = dest
        amp = current-dest
        animate(false, stepInit*amp)
    } else {
        current = dest
        amp = dest-current
        animate(true, stepInit*amp)
    }
}

function animate(next, step) {
    const intervalRef = setInterval(
        () => {
            next ? licznik += step : licznik -= step
            slides.style.transform = `translate(-${licznik}px)`
            main.innerHTML = `Msg from setInterval: ${licznik}`
            licznik == pics[current] ? clearInterval(intervalRef) : null
        },
        16
    )
}