// ============================================
// WEATHER.JS - Modul API Cuaca
// ============================================

const API_KEY = "ca639e41b6ab992aca897163093289fc";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityNameEl = document.getElementById("cityName");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");

async function fetchWeatherData(city) {
  const url = `${API_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=id`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

function displayWeatherData(data) {
  const { name, main, weather, wind, coord } = data;

  cityNameEl.textContent = name;
  temperatureEl.textContent = `${Math.round(main.temp)}°C`;
  descriptionEl.textContent = weather[0].description;
  humidityEl.textContent = `${main.humidity}%`;
  windSpeedEl.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;

  const iconCode = weather[0].icon;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherIconEl.alt = weather[0].description;

  return {
    latitude: coord.lat,
    longitude: coord.lon,
    cityName: name,
  };
}
