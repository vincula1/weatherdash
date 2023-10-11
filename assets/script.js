const apiKey = '473ad69d0cc3c69ab5560b9bb0170940';
var city = 'Austin';


const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        var weatherInfo = data.weather[0].description
        var cityName = document.getElementById('city-date').innerText;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();

  
        document.getElementById('city-date').innerText = `${data.name}, ${formattedDate}`;
        document.getElementById('temp').innerText = `Temp: ${data.main.temp} °C`;
        document.getElementById('wind').innerText = `Wind: ${data.wind.speed} MPH`
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity} %`

        if (weatherInfo == 'clear sky') {
            cityName = `${city}, ${formattedDate} ☀️`
            document.getElementById('city-date').innerText = cityName;  
        }

    })
    .catch(error => {
        console.log('There was a problem with the fetch operation:', error.message);
    });
