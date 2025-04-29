import React, { useState } from 'react';
import { MapPin, Compass, Filter } from 'lucide-react';

const spiritualSites = [
  {
    name: "Kedarnath Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Char Dham",
    description: "One of the holiest Hindu temples dedicated to Lord Shiva, located at an altitude of 3,583 m amidst the magnificent Garhwal Himalayas.",
    image: "src/assets/Kedarnath.jpeg"
  },
  {
    name: "Badrinath Temple",
    location: "Chamoli",
    type: "Temple",
    category: "Char Dham",
    description: "Sacred temple dedicated to Lord Vishnu, situated along the banks of Alaknanda River in the Garhwal hills.",
    image: "src/assets/Badrinath.jpeg"
  },
  {
    name: "Gangotri Temple",
    location: "Uttarkashi",
    type: "Temple",
    category: "Char Dham",
    description: "The origin of River Ganges and one of the four sites in Uttarakhand's Char Dham pilgrimage circuit.",
    image: "src/assets/Gangotri.jpeg"
  },
  {
    name: "Yamunotri Temple",
    location: "Uttarkashi",
    type: "Temple",
    category: "Char Dham",
    description: "The source of the River Yamuna and the seat of Goddess Yamuna, marking the beginning of the Char Dham yatra.",
    image: "src/assets/Yamunotri feature.jpg"
  },
  {
    name: "Trayambakeshwar Temple",
    location: "Rishikesh",
    type: "Temple",
    category: "Holy Temple",
    description: "An iconic 13-story temple located on the banks of the Ganges, dedicated to Lord Shiva and known for its stunning architecture and spiritual ambiance.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsYh73K0YyK16x2juVmX_zZhPMxZuKcCi1g&s"
  },  
  {
    name: "Haridwar Har Ki Pauri",
    location: "Haridwar",
    type: "Ghat",
    category: "Holy Temple",
    description: "Sacred ghat where the evening Ganga Aarti is performed, believed to have footprints of Lord Vishnu.",
    image: "src/assets/Feature_Haridwar.jpg"
  },
  {
    name: "Hemkund Sahib",
    location: "Chamoli",
    type: "Gurudwara",
    category: "Sikh Shrine",
    description: "High-altitude Sikh shrine surrounded by seven snow-clad peaks and pristine Hemkund Lake.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnLtjvTMGC4TLLiIUPsZ7dLRuQoFCWRNE6JMmkPdF-qNiBLVz0ozqZK1Rfj1FrWvQb08Q&usqp=CAU"
  },
  {
    name: "Nanda Devi Temple",
    location: "Almora",
    type: "Temple",
    category: "Mountain Temples",
    description: "Ancient temple dedicated to the patron goddess of Uttarakhand, Nanda Devi.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/92/a8/b2/nanda-devi-temple.jpg?w=1200&h=-1&s=1"
  },
  {
    name: "Tungnath Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Panch Kedar",
    description: "Highest Shiva temple in the world and one of the Panch Kedars, located at an altitude of 3,680 meters.",
    image: "src/assets/img/Tungnath5.jpg"
  },
  {
    name: "Kalimath Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Shakti Peeths",
    description: "Ancient temple dedicated to Goddess Kali, one of the 108 Shakti Peeths.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpyKPDM28LSV7OgUlRoMCF5uXGRcCM2IyOMg&s"
  },
  {
    name: "Neelkanth Mahadev Temple",
    location: "Rishikesh",
    type: "Temple",
    category: "Mountain Temples",
    description: "Temple marking the place where Lord Shiva consumed poison during Samudra Manthan.",
    image: "https://rishikesh.app/te/_thumb/attractions/neelkanth-banner.jpg"
  },
  {
    name: "Kartik Swami Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Mountain Temples",
    description: "Unique temple dedicated to Kartikeya, son of Lord Shiva, offering panoramic views of the Himalayas.",
    image: "src/assets/img/KartikeySwami.jpg"
  },
  {
    name: "Surkanda Devi Temple",
    location: "Tehri Garhwal",
    type: "Temple",
    category: "Shakti Peeths",
    description: "Ancient hilltop temple dedicated to Goddess Parvati, offering 360-degree views of the Himalayas.",
    image: "https://www.uttarakhandexplorer.in/wp-content/uploads/2023/08/11-1.jpg"
  },
  {
    name: "Madmaheshwar Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Panch Kedar",
    description: "One of the Panch Kedars, believed to house Lord Shiva's navel in the form of a lingam.",
    image: "https://firstrek.in/blog/wp-content/uploads/2024/01/Madmaheshwar-Temple-Opening-Dates.jpg"
  },
  {
    name: "Kalpeshwar Temple",
    location: "Chamoli",
    type: "Temple",
    category: "Panch Kedar",
    description: "The only Panch Kedar temple accessible throughout the year, where Lord Shiva's matted hair (jata) is worshipped.",
    image: "https://www.chardhampackage.com/img/travel/Kalpeshwar-Temple.jpg"
  },
  {
    name: "Rudranath Temple",
    location: "Chamoli",
    type: "Temple",
    category: "Panch Kedar",
    description: "Fourth temple of the Panch Kedar, where Lord Shiva's face is worshipped.",
    image: "https://uttarakhandtriptrek.com/wp-content/uploads/2023/11/rudranath-temple-uttarakhand.jpg"
  },
  {
    name: "Chandrabadni Temple",
    location: "Tehri Garhwal",
    type: "Temple",
    category: "Shakti Peeths",
    description: "Ancient temple dedicated to Goddess Sati, one of the three Peeths of Uttarakhand.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Chandrabadni_Mandir.jpg"
  },
  {
    name: "Dhari Devi Temple",
    location: "Rudraprayag",
    type: "Temple",
    category: "Shakti Peeths",
    description: "Known as the guardian deity of Uttarakhand, situated on the banks of Alaknanda River.",
    image: "src/assets/img/DhariDevi.jpg"
  },
  {
    name: "Bhavishya Badri",
    location: "Chamoli",
    type: "Temple",
    category: "Future Temples",
    description: "Believed to be the future seat of Lord Badrinath when the current Badrinath temple becomes inaccessible.",
    image: "https://bootandbags.com/wp-content/uploads/2024/05/Bhavishya-Badri-1.jpg"
  },
  {
    name: "Jageshwar Dham",
    location: "Almora",
    type: "Temple",
    category: "Ancient Temples",
    description: "Ancient complex of 124 temples dedicated to Lord Shiva, dating back to the 9th century.",
    image: "https://t.eucdn.in/tourism/lg/jageshwar-8435118.webp"
  }
];

const categories = [...new Set(spiritualSites.map(site => site.category))];

const Spiritual = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredSites = spiritualSites.filter(site => 
    selectedCategory === 'All' || site.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sacred Sites of Uttarakhand
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore the divine spiritual heritage of Dev Bhoomi
          </p>

          {/* Filter Section */}
          <div className="flex justify-center items-center gap-2 mb-8">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSites.map((site, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={site.image}
                  alt={site.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                  {site.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {site.name}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{site.location}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <Compass className="w-4 h-4 mr-2" />
                  <span>{site.category}</span>
                </div>

                <p className="text-gray-600">{site.description}</p>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spiritual;
