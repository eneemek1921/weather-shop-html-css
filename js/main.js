console.log('js work')

document.addEventListener('DOMContentLoaded', ()=>{
    async function loadPage(pageName) {
        const response = await fetch(`../data/pages/${pageName}.html`)
        const html = await response.text();
        const container = document.querySelector('.container')
        container.innerHTML = html;
        document.querySelector('mainBtn').addEventListener('click', ()=>{
            loadPage('main')
        })
        document.querySelector('mainBtn').addEventListener('click', ()=>{
            loadPage('contacts')
        })
    }
    loadPage('main');
})