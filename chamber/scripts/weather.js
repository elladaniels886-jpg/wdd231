

const API_KEY = "81ea315ef83ac9fc03c218e6036c22ae";
const LAT = 5.532;
const LON = 7.486;

// API URLs
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;


// GET CURRENT WEATHER
async function getCurrentWeather() {
    try {
        const response = await fetch(WEATHER_URL);

        if (!response.ok) {
            throw new Error("Weather data could not be retrieved.");
        }

        const data = await response.json();

        // Display current temperature
        document.querySelector("#current-temp").textContent =
            `${Math.round(data.main.temp)}°C`;

        // Display weather description
        document.querySelector("#weather-description").textContent =
            data.weather[0].description;

        // Display weather icon
        const icon = document.querySelector("#weather-icon");

        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        icon.alt = data.weather[0].description;

    } catch (error) {
        console.error("Weather error:", error);
    }
}


// GET THREE-DAY FORECAST
async function getForecast() {
    try {
        const response = await fetch(FORECAST_URL);

        if (!response.ok) {
            throw new Error("Forecast data could not be retrieved.");
        }

        const data = await response.json();

        // Select one forecast for each of the next three days
        const dailyForecasts = data.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 3);

        // Find the forecast container
        const forecastContainer =
            document.querySelector("#forecast-container");

        // Check that the container exists
        if (!forecastContainer) {
            throw new Error("Forecast container was not found in the HTML.");
        }

        // Clear the loading message
        forecastContainer.innerHTML = "";

        // Create a card for each forecast day
        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt);

            const dayName = date.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const temperature = Math.round(day.main.temp);
            const description = day.weather[0].description;
            const weatherIcon = day.weather[0].icon;

            const forecastCard = document.createElement("div");
            forecastCard.classList.add("forecast-day");

            forecastCard.innerHTML = `
                <h4>${dayName}</h4>
             <img
                src="https://openweathermap.org/img/wn/${weatherIcon}.png"
                alt="${description}"
                width="50"
                height="50"
                loading="lazy"
             >
                <p>${temperature}°C</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(forecastCard);
        });

        if (dailyForecasts.length === 0) {
            forecastContainer.textContent =
                "Forecast information is currently unavailable.";
        }

    } catch (error) {
        console.error("Forecast error:", error);
    }
}


// RUN BOTH FUNCTIONS
getCurrentWeather();
getForecast();