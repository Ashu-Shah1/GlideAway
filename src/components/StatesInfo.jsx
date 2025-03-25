import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaMapMarkerAlt,
  FaSun,
  FaMountain,
  FaHiking,
  FaRoad,
  FaClock,
  FaTemperatureHigh,
  FaTint,
  FaWind,
  FaCloudSun,
  FaSpinner,
} from "react-icons/fa";

const StateInfo = () => {
  const { district } = useParams();
  const [stateInfo, setStateInfo] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Fetch state info
  useEffect(() => {
    async function fetchStateInfo() {
      try {
        const response = await axios.get(
          `http://localhost:3000/destination/${district}`
        );
        setStateInfo(response.data);
      } catch (error) {
        console.error("Error fetching destination info:", error);
      }
    }
    fetchStateInfo();
  }, [district]);

  // Fetch weather data from WeatherAPI.com
  useEffect(() => {
    if (stateInfo) {
      const apiKey = import.meta.env.VITE_WeatherApiKey;
      const cityName = stateInfo.districtName;
      const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

      setWeatherLoading(true);
      axios
        .get(weatherUrl)
        .then((response) => {
          const weatherData = response.data;
          const weather = {
            main: {
              temp: weatherData.current.temp_c,
              feels_like: weatherData.current.feelslike_c,
              humidity: weatherData.current.humidity,
              pressure: weatherData.current.pressure_mb,
            },
            wind: {
              speed: weatherData.current.wind_kph,
            },
            weather: [
              {
                description: weatherData.current.condition.text,
                icon: weatherData.current.condition.icon,
              },
            ],
          };
          setWeather(weather);
        })
        .catch((error) => {
          console.error("WeatherAPI Error:", error);
          setWeather(null);
        })
        .finally(() => setWeatherLoading(false));
    }
  }, [stateInfo]);

  // Preload images
  useEffect(() => {
    if (stateInfo && stateInfo.images) {
      const preloadImages = stateInfo.images.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });

      Promise.all(
        preloadImages.map(
          (img) =>
            new Promise((resolve) => {
              img.onload = resolve;
            })
        )
      ).then(() => setIsLoading(false));
    }
  }, [stateInfo]);

  const handleImageError = () => {
    if (currentImageIndex < stateInfo.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      console.error("All images failed to load");
    }
  };

  if (!stateInfo || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLottieReact
          src="https://lottie.host/bf75856a-65b5-46ff-adf9-cf5614a99fef/D06XLP2bvs.lottie"
          speed={2}
          loop
          autoplay
          style={{ width: "200px", height: "200px" }}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 font-poppins">
      {/* Left Column */}
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800"
        >
          {stateInfo.districtName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          {stateInfo.info}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">🌟 Key Attractions</h2>
          <ul className="space-y-2">
            {stateInfo.keyAttractions.map((attraction) => (
              <li key={attraction} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {attraction}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">🎭 Local Culture</h2>
          <p className="text-gray-600">{stateInfo.localCulture}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">🏔️ Popular Treks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stateInfo.treks.map((trek) => (
              <motion.div
                key={trek.trekName}
                whileHover={{ scale: 1.05 }}
                className="border p-4 rounded-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold">{trek.trekName}</h3>
                <div className="text-gray-600 space-y-2">
                  <p className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {trek.location}
                  </p>
                  <p className="flex items-center">
                    <FaSun className="mr-2 text-yellow-500" />
                    {trek.bestSeason}
                  </p>
                  <p className="flex items-center">
                    <FaHiking className="mr-2 text-green-500" />
                    {trek.difficultyLevel}
                  </p>
                  <p className="flex items-center">
                    <FaRoad className="mr-2 text-gray-500" />
                    {trek.distance} km
                  </p>
                  <p className="flex items-center">
                    <FaMountain className="mr-2 text-brown-500" />
                    {trek.altitude} meters
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-purple-500" />
                    {trek.trekDuration}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          src={stateInfo.images[currentImageIndex]}
          alt={stateInfo.state}
          onError={handleImageError}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />

        {/* Weather Section */}
        {/* Weather Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 shadow-lg text-white"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCloudSun className="mr-2 text-blue-100" /> Weather in{" "}
            {stateInfo.districtName}
          </h2>

          {weatherLoading ? (
            <div className="flex items-center justify-center h-32">
              <FaSpinner className="animate-spin text-2xl text-blue-100" />
            </div>
          ) : weather ? (
            <div className="space-y-4">
              {/* Current Weather with Icon */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={`https:${weather.weather[0].icon}`}
                    alt={weather.weather[0].description}
                    className="w-16 h-16"
                  />
                  <p className="text-4xl font-bold ml-2">
                    {weather.main.temp}°C
                  </p>
                </div>
                <p className="text-lg capitalize text-blue-100">
                  {weather.weather[0].description}
                </p>
              </motion.div>

              {/* Weather Details Grid - 2x2 layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {/* Feels Like */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-400 bg-opacity-20 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaTemperatureHigh className="mr-2 text-blue-100" />
                    <p>Feels like {weather.main.feels_like}°C</p>
                  </div>
                </motion.div>

                {/* Humidity */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-400 bg-opacity-20 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaTint className="mr-2 text-blue-100" />
                    <p>Humidity: {weather.main.humidity}%</p>
                  </div>
                </motion.div>

                {/* Wind Speed */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-400 bg-opacity-20 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaWind className="mr-2 text-blue-100" />
                    <p>Wind: {weather.wind.speed} km/h</p>
                  </div>
                </motion.div>

                {/* Pressure */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-blue-400 bg-opacity-20 p-4 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center">
                    <FaSun className="mr-2 text-blue-100" />
                    <p>Pressure: {weather.main.pressure} mb</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center py-8 text-blue-100">
              Weather data not available
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">✈️ Travel Tips</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Best time to visit: March to June</li>
            <li>Carry warm clothes as temperatures can drop</li>
            <li>Respect local customs and traditions</li>
            <li>Book accommodations in advance during peak season</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">🚗 How to Reach</h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <strong>By Train:</strong> {stateInfo.howToReach.byTrain}
            </li>
            <li>
              <strong>By Air:</strong> {stateInfo.howToReach.byAir}
            </li>
            <li>
              <strong>By Road:</strong> {stateInfo.howToReach.byRoad}
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default StateInfo;
