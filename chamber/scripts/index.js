document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const weatherInfo = document.getElementById("weather-info");
const forecastContainer = document.getElementById("forecast");
const spotlightContainer = document.getElementById("spotlight-container");

const apiKey = "28c4b5a5262be4a215c0eb0bf675f68a";
const city = "Lagos";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();

    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    weatherInfo.innerHTML = `
            <div class="current-weather">
              <img src="${icon}" alt="${desc}" />
              <p><strong>${temp}°C</strong> - ${desc}</p>
              <p>Humidity: ${data.main.humidity}%</p>
            </div>
          `;
  } catch (error) {
    console.error("Weather error:", error);
    weatherInfo.innerHTML =
      "<p>Unable to load weather data. Please try again later.</p>";
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.status}`);
    }
    const data = await response.json();

    const forecastDays = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "short" });

      if (date.getHours() === 12 && !forecastDays[day]) {
        forecastDays[day] = Math.round(item.main.temp);
      }
    });

    const days = Object.entries(forecastDays).slice(0, 3);
    forecastContainer.innerHTML =
      "<h3>3-Day Forecast</h3>" +
      days
        .map(([day, temp]) => `<p>${day}: <strong>${temp}°C</strong></p>`)
        .join("");
  } catch (error) {
    console.error("Forecast error:", error);
    forecastContainer.innerHTML = "<p>Unable to load forecast data.</p>";
  }
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error(`Members JSON error: ${response.status}`);
    }
    const members = await response.json();

    const goldSilver = members.filter(
      (m) => m.membership === 3 || m.membership === 2
    );

    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    if (selected.length === 0) {
      spotlightContainer.innerHTML = "<p>No spotlight members available.</p>";
      return;
    }

    const membershipNames = {
      1: "NP Member",
      2: "Silver Member",
      3: "Gold Member",
    };

    spotlightContainer.innerHTML = selected
      .map(
        (member) => `
              <div class="spotlight-card">
                <img src="${member.image}" alt="${
          member.name
        } logo" loading="lazy" />
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="level">${
                  membershipNames[member.membership] || "Member"
                }</p>
              </div>`
      )
      .join("");
  } catch (error) {
    console.error("Spotlights error:", error);
    spotlightContainer.innerHTML =
      "<p>Unable to load business spotlights. Please check the console for details.</p>";
  }
}

getWeather();
getForecast();
getSpotlights();
