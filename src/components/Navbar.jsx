import React, { useState } from "react";
import { MapPin, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-600" aria-label="Logo" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Uttarakhand Travel
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Destinations
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Activities
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Hotels
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Community
            </a>
          </div>

          {/* Right Section: Sign In */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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
