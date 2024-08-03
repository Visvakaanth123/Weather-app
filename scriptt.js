const button = document.getElementById('button');
const weathericon = document.getElementById('icon'); 

button.addEventListener('click', (event) => {
    event.preventDefault();
    const city = document.getElementById('input').value;
    const apikey = "9312ff941dfaffefdcc53c5abe98d2c4";
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherMain = data.weather[0].main;
                console.log(`Weather main: ${weatherMain}`); 

                const info = `
                    <h2>${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                `;
                document.getElementById('result').innerHTML = info;

                if (weatherMain === 'Clouds') {
                    weathericon.src = "images/clouds.png";
                } else if (weatherMain === 'Clear') {
                    weathericon.src = "images/clear.png";
                } else if (weatherMain === 'Drizzle' || weatherMain === 'Rain') {
                    weathericon.src = "images/rain.png"; 
                } else if (weatherMain === 'Mist') {
                    weathericon.src = "images/mist.png";
                } else if (weatherMain === 'Haze') {
                    weathericon.src = "images/haze.png";
                } else {
                    weathericon.src = "images/default.png";
                }
                weathericon.style.display = 'block';
            } else {
                document.getElementById('result').innerHTML = `<p>${data.message}</p>`;
                weathericon.style.display = 'none';
            }
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
            weathericon.style.display = 'none';
        });
});
