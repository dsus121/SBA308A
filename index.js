// index.js
import { colorOfTheYear } from "./colorData.js";
// import { populateGridSpiral } from "./colorData.js";

import { fetchWeatherApi } from "./meteo.js";

const temperatureDiv = document.getElementById("temperature");
const gridContainer = document.querySelector(".grid-container");
const yearDropdown = document.getElementById("year-dropdown");

const START_YEAR = 1985;
const END_YEAR = 2024; // define the start year globally
const MAX_RETRIES = 5;
const RETRY_DELAY = 2000; // 2 seconds

const latitude = 52.52;
const longitude = 13.41;

// thank the maker for the cat lab
function populateYearDropdown() {
  for (let year = END_YEAR; year >= START_YEAR; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  }
}

document.getElementById("year-dropdown").addEventListener("change", async (event) => {
  const year = event.target.value;
  const data = await fetchWeatherData(year);
  console.log(data);
  displayDataTemporarily(data);
});


  // display data temporarily under the dropdown
  function displayDataTemporarily(data) {
    const dataDiv = document.createElement("div");
    dataDiv.id = "temporary-data";
    dataDiv.textContent = `Year: ${data.year}, Temp: ${data.averageTemperature}°C`;
    dataDiv.style.color = "#fff";
    dataDiv.style.padding = "10px";
    dataDiv.style.margin = "10px auto";
    dataDiv.style.width = "70%";
    dataDiv.style.textAlign = "center";
    dataDiv.style.fontSize = "12px";
  
    temperatureDiv.appendChild(dataDiv);
  
    // Remove the data after 5 seconds
    setTimeout(() => {
      dataDiv.remove();
    }, 5000);
  }
  


// populate the grid in a function
function populateGrid() {
  for (let i = 1; i <= 25; i++) {
    const boxDiv = document.createElement("div");
    boxDiv.id = `box${i}`;
    boxDiv.className = "box";
    boxDiv.textContent = i;
    gridContainer.appendChild(boxDiv);
  }
}
populateGrid();

populateYearDropdown(1985, 2024);

// setInterval(populateGridSpiral(), 10000)

async function getAverageTemperature(year, retries = 0) {
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
    const temperatureData = responses.hourly.temperature_2m;

    // calculate the average temperature, round it
    const totalTemperature = temperatureData.reduce((acc, temp) => acc + temp, 0);
    const averageTemperature = totalTemperature / temperatureData.length;
    const roundedTemperature = Math.round(averageTemperature * 10) / 10;

    const result = { year: year, averageTemperature: roundedTemperature };
    return result;
  } catch (error) {
    if (error.message.includes("429") && retries < MAX_RETRIES) {
      console.warn(
        `Rate limit exceeded. Retrying in ${RETRY_DELAY * (retries + 1)}ms...`
      );
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retries + 1))
      );
      return getAverageTemperature(year, retries + 1);
    } else {
      console.error(`Error fetching average temperature for ${year}:`, error);
      throw error;
    }
  }
}

async function logAverageTemperatures() {
  if (!temperatureDiv || !gridContainer) {
    console.error("Required elements not found");
    return;
  }
  temperatureDiv.innerHTML = "";
  gridContainer.innerHTML = "";

  // fetch temperature for 2025
  const temp2025 = await getAverageTemperature(2025);
  if (temp2025) {
    console.log(
      `In ${temp2025.year} the average temperature was ${temp2025.averageTemperature}°C.`
    );
    const newDiv = document.createElement("div");
    newDiv.textContent = `${
      temp2025.year
    } - the average temperature was ${temp2025.averageTemperature.toFixed(
      1
    )}°C`;
    temperatureDiv.appendChild(newDiv);
  }

  // fetch temperatures for other years in reverse order
  for (let year = 2024; year >= 1985; year--) {
    const result = await getAverageTemperature(year);
    if (result) {
      console.log(
        `In ${result.year} the average temperature was ${result.averageTemperature}°C.`
      );
      const newDiv = document.createElement("div");
      newDiv.textContent = `${
        result.year
      } - the average temperature was ${result.averageTemperature.toFixed(
        1
      )}°C`;
      temperatureDiv.appendChild(newDiv);
    } else {
      console.error(`No data for year: ${year}`);
    }
  }
}

document.getElementById("hot-button").addEventListener("click", () => {
  document.getElementById("hot-button").style.display = "none";
  logAverageTemperatures();
});

async function fetchWeatherData(year) {
  return await getAverageTemperature(year);
}




// setInterval(populateGridSpiral(), 10000)

