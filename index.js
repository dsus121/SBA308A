import { colorOfTheYear } from "./colorData.js"; // Adjust the path as needed
import {
  fetchWeatherApi,
  getHumidity,
  getTemperature,
  getWindSpeed,
} from "./meteo.js"; // Adjust the path as needed

const latitude = 52.52;
const longitude = 13.41;

async function getAverageTemperature(year) {
  try {
    const params = {
      latitude: latitude,
      longitude: longitude,
      start_date: `${year}-01-01`,
      end_date: `${year}-12-31`,
      hourly: "temperature_2m",
    };
    const url = "https://archive-api.open-meteo.com/v1/archive";

    // fetch the weather data
    const responses = await fetchWeatherApi(url, params);
    // extract the temperature data
    const temperatureData = responses.hourly.temperature_2m;
    // calculate the average temperature
    const totalTemperature = temperatureData.reduce(
      (acc, temp) => acc + temp,
      0
    );
    const averageTemperature = totalTemperature / temperatureData.length;

    // Round the average temperature to one decimal place
    const roundedTemperature = Math.round(averageTemperature * 10) / 10;

    // Create the result object
    const result = { year: year, averageTemperature: roundedTemperature };
    return result;
  } catch (error) {
    console.error(`Error fetching average temperature for ${year}:`, error);
  }
}

async function logAverageTemperatures() {
  for (let year = 2000; year <= 2024; year++) {
    const result = await getAverageTemperature(year);
    if (result) {
      console.log(
        `In ${result.year} the average temperature was ${result.averageTemperature}°C.`
      );
    }
  }
}

logAverageTemperatures();

console.log(colorOfTheYear[2024]);

console.log(getTemperature());

console.log(getHumidity());

console.log(getWindSpeed());
