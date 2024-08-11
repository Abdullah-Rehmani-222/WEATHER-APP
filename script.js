let searchInput = document.getElementById("city-input");
let searchButton = document.getElementById("search");
let weatherDisplayContainer = document.getElementById("weather-data-display-container");
let welcomeContainer = document.getElementById("welcome-user-container");
let dayNight = document.getElementById("show-day-night");
let date = document.getElementById("show-date");
let label = document.querySelectorAll(".label");
let h2 = document.getElementById("cityName");
let paraInCelsius = document.getElementById("temp-in-celsius");
let weatherIcons = document.getElementById("show-weather-icons");
let weatherConditionText = document.getElementById("weather-condition-text");
let realFeelInCelsius = document.getElementById("realfeel-celsius");
let windSpeedKph = document.getElementById("windspeed-kph");
let humidity = document.getElementById("humidity");
let invalidSearch = document.getElementById("invalid-search");
let emptyInputSearch = document.getElementById("empty-input-search");

async function getWeatherData(cityName) {
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=f53ef2824c684a309d7220736241207&q=${cityName}&aqi=yes`
    );
    if (!response.ok) throw new Error("City not found");
    let data = await response.json();
    showWeatherData(data);
  } catch (error) {
    invalidSearch.style.display = "flex";
    welcomeContainer.style.display = "none";
    weatherDisplayContainer.style.display = "none";
    emptyInputSearch.style.display = "none";
  }
}

function showWeatherData(data) {
  welcomeContainer.style.display = "none";
  weatherDisplayContainer.style.display = "flex";
  invalidSearch.style.display = "none";
  emptyInputSearch.style.display = "none";
  console.log(data);
  h2.innerText = `${data.location.name}`;
  paraInCelsius.innerText = `${data.current.temp_c}`;
  weatherIcons.src = `${data.current.condition.icon}`;
  weatherConditionText.innerText = `${data.current.condition.text}`;
  realFeelInCelsius.innerText = `${data.current.feelslike_c}°c`;
  windSpeedKph.innerText = `${data.current.wind_kph} KM/H`;
  humidity.innerText = `${data.current.humidity}%`;
  date.innerText = `${data.location.localtime}`;
  if (data.current.is_day === 1) {
    weatherDisplayContainer.style.background =
      "linear-gradient(rgb(161, 161, 226), rgb(179, 178, 178))";
    dayNight.style.color = "rgb(97, 144, 144)";
    date.style.color = "rgb(97, 144, 144)";
    weatherConditionText.style.color = "darkslategray";
    label[0].style.color = "darkslategrey";
    label[1].style.color = "darkslategrey";
    label[2].style.color = "darkslategrey";
    dayNight.innerText = "DAY";
  } else {
    weatherDisplayContainer.style.background =
      "linear-gradient(rgb(0, 0, 47), rgb(83, 63, 104))";
    dayNight.style.color = "darkgray";
    date.style.color = "darkgray";
    weatherConditionText.style.color = "aqua";
    label[0].style.color = "darkcyan";
    label[1].style.color = "darkcyan";
    label[2].style.color = "darkcyan";
    dayNight.innerText = "Night";
  }
}

function handleSearch() {
  let value = searchInput.value;
  if (value !== "") {
    getWeatherData(value);
  } else {
    emptyInputSearch.style.display = "flex";
    welcomeContainer.style.display = "none";
    weatherDisplayContainer.style.display = "none";
    invalidSearch.style.display = "none";
  }
}

searchButton.addEventListener("click", handleSearch);
searchInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    handleSearch();
  }
});







