// colorData.js

export const colorOfTheYear = {
  2000: {
    year: 2000,
    colorNameOne: "Cerulean",
    colorPCodeOne: "Pantone 15-4020",
    colorHexOne: "#9BB7D4",
  },
  2001: {
    year: 2001,
    colorNameOne: "Fuchsia Rose",
    colorPCodeOne: "Pantone 17-2031",
    colorHexOne: "#C74375",
  },
  2002: {
    year: 2002,
    colorNameOne: "True Red",
    colorPCodeOne: "Pantone 19-1664",
    colorHexOne: "#BF1932",
  },
  2003: {
    year: 2003,
    colorNameOne: "Aqua Sky",
    colorPCodeOne: "Pantone 14-4811",
    colorHexOne: "#7BC4C4",
  },
  2004: {
    year: 2004,
    colorNameOne: "Tigerlily",
    colorPCodeOne: "Pantone 17-1456",
    colorHexOne: "#E2583E",
  },
  2005: {
    year: 2005,
    colorNameOne: "Blue Turquoise",
    colorPCodeOne: "Pantone 15-5217",
    colorHexOne: "#53B0AE",
  },
  2006: {
    year: 2006,
    colorNameOne: "Sand Dollar",
    colorPCodeOne: "Pantone 13-1106",
    colorHexOne: "#DECDBE",
  },
  2007: {
    year: 2007,
    colorNameOne: "Chili Pepper",
    colorPCodeOne: "Pantone 19-1557",
    colorHexOne: "#9B1B30",
  },
  2008: {
    year: 2008,
    colorNameOne: "Blue Iris",
    colorPCodeOne: "Pantone 18-3943",
    colorHexOne: "#5A5B9F",
  },
  2009: {
    year: 2009,
    colorNameOne: "Mimosa",
    colorPCodeOne: "Pantone 14-0848",
    colorHexOne: "#F0C05A",
  },
  2010: {
    year: 2010,
    colorNameOne: "Turquoise",
    colorPCodeOne: "Pantone 15-5519",
    colorHexOne: "#45B5AA",
  },
  2011: {
    year: 2011,
    colorNameOne: "Honeysuckle",
    colorPCodeOne: "Pantone 18-2120",
    colorHexOne: "#D94F70",
  },
  2012: {
    year: 2012,
    colorNameOne: "Tangerine Tango",
    colorPCodeOne: "Pantone 17-1463",
    colorHexOne: "#DD4124",
  },
  2013: {
    year: 2013,
    colorNameOne: "Emerald",
    colorPCodeOne: "Pantone 17-5641",
    colorHexOne: "#009473",
  },
  2014: {
    year: 2014,
    colorNameOne: "Radiant Orchid",
    colorPCodeOne: "Pantone 18-3224",
    colorHexOne: "#B163A3",
  },
  2015: {
    year: 2015,
    colorNameOne: "Marsala",
    colorPCodeOne: "Pantone 18-1438",
    colorHexOne: "#955251",
  },
  2016: {
    year: 2016,
    colorNameOne: "Serenity",
    colorPCodeOne: "Pantone 15-3913",
    colorHexOne: "#92A8D1",
    colorNameTwo: "Rose Quartz",
    colorPCodeTwo: "Pantone 13-1520",
    colorHexTwo: "#F7CAC9",
  },
  2017: {
    year: 2017,
    colorNameOne: "Greenery",
    colorPCodeOne: "Pantone 15-0343",
    colorHexOne: "#88B04B",
  },
  2018: {
    year: 2018,
    colorNameOne: "Ultra Violet",
    colorPCodeOne: "Pantone 18-3838",
    colorHexOne: "#5F4B8B",
  },
  2019: {
    year: 2019,
    colorNameOne: "Living Coral",
    colorPCodeOne: "Pantone 16-1546",
    colorHexOne: "#FF6F61",
  },
  2020: {
    year: 2020,
    colorNameOne: "Classic Blue",
    colorPCodeOne: "Pantone 19-4052",
    colorHexOne: "#0F4C81",
  },
  2021: {
    year: 2021,
    colorNameOne: "Ultimate Gray",
    colorPCodeOne: "Pantone 13-0647",
    colorHexOne: "#959A9C",
    colorNameTwo: "Illuminating",
    colorPCodeTwo: "Pantone 13-0647",
    colorHexTwo: "#F8D948",
  },
  2022: {
    year: 2022,
    colorNameOne: "Very Peri",
    colorPCodeOne: "Pantone 17-3938",
    colorHexOne: "#6968AC",
  },
  2023: {
    year: 2023,
    colorNameOne: "Viva Magenta",
    colorPCodeOne: "Pantone 18-1750",
    colorHexOne: "#BB2649",
  },
  2024: {
    year: 2024,
    colorNameOne: "Peach Fuzz",
    colorPCodeOne: "Pantone 13-1023",
    colorHexOne: "#FEBE98",
  },
  2025: {
    year: 2025,
    colorNameOne: "Mocha Mousse",
    colorPCodeOne: "Pantone 17-1230",
    colorHexOne: "#A57865",
  },
};

// Spiral order array
const spiralOrder = [
  [1, 1],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [5, 2],
  [5, 3],
  [5, 4],
  [5, 5],
  [4, 5],
  [3, 5],
  [2, 5],
  [1, 5],
  [1, 4],
  [1, 3],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [4, 3],
  [4, 4],
  [3, 4],
  [2, 4],
  [2, 3],
  [3, 3],
];

// populate grid in a spiral pattern with color data
export function populateGridSpiral(gridContainer, startYear, endYear) {
  if (!gridContainer) {
    console.error("Grid container element not found");
    return;
  }

  let index = 0;

  // set a delay for loading each color slowly
  const colorDelay = 500;

  // function to add the colors with a delay
  const addColorWithDelay = (year, colorData, delay) => {
    const [col, row] = spiralOrder[index];

    const boxDiv = document.createElement("div");
    boxDiv.id = `box${year}`;
    boxDiv.className = "box";
    boxDiv.style.gridRowStart = row;
    boxDiv.style.gridColumnStart = col;

    boxDiv.style.backgroundColor = colorData.colorHexOne;
    boxDiv.style.color = colorData.colorHexTwo ? colorData.colorHexTwo : "#fff";

    boxDiv.textContent = `${colorData.year} - ${colorData.colorNameOne}`;

    setTimeout(() => {
      gridContainer.appendChild(boxDiv);
    }, delay);
  };

  for (let year = endYear; year >= startYear; year--) {
    const colorData = colorOfTheYear[year];
    if (colorData && index < spiralOrder.length) {
      const delay = index * colorDelay;
      addColorWithDelay(year, colorData, delay);
      index++;
    } else {
      console.error(`No color data for year: ${year}`);
    }
  }
}
