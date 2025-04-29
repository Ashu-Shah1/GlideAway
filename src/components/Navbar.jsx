import React, { useState, useRef } from "react";
import { MapPin, User, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";

const districts = [
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
  "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh",
  "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
];

const Navbar = ({ activitiesRef }) => {
  const navigate = useNavigate();
  const [showDestinations, setShowDestinations] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastScrollPositionRef = useRef(0);

  const handleActivitiesClick = () => {
    navigate("/home");
    setTimeout(() => {
      activitiesRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDestinations(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDestinations(false);
    }, 200);
  };

  const handleDestinationClick = (district) => {
    // Store current scroll position
    lastScrollPositionRef.current = window.scrollY;
    
    navigate(`/destination/${district}`, {
      state: { shouldScroll: true }
    });
    setShowDestinations(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              GlideAway
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
            >
              Home
            </Link>

            {/* Destinations Dropdown */}
            <div 
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
              >
                Destinations
                <ChevronDown className={`ml-1 h-5 w-5 transition-transform ${showDestinations ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute left-0 mt-2 w-[700px] rounded-lg shadow-xl bg-white border border-gray-200 transition-all duration-300 ${showDestinations ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
              >
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-blue-600 mb-3">Explore Uttarakhand</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {districts.map((district) => (
                      <button
                        key={district}
                        onClick={() => handleDestinationClick(district)}
                        className="text-left text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors text-[15px] font-medium"
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleActivitiesClick}
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
            >
              Activities
            </button>

            <Link
              to="/Hotels"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
            >
              Hotels
            </Link>

            <Link
              to="/community-post"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
            >
              Community
            </Link>

            <Link 
              to="/AboutUs" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-[15px] font-medium transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors text-[15px] font-medium">
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="relative">
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "9999px",
                        border: "2px solid #3b82f6"
                      },
                      userButtonTrigger: {
                        "&:focus": {
                          boxShadow: "none"
                        }
                      }
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;