document.addEventListener('DOMContentLoaded', displayWeather)
document.querySelector('#addCity').addEventListener('click', addCity)

const weatherContainer = document.getElementById('weatherContainer')

async function addCity() {
    let weatherList = JSON.parse(localStorage.getItem('weather')) || []
    const cityName = document.getElementById('city').value

    if(weatherList.length > 9) {
        alert('Over City limit (10)')
        cityName = ''
        return
    }

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a5913bf8ca2ef4f3d8bf2e3bbf49cb82`)
    let data = await response.json()

    weatherList.push(data)
    localStorage.setItem('weather', JSON.stringify(weatherList))

    displayWeather()
}

function deleteCity(index) {
    let weatherList = JSON.parse(localStorage.getItem('weather'))
    weatherList.splice(index, 1)
    localStorage.setItem('weather', JSON.stringify(weatherList))

    displayWeather()
}

function displayWeather() {
    weatherContainer.innerHTML = ""

    let weatherList = JSON.parse(localStorage.getItem('weather')) || []

    weatherList.forEach((data, index) => {
        weatherContainer.appendChild(buildWeather(data, index))
    })
}

function buildWeather(data, index) {
    const newWeather = document.createElement('div')
    newWeather.classList.add('weatherBlock')

    const weatherData = document.createElement('div')
    weatherData.classList.add('weatherData')

    let temp = Math.round((data.main.temp - 273) * 10) / 10

    weatherData.innerHTML = `
        <p>${data.name}</p>
        <p>Temp: ${temp.toFixed(1)} °C</p>
        <p>Hum: ${data.main.humidity}%</p>
        <p>Desc: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`

    
    const weatherDelete = document.createElement('button')
    weatherDelete.classList.add('weatherDelete')
    weatherDelete.setAttribute('onclick',`deleteCity(${index})`);
    weatherDelete.textContent = 'Remove'

    newWeather.appendChild(weatherData)
    newWeather.appendChild(weatherDelete)

    return newWeather
}
