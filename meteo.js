// meteo.js
export const fetchWeatherApi = async (url, params) => {
  try {
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${urlParams}`, { method: "GET" });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // rethrow the error after logging it
  }
};

export const fetchTemperature2025 = async () => {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    start_date: "2025-01-01",
    end_date: "2025-01-17",
    hourly: "temperature_2m",
  };
  const url = "https://archive-api.open-meteo.com/v1/archive";

  try {
    const responses = await fetchWeatherApi(url, params);
    const temperatureData = responses.hourly.temperature_2m;
    const totalTemperature = temperatureData.reduce((acc, temp) => acc + temp, 0);
    const averageTemperature = totalTemperature / temperatureData.length;
    const roundedTemperature = Math.round(averageTemperature * 10) / 10;

    return { year: 2025, averageTemperature: roundedTemperature };
  } catch (error) {
    console.error("Failed to fetch temperature for 2025:", error);
    throw error; 
  }
};
