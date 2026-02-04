const temp = document.getElementById("temperature")
const fahr = document.getElementById("fahrenheit")
const cel = document.getElementById("celsius")
const myspot = document.getElementById("location")
const defaultLat = 40.7128
const defaultLong = -74.006
//New York as Default City
const clock = document.getElementById("time")
const local = document.getElementById("city")
const specific = document.getElementById("message")
let currentFrame = 0;
const animation = document.querySelector('.weather-animation');
const sunny = ["daytime1fixed.png", "daytime2fixed.png", "daytime3fixed.png"]
const night = ["nighttime1fixed.png", "nighttime2fixed.png", "nighttime3fixed.png"]
const rain = ["rain1.png", "rain2.png", "rain3.png"]
const snow = ["snow1.png", "snow2.png", "snow3.png"]
let latestWeather = null;

async function getWeather(lat,lon) {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain,showers,snowfall,precipitation&timezone=auto&forecast_days=1&temperature_unit=fahrenheit&precipitation_unit=inch`
    const response = await fetch(weatherURL)
        const data = await response.json()
        console.log(data);
        console.log(data.current.is_day)

        return data
    }


async function getLocation(lat,lon) {
  const geoURL = `https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=iAbODmwJzSnSt05S18azYlV5nevGT0Qz&radius=10000`;
    const response = await fetch(geoURL)
    const data = await response.json();
    console.log(data)
    return data
  }

  function updateClock(timezone) {
    const now = new Date()
    const time = now.toLocaleString("en-US", {
      timeZone: timezone,
      hour: "numeric", 
      minute: "2-digit"
    });
    clock.textContent = time;
  }



async function startApp(lat, lon) {
  const weatherData = await getWeather(lat,lon)
  const locationData = await getLocation(lat,lon)
  latestWeather = weatherData

  local.textContent = locationData.addresses[0].address.municipality
  const tempy = weatherData.current.temperature_2m
  temp.textContent = tempy + "°F";
  weatherAnimation(weatherData)
  updateClock(weatherData.timezone)

}

function animate(sky) {
  animation.style.backgroundImage = `url('weatherImages/${sky[currentFrame]}')`;
    currentFrame = (currentFrame + 1) % sky.length;
}

function weatherAnimation(weatherData) {
    const timeOfDay = weatherData.current.is_day
    const precip = weatherData.current.precipitation
    const rain = weatherData.current.rain
    const snow = weatherData.current.snowfall
    const dominant = weatherData.current.weather_code
    
    if (timeOfDay == 1 && precip == 0) {
        sky = sunny
        specific.textContent = "Have A Good Day!"
    } else if (timeOfDay == 0 && precip == 0) {
        sky = night
        specific.textContent = "Sweet Dreams"
    } else if ((dominant >= 51 && dominant <= 67) || (dominant >=80 && dominant <= 82)) {
        sky = rain
        specific.textContent = "Stay Cozy! If you're out I recommend an umbrella."
    } else if ((dominant >= 71 && dominant <= 77) || (dominant >= 85 && dominant <= 86)) {
        sky = snow
        specific.textContent = "Hot chocolate would be great right now"
    } else if (dominant >= 95 && dominant <= 99) {
        sky = rain
        specific.textContent = "Laxus...? (Thunder skies. Be Safe!)"
    }
    if (sky) {
      setInterval(() => animate(sky), 1200);
    }
}

function convertToFahrenheit(weatherData) {
      currentTemp = weatherData.current.temperature_2m
      curentTemp = currentTemp.toFixed(1)
      temp.textContent = currentTemp + "°F";
  }

function convertToCelsius(weatherData) {
    currentTemp = (weatherData.current.temperature_2m - 32) * 5/9
    currentTemp = currentTemp.toFixed(1)
    temp.textContent = currentTemp + "°C";
}

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position) => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      startApp(lat,lon)
    }, () => {
      startApp(defaultLat, defaultLong);
    }
  );
  } else {
    startApp(defaultLat, defaultLong);
  }
}

fahr.addEventListener("click", () => convertToFahrenheit(latestWeather))
cel.addEventListener("click", () => convertToCelsius(latestWeather))
myspot.addEventListener("click", getCoords)


startApp(defaultLat, defaultLong)
setInterval(startApp, 1800000)


