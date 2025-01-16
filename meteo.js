
export const fetchWeatherApi = async (url, params) => {
  try {
    const urlParams = new URLSearchParams(params).toString();
    const response = await fetch(`${url}?${urlParams}`, { method: "GET" });
    const responseText = await response.text(); 
    // console.log("Raw response text:", responseText); 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(responseText); // Parse the JSON response
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error; // rethrow the error after logging it
  }
};


       function getTemperature() {
        return "Temperature is 20°C";
      }
      
      function getHumidity() {
        return "Humidity is 80%";
      }
      
      function getWindSpeed() {
        return "Wind speed is 10 km/h";
      }
      
      export { getTemperature, getHumidity, getWindSpeed };
      
    