import React, { useState } from 'react';
import { MapPin, Compass, Filter } from 'lucide-react';

const adventureSpots = [
  {
    name: "Rishikesh River Rafting",
    location: "Rishikesh",
    type: "Water Sports",
    category: "Water Adventure",
    description: "Experience thrilling white water rafting in the mighty Ganges with rapids ranging from Grade I to Grade IV.",
    image: "src/assets/adventure.jpg"
  },
  {
    name: "Auli Skiing",
    location: "Auli",
    type: "Snow Sports",
    category: "Winter Sports",
    description: "Glide through pristine snow slopes with panoramic views of Nanda Devi and surrounding Himalayan peaks.",
    image: "https://www.indianholiday.com/wordpress/wp-content/uploads/2025/04/auli-ski-tour-568.jpeg"
  },
  {
    name: "Camping in Kanatal",
    location: "Kanatal",
    type: "Camping",
    category: "Camp Adventure",
    description: "Enjoy serene pine forests and starlit skies while camping in the peaceful hill station of Kanatal.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/04/64/af/46/camp-view.jpg?w=1200&h=-1&s=1"
  },
  {
    name: "Paragliding in Mukteshwar",
    location: "Mukteshwar",
    type: "Aerial Adventure",
    category: "Air Sports",
    description: "Soar like a bird with stunning views of the Kumaon Himalayas and valleys below.",
    image: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3333/x_0,y_333,w_5000,h_2813,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/digantaa-resort/arun-kashyap-E7C077ex-Zk-unsplash_gteewl"
  },
  {
    name: "Sky walk in Mussoorie",
    location: "Mussoorie",
    type: "Aerial Adventure",
    category: "Air Sports",
    description: "Experience the thrill of walking on a rope high above the valley, offering breathtaking panoramic views of the Mussoorie hills.",
    image: "https://mussoorietourism.co.in/images//tourist-places/adventure-park-mussoorie/adventure-park-mussoorie-india-tourism-history.jpg"
  },
  {
    name: "Kayaking in Tehri Lake",
    location: "Tehri",
    type: "Water Sports",
    category: "Water Adventure",
    description: "Paddle through Asia's largest man-made lake with breathtaking views of the surrounding mountains.",
    image: "https://triptradition.com/wp-content/uploads/2023/11/Kayaking-in-Tehri-Lake.jpg"
  },
  {
    name: "Bungee Jumping in Rishikesh",
    location: "Rishikesh",
    type: "Extreme Sports",
    category: "Air Sports",
    description: "Take the leap from India's highest bungee jumping platform at 83 meters.",
    image: "https://rudraadventures.com/wp-content/uploads/2024/01/269007155_4899088360142908_3919381551129052942_n-e1704447003489-1024x869.jpg"
  },
  {
    name: "Zip line in Mussoorie",
    location: "Mussoorie",
    type: "Aerial Adventure",
    category: "Air Sports",
    description: "Soar through the air on an exciting zip line ride, gliding above lush valleys and forests with stunning views of the Mussoorie landscape.",
    image: "https://d26dp53kz39178.cloudfront.net/media/uploads/products/Zip_line-4_cXUedzN.jpg"
  },
  {
    name: "Camping in Chopta",
    location: "Chopta, Rudraprayag",
    type: "Camping",
    category: "Camp Adventure",
    description: "Camp in the 'Mini Switzerland of Uttarakhand' and wake up to views of snow-capped peaks and alpine meadows.",
    image: "https://campgangavatika.com/blog/wp-content/uploads/2021/04/2-1024x519.jpg"
  },
  {
    name: "Snowboarding in Dayara Bugyal",
    location: "Uttarkashi",
    type: "Snow Sports",
    category: "Winter Sports",
    description: "Carve through pristine snow in one of India's most beautiful high-altitude meadows.",
    image: "https://www.tourism-of-india.com/pictures/travel_guide/attractions/thmb/dayara-bugyal-446.jpeg"
  },
  {
    name: "Zip Lining in Rishikesh",
    location: "Rishikesh",
    type: "Aerial Adventure",
    category: "Air Sports",
    description: "Glide across the Ganges on India's longest zip line with panoramic views.",
    image: "https://5.imimg.com/data5/LE/MY/MY-42528558/zipline-in-kanatal-and-rishikesh-tour-package.png"
  },
  {
    name: "Scuba Diving in Tehri Lake",
    location: "Tehri",
    type: "Water Sports",
    category: "Water Adventure",
    description: "Explore the underwater ruins of Old Tehri town and unique freshwater marine life.",
    image: "https://staticimg.amarujala.com/assets/images/2018/05/27/scuba-diving_1527411290.jpeg?w=414&dpr=1.0&q=80"
  },
  {
    name: "Camping in Bhadraj",
    location: "Mussoorie",
    type: "Camping",
    category: "Camp Adventure",
    description: "Explore the underwater ruins of Old Tehri town and unique freshwater marine life.",
    image: "https://www.hireacamp.com/api/external/image?name=uploads/bee826423301443bad1ed3ebb951167e.jpeg&size=3840x3840&q=75"
  }
];

const categories = [...new Set(adventureSpots.map(spot => spot.category))];

const Adventure = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSpots = adventureSpots.filter(spot => 
    selectedCategory === 'All' || spot.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Adventure Sports in Uttarakhand
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover thrilling adventures in the land of gods
          </p>

          {/* Filter Section */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpots.map((spot, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  {spot.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {spot.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{spot.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Compass className="w-4 h-4 mr-2" />
                  <span>{spot.category}</span>
                </div>

                <p className="text-gray-600">
                  {spot.description}
                </p>

                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                  Book Adventure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Adventure;