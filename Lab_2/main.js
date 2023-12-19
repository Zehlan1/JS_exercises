let slidePos = 0
const slides = document.querySelectorAll('.sImage');

document.querySelector('#right').addEventListener('click', () => {moveTo(slidePos+1)})
document.querySelector('#left').addEventListener('click', () => {moveTo(slidePos-1)})

function moveTo(index) {
    switch (true) {
        case index >= slides.length:
            slidePos = 0
            break
        case index < 0:
            slidePos = slides.length - 1
            break
        default:
            slidePos = index
            break
    }
    document.querySelector('.slides').style.transform = `translateX(${-slidePos * 600}px)`
}