const cName = document.querySelector('#city_name')
const addButton = document.querySelector('#create')

let cities = {}
let cityAmount = 0
getCities()

addButton.addEventListener('click', add_city)

function add_city() {
    let city = {
        LastUpdate: Date.now(),
        Weather: 'sunny'
    }
    cities[cName.value] = city
    cityAmount++
    localStorage.setItem('cities', JSON.stringify(cities))
    localStorage.setItem('cityAmount', JSON.stringify(cityAmount))
}

function remove_city(city_name) {
    delete cities[city_name]
    cityAmount--
    localStorage.setItem('cities', JSON.stringify(cities))
    localStorage.setItem('cityAmount', JSON.stringify(cityAmount))
}

function getCities() {
    if(localStorage.getItem('cities') !== null){
        cities = JSON.parse(localStorage.getItem('cities'))
        cityAmount = JSON.parse(localStorage.getItem('cityAmount'))
    }
}