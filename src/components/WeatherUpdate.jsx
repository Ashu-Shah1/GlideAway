import React from "react";
import { Sun, Cloud, Thermometer } from "lucide-react";

const WeatherUpdate = () => {
  const weatherData = [
    { city: "Rishikesh", temperature: "28°C", condition: "Sunny with clear skies", icon: <Sun className="h-6 w-6" /> },
    { city: "Mussoorie", temperature: "18°C", condition: "Partly cloudy", icon: <Cloud className="h-6 w-6" /> },
    { city: "Nainital", temperature: "22°C", condition: "Pleasant weather", icon: <Thermometer className="h-6 w-6" /> },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white my-20">
      <h2 className="text-2xl font-semibold mb-6">Weather Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {weatherData.map((location, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">{location.city}</h3>
              {location.icon}
            </div>
            <div className="text-3xl font-bold mb-2">{location.temperature}</div>
            <p className="text-sm opacity-80">{location.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherUpdate;
