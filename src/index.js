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

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[day];
}

// FORECAST--------------------------------------
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row weather-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6){
    forecastHTML = forecastHTML + `
      <div class="col-sm-2">
        <div class="card">
          <div class="card-body">
            <h5 class="weather-forecast-date">${formatDayForecast(forecastDay.dt)}</h5>
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" id="weather-forecast-icon">
            <p class="weather-forecast-temperatures">
              <span class="weather-forecast-temperatures-max">${Math.round(forecastDay.temp.max)}°</span>
              <span class="weather-forecast-temperatures-min">${Math.round(forecastDay.temp.min)}°</span>
            </p>
          </div>
        </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
let apiKeyForecast = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=metric`;
axios.get(apiUrlForecast).then(displayForecast);
}

// FORM-------------------------------------------
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#inputCity");
  searchInput.value = firstUpper(searchInput.value.trim());

  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  if (searchInput.value) {
  } else {
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
let celsius = null;
let fahrenheit = null;

function showTemperature(event) {
  celsius = Math.round(event.data.main.temp);
  fahrenheit = Math.round(celsius * 1.8 + 32);
  temperatureValue(celsius);
  unitValue("℃");
  // console.log(event.data);

  let h1City = document.querySelector("#city");
  h1City.innerHTML = event.data.name;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(event.data.main.feels_like);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(event.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(event.data.wind.speed);

  document.getElementById("weather-icon").src=`http://openweathermap.org/img/wn/${event.data.weather[0].icon}@2x.png`;
  let iconLeft = document.querySelector("#weather-icon");
  iconLeft.setAttribute("alt", event.data.weather[0].description);

  let weatherIcon = document.querySelector("#weather-text");
  weatherIcon.innerHTML = event.data.weather[0].description;

  getForecast(event.data.coord)
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
  temperatureValue(fahrenheit);
  unitTemperatureC.classList.remove("active");
  unitTemperatureF.classList.add("active");
}
let unitTemperatureF = document.querySelector("#fahrenheit-link");
unitTemperatureF.addEventListener("click", changeUnitToFahrenheit);

function changeUnitToCelsius() {
  unitValue("℃");
  temperatureValue(celsius);
  unitTemperatureC.classList.add("active");
  unitTemperatureF.classList.remove("active");
}
let unitTemperatureC = document.querySelector("#celsius-link");
unitTemperatureC.addEventListener("click", changeUnitToCelsius);

// Geolocation------------------------------------------
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonMyLocation = document.querySelector("#btn-location");
buttonMyLocation.addEventListener("click", getCurrentPosition);
