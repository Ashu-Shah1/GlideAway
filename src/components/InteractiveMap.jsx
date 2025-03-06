import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([30.0869, 78.2676], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const destinations = [
      {
        id: 1,
        name: 'Rishikesh',
        position: [30.0869, 78.2676],
        description: 'Adventure capital and spiritual hub'
      },
      {
        id: 2,
        name: 'Mussoorie',
        position: [30.4598, 78.0644],
        description: 'Queen of the Hills'
      },
      {
        id: 3,
        name: 'Nainital',
        position: [29.3919, 79.4542],
        description: 'Lake District of India'
      }
    ];

    destinations.forEach(dest => {
      const marker = L.marker(dest.position).addTo(map);
      marker.bindPopup(`
        <div>
          <h3 class="font-semibold">${dest.name}</h3>
          <p class="text-sm text-gray-600">${dest.description}</p>
        </div>
      `);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Interactive Map</h2>
      <div id="map" className="w-full h-[400px] rounded-lg overflow-hidden"></div>
      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600">Popular Destinations</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-green-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600">Hotels</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600">Activities</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
