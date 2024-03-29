/* Super secret API key */

const apiKey = '473ad69d0cc3c69ab5560b9bb0170940';

/* Setting city variable for link when a city and searched */

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.querySelector('.search-input').value;
    fetchWeatherForCity(city);
});

/* Setting city variable as the city name on the button that is clicked */

document.querySelectorAll('button[data-city]').forEach(button => {
    button.addEventListener('click', function() {
        const city = this.getAttribute('data-city');
        fetchWeatherForCity(city);
    });
});

/* Function to fetch weather data json file and pass it info displayForecast functon */

function fetchWeatherForCity(city) {
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        });
}

/* Sets varaibles to manipulate later, setting data ids to strings with formatted data imbedded into it. Includes emoji
display conditions as well */

function displayWeather(data) {
    var weatherInfo = data.weather[0].main;
    var cityName = data.name;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    
    document.getElementById('city-date').innerText = `${cityName}, ${formattedDate}`;
    document.getElementById('temp').innerText = `Temp: ${data.main.temp} °F`;
    document.getElementById('wind').innerText = `Wind: ${data.wind.speed} MPH`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity} %`;
    
    if (weatherInfo == 'Clear') {
        cityName = `${cityName}, ${formattedDate} ☀️`;
        document.getElementById('city-date').innerText = cityName;
    } else if (weatherInfo == 'Clouds') {
        cityName = `${cityName}, ${formattedDate} ☁️`;
        document.getElementById('city-date').innerText = cityName;
    } else if (weatherInfo == 'Rain') {
        cityName = `${cityName}, ${formattedDate} 🌧️`;
        document.getElementById('city-date').innerText = cityName;
    } else if (weatherInfo == 'Thunderstorm') {
        cityName = `${cityName}, ${formattedDate} ⛈️`;
        document.getElementById('city-date').innerText = cityName;
    } else if (weatherInfo == 'Snow') {
        cityName = `${cityName}, ${formattedDate} ❄️`;
        document.getElementById('city-date').innerText = cityName;
    } 
}

/* Function to display forecast, iterates through each day and provides information for it. Finds a value thats
inside each file like the "12:00:00" to get info from */

function displayForecast(data) {
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));
    
    dailyData.forEach((day, index) => {
        const dayNumber = index + 1;

        const dateSpan = document.querySelector(`.forecast-date[data-day="${dayNumber}"]`);
        const date = new Date(day.dt_txt);
        dateSpan.innerText = date.toLocaleDateString();

        const emojiSpan = document.querySelector(`.weather-emoji[data-day="${dayNumber}"]`);
        emojiSpan.innerText = getWeatherEmoji(day.weather[0].main);
        
        const tempSpan = document.querySelector(`.forecast-temp[data-day="${dayNumber}"]`);
        tempSpan.innerText = `Temp: ${day.main.temp} °F`;

        const windSpan = document.querySelector(`.forecast-wind[data-day="${dayNumber}"]`);
        windSpan.innerText = `Wind: ${day.wind.speed} MPH`;

        const humiditySpan = document.querySelector(`.forecast-humidity[data-day="${dayNumber}"]`);
        humiditySpan.innerText = `Humidity: ${day.main.humidity} %`;
    });
}

/* Emoji picker for the function above */

function getWeatherEmoji(weatherMain) {
    switch (weatherMain) {
        case 'Clear':
            return '☀️';
        case 'Clouds':
            return '☁️';
        case 'Rain':
            return '🌧️';
        case 'Thunderstorm':
            return '⛈️';
        case 'Snow':
            return '❄️';
        default:
            return '';
    }
}

/* Displays Austin upon page loading */

fetchWeatherForCity('Austin');