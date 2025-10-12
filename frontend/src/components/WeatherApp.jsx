import React, { useState } from "react";
import "./WeatherApp.css"; // external CSS for clean styling

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const API_KEY = "f33a484cf794d08d0148764789aaba32";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="weather-bg">
      <div className="weather-container">
        <h1 className="weather-title">🌤️ Weather Proxy App</h1>

        <div className="search-section">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter city name (e.g., London, Tokyo, Manila)..."
            className="city-input"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="search-btn"
          >
            {loading ? "⏳ Loading..." : "🔍"}
          </button>
        </div>

        {error && <div className="error-box">⚠️ {error}</div>}

        {weather && !loading && (
          <div className="weather-card">
            <h2>
              📍 {weather.name}, {weather.sys?.country}
            </h2>
            <h1>{Math.round(weather.main?.temp)}°C</h1>
            <p className="desc">{weather.weather?.[0]?.description}</p>

            <div className="info-grid">
              <div>🌡️ Feels Like: {Math.round(weather.main?.feels_like)}°C</div>
              <div>💧 Humidity: {weather.main?.humidity}%</div>
              <div>💨 Wind: {weather.wind?.speed} m/s</div>
              <div>☁️ Clouds: {weather.clouds?.all}%</div>
            </div>

            <div className="sunrise-sunset">
              <div>
                🌅 Sunrise:{" "}
                {new Date(weather.sys?.sunrise * 1000).toLocaleTimeString()}
              </div>
              <div>
                🌇 Sunset:{" "}
                {new Date(weather.sys?.sunset * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="welcome-box">
            <p>🌍</p>
            <h2>Welcome to Weather App!</h2>
            <p>Enter a city name above to see real-time weather data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
