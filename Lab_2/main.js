// notatnik z zajęć

const main = document.querySelector('main')
const slides = document.querySelector('.slides')
const leftBtn = document.querySelector('#left')
const rightBtn = document.querySelector('#right')

const firstBtn = document.querySelector('#pic1')
const secondBtn = document.querySelector('#pic2')
const thirdBtn = document.querySelector('#pic3')
const fourthBtn = document.querySelector('#pic4')
const fifthBtn = document.querySelector('#pic5')

// jednorazowe wykonanie kodu po określonym czasie
// const timeoutRef = setTimeout(
//     () => {
//         slides.style.transform = 'translate(-10px)'
//         main.innerHTML = 'Msg from setTimeout'
//     },
//     2000
// )

rightBtn.addEventListener('click', () => {animate(true)})
leftBtn.addEventListener('click', () => {animate(false)})

firstBtn.addEventListener('click', () => {navigate(1)})
secondBtn.addEventListener('click', () => {navigate(2)})
thirdBtn.addEventListener('click', () => {navigate(3)})
fourthBtn.addEventListener('click', () => {navigate(4)})
fifthBtn.addEventListener('click', () => {navigate(5)})

// wykonywanie kodu co określony czas
let licznik = 0

function animate(next) {
    next ? console.log('right clicked') : console.log('left clicked')
    const intervalRef = setInterval(
        () => {
            next ? licznik += 8 : licznik -= 8
            slides.style.transform = `translate(-${licznik}px)`
            main.innerHTML = `Msg from setInterval: ${licznik}`
            if(licznik > 2400)
            {
                licznik = 0
            }
            if(licznik < 0)
            {
                licznik = 2400
            }
            if(licznik%600 == 0)
            {
                slides.style.transform = `translate(-${licznik}px)`
                main.innerHTML = `Msg from setInterval: ${licznik}`
                clearInterval(intervalRef)
            }
        },
        16
    )
}

function navigate(dest) {
    const intervalRef = setInterval(
        () => {
            next ? licznik += 8 : licznik -= 8
            slides.style.transform = `translate(-${licznik}px)`
            main.innerHTML = `Msg from setInterval: ${licznik}`
            if(licznik > 2400)
            {
                licznik = 0
            }
            if(licznik < 0)
            {
                licznik = 2400
            }
            if(licznik%600 == 0)
            {
                slides.style.transform = `translate(-${licznik}px)`
                main.innerHTML = `Msg from setInterval: ${licznik}`
                clearInterval(intervalRef)
            }
        },
        16
    )
}



// kasujemy setInterval
// clearInterval(intervalRef)

// kasujemy setTimeout
// clearTimeout(intervalRef)


// window.requestAnimationFrame