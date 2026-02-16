console.log('js work')

let dataWeather = []

document.addEventListener('DOMContentLoaded', ()=>{
    async function loadPage(pageName) {
        const response = await fetch(`../data/pages/${pageName}.html`)
        const html = await response.text();
        const container = document.querySelector('.container')
        container.innerHTML = html;
        const mainBtn = document.querySelector('#mainBtn')
        if (mainBtn) {
            mainBtn.addEventListener('click', ()=>{
                loadPage('main')
            })
        }
        const contactsBtn = document.querySelector('#contactsBtn')
        if (contactsBtn) {
            contactsBtn.addEventListener('click', ()=>{
                loadPage('contacts')
            })
        }
        if (pageName === 'main') {
            initWeather();
        }
    }

    loadPage('main');
})

async function initWeather() {
    try {
        const api = ('https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&hourly=temperature_2m,precipitation_probability,wind_speed_10m,apparent_temperature')
        const weather = await fetch(api)
        const response = await weather.json();
        dataWeather = response;
        const container = document.querySelector('.weather-content')
        container.innerHTML = ''

        dataWeather.hourly.time.forEach((time, index) => {
            const formatedTime = new Date(time).toLocaleString('en-EN', {
                day: 'numeric',
                month: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
            const temp = dataWeather.hourly.temperature_2m[index]
            const wind = dataWeather.hourly.wind_speed_10m[index]
            const precip = dataWeather.hourly.precipitation_probability[index]
            const feelsLike = dataWeather.hourly.apparent_temperature[index]
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weatherCard';
            weatherCard.innerHTML = `
                <span>Time: ${formatedTime}</span>
                <span>Temperature: ${temp}</span>
                <span>Wind: ${wind}</span>
                <span>Precip: ${precip}</span>
                <span>feelsLike: ${feelsLike}</span>
            `;
            container.appendChild(weatherCard)
        });
    } catch (error) {
        console.log('error - initWeather', error)
    }

}