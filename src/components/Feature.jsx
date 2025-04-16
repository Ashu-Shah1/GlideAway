import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, Car, Bus, Plane, Users, ChevronDown, Minus, Plus } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Nainital',
    image: 'https://stampedmoments.com/wp-content/uploads/2022/09/boating-naini-lake.jpg',
    basePrice: 2000,
    hotelPricePerNight: 3000,
  },
  {
    id: 2,
    name: 'Rishikesh',
    image: 'https://www.justahotels.com/wp-content/uploads/2023/10/Places-To-Visit-in-Rishikesh-scaled.jpeg',
    basePrice: 1500,
    hotelPricePerNight: 2500,
  },
  {
    id: 3,
    name: 'Mussoorie',
    image: 'https://media1.thrillophilia.com/filestore/8g04nqjtiivm7nglko8db34bygwd_shutterstock_2365470931%20(1).jpg?w=400&dpr=2',
    basePrice: 2500,
    hotelPricePerNight: 4000,
  },
  {
    id: 4,
    name: 'Auli',
    image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766',
    basePrice: 3000,
    hotelPricePerNight: 5000,
  },
  {
    id: 5,
    name: 'Jim Corbett',
    image: 'https://corbettgov.org/assets/images/jungle-safari-in-jim-corbett-national-park-1200x900.webp',
    basePrice: 3500,
    hotelPricePerNight: 6000,
  },
  {
    id: 6,
    name: 'Valley of Flowers',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2800,
    hotelPricePerNight: 4500,
  },
  {
    id: 7,
    name: 'Dehradun',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 1800,
    hotelPricePerNight: 3200,
  },
  {
    id: 8,
    name: 'Haridwar',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 1200,
    hotelPricePerNight: 2000,
  },
  {
    id: 9,
    name: 'Almora',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2200,
    hotelPricePerNight: 3500,
  },
  {
    id: 10,
    name: 'Ranikhet',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2400,
    hotelPricePerNight: 3800,
  },
  {
    id: 11,
    name: 'Chopta',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2600,
    hotelPricePerNight: 4200,
  },
  {
    id: 12,
    name: 'Kausani',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2300,
    hotelPricePerNight: 3700,
  },
  {
    id: 13,
    name: 'Pithoragarh',
    image: 'https://images.unsplash.com/photo-1581772136271-1e822df9c9f3',
    basePrice: 2700,
    hotelPricePerNight: 4300,
  }
];

const transportOptions = [
  { id: 'bus', name: 'Bus', icon: Bus, price: 500 },
  { id: 'car', name: 'Car Rental', icon: Car, price: 2000 },
  { id: 'flight', name: 'Flight', icon: Plane, price: 5000 },
];

const Feature = () => {
  const [search, setSearch] = useState('');
  const [showPeopleDropdown, setShowPeopleDropdown] = useState(false);
  const [peopleSelection, setPeopleSelection] = useState({
    adults: 1,
    children: 0,
    rooms: 1
  });
  const [days, setDays] = useState(1);
  const [nights, setNights] = useState(1);
  const [transport, setTransport] = useState(transportOptions[0].id);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookedDestination, setBookedDestination] = useState('');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPeopleDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase())
  );

  const calculateTotalBudget = (destination) => {
    const transportCost = transportOptions.find(t => t.id === transport)?.price || 0;
    const totalPeople = peopleSelection.adults + peopleSelection.children;
    return (destination.basePrice * totalPeople) + 
           (destination.hotelPricePerNight * nights * peopleSelection.rooms) + 
           (transportCost * totalPeople);
  };

  const handleBook = (destination) => {
    setBookedDestination(destination.name);
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  const updatePeopleSelection = (type, operation) => {
    setPeopleSelection(prev => {
      const newValue = operation === 'increment' ? prev[type] + 1 : Math.max(0, prev[type] - 1);

      if (type === 'adults' && newValue < 1) return prev;
      if (type === 'rooms' && newValue < 1) return prev;

      return {
        ...prev,
        [type]: newValue
      };
    });
  };

  const getPeopleSelectionText = () => {
    const { adults, children, rooms } = peopleSelection;
    return `${adults} Adult${adults !== 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
  };

  const TransportIcon = transportOptions.find(t => t.id === transport)?.icon || Bus;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-8 relative">
        <div className="mb-8">
          {/* Wider Search Bar */}
          <div className="flex items-center bg-white rounded-xl shadow-lg p-2 mb-6 border-2 border-indigo-100 focus-within:border-indigo-300 transition-colors w-full">
            <Search className="w-6 h-6 text-indigo-400 ml-3" />
            <input
              type="text"
              placeholder="Search for destinations in Uttarakhand..."
              className="w-full px-4 py-3 rounded-xl focus:outline-none text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Wider Filter Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 w-full">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowPeopleDropdown(!showPeopleDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 border-2 rounded-xl bg-white shadow-md hover:border-indigo-300 transition-colors focus:outline-none focus:border-indigo-400"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-700">{getPeopleSelectionText()}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-indigo-400 transition-transform ${showPeopleDropdown ? 'transform rotate-180' : ''}`} />
              </button>

              {showPeopleDropdown && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl z-10 p-4 border-2 border-indigo-100">
                  {[
                    { label: 'Adults', key: 'adults' },
                    { label: 'Children', key: 'children' },
                    { label: 'Rooms', key: 'rooms' }
                  ].map(({ label, key }) => (
                    <div key={key} className="flex items-center justify-between py-3 border-b border-indigo-50 last:border-0">
                      <span className="text-gray-700 font-medium">{label}</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updatePeopleSelection(key, 'decrement')}
                          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-indigo-500" />
                        </button>
                        <span className="w-6 text-center font-medium">{peopleSelection[key]}</span>
                        <button
                          onClick={() => updatePeopleSelection(key, 'increment')}
                          className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-indigo-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium w-24">Days:</label>
              <input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(Math.max(1, parseInt(e.target.value)))}
                className="w-full px-4 py-3 border-2 rounded-xl shadow-md focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium w-24">Nights:</label>
              <input
                type="number"
                min="1"
                value={nights}
                onChange={(e) => setNights(Math.max(1, parseInt(e.target.value)))}
                className="w-full px-4 py-3 border-2 rounded-xl shadow-md focus:outline-none focus:border-indigo-400 transition-colors"
              />
            </div>
          </div>

          {/* Wider Transport Selector */}
          <div className="flex items-center gap-2 mb-8 w-full">
            <label className="text-gray-700 font-medium w-24">Transport:</label>
            <div className="relative flex-grow">
              <select
                value={transport}
                onChange={(e) => setTransport(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-md appearance-none focus:outline-none focus:border-indigo-400 transition-colors bg-white"
              >
                {transportOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} (₹{option.price}/person)
                  </option>
                ))}
              </select>
              <TransportIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
            </div>
          </div>
        </div>

        {/* Wider Destination Cards */}

        <div className="w-full">
          <div className="flex flex-col gap-6">
            {filteredDestinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`w-full ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl border-2 border-indigo-50 hover:border-indigo-100 w-full">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full md:w-1/3 h-48 object-cover"
                    />
                    <div className="p-6 flex-grow">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{dest.name}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <p className="text-sm text-gray-600">Base Price: ₹{dest.basePrice}/person</p>
                        <p className="text-sm text-gray-600">Hotel: ₹{dest.hotelPricePerNight}/night</p>
                        <p className="text-sm text-gray-600">Transport: ₹{transportOptions.find(t => t.id === transport)?.price || 0}/person</p>
                        <p className="text-sm text-gray-600">Duration: {days} day{days !== 1 ? 's' : ''}, {nights} night{nights !== 1 ? 's' : ''}</p>
                      </div>
                      <div className="gap-48 flex items-center ">
                        <p className="text-lg font-semibold text-indigo-600">
                          Total: ₹{calculateTotalBudget(dest)}
                        </p>
                        <button
                          onClick={() => handleBook(dest)}
                          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-colors shadow-md hover:shadow-lg"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


            

        {showBookingSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl p-8 text-center animate-bounce shadow-2xl border-2 border-indigo-100">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Woohoo! 🎉</h3>
              <p className="text-gray-600">
                Pack your bags! Your amazing adventure to {bookedDestination} awaits!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;