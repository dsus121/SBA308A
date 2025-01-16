// import fetch from 'node-fetch';

import { fetchWeatherApi } from 'openmeteo';

const params = {
    latitude: 52.52,
    longitude: 13.41,
    start_date: '2024-12-31',
    end_date: '2025-01-01',
    hourly: 'temperature_2m'
};

const url = 'https://archive-api.open-meteo.com/v1/archive';

async function getWeatherData() {
    const responses = await fetchWeatherApi(url, params);
    const data = response.json()
    console.log(response)

    // Helper function to form time ranges
    const range = (start, stop, step) => {
        return Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    };

    // Process first location
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();

    const hourly = response.hourly();

    // Note: The order of weather variables in the URL query and the indices below need to match!
    const weatherData = {
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            temperature2m: hourly.variables(0).valuesArray(),
        },
    };

    // `weatherData` now contains a simple structure with arrays for datetime and weather data
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        console.log(
            weatherData.hourly.time[i].toISOString(),
            weatherData.hourly.temperature2m[i]
        );
    }
}

// fake data
// weatherUtils.js

function getTemperature() {
    return "Temperature is 20°C";
  }
  
  function getHumidity() {
    return "Humidity is 80%";
  }
  
  function getWindSpeed() {
    return "Wind speed is 10 km/h";
  }
  
  export { getWeatherData, getTemperature, getHumidity, getWindSpeed };
  

