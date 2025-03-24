import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // For scroll animations
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
} from "react-icons/fa"; // Import icons from React Icons

const StateInfo = () => {
  const { district } = useParams();
  const [stateInfo, setStateInfo] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [weather, setWeather] = useState(null); // State for weather data
  const [weatherLoading, setWeatherLoading] = useState(true); // State for weather loading

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  // Fetch state info from the database
  useEffect(() => {
    async function fetchStateInfo() {
      try {
        const response = await axios.get(
          `http://localhost:3000/destination/${district}`
        );
        console.log(response.data);
        setStateInfo(response.data);
      } catch (error) {
        console.error("Error fetching destination info:", error);
      }
    }
    fetchStateInfo();
  }, [district]);

  // Fetch weather data from Weatherstack API
  useEffect(() => {
    if (stateInfo) {
      const apiKey = import.meta.env.VITE_WeatherApiKey;// Replace with your Weatherstack API key
      const cityName = stateInfo.districtName; // Use district name as the city name
      const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`;

      setWeatherLoading(true); // Start loading
      axios
        .get(weatherUrl)
        .then((response) => {
          const weatherData = response.data;
          console.log(weatherData)
          // Extract required fields from the Weatherstack response
          const weather = {
            main: {
              temp: weatherData.current.temperature,
              feels_like: weatherData.current.feelslike,
              humidity: weatherData.current.humidity,
              pressure: weatherData.current.pressure, // Added pressure
            },
            wind: {
              speed: weatherData.current.wind_speed,
            },
            weather: [
              {
                description: weatherData.current.weather_descriptions[0],
              },
            ],
            current: weatherData.current, // Include the entire current object
          };

          setWeather(weather); // Set weather state
          setWeatherLoading(false); // Stop loading
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setWeatherLoading(false); // Stop loading even if there's an error
        });
    }
  }, [stateInfo]);

  // Preload images once stateInfo is available
  useEffect(() => {
    if (stateInfo && stateInfo.images) {
      const preloadImages = stateInfo.images.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });

      // Check if all images are loaded
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

  // Handle image loading errors
  const handleImageError = () => {
    if (currentImageIndex < stateInfo.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      console.error('All images failed to load');
    }
  };

  // Function to get gradient based on weather condition
  const getWeatherGradient = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case "clear":
        return "from-yellow-400 to-orange-500"; // Sunny
      case "cloudy":
        return "from-gray-400 to-gray-600"; // Cloudy
      case "rain":
        return "from-blue-400 to-indigo-600"; // Rainy
      default:
        return "from-blue-500 to-purple-600"; // Default
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
        {/* District Name */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-800"
        >
          {stateInfo.districtName}
        </motion.h1>

        {/* District Info */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600"
        >
          {stateInfo.info}
        </motion.p>

        {/* Key Attractions */}
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

        {/* Local Culture */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">🎭 Local Culture</h2>
          <p className="text-gray-600">{stateInfo.localCulture}</p>
        </motion.div>

        {/* Popular Treks */}
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
                    <FaMapMarkerAlt className="mr-2 text-blue-500" /> {/* Location Icon */}
                    {trek.location}
                  </p>
                  <p className="flex items-center">
                    <FaSun className="mr-2 text-yellow-500" /> {/* Best Season Icon */}
                    {trek.bestSeason}
                  </p>
                  <p className="flex items-center">
                    <FaHiking className="mr-2 text-green-500" /> {/* Difficulty Level Icon */}
                    {trek.difficultyLevel}
                  </p>
                  <p className="flex items-center">
                    <FaRoad className="mr-2 text-gray-500" /> {/* Distance Icon */}
                    {trek.distance} km
                  </p>
                  <p className="flex items-center">
                    <FaMountain className="mr-2 text-brown-500" /> {/* Altitude Icon */}
                    {trek.altitude} meters
                  </p>
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-purple-500" /> {/* Trek Duration Icon */}
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
        {/* Image */}
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`bg-gradient-to-br ${getWeatherGradient(weather?.weather[0]?.description || "default")} rounded-xl p-6 shadow-lg text-white`}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <FaCloudSun className="mr-2" /> Weather in {stateInfo.districtName}
          </h2>
          {weatherLoading ? (
            <div className="flex items-center justify-center h-32">
              <FaSpinner className="animate-spin text-2xl" />
            </div>
          ) : (
            weather && (
              <div className="space-y-4">
                {/* Current Weather */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center justify-between"
                >
                  <p className="text-4xl font-bold">{weather.main.temp}°C</p>
                  <p className="text-lg capitalize">{weather.weather[0].description}</p>
                </motion.div>

                {/* Weather Details Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {/* Feels Like */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaTemperatureHigh className="mr-2" />
                      <p>Feels like {weather.main.feels_like}°C</p>
                    </div>
                  </motion.div>

                  {/* Humidity */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaTint className="mr-2" />
                      <p>Humidity: {weather.main.humidity}%</p>
                    </div>
                  </motion.div>

                  {/* Wind Speed */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaWind className="mr-2" />
                      <p>Wind: {weather.wind.speed} m/s</p>
                    </div>
                  </motion.div>

                  {/* Pressure */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaSun className="mr-2" />
                      <p>Pressure: {weather.main.pressure} hPa</p>
                    </div>
                  </motion.div>

                  {/* Sunrise */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaSun className="mr-2" />
                      <p>Sunrise: {weather.current?.astro?.sunrise || "N/A"}</p>
                    </div>
                  </motion.div>

                  {/* Sunset */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white bg-opacity-10 p-4 rounded-lg"
                  >
                    <div className="flex items-center">
                      <FaSun className="mr-2" />
                      <p>Sunset: {weather.current?.astro?.sunset || "N/A"}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )
          )}
        </motion.div>

        {/* Travel Tips */}
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

        {/* How to Reach */}
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