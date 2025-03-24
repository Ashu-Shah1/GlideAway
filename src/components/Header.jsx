import React from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate()
  function handelPlanTrip(){
    navigate('/aiFeature')
  }
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=80")'
    }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">Discover the Magic of Uttarakhand</h1>
          <p className="text-xl mb-8">Experience the divine beauty of the Himalayas, ancient temples, and pristine landscapes. Your perfect adventure awaits.</p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors" onClick={handelPlanTrip}>
              Plan Your Trip
            </button>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Explore Destinations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;