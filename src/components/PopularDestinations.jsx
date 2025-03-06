import { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    image: 'src/assets/img/Rishikesh 9.jpg',
    name: 'Rishikesh',
    description: 'Adventure capital and spiritual hub',
  },
  {
    id: 2,
    image: 'src/assets/img/Maggie point (sunset1).jpg',
    name: 'Mussoorie',
    description: 'Queen of the Hills',
  },
  {
    id: 3,
    image: 'src/assets/img/Kuari pass 6.jpg',
    name: 'Nainital',
    description: 'Lake District of India',
  },
  {
    id: 4,
    image: 'src/assets/img/Tungnath.jpg',
    name: 'Manali',
    description: 'Valley of the Gods',
  },
  {
    id: 5,
    image: 'src/assets/img/Kuari pass 1.jpg',
    name: 'Shimla',
    description: 'Queen of the Hills',
  },
  {
    id: 6,
    image: 'src/assets/img/Tungnath5.jpg',
    name: 'Tungnath ',
    description: 'Abode of Shiva',
  },
];

export function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('slide-left');

  const handleNext = () => {
    setTransitionDirection('slide-left');
    setCurrentIndex((prevIndex) => (prevIndex + 3) % destinations.length);
  };

  const handlePrevious = () => {
    setTransitionDirection('slide-right');
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? destinations.length - 3 : prevIndex - 3
    );
  };

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 3);

  return (
    <section className="relative bg-gray-50 rounded-xl p-8 my-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the most beautiful places in the world. From serene beaches to majestic mountains, discover destinations that will take your breath away.
        </p>
      </div>
      <div className="relative"> {/* Wrapper for the grid and arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
          {visibleDestinations.map((destination) => (
            <div
              key={destination.id}
              className={`group relative rounded-xl overflow-hidden shadow-lg transition-transform duration-500 ease-in-out ${
                transitionDirection === 'slide-left' ? 'animate-slide-left' : 'animate-slide-right'
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                </div>
                <p className="text-white/80">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}