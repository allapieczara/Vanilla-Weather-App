let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let monthDay = now.getDate();
let time = now.getHours() + ":" + now.getMinutes();

// FUNCTION FOR TODAY'S DATE
function todaysDate() {
  let dateToChange = document.querySelector("#today-date");
  dateToChange.innerHTML = `${today} ${time}`;
}
todaysDate();

// FORECAST

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let daysForecast = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row">`;

  daysForecast.forEach(function (day) {
    forecastHTML = `${forecastHTML} 
        <div class="col">
                <div class="weather-forecast-date">${day}</div>
                <img src="src/icons/clear-sky.svg" alt="sunny day icon" />

                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">24°</span>
                  <span class="weather-forecast-temp-min">16°</span>
                </div>
        </div>
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//////////////////////////////////
// API FOR CURRENT LOCATION WEATHER

// CHANGE CITY AND TEMPERATURE TO CURRENT LOCATION'S ONE

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let currentDescription = document.querySelector("#description");
  let currentTemp = document.querySelector("#current-temp");
  let cityChange = document.querySelector("#current-city");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let icon = document.querySelector("#current-icon");

  celciusTemp = response.data.main.temp;

  currentDescription.innerHTML = description;
  currentTemp.innerHTML = temperature;
  cityChange.innerHTML = city;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;

  // CHANGE ICON ACCORDING TO DESCRIPTION

  if (description == "clear sky") {
    icon.setAttribute("src", "src/icons/clear-sky.svg");
  } else if (description == "few clouds") {
    icon.setAttribute("src", "src/icons/few-clouds.svg");
  } else if (description == "scattered clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "broken clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "shower rain") {
    icon.setAttribute("src", "src/icons/shower-rain.svg");
  } else if (description == "rain") {
    icon.setAttribute("src", "src/icons/rain.svg");
  } else if (description == "thunderstorm") {
    icon.setAttribute("src", "src/icons/thunderstorm.svg");
  } else if (description == "snow") {
    icon.setAttribute("src", "src/icons/snow.svg");
  } else if (description == "mist") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "overcast clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "drizzle") {
    icon.setAttribute("src", "src/icons/rain.svg");
  } else if (description == "light snow") {
    icon.setAttribute("src", "src/icons/light-snow.svg");
  } else if (description == "heavy snow") {
    icon.setAttribute("src", "src/icons/heavy-snow.svg");
  }

  getForecast(response.data.coord);
}
// CALCULATE CURRENT LOCATION - API

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let metric = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}${metric}`;

  axios.get(apiUrl).then(showTemperature);
}

// CURRENT GEOLOCATION

function geolocator(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", geolocator);

// CHANGE CITY AND TEMPERATURE TO SEARCHED ONE
function showTemperatureCity(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  let currentDescription = document.querySelector("#description");
  let currentTemp = document.querySelector("#current-temp");
  let cityChange = document.querySelector("#current-city");
  let humidity = document.querySelector("#humidity");
  let icon = document.querySelector("#current-icon");

  celciusTemp = response.data.main.temp;

  currentDescription.innerHTML = description;
  currentTemp.innerHTML = temperature;
  cityChange.innerHTML = city;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;

  // CHANGE ICON ACCORDING TO DESCRIPTION
  if (description == "clear sky") {
    icon.setAttribute("src", "src/icons/clear-sky.svg");
  } else if (description == "few clouds") {
    icon.setAttribute("src", "src/icons/few-clouds.svg");
  } else if (description == "scattered clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "broken clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "shower rain") {
    icon.setAttribute("src", "src/icons/shower-rain.svg");
  } else if (description == "rain") {
    icon.setAttribute("src", "src/icons/rain.svg");
  } else if (description == "thunderstorm") {
    icon.setAttribute("src", "src/icons/thunderstorm.svg");
  } else if (description == "snow") {
    icon.setAttribute("src", "src/icons/snow.svg");
  } else if (description == "mist") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "overcast clouds") {
    icon.setAttribute("src", "src/icons/scattered-clouds.svg");
  } else if (description == "drizzle") {
    icon.setAttribute("src", "src/icons/rain.svg");
  } else if (description == "light snow") {
    icon.setAttribute("src", "src/icons/light-snow.svg");
  } else if (description == "heavy snow") {
    icon.setAttribute("src", "src/icons/heavy-snow.svg");
  }
  getForecast(response.data.coord);
}

// FIND CURRENT CITY WEATHER - API
function citySearched(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");
  let cityName = input.value;
  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let metric = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}${metric}`;

  axios.get(apiUrl).then(showTemperatureCity);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", citySearched);

// SEARCH FUNCTION FOR CITY PLACEHOLDER
function search(city) {
  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let metric = "&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${metric}`;

  axios.get(apiUrl).then(showTemperatureCity);
}

search("Tokyo");

/////////////////////////////
// TEMPERATURE CONVERSION CELCIUS TO FAHRENHEIT

let celciusTemp = null;

function changeToFahrenheit(event) {
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let currentTemp = document.querySelector("#current-temp");
  // REMOVE THE ACTIVE CLASS FROM THE CELCIUS LINK
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

/////////////////////////////
// TEMPERATURE CONVERSION FAHRENHEIT TO CELCIUS

function changeToCelcius(event) {
  let currentTemp = document.querySelector("#current-temp");
  // REMOVE THE ACTIVE CLASS FROM THE FAHRENHEIT LINK
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
  currentTemp.innerHTML = Math.round(celciusTemp);
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeToCelcius);
