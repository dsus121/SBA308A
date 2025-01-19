// index.js
import { colorOfTheYear } from "./colorData.js";
import { populateGridSpiral } from "./colorData.js";

import { YearsAndTemps } from "./meteo.js";


// ================================================================================||
// 4] write a function to build the grid
//  -  call it
// ================================================================================||

const gridContainer = document.querySelector(".grid-container");

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

// ================================================================================||
// 5] write a function to pull in the Color of the Year data and 
//    link it to the year/temp data
//  - write a function to display the year/color in a spiral-esque format <- matrix
// ================================================================================||

// setInterval(populateGridSpiral(), 10000)

// populateGridSpiral(gridContainer, startYear, endYear)

// ================================================================================||
// 6] create a button 
//  -  onclick start the spiral display
// ================================================================================||





document.getElementById("hot-button").addEventListener("click", () => {
  const gridContainer = document.getElementById("grid-container");

  // hide the button after it's clicked
  document.getElementById("hot-button").style.display = "none";
  
  const startYear = 2000;
  const endYear = 2024;
  
  // populate the grid in a spiral order with color data
  populateGridSpiral(gridContainer, startYear, endYear);
});




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


