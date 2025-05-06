import React, { useState, useRef } from "react";
import { MapPin, User, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import TripCard from "./TripCard";

const districts = [
  "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun",
  "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh",
  "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
];

const Navbar = ({ activitiesRef }) => {
  const navigate = useNavigate();
  const [showDestinations, setShowDestinations] = useState(false);
  const [showMyTrips, setShowMyTrips] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastScrollPositionRef = useRef(0);

  const [myTrips, setMyTrips] = useState(() => {
    const savedTrips = localStorage.getItem('uttarakhandTrips');
    return savedTrips ? JSON.parse(savedTrips) : {
      current: [],
      upcoming: [],
      completed: []
    };
  });

  const deleteTrip = (tripId) => {
    setMyTrips(prev => ({
      current: prev.current.filter(trip => trip.id !== tripId),
      upcoming: prev.upcoming.filter(trip => trip.id !== tripId),
      completed: prev.completed.filter(trip => trip.id !== tripId)
    }));
  };

  const handleViewDetails = (trip) => {
    lastScrollPositionRef.current = window.scrollY;
    navigate('/trip-details', { 
      state: { 
        trip,
        returnPath: '/',
      scrollPosition: lastScrollPositionRef.current
       }
       });
    setShowMyTrips(false);
  };

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


          <div className="flex gap-6">
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

          {/* <div className="flex justify-between items-center ">
          <button 
           onClick={() => setShowMyTrips(!showMyTrips)}
           className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-md"
           >
            My Trips
          </button>
          </div> */}
          </div>
          
          {showMyTrips && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
    <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Trips</h2>
        <button 
          onClick={() => setShowMyTrips(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Current Trips */}
      {myTrips.current.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Current Trips</h3>
          <div className="space-y-4">
            {myTrips.current.map(trip => (
              <TripCard key={trip.id} trip={trip} onDelete={deleteTrip}
              onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Trips */}
      {myTrips.upcoming.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Upcoming Trips</h3>
          <div className="space-y-4">
            {myTrips.upcoming.map(trip => (
              <TripCard key={trip.id} trip={trip} onDelete={deleteTrip} 
              onViewDetails={handleViewDetails}/>
            ))}
          </div>
        </div>
      )}

      {/* Completed Trips */}
      {myTrips.completed.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Completed Trips</h3>
          <div className="space-y-4">
            {myTrips.completed.map(trip => (
              <TripCard key={trip.id} trip={trip} onDelete={deleteTrip}
              onViewDetails={handleViewDetails} />
            ))}
          </div>
        </div>
      )}

      {myTrips.current.length === 0 && myTrips.upcoming.length === 0 && myTrips.completed.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You don't have any trips saved yet.</p>
        </div>
      )}
    </div>
  </div>
)}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;