import React, { useState, useEffect, useRef } from "react";
import { MapPin, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const districts = [
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
  "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh",
  "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
];

const Navbar = () => {
  const [showDestinations, setShowDestinations] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDestinations(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-600" aria-label="Logo" />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              GlideAway
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-700 hover:text-blue-600"
                onClick={() => setShowDestinations(!showDestinations)}
              >
                Destinations
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              <div
                className={`absolute left-0 mt-2 w-[700px] rounded-lg shadow-xl py-4 px-6 border border-gray-300 transition-opacity duration-300 backdrop-blur-md ${
                  showDestinations ? "opacity-100 visible bg-white/30" : "opacity-0 invisible"
                }`}
              >
                <div className="grid grid-cols-4 gap-4">

                  {[0, 1, 2].map((colIndex) => (
                    <div key={colIndex} className="flex flex-col space-y-2">
                      {districts.slice(colIndex * 3, colIndex * 3 + 3).map((district) => (
                        <a
                          key={district}
                          href={`/destination/${district}`}
                          className="text-white hover:text-blue-300 px-3 py-2 rounded-md transition-colors block bg-black/30"
                        >
                          {district}
                        </a>
                      ))}
                    </div>
                  ))}
                  
                  <div className="flex flex-col space-y-2">
                    {districts.slice(9).map((district) => (
                      <a
                        key={district}
                        href={`/destination/${district}`}
                        className="text-white hover:text-blue-300 px-3 py-2 rounded-md transition-colors block bg-black/30"
                      >
                        {district}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button 
            onClick={() => navigate("/activities")} 
            className="text-gray-700 hover:text-blue-600"
             >
            Activities
            </button>

            <a href="#" className="text-gray-700 hover:text-blue-600">Hotels</a>
            <button
              onClick={() => navigate("/community-post")}
              className="text-gray-700 hover:text-blue-600"
            >
              Community
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <User className="h-5 w-5" aria-label="User Icon" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
