import React, { useState } from 'react';
import { MapPin, Mountain, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';

const trekkingPlaces = [
  {
    name: "Nag Tibba Trek",
    location: "Tehri Garhwal",
    difficulty: "Easy",
    duration: "2-3 days",
    bestTime: "October to March",
    altitude: "9,910 ft",
    image: "https://www.shikhar.com/images/gallery/tours/180/2031696398.jpg",
    description: "Perfect for beginners, offering panoramic views of major Himalayan peaks and dense oak forests.",
    category: "Easy to Moderate"
  },
  {
    name: "Chopta Chandrashila Trek",
    location: "Rudraprayag",
    difficulty: "Moderate",
    duration: "4-5 days",
    bestTime: "March to June, September to November",
    altitude: "13,123 ft",
    image: "src/assets/treks/Chopta_Chandrashilla.jpg",
    description: "Home to Tungnath Temple, the highest Shiva temple in the world, offering stunning sunrise views.",
    category: "Easy to Moderate"
  },
  {
    name: "Dayara Bugyal Trek",
    location: "Uttarkashi",
    difficulty: "Easy",
    duration: "5-6 days",
    bestTime: "All year except monsoon",
    altitude: "12,303 ft",
    image: "src/assets/treks/Dayara_Bugyal_Trek.jpg",
    description: "Beautiful alpine meadow trek with stunning views of Bandarpoonch peak and vast grasslands.",
    category: "Easy to Moderate"
  },
  {
    name: "Kedarkantha Trek",
    location: "Uttarkashi",
    difficulty: "Easy",
    duration: "6 days",
    bestTime: "December to April",
    altitude: "12,500 ft",
    image: "src/assets/treks/Kedarkantha.jpg",
    description: "One of the best winter treks with mesmerizing snow-covered landscapes and camping experiences.",
    category: "Easy to Moderate"
  },
  {
    name: "Har Ki Dun Trek",
    location: "Uttarkashi",
    difficulty: "Moderate",
    duration: "7-8 days",
    bestTime: "March to June, September to November",
    altitude: "11,675 ft",
    image: "https://i0.wp.com/bnkhimalayan.com/wp-content/uploads/2022/09/IMG_3598a.jpg?fit=1501%2C1000&ssl=1",
    description: "Ancient village trek with stunning valley views and rich Himalayan culture.",
    category: "Easy to Moderate"
  },
   // Moderate to Difficult Treks
  {
    name: "Brahmatal Trek",
    location: "Chamoli",
    difficulty: "Moderate",
    duration: "6 days",
    bestTime: "December to March",
    altitude: "12,250 ft",
    image: "src/assets/treks/Brahmatal_Trek.jpg",
    description: "Features frozen lakes and majestic views of Trishul and Nanda Ghunti peaks.",
    category: "Moderate to Difficult"
  },
  {
    name: "Roopkund Trek",
    location: "Chamoli",
    difficulty: "Difficult",
    duration: "7-8 days",
    bestTime: "May to June, September to October",
    altitude: "16,499 ft",
    image: "https://himalayanambition.in/wp-content/uploads/2023/10/BlogspotImageUrl44719-Bikat-Adventures.jpg",
    description: "Famous for its mysterious skeletal lake, requiring good fitness and offering challenging terrain.",
    category: "Moderate to Difficult"
  },
  {
    name: "Pindari Glacier Trek",
    location: "Bageshwar",
    difficulty: "Moderate",
    duration: "7 days",
    bestTime: "May to June, September to October",
    altitude: "12,300 ft",
    image: "https://trekthehimalayas.com/images/PindariGlacierTrek/GalleryDesktop/Autumn/e6f7c2de-f5c2-46ea-84e2-fbb7c9385a20_Pindari-Glacier-6.webp",
    description: "Leads to the beautiful Pindari Glacier, perfect for adventure seekers with glacier views.",
    category: "Moderate to Difficult"
  },
  {
    name: "Valley of Flowers Trek",
    location: "Chamoli",
    difficulty: "Moderate",
    duration: "6-7 days",
    bestTime: "July to September",
    altitude: "12,654 ft",
    image: "https://t.eucdn.in/tourism/lg-jpg/valley-of-flowers-5353172.jpg",
    description: "A UNESCO World Heritage site, famous for its vibrant floral meadows and diverse flora.",
    category: "Moderate to Difficult"
  },
  {
    name: "Kuari Pass Trek",
    location: "Chamoli",
    difficulty: "Moderate",
    duration: "6 days",
    bestTime: "March to June, September to November",
    altitude: "12,516 ft",
    image: "src/assets/img/Kuari pass 2.jpg",
    description: "Offers breathtaking views of Nanda Devi and other prominent Himalayan peaks.",
    category: "Moderate to Difficult"
  },
  
  {
    name: "Rupin Pass Trek",
    location: "Uttarkashi",
    difficulty: "Difficult",
    duration: "8 days",
    bestTime: "May to June, September to October",
    altitude: "15,250 ft",
    image: "http://www.365hops.com/searching_files/timthumb.php?src=http://www.365hops.com/social/event_gallery/1543494727.rupin-pass-trek-the-himalayas-(11).jpg&h=380&w=650&zc=1",
    description: "A thrilling trek featuring waterfalls, hanging villages, and snow bridges.",
    category: "Challenging"
  },
  {
    name: "Satopanth Lake Trek",
    location: "Chamoli",
    difficulty: "Difficult",
    duration: "8-9 days",
    bestTime: "June to September",
    altitude: "14,600 ft",
    image: "src/assets/treks/Satopanth.jpg",
    description: "A sacred glacial lake trek with spiritual significance and challenging terrain.",
    category: "Challenging"
  },
  {
    name: "Milam Glacier Trek",
    location: "Pithoragarh",
    difficulty: "Difficult",
    duration: "10-12 days",
    bestTime: "May to October",
    altitude: "13,500 ft",
    image: "http://www.365hops.com/searching_files/timthumb.php?src=http://www.365hops.com/social/event_gallery/1444043672.milam(1).jpg&h=380&w=650&zc=1",
    description: "One of the longest treks, leading to the source of the Gori Ganga River.",
    category: "Challenging"
  },
  {
    name: "Panchachuli Base Camp Trek",
    location: "Pithoragarh",
    difficulty: "Difficult",
    duration: "8-9 days",
    bestTime: "May to October",
    altitude: "13,975 ft",
    image: "https://nagarjunatravels.com/images/packages/panchachuli-base-camp-darma-valley-tour-itinerary-ex-haldwanikathgodam-05-days-04-nights-66ee8c702aada.jpg",
    description: "A mesmerizing trek offering views of the five Panchachuli peaks.",
    category: "Challenging"
  },
  {
    name: "Nanda Devi Base Camp Trek",
    location: "Pithoragarh",
    difficulty: "Difficult",
    duration: "10-12 days",
    bestTime: "June to September",
    altitude: "13,780 ft",
    image: "https://www.himalayanhikers.in/wp-content/uploads/2019/12/Nanda-Devi-Base-Camp-Trek4.jpg",
    description: "Takes you close to India's second-highest peak, Nanda Devi, offering challenging terrain and stunning views.",
    category: "Challenging"
  }
];

const DifficultyBadge = ({ difficulty }) => {
  const colors = {
    Easy: 'bg-green-100 text-green-800',
    Moderate: 'bg-yellow-100 text-yellow-800',
    Difficult: 'bg-red-100 text-red-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[difficulty]}`}>
      {difficulty}
    </span>
  );
};

const CategoryBadge = ({ category }) => {
  const colors = {
    'Easy to Moderate': 'bg-blue-100 text-blue-800',
    'Moderate to Difficult': 'bg-purple-100 text-purple-800',
    'Challenging': 'bg-orange-100 text-orange-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[category]}`}>
      {category}
    </span>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTreks = selectedCategory === 'All' 
    ? trekkingPlaces 
    : trekkingPlaces.filter(trek => trek.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trekking Destinations in Uttarakhand
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most breathtaking trekking trails in the Land of Gods, featuring pristine landscapes, 
            snow-capped peaks, and spiritual experiences.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8 space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Easy to Moderate">Easy to Moderate</option>
            <option value="Moderate to Difficult">Moderate to Difficult</option>
            <option value="Challenging">Challenging</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((place) => (
            <div key={place.name} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
              <div className="h-64 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{place.name}</h2>
                  <div className="flex gap-2">
                    <DifficultyBadge difficulty={place.difficulty} />
                    <CategoryBadge category={place.category} />
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{place.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mountain className="w-5 h-5 mr-2" />
                    <span>{place.altitude}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{place.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{place.bestTime}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{place.description}</p>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
