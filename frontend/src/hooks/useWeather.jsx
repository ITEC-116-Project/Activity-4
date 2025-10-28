import { useState, useEffect, useRef } from "react";

const useWeather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState(null); // single pinned city
  const debounce = useRef();

  const fetchWeather = async (q) => {
    const url = `http://localhost:3000/api/weather?city=${encodeURIComponent(q)}`;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setWeather(data);
    } catch {
      setError("⚠️ Failed to fetch weather data. Try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    if (!city.trim()) return setWeather(null);

    debounce.current = setTimeout(() => fetchWeather(city), 500);
    return () => clearTimeout(debounce.current);
  }, [city]);

  const handleKeyPress = (e) => e.key === "Enter" && fetchWeather(city);

  const togglePin = (item) => {
    if (pin && pin.city.toLowerCase() === item.name.toLowerCase()) {
      setPin(null); // Unpin if same city
    } else {
      setPin({
        city: item.name,
        country: item.sys.country,
        temp: item.main.temp,
        data: item,
      });
    }
  };

  const removePin = () => setPin(null);

  return {
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
  };
};

export default useWeather;
