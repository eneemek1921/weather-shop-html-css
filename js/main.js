console.log('js work')

document.addEventListener('DOMContentLoaded', ()=>{
    async function loadPage(pageName) {
        const response = await fetch(`../data/pages/${pageName}.html`)
        const html = await response.text();
        const container = document.querySelector('.container')
        container.innerHTML = html;
        const mainBtn = document.querySelector('.mainBtn')
        if (mainBtn) {
            mainBtn.addEventListener('click', ()=>{
                loadPage('main')
            })
        }
        const contactsBtn = document.querySelector('.contactsBtn')
        if (mainBtn) {
            contactsBtn.addEventListener('click', ()=>{
                loadPage('contacts')
            })
        }
    }

    loadPage('main');
})

async function initWeather() {
    const weather = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.5244&longitude=13.4105&hourly=temperature_2m,precipitation_probability,wind_speed_10m,apparent_temperature')
    const response = weather.JSON
}