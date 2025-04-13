import { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';

const destinations = [
  {
    id: 1,
    image: '/src/assets/img/Rishikesh 5.jpg',
    name: 'Rishikesh',
    description: 'Adventure capital and spiritual hub',
    detailedDescription: 'Rishikesh, nestled in the foothills of the Himalayas along the Ganges River, is known as the "Yoga Capital of the World". It offers a perfect blend of spiritual retreats and adventure activities like white-water rafting and bungee jumping.',
    images: [
      '/src/assets/img/Rishikesh 10.jpg',
      '/src/assets/img/Rishikesh 9.jpg',
      '/src/assets/img/Rishikesh 6.jpg'
    ]
  },
  {
    id: 2,
    image: '/src/assets/img/Maggie point (cloud)5.jpg',
    name: 'Mussoorie',
    description: 'Queen of the Hills',
    detailedDescription: 'Mussoorie, with its green hills and varied flora and fauna, is a fascinating hill resort. The scenic beauty and pleasant weather make it a perfect holiday destination, offering spectacular views of the Himalayan peaks.',
    images: [
      '/src/assets/img/mussorie1.jpg',
      '/src/assets/img/mussorie2.jpg',
      '/src/assets/img/mussoie3.webp'
    ]
  },
  {
    id: 3,
    image: '/src/assets/Badrinath.jpeg',
    name: 'Badrinath',
    description: 'Sacred Vishnu Temple',
    detailedDescription: 'Badrinath is one of the four Char Dham pilgrimage sites, dedicated to Lord Vishnu. Situated between Nar and Narayana mountain ranges, this sacred town is surrounded by breathtaking Himalayan peaks.',
    images: [
      '/src/assets/Badrinath-Temple.jpg',
      '/src/assets/badrinath2.webp',
      '/src/assets/badrinath3.jpg'
    ]
  },
  {
    id: 4,
    image: '/src/assets/Kedarnath.jpeg',
    name: 'Kedarnath',
    description: 'Sacred Shiva Temple',
    detailedDescription: 'Kedarnath, another of the Char Dham, is the highest among the 12 Jyotirlingas of Lord Shiva. Located near the Mandakini River, this ancient temple is surrounded by snow-capped peaks, offering a divine experience.',
    images: [
      'src/assets/img/Kedarnath-1.jpg',
      'src/assets/img/Kedarnath-2.jpg',
      'src/assets/img/Kedarnath-3.jpg'
    ]
  },
  {
    id: 5,
    image: '/src/assets/1858622-la-2626229.webp',
    name: 'Gangotri',
    description: 'Source of the Ganges',
    detailedDescription: 'Gangotri, the origin of the holy River Ganges, is one of the four Char Dham pilgrimage sites. The Gangotri Temple, dedicated to Goddess Ganga, is surrounded by stunning glaciers and mountains.',
    images: [
      'src/assets/img/Gangotri-1.jpg',
      'src/assets/img/Gangotri-2.jpg',
      'src/assets/img/Gangotri-3.jpg'
    ]
  },
  {
    id: 6,
    image: '/src/assets/Yamunotri-Temple.jpg',
    name: 'Yamunotri',
    description: 'Source of the Yamuna',
    detailedDescription: 'Yamunotri, the source of the Yamuna River and the fourth Char Dham, is known for its thermal springs and the temple dedicated to Goddess Yamuna. The scenic trek to Yamunotri offers beautiful views of the Himalayas.',
    images: [
      'src/assets/img/Yamunotri-1.jpg',
      'src/assets/img/Yamunotri-2.jpg',
      'src/assets/img/Yamunotri-3.jpg'
    ]
  }
];

export function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState('slide-left');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionDirection('slide-left');
    setCurrentIndex((prevIndex) => (prevIndex + 3) % destinations.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTransitionDirection('slide-right');
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? destinations.length - 3 : prevIndex - 3
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedDestination(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  const nextImage = (e) => {
    e?.stopPropagation();
    setModalImageIndex((prevIndex) => 
      (prevIndex + 1) % selectedDestination.images.length
    );
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setModalImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedDestination.images.length - 1 : prevIndex - 1
    );
  };

  const visibleDestinations = destinations.slice(currentIndex, currentIndex + 3);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, modalImageIndex, selectedDestination]);

  return (
    <section className="relative bg-gray-50 rounded-xl p-6 md:p-8 my-16 md:my-20">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">Popular Destinations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore the most beautiful places in the Himalayas. From spiritual abodes to majestic mountains, discover destinations that will elevate your soul.
        </p>
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 overflow-hidden">
          {visibleDestinations.map((destination) => (
            <div
              key={destination.id}
              onClick={() => handleDestinationClick(destination)}
              className={`group relative rounded-xl overflow-hidden shadow-lg transition-all duration-500 ease-out cursor-pointer hover:shadow-xl ${
                transitionDirection === 'slide-left' ? 'animate-slide-left' : 'animate-slide-right'
              }`}
            >
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center space-x-2 text-white mb-2">
                  <MapPin className="h-5 w-5 text-white/90" />
                  <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                </div>
                <p className="text-white/90 text-sm md:text-base">{destination.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button
          onClick={handlePrevious}
          disabled={isAnimating}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white p-2 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Previous destinations"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white p-2 rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 z-10 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Next destinations"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>

      {/* Modal */}
      {selectedDestination && (
        <>
          <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300 ease-out ${
              isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeModal}
          ></div>
          
          <div 
            className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
              isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div 
              className={`bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 ease-out ${
                isModalOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 z-10 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-gray-800" />
                </button>
                
                {/* Image Gallery */}
                <div className="relative h-64 md:h-[28rem] overflow-hidden group">
                  <img
                    src={selectedDestination.images[modalImageIndex]}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                  </button>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {selectedDestination.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setModalImageIndex(index); }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                          index === modalImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <MapPin className="h-7 w-7 text-indigo-600" />
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {selectedDestination.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {selectedDestination.detailedDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}