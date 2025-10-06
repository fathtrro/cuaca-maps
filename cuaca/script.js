// ============================================
// SCRIPT.JS - Controller Utama
// ============================================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherInfo = document.getElementById("weatherInfo");
const initialMessage = document.getElementById("initialMessage");
const errorMessage = document.getElementById("errorMessage");

async function searchWeather(cityName) {
  if (!cityName || cityName.trim() === "") {
    return;
  }

  weatherInfo.classList.add("hidden");
  errorMessage.classList.add("hidden");
  initialMessage.classList.add("hidden");

  const originalBtn = searchBtn.innerHTML;
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  searchBtn.disabled = true;

  try {
    const weatherData = await fetchWeatherData(cityName);
    const location = displayWeatherData(weatherData);

    weatherInfo.classList.remove("hidden");
    createMap(location.latitude, location.longitude, location.cityName);

    cityInput.value = "";
  } catch (error) {
    console.error("❌ Error:", error);
    errorMessage.classList.remove("hidden");
  } finally {
    searchBtn.innerHTML = originalBtn;
    searchBtn.disabled = false;
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  searchWeather(city);
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    searchWeather(city);
  }
});

cityInput.addEventListener("focus", () => {
  cityInput.select();
});

console.log("✅ Weather App siap digunakan!");
