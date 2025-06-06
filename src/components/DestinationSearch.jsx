import { useState } from "react";
import { Calendar, Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const districts = [
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital",
  "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
];

const DestinationSearch = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (destination) {
      navigate(`/destination/${destination}`);
    } else {
      alert();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 -mt-24 relative z-10 mx-4 lg:mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="relative">
          <label className="block text-m font-bold text-gray-700 mb-1">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              aria-label="Select destination"
            >
              <option value="">Select a destination</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-m font-bold text-gray-700 mb-1">Dates</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select travel date"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-m font-bold text-gray-700 mb-1">Travelers</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              aria-label="Select number of travelers"
            >
              <option value="">Select travelers</option>
              {[...Array(6)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{`${i + 1} traveler${i > 0 ? 's' : ''}`}</option>
              ))}
            </select>
          </div>
        </div>

      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DestinationSearch;
