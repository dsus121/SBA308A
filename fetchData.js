// fetchData.js
// this will move into another "module", likely meteo.js

// 39.7392° N, 104.9903° W for Denver
// go get the weather data from the API

// ================================================================================||
// 1] fetch weather data from API 
//
// →→→ IMPORTANT →→→ only call once, otherwise the API gets angry         →←
// 
//                     ===============================
//
//  - store it in an object
//  - cut up the data into usable pieces
//  - store year/temp into its own object
//    - likely deal with 2005 on its own since it only has one month of data
//
// ================================================================================||
let YearsAndTemps = {};

const fetchWeatherApiFunc = async () => {
  const url = "https://archive-api.open-meteo.com/v1/archive";

  const params = {
    latitude: 39.74,
    longitude: 104.99,
    start_date: "2000-01-01",   // changing the dates for a smaller data set
    end_date: "2024-12-31",
    hourly: "temperature_2m",
  };

  try {
    //  GET request with URL and parameters
    const response = await fetch(`${url}?${new URLSearchParams(params)}`, {
      method: "GET",
    });

    // check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // cut it all up into useable bits
    const data = await response.json();
    console.log("Fetched data:", data); // log the retrieved data

    const temperatureData = data.hourly.temperature_2m;
    const timeData = data.hourly.time; // added this line to get the time data
    console.log("Temperature data:", temperatureData); // the temperature data

    // process the data
    for (let year = 2000; year <= 2024; year++) {
        const yearData = temperatureData.filter((temp, index) => {
          const date = new Date(timeData[index]);
          return date.getFullYear() === year; // filter temperatures by year
          // getFullYear() is a cool built-in Javascript method
        });

        console.log(`Data for year ${year}:`, yearData); // log the data for each year

        // average temperature for each year
    if (yearData.length > 0) {
        const totalTemperature = yearData.reduce((acc, temp) => acc + temp, 0);
        const averageTemperature = totalTemperature / yearData.length;
        const roundedTemperature = Math.round(averageTemperature * 10) / 10;

        YearsAndTemps[year] = roundedTemperature; // store the average temperature for each year
    }   else {
        YearsAndTemps[year] = null; // store null for years with no data
    }
    }
    console.log("Years & Temps:", YearsAndTemps);    //----------------------------- console log ------
  } catch (error) {
    console.error("Failed to fetch weather data:", error);    //--- console log ---
  }
}; // end of this function


// calling the fuction below !!!!!!!!!!!!

// ================================================================================||
// 2] write a function to loop through years to populate the dropdown
//  - make it work independent of the data object first,
//    then try to extact the information from the object
//  - call the function
//  - write a funtion to display the year/temp data for the chosen year 
// ================================================================================||

const START_YEAR = 2000;
const END_YEAR = 2024; // define the start year globally

// thank the maker for the cat lab
const yearDropdown = document.getElementById("year-dropdown");

function populateYearDropdown() {
    for (let year = END_YEAR; year >= START_YEAR; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearDropdown.appendChild(option);
    }
  }
  
  yearDropdown.addEventListener("change", (event) => {
    const year = event.target.value;
    const temperature = YearsAndTemps[year];
    displayDataTemporarily({ year, temperature });
  });

// ================================================================================||
// 3] call the function to populate the dropdown
//  - print the year/temp data for the year selected to the screen temporarily
//  - "" to the console as well
// ================================================================================||

populateYearDropdown();  // call the function

const temperatureDiv = document.getElementById("temperature");

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

function logAverageTemperatures() {
    const temperatureDiv = document.getElementById("temperature");
    const gridContainer = document.getElementById("grid-container");
  
    if (!temperatureDiv || !gridContainer) {
      console.error("Required elements not found");
      return;
    }
  
    temperatureDiv.innerHTML = "";
    gridContainer.innerHTML = "";
  
    for (let year = 2024; year >= 2000; year--) {
      const averageTemperature = YearsAndTemps[year];
      if (averageTemperature !== null && averageTemperature !== undefined) {
        console.log(`In ${year} the average temperature was ${averageTemperature}°C.`);
        const newDiv = document.createElement("div");
        newDiv.textContent = `${year} - the average temperature was ${averageTemperature.toFixed(1)}°C`;
        temperatureDiv.appendChild(newDiv);
      } else {
        console.error(`No data for year: ${year}`);
      }
    }
  }

    // Fetch weather data on page load and then log temperatures
    document.addEventListener("DOMContentLoaded", async () => {
        await fetchWeatherApiFunc();
        logAverageTemperatures();
      }
    );
// ================================================================================||
// 4] write a function to build the grid
//  -  call it
// ================================================================================||

const gridContainer = document.querySelector(".grid-container");

// populate the grid in a function
// function populateGrid() {
//   for (let i = 1; i <= 25; i++) {
//     const boxDiv = document.createElement("div");
//     boxDiv.id = `box${i}`;
//     boxDiv.className = "box";
//     boxDiv.textContent = i;
//     gridContainer.appendChild(boxDiv);
//   }
// }

// populateGrid();


// ================================================================================||
// 5] write a function to pull in the Color of the Year data and 
//    link it to the year/temp data
//  - write a function to display the year/color in a spiral-esque format <- matrix
// ================================================================================||


// ================================================================================||
// 6] create a button 
//  -  onclick start the spiral display
// ================================================================================||

// setInterval(populateGridSpiral(), 10000)

// const result = { year: year, averageTemperature: roundedTemperature };



document.getElementById("hot-button").addEventListener("click", () => {
  document.getElementById("hot-button").style.display = "none";
  logAverageTemperatures();
});

// async function fetchWeatherData(year) {


// ================================================================================||
// 7] deal with 2025 data  
//    
//  
// ================================================================================||

// fetch temperature for 2025

//   const temp2025 = await getAverageTemperature(2025);
//   if (temp2025) {
//     console.log(
//       `In ${temp2025.year} the average temperature was ${temp2025.averageTemperature}°C.`
//     );
//     const newDiv = document.createElement("div");
//     newDiv.textContent = `${
//       temp2025.year
//     } - the average temperature was ${temp2025.averageTemperature.toFixed(
//       1
//     )}°C`;
//     temperatureDiv.appendChild(newDiv);
//   }


