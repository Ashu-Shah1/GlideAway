import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sun, Cloud, Thermometer, Search } from "lucide-react";

const WeatherUpdate = () => {
  const [city, setCity] = useState("Nainital"); // Default city
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null); // Reset previous errors

    try {
      const options = {
        method: "GET",
        url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
        headers: {
          "X-RapidAPI-Key": "ae9193dcdbmshc9210bbf718d20bp15bce1jsn9333e4d06720", // Use environment variable
          "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      if (response.data) {
        setWeather(response.data);
      } else {
        setError("No weather data available");
      }
    } catch (err) {
      setError("Failed to fetch weather. Please try again.");
      console.error("Error fetching weather:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white h-[450px] w-full md:w-1/2 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Weather Updates</h2>
      
      {/* Search Bar */}
      <div className="flex items-center justify-center mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          className="p-2 rounded-l-md text-black outline-none"
        />
        <button 
          onClick={handleSearch}
          className="bg-white text-blue-600 px-4 py-2 rounded-r-md flex items-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center">Fetching weather...</p>}

      {/* Error Handling */}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Weather Details */}
      {!loading && weather && weather.main && weather.weather && (
        <div className="text-center">
          <h3 className="text-xl font-medium">{weather.name}</h3>
          <p className="text-3xl font-bold">{weather.main.temp}°C</p>
          <p className="opacity-80">{weather.weather[0].description}</p>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <Thermometer className="w-6 h-6 mr-1" />
              <span>{weather.main.feels_like}°C Feels Like</span>
            </div>
            <div className="flex items-center">
              {weather.weather[0].main === "Clear" ? <Sun className="w-6 h-6" /> : <Cloud className="w-6 h-6" />}
              <span>{weather.weather[0].main}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherUpdate;
