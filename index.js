import { colorOfTheYear } from "./colorData.js"; 
import { getWeatherData, getTemperature, getHumidity, getWindSpeed } from "./meteo.js"; // Adjust the path as needed

// Use the imported color data
console.log(colorOfTheYear);

// Call the function and log the result
getAverageTemperature().then((result) => {
if (result) { 
    console.log(result);
 } 
});


// Call the function to fetch and process the weather data
getWeatherData();