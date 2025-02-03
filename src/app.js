import { EarthScene } from "./utils/earthScene.js";
import { gsap } from "gsap";
//Initialize the Earth Scene
const earthScene = new EarthScene("#canvas");
earthScene.init();

function onloadAnimation() {
  const search = document.querySelector("nav");
  gsap.from(search, {
    opacity: 0,
    y: -20,
    scale: 0.8,
    duration: 1,
  });
}
window.addEventListener("DOMContentLoaded", onloadAnimation);

class Weather {
  constructor() {
    this.timeContainer = document.getElementById("time-container");
    this.date = this.timeContainer.querySelector("#date");
    this.input = document.getElementById("country");
    this.label = document.querySelector("#search-container label");
    this.SuggestionsContainer = document.getElementById("suggestions");
    this.container = document.getElementById("search-container");
    this.intervalID = null;
    this.defaultTimer = true;
    this.temperatureContainer = document.getElementById("temperature");
    this.iconContainer = document.getElementById("weather-icon");
    this.countryContainer = document.getElementById("country-name");
    this.conditionContainer = document.getElementById("weather-condition");
    this.countryData = [
      {
        country: "India",
        timezone: "Asia/Kolkata",
        lat: 20.5937,
        lon: 78.9629,
      },
      {
        country: "United States",
        timezone: "America/New_York",
        lat: 40.7128,
        lon: -74.006,
      },
      {
        country: "United Kingdom",
        timezone: "Europe/London",
        lat: 51.5074,
        lon: -0.1278,
      },
      {
        country: "Australia",
        timezone: "Australia/Sydney",
        lat: -33.8688,
        lon: 151.2093,
      },
      {
        country: "Canada",
        timezone: "America/Toronto",
        lat: 43.65107,
        lon: -79.347015,
      },
      {
        country: "Germany",
        timezone: "Europe/Berlin",
        lat: 52.52,
        lon: 13.405,
      },
      {
        country: "France",
        timezone: "Europe/Paris",
        lat: 48.8566,
        lon: 2.3522,
      },
      { country: "Japan", timezone: "Asia/Tokyo", lat: 35.6895, lon: 139.6917 },
      {
        country: "Brazil",
        timezone: "America/Sao_Paulo",
        lat: -23.5505,
        lon: -46.6333,
      },
      {
        country: "South Africa",
        timezone: "Africa/Johannesburg",
        lat: -26.2041,
        lon: 28.0473,
      },
    ];
    this.weatherIcons = [
      {
        category: "Clear",
        conditions: ["clear sky"],
        icon: "ri-sun-fill",
      },
      {
        category: "Clouds",
        conditions: [
          "few clouds",
          "scattered clouds",
          "broken clouds",
          "overcast clouds",
        ],
        icon: "ri-cloudy-fill",
      },
      {
        category: "Rain",
        conditions: [
          "light rain",
          "moderate rain",
          "heavy intensity rain",
          "very heavy rain",
          "extreme rain",
        ],
        icon: "ri-rainy-fill",
      },
      {
        category: "Drizzle",
        conditions: [
          "light intensity drizzle",
          "drizzle",
          "heavy intensity drizzle",
          "light drizzle rain",
        ],
        icon: "ri-drizzle-fill",
      },
      {
        category: "Thunderstorm",
        conditions: [
          "thunderstorm",
          "thunderstorm with light rain",
          "thunderstorm with rain",
          "thunderstorm with heavy rain",
        ],
        icon: "ri-thunderstorms-fill",
      },
      {
        category: "Snow",
        conditions: [
          "light snow",
          "snow",
          "heavy snow",
          "sleet",
          "light shower sleet",
        ],
        icon: "ri-snowy-fill",
      },
      {
        category: "Fog/Mist",
        conditions: ["mist", "fog", "haze", "smoke"],
        icon: "ri-foggy-fill",
      },
      {
        category: "Sand/Dust",
        conditions: ["sand", "dust", "volcanic ash", "sand/ dust whirls"],
        icon: "ri-windy-fill",
      },
      {
        category: "Tornado",
        conditions: ["tornado", "squalls"],
        icon: "ri-tornado-fill",
      },
    ];
    this.countries = [];
    this.countryData.forEach((data) => this.countries.push(data.country));
    // Set default timezone base
    this.currentTimezone = "Asia/Kolkata";
  }
  updateTime(timestamp) {
    const timeStr = new Date(timestamp).toLocaleTimeString("en-US", {
      timeZone: this.currentTimezone,
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const [hours, minutes, seconds] = timeStr.split(":");
    const hoursSpan = this.timeContainer.querySelector("#hours");
    const minutesSpan = this.timeContainer.querySelector("#minutes");
    const secondsSpan = this.timeContainer.querySelector("#seconds");
    if (hoursSpan.textContent !== hours) {
      hoursSpan.textContent = hours;
      gsap.from(hoursSpan, {
        duration: 0.8,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
    if (minutesSpan.textContent !== minutes) {
      minutesSpan.textContent = minutes;
      gsap.from(minutesSpan, {
        duration: 0.8,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
    if (secondsSpan.textContent !== seconds) {
      secondsSpan.textContent = seconds;
      gsap.from(secondsSpan, {
        duration: 0.28,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
  }
  getDefaultCountryTime = async () => {
    await this.getTimeZoneAndWeather({});
  };
  updateDate(timestamp) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone: this.currentTimezone,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(timestamp));
    if (this.date.textContent !== formattedDate) {
      this.date.textContent = formattedDate;
      gsap
        .timeline()
        .from(this.date, {
          duration: 0.3,
          y: -20,
          opacity: 0,
          ease: "back.out(1.7)",
        })
        .to(this.date, {
          duration: 0.2,
          scale: 1.1,
          ease: "power2.out",
        })
        .to(this.date, {
          duration: 0.1,
          scale: 1,
          ease: "power2.in",
        });
    }
  }
  getIcon(condition) {
    if (!condition) return;
    const iconData = this.weatherIcons.filter((data) =>
      data.conditions.includes(condition)
    );
    return iconData.length ? iconData[0].icon : "ri-default-icon";
  }
  getTimeZoneAndWeather = async ({
    country = "India",
    timezone = "Asia/Kolkata",
    lat = 20.5937,
    lon = 78.9629,
  } = {}) => {
    // Update the current timezone base
    this.currentTimezone = timezone;
    const apiKey = "0ed5678bdae1980b5f19984f8f7b6aa1";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if ((data["cod"] === 200) & response.ok) {
        const weather = {
          country: country,
          temperature: this.KelvinToCelsius(data.main.temp),
          condition: data.weather[0].main,
          description: data.weather[0].description,
          timeStamp: data.dt * 1000, // in milliseconds
        };
        // updating DOM with timezone-based time
        this.updateDOM(weather);
      } else {
        throw new Error("Data not recieved:" + data["cod"]);
      }
    } catch (error) {
      console.log("No fetched:", error.message);
    }
  };
  updateDOM(weather) {
    this.countryContainer.textContent = weather.country;
    this.temperatureContainer.textContent = weather.temperature;
    this.conditionContainer.textContent = weather.description;
    this.iconContainer.className = this.getIcon(weather.description);
    this.startTime(weather.timeStamp);
    if (window.innerWidth >= 1024) {
      gsap.from("#weather-container", {
        x: -50,
        duration: 1,
      });
    }
  }
  handleSearch() {
    let searchTimeout;
    this.input.addEventListener("input", (e) => {
      this.SuggestionsContainer.innerHTML = "";
      this.label.classList.add("hidden");
      const query = this.input.value.toLowerCase();
      this.showSuggestions(query);
      if (!this.input.value) {
        this.label.classList.remove("hidden");
      }
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        if (e.target.value) {
          if (this.countries.includes(e.target.value)) {
            this.userInput = e.target.value;
            this.defaultTimer = false;
            const requestedCountry = this.countryData.filter(
              (data) => data.country === this.userInput
            );
            if (Object.keys(requestedCountry[0]).length === 0) {
              console.log("Invalid weather Object:", requestedCountry[0]);
              return;
            }
            await this.getTimeZoneAndWeather(requestedCountry[0]);
          }
        }
      }, 1000);
    });
  }
  showSuggestions(query) {
    const filterCountry = this.countries.filter((data) =>
      data.toLowerCase().includes(query)
    );
    filterCountry.forEach((suggestion) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add(
        "p-2",
        "cursor-pointer",
        "hover:bg-black/50",
        "w-full",
        "z-10"
      );
      suggestionItem.textContent = suggestion;
      suggestionItem.addEventListener("click", () => {
        this.input.value = suggestion;
        this.input.dispatchEvent(new Event("input"));
      });
      this.SuggestionsContainer.appendChild(suggestionItem);
    });
    document.addEventListener("click", (e) => {
      if (
        !this.SuggestionsContainer.contains(e.target) ||
        !this.container.contains(e.target)
      ) {
        this.SuggestionsContainer.innerHTML = "";
      }
    });
  }
  KelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15) + "°C";
  }
  startTime(timestamp) {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
    let currentTimeStamp = timestamp;
    this.updateTime(currentTimeStamp);
    this.updateDate(currentTimeStamp);
    this.intervalID = setInterval(() => {
      currentTimeStamp += 1000;
      this.updateTime(currentTimeStamp);
      this.updateDate(currentTimeStamp);
    }, 1000);
  }
  init() {
    this.handleSearch();
    if(this.defaultTimer) {
      this.getTimeZoneAndWeather({});
    }
  }
}

const app = new Weather();
app.init();