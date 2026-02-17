console.log('js work')

let dataWeather = []
let contactData = JSON.parse(localStorage.getItem('contactData')) || []
console.log('Сохранённые сообщения:', contactData)

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

        if (pageName === 'contacts') {
            modalWindowContact();
        }
    }

    loadPage('main');
})

async function initWeather() {
    try {
        const api = ('https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&hourly=temperature_2m,wind_speed_10m,precipitation_probability,apparent_temperature&start_date=2026-02-16&end_date=2026-03-01')
        const weather = await fetch(api)
        const response = await weather.json();
        dataWeather = response;
        const container = document.querySelector('.weather-content')
        container.innerHTML = ''

        dataWeather.hourly.time.forEach((time, index) => {
            const date = new Date(time);
            const hours = date.getHours()
            if (hours === 12) {
                const formatedTime = date.toLocaleString('en-EN', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
                const weekDay = date.toLocaleString('en-US', {
                    weekday: 'long'
                })
            
            const temp = dataWeather.hourly.temperature_2m[index]
            const wind = dataWeather.hourly.wind_speed_10m[index]
            const precip = dataWeather.hourly.precipitation_probability[index]
            const feelsLike = dataWeather.hourly.apparent_temperature[index]
            const weatherCard = document.createElement('div');
            weatherCard.className = 'weatherCard';
            weatherCard.innerHTML = `
                <h1 class="weekDayWeatherCard">${weekDay}</h1>
                <span>Time:  ${formatedTime}</span>
                <span>🌡️ Temperature: ${temp} С°</span>
                <span>💨 Wind: ${wind} KMH </span>
                <span>☔ Precip: ${precip} MM</span>
                <span>🤔 feelsLike: ${feelsLike} С°</span>
            `;
            container.appendChild(weatherCard)
            }
        });
    } catch (error) {
        console.log('error - initWeather', error)
    }
}

function modalWindowContact(){
    const modalWindow = document.querySelector('.modalWindow')
    const openButton = document.querySelector('.contactBtn')
    const sendBtn = document.querySelector('.contactBtnSend')
    const emailInput = document.querySelector('.emailInput')
    const textInput = document.querySelector('.textInput')
    const overlay = document.querySelector('.overlay')
    const closeButton = document.querySelector('.modalCloseBtn')

    openButton.addEventListener('click', () =>{
        modalWindow.style.display = 'flex';
        overlay.style.display = 'flex';
    })
    sendBtn.addEventListener('click', () =>{
        const email = document.querySelector('.emailInput').value.trim();
        const text = document.querySelector('.textInput').value.trim();
        const h1 = document.querySelector('.contactH1')

        if (email.trim() === '' || text.trim() === '') {
            h1.innerHTML = 'Invalid';
        } else {
            h1.innerHTML = 'Contact';
            emailInput.value = ''
            textInput.value = ''
            contactData.push({Email: email, Text: text})
            localStorage.setItem('contactData', JSON.stringify(contactData))
        }

    })
    closeButton.addEventListener('click', ()=>{
        modalWindow.style.display = 'none';
        overlay.style.display = 'none';
    })
}