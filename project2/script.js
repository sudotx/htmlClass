const apiKey = "your_api_key_here"; // Get a free API key from OpenWeather
const weatherResult = document.getElementById("weatherResult");
const cityInput = document.getElementById("city");

document.getElementById("getWeather").addEventListener("click", async () => {
  const city = cityInput.value;
  if (!city) {
    weatherResult.innerHTML = "Please enter a city name.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `Error: ${error.message}`;
  }
});

function displayWeather(data) {
  const temp = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
  weatherResult.innerHTML = `
    <h3>Weather in ${data.name}</h3>
    <p>Temperature: ${temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}
