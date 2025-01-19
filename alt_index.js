// index.js
import { colorOfTheYear } from "./colorData.js";
// import { populateGridSpiral } from "./colorData.js";

import { fetchWeatherApi } from "./meteo.js";

const temperatureDiv = document.getElementById("temperature");
const gridContainer = document.querySelector(".grid-container");
const yearDropdown = document.getElementById("year-dropdown");

const START_YEAR = 1985;
const END_YEAR = 2024; // define the start year globally
let YearsAndTemps = {};
console.log(YearsAndTemps)

const latitude = 39.74;
const longitude = 104.99;


// thank the maker for the cat lab
function populateYearDropdown() {
  for (let year = END_YEAR; year >= START_YEAR; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearDropdown.appendChild(option);
  }
}

// console.log(averageTemp);


// function to log the average temperatures for years and populate the temperatureDiv
const logAndDisplayTemperatureData = async (startYear, endYear) => {
  for (let year = endYear; year >= startYear; year--) {
    // check if the data is already available in tempByYear or fetch it if not
    let averageTemp = YearsAndTemps[year];

    if (averageTemp !== null && averageTemp !== undefined) {
      console.log(`the average temperature in ${year} was ${averageTemp.toFixed(2)}°C.`);

      const newDiv = document.createElement("div");
      newDiv.textContent = `${year} - the average temperature was ${averageTemp.toFixed(2)}°C`;

    temperatureDiv.appendChild(newDiv);
    } else {
      console.error(`No data for year: ${year}`);
    }
  }
};



// event listener for the year dropdown
document.getElementById("year-dropdown").addEventListener("change", async (event) => {
  const year = event.target.value;

// check if data is already fetched and stored, because otherwise you make the API angry
if (YearsAndTemps) {
  const temperature = YearsAndTemps[year];
  displayDataTemporarily({ year, temperature });
} else {
  // 1st time - call the fetchWeatherApi function
  console.log('It feels like the first time...');
  await fetchWeatherApi();

  // only fetch it once, then use the stored object to get the temperature
  const temperature = YearsAndTemps[year];
  displayDataTemporarily({ year, temperature });
}
});

populateYearDropdown();

  // display data temporarily under the dropdown
  function displayDataTemporarily(data) {
    const dataDiv = document.createElement("div");
    dataDiv.id = "temporary-data";
    dataDiv.textContent = `Year: ${data.year}, Temp: ${data.temperature}°C`;
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

// setInterval(populateGridSpiral(), 10000)



document.getElementById("hot-button").addEventListener("click", () => {
  document.getElementById("hot-button").style.display = "none";
  logAndDisplayTemperatureData(START_YEAR, END_YEAR);
});





// setInterval(populateGridSpiral(), 10000)

