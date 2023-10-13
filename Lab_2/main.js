// notatnik z zajęć

const main = document.querySelector('main')
const slides = document.querySelector('.slides')
const leftBtn = document.querySelector('#left')
const rightBtn = document.querySelector('#right')

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

// wykonywanie kodu co określony czas
let licznik = 0

function animate(next) {
    next ? console.log('right clicked') : console.log('left clicked')
    const intervalRef = setInterval(
        () => {
            next ? licznik += 8 : licznik -= 8
            next ? slides.style.transform = `translate(-${licznik}px)` : slides.style.transform = `translate(${licznik}px)`
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
            next ? slides.style.transform = `translate(-${licznik}px)` : slides.style.transform = `translate(${licznik}px)`
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