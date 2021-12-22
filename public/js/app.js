const form = document.querySelector('form')
const input = document.querySelector('input')
const loc = document.querySelector('#loc')
const forecast = document.querySelector('#forecast')
form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    fetch('http://localhost:3000/weather?search=' + input.value)
        .then((response) => {
            response.json().then(data => {
                if (!data.error) {
                    loc.textContent = data.location
                    forecast.innerHTML = 
                                        `<h4>${data.forecast}</h4>
                                        <h5>Temperature: ${data.temp}°C</h5>
                                        <h5>Feels Like: ${data.feels_like}°C</h5>`
                }
                else loc.textContent = data.error
            })
        })
    input.value = ""
    
})
