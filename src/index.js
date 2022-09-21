// DATE-------------------------------------------------
function formatDates(dates) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dates.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[dates.getMonth()];

  let date = dates.getDate();
  let year = dates.getFullYear();

  let result = `${day}, ${month} ${date}, ${year}`;
  return result;
}

let h5Date = document.querySelector("#date");
h5Date.innerHTML = formatDates(new Date());

// function formatTimes(time) {
//   let hours = time.getHours();
//      if (hours <10) {
//       hours = `0${hours}`;
//      }
//   let minutes = time.getMinutes();
//   if (minutes <10) {
//     minutes = `0${minutes}`;
//   }
//   let resultTime = `${hours}:${minutes}`;
//   return resultTime;
// }

let h3Time = document.querySelector("#time");
h3Time.innerHTML = new Date().toLocaleTimeString().slice(0, -3);

// FORM-------------------------------------------
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  searchInput.value = firstUpper(searchInput.value.trim());

  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  // let h1City = document.querySelector("#city");
  if (searchInput.value) {
    // h1City.innerHTML = `${searchInput.value}`;
  } else {
    // h1City.innerHTML = null;
    // temperatureValue(null);
    alert("Please enter a city");
  }
}

let searchForm = document.querySelector("#form-search-city");
searchForm.addEventListener("submit", searchCity);

function firstUpper(city) {
  if (!city) return city;
  return city
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
}

// Weather start ---------------------------------
function startPage() {
let start = "Kyiv";
let apiKeyStart = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
let apiUrlStart = `https://api.openweathermap.org/data/2.5/weather?q=${start}&appid=${apiKeyStart}&units=metric`;
axios.get(apiUrlStart).then(showTemperature);
}
startPage()
getCurrentPosition()

// Show value----------------------------------------
function showTemperature(event) {
  let celsius = Math.round(event.data.main.temp);
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  temperatureValue(celsius);
  console.log(event.data);

  let h1City = document.querySelector("#city");
  h1City.innerHTML = event.data.name;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(event.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(event.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(event.data.wind.speed);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.innerHTML = event.data.weather[0].description;
}

function temperatureValue(newTemperature) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = newTemperature;
}

function unitValue(newUnitTemperature) {
  let unit = document.querySelector("#unit-temperature");
  unit.innerHTML = newUnitTemperature;
}

function changeUnitToFahrenheit() {
  unitValue("℉");
}
let unitTemperatureC = document.querySelector("#fahrenheit-link");
unitTemperatureC.addEventListener("click", changeUnitToFahrenheit);

function changeUnitToCelsius() {
  unitValue("℃");
}
let unitTemperatureF = document.querySelector("#celsius-link");
unitTemperatureF.addEventListener("click", changeUnitToCelsius);

// Geolocation------------------------------------------
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonMyLocation = document.querySelector("#btn-location");
buttonMyLocation.addEventListener("click", getCurrentPosition);