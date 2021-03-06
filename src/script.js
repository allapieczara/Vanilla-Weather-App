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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekDays[day];
}

// FORECAST

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (dayForecast, index) {
    if (index < 5) {
      let description = dayForecast.weather[0].description;
      let dailyIcon = "";
      if (description == "clear sky") {
        dailyIcon = "clear-sky.svg";
      } else if (description == "few clouds") {
        dailyIcon = "few-clouds.svg";
      } else if (description == "scattered clouds") {
        dailyIcon = "scattered-clouds.svg";
      } else if (description == "broken clouds") {
        dailyIcon = "scattered-clouds.svg";
      } else if (description == "shower rain") {
        dailyIcon = "shower-rain.svg";
      } else if (description == "rain") {
        dailyIcon = "rain.svg";
      } else if (description == "thunderstorm") {
        dailyIcon = "thunderstorm.svg";
      } else if (description == "snow") {
        dailyIcon = "snow.svg";
      } else if (description == "mist") {
        dailyIcon = "scattered-clouds.svg";
      } else if (description == "overcast clouds") {
        dailyIcon = "scattered-clouds.svg";
      } else if (description == "drizzle") {
        dailyIcon = "rain.svg";
      } else if (description == "light snow") {
        dailyIcon = "light-snow.svg";
      } else if (description == "heavy snow") {
        dailyIcon = "heavy-snow.svg";
      } else if (description == "light rain") {
        dailyIcon = "light-rain.svg";
      }
      forecastHTML = `${forecastHTML} 
        <div class="col">
                <div class="weather-forecast-date">${formatDay(
                  dayForecast.dt
                )}</div>
                <img src="src/icons/${dailyIcon}" alt="${
        dayForecast.weather[0].description
      }" />

                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">${Math.round(
                    dayForecast.temp.max
                  )}??</span>
                  <span class="weather-forecast-temp-min">${Math.round(
                    dayForecast.temp.min
                  )}??</span>
                </div>
        </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b015cb71b14a6b0a5f7551a9ef540747";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

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
  } else if (description == "light rain") {
    icon.setAttribute("src", "src/icons/light-rain.svg");
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
  } else if (description == "light rain") {
    icon.setAttribute("src", "src/icons/light-rain.svg");
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
