const temp = document.getElementById("temperature")
const fahr = document.getElementById("fahrenheit")
const cel = document.getElementById("celsius")
const lat = 40.7128
const long = -70.006
//New York as Default City
const clock = document.getElementById("time")
const local = document.getElementById("city")
const specific = document.getElementById("message")
let currentFrame = 0;
const animation = document.querySelector(".weather-animation");
const sunny = ["daytime1fixed.png", "daytime2.fixed", "daytime3.png"]
const night = ["nighttime1fixed.png", "nighttime2fixed.png", "nighttime3fixed.png"]
const rain = ["rain1.png", "rain2.png", "rain3.png"]
const snow = ["snow1.png", "snow2.png", "snow3.png"]

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



async function startApp() {
  const weatherData = await getWeather(lat,lon)
  const locationData = await getLocation(lat,lon)

  if (weatherData.current.is_day == 0 && weatherData.current.precipitation == 0) {

  }

}

function animate(sky) {
  animationDiv.style.backgroundImage = `weatherImages/${sky[currentFrame]}`
  currentFrame = (currentFrame + 1) % sky.length
}

setInterval(animate, 1500)

function weatherAnimation(weatherData) {
    const timeOfDay = weatherData.current.is_day
    const precip = weatherData.current.precipitation
    const rain = weatherData.current.rain
    const snow = weatherData.current.snowfall
    const dominant = weatherData.current.weather_code
    const currentTemp = weatherData.current.temperature_2m
    
    if (timeOfDay == 1 && precip == 0) {
        animate(sunny)
        specific.textContent = "Have A Good Day!"
    } else if (timeofDay == 0 && precip == 0) {
        animate(night)
        specific.textContent = "Sweet Dreams"
    } else if ((dominant >= 51 && dominant <= 67) || (dominant >=80 && dominant <= 82)) {
        animate(rain)
    } else if ((dominant >= 71 && dominant <= 77) || (dominant >= 85 && dominant <= 86)) {
        animate(snow)
    } else if (dominant >= 95 && dominant <= 99) {
        animate(rain)
    }
}

