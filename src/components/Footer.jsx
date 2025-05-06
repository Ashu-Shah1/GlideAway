import { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Explore Uttarakhand</h3>
            <ul className="space-y-2">
              <li className="hover:text-blue-400 cursor-pointer">
                <Link 
                  to="/home#PopularDestinations" 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  Popular Destinations
                </Link>
              </li>
              <li className="hover:text-blue-400 cursor-pointer">Travel Guides</li>
              <li className="hover:text-blue-400 cursor-pointer">Activities</li>
              <li className="hover:text-blue-400 cursor-pointer">Accommodations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/AboutUs#contact" 
                  className="hover:text-blue-400 cursor-pointer"
                >
                  Contact Us
                </Link>
              </li>
              <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
              <li className="hover:text-blue-400 cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <p className="mb-4">Subscribe to our newsletter for travel updates and exclusive offers.</p>
            <div className="flex space-x-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2025 Uttarakhand Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;