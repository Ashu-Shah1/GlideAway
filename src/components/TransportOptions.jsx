import React from 'react';
import { Bus, Car, Plane } from 'lucide-react';

const transportOptions = [
  {
    id: 1,
    name: 'Bus Services',
    icon: Bus,
    description: 'Regular bus services to all major destinations',
    features: ['AC & Non-AC options', 'Overnight travel', 'Multiple pickup points'],
    priceRange: '₹500 - ₹2000',
  },
  {
    id: 2,
    name: 'Car Rentals',
    icon: Car,
    description: 'Self-drive and chauffeur-driven cars',
    features: ['SUVs & Sedans', '24/7 support', 'Flexible packages'],
    priceRange: '₹2000 - ₹5000/day',
  },
  {
    id: 3,
    name: 'Flight Bookings',
    icon: Plane,
    description: 'Flights to Dehradun & nearby airports',
    features: ['Multiple airlines', 'Direct flights', 'Airport transfers'],
    priceRange: '₹3000 - ₹10000',
  },
];

const TransportOptions = () => {
  return (
    <section className="py-12 px-6 my-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Transport Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {transportOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{option.name}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <ul className="space-y-2 mb-4">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{option.priceRange}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TransportOptions;
