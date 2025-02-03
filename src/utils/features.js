import { gsap } from "gsap";
export class Features {
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
  }
  updateTime(date) {
    const timeData = {
      now: new Date(date),
      hours: new Date(date).getHours().toString().padStart(2, "0"),
      minutes: new Date(date).getMinutes().toString().padStart(2, "0"),
      seconds: new Date(date).getSeconds().toString().padStart(2, "0"),
    };
    const [hoursSpan, minutesSpan, secondsSpan] = [
      this.timeContainer.querySelector("#hours"),
      this.timeContainer.querySelector("#minutes"),
      this.timeContainer.querySelector("#seconds"),
    ];
    if (hoursSpan.textContent !== timeData.hours) {
      hoursSpan.textContent = timeData.hours;
      gsap.from(hoursSpan, {
        duration: 0.5,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
    if (minutesSpan.textContent !== timeData.minutes) {
      minutesSpan.textContent = timeData.minutes;
      gsap.from(minutesSpan, {
        duration: 0.5,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
    if (secondsSpan.textContent !== timeData.seconds) {
      secondsSpan.textContent = timeData.seconds;
      gsap.from(secondsSpan, {
        duration: 0.5,
        scale: 0.7,
        opacity: 0,
        ease: "power2.inOut",
      });
    }
  }
  updateDate(date) {
    const dateData = {
      date: new Date(date).getDate(),
      month: new Date(date).getMonth(),
      year: new Date(date).getFullYear(),
    };
    if (
      this.date.textContent !==
      this.formatDate(dateData.date, dateData.month, dateData.year)
    ) {
      this.date.textContent = this.formatDate(
        dateData.date,
        dateData.month,
        dateData.year
      );

      // Create a more dynamic animation sequence
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
  formatDate(date, month, year) {
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(year, month, date));
  }
  getIcon(condition) {
    if (!condition) return;
    const iconData = this.weatherIcons.filter((data) =>
      data.conditions.includes(condition)
    );
    return iconData[0].icon;
  }
  getTimeZoneAndWeather({
    country = "India",
    timezone = "Asia/Kolkata",
    lat = 20.5937,
    lon = 78.9629,
    } = {}) {
    this.weather = {};
    const apiKey = "0ed5678bdae1980b5f19984f8f7b6aa1";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(url)
      .then((Response) => Response.json())
      .then((data) => {
        if (data) {
          const weather = {
            country: country,
            temperature: this.KelvinToCelsius(data.main.temp),
            condition: data.weather[0].main,
            description: data.weather[0].description,
            timeStamp: (data.dt) * 1000, //in milliseconds
          };
          this.updateDOM(weather);
        }
      })
      .catch((error) => console.log("Error:", error.message));
  }
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
  featureInput() {
    this.input.addEventListener("input", () => {
      this.SuggestionsContainer.innerHTML = "";
      this.label.classList.add("hidden");
      this.query = this.input.value.toLowerCase();
      this.showSuggestions(this.query);
      if (!this.input.value) {
        this.label.classList.remove("hidden");
      }
    });
  }
  showSuggestions(query) {
    const filterCountry = this.countries.filter((data) =>
      data.toLowerCase().includes(query)
    );
    filterCountry.forEach((suggestion) => {
      this.suggestionItem = document.createElement("div");
      this.suggestionItem.classList.add(
        "p-2",
        "cursor-pointer",
        "hover:bg-black/50",
        "w-full",
        "z-10"
      );
      this.suggestionItem.textContent = suggestion;
      this.suggestionItem.addEventListener("click", () => {
        this.input.value = suggestion;
        this.input.dispatchEvent(new Event("input"));
      });
      this.SuggestionsContainer.appendChild(this.suggestionItem);
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
  handleSearch() {
    let searchTimeout;
    this.input.addEventListener("input", (e) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      searchTimeout = setTimeout(async () => {
        if (e.target.value) {
          if (this.countries.includes(e.target.value)) {
            this.userInput = e.target.value;
            const requestedCountry = this.countryData.filter(
              (data) => data.country === this.userInput
            );
            if (Object.keys(requestedCountry[0]).length === 0) {
              console.log("Invalid weather Object:", requestedCountry[0]);
              return;
            }
            this.defaultTimer = false;
            this.getTimeZoneAndWeather(requestedCountry[0]);
          }
        }
      }, 1000);
    });
  }
  KelvinToCelsius(kelvin) {
    return Math.round(kelvin - 273.15) + "°C";
  }
  startTime(timestemp) {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
    let currentTimeStamp = timestemp;
    this.updateTime(currentTimeStamp);
    this.updateDate(currentTimeStamp);
    this.intervalID = setInterval(() => {
      currentTimeStamp += 1000;
      this.updateTime(currentTimeStamp);
      this.updateDate(currentTimeStamp);
    }, 1000);
  }
  init() {
    this.featureInput();
    this.handleSearch();
    if(this.defaultTimer) {
      this.getTimeZoneAndWeather({});
    }
  }
}
