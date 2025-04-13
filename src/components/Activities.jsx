import React from 'react';
import { Mountain, Waves, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const activities = [
  {
    id: 1,
    name: 'Trekking',
    icon: Mountain,
    description: 'Explore scenic mountain trails',
    path: '/trek',
  },
  {
    id: 2,
    name: 'Adventure Spots',
    icon: Waves,
    description: 'Experience thrilling water adventures',
    path: '/adventure',
  },
  {
    id: 3,
    name: 'Spiritual Tours',
    icon: Compass,
    description: 'Visit ancient temples and ashrams',
    path: '/spiritual',
  },
];

const Activities = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Things To Do</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{activity.name}</h3>
              <p className="text-gray-600">{activity.description}</p>
              <button 
                className="mt-4 text-blue-600 font-medium hover:text-blue-700" 
                onClick={() => navigate(activity.path)}
              >
                Learn more →
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Activities;