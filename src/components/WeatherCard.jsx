import React, { useEffect, useState } from "react";
import coldImg from "../assets/cold.png";
import mildImg from "../assets/mild.png";
import sunnyImg from "../assets/sunny.png";



function selectIconForTempC(tempC) {
  if (tempC <= 10) return coldImg;
  if (tempC <= 19) return mildImg;
  return sunnyImg;
}

export default function WeatherCard({ city = "Halifax,CA" }) {
  const [tempC, setTempC] = useState(null); 
  const [isCelsius, setIsCelsius] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const key = import.meta.env.VITE_OPENWEATHER_KEY;
        if (!key) {
          throw new Error("Missing OpenWeatherMap API key. Add VITE_OPENWEATHER_KEY to .env");
        }
       
        const resp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
        );
        if (!resp.ok) {
          throw new Error(`Weather fetch failed: ${resp.statusText}`);
        }
        const data = await resp.json();
        
        if (data && data.main && typeof data.main.temp === "number") {
          setTempC(Number(data.main.temp.toFixed(1)));
        } else {
          throw new Error("Unexpected weather data");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  function toggleUnit() {
    setIsCelsius((v) => !v);
  }

  function displayedTemp() {
    if (tempC == null) return "--";
    if (isCelsius) return `${tempC} °C`;
   
    const f = (tempC * 9) / 5 + 32;
    return `${f.toFixed(1)} °F`;
  }

  const icon = tempC != null ? selectIconForTempC(tempC) : null;

  return (
    <div className="weather-card">
      {loading ? (
        <div>Loading weather…</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="weather-top">
            {icon && <img src={icon} alt="weather icon" className="weather-icon" />}
            <div className="temp-block">
              <div className="big-temp">{displayedTemp()}</div>
              <div className="small-muted">Current temperature in {city.split(",")[0]}</div>
            </div>
          </div>

          <div className="controls">
            <button onClick={toggleUnit} className="btn">
              Change to {isCelsius ? "°F" : "°C"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
