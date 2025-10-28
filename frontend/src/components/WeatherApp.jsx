import React from "react";
import "../style/WeatherApp.css";
import useWeather from "../hooks/useWeather";

const WeatherApp = () => {
  const {
    city,
    setCity,
    weather,
    loading,
    error,
    fetchWeather,
    handleKeyPress,
    pin,
    togglePin,
    removePin,
  } = useWeather();

  return (
    <div className="weather-bg">
      <div className="weather-container">
        <h1 className="weather-title">🌤️ Weather Proxy App</h1>

        {/* Input */}
        <input
          className="city-input"
          placeholder="Enter city (e.g., London, Tokyo)..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        {/* Single Pinned City */}
        {pin && (
          <div className="pinned-list single">
            <div className="pin-compact tooltip">
              <div>
                📌 {pin.city}, {pin.country} — {Math.round(pin.temp)}°C
              </div>
              <button className="remove-pin" onClick={removePin}>
                ✖
              </button>

              {/* Tooltip Details */}
              <div className="tooltip-content">
                <div>Condition: {pin.data.weather?.[0]?.description}</div>
                <div>Feels like: {Math.round(pin.data.main.feels_like)}°C</div>
                <div>Humidity: {pin.data.main.humidity}%</div>
                <div>Wind: {pin.data.wind.speed} m/s</div>
                <div>
                  Sunrise:{" "}
                  {new Date(pin.data.sys.sunrise * 1000).toLocaleTimeString()}
                </div>
                <div>
                  Sunset:{" "}
                  {new Date(pin.data.sys.sunset * 1000).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && <div className="error-box">{error}</div>}

        {/* Weather Display */}
        {weather && !loading && (
          <div className="weather-card">
            <h2>
              📍 {weather.name}, {weather.sys?.country}
            </h2>
            <h1>{Math.round(weather.main?.temp)}°C</h1>
            <p className="desc">{weather.weather?.[0]?.description}</p>

            <div className="info-grid">
              <div>🌡️ Feels Like: {Math.round(weather.main.feels_like)}°C</div>
              <div>💧 Humidity: {weather.main.humidity}%</div>
              <div>💨 Wind: {weather.wind.speed} m/s</div>
              <div>☁️ Clouds: {weather.clouds.all}%</div>
            </div>

            <button className="pin-btn" onClick={() => togglePin(weather)}>
              {pin && pin.city === weather.name ? "📍 Unpin" : "📌 Pin"}
            </button>

            <div className="sunrise-sunset">
              <div>
                🌅{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </div>
              <div>
                🌇{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!weather && !loading && !error && (
          <div className="welcome-box">
            <p className="globe">🌍</p>
            <h2>Welcome to Weather App!</h2>
            <p>Enter a city name above to see real-time weather.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
