import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, Utensils, Mountain, Landmark, Moon, ShoppingBag, ArrowRight } from 'lucide-react';
import { spiritualSites, adventureSpots } from '../data/uttarakhandData';
import TripCard from './TripCard';

const TripPlanner = () => {
  const [step, setStep] = useState(1);
  const [destination, setDestination] = useState('');
  const [tripLength, setTripLength] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [travelCompanions, setTravelCompanions] = useState('solo');
  const [interests, setInterests] = useState([]);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoadingTrips, setIsLoadingTrips] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const [showMyTrips, setShowMyTrips] = useState(false);
  const [selectedTripCategory, setSelectedTripCategory] = useState('upcoming');

const [myTrips, setMyTrips] = useState(() => {
    try {
      const savedTrips = localStorage.getItem('uttarakhandTrips');
      if (savedTrips) {
        const parsed = JSON.parse(savedTrips);
        return {
          current: Array.isArray(parsed.current) ? parsed.current : [],
          upcoming: Array.isArray(parsed.upcoming) ? parsed.upcoming : [],
          completed: Array.isArray(parsed.completed) ? parsed.completed : []
        };
      }
    } catch (e) {
      console.error('Failed to parse saved trips', e);
    }
    return {
      current: [],
      upcoming: [],
      completed: []
    };
  });

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('uttarakhandTrips', JSON.stringify(myTrips));
  }, [myTrips]);

  // Check and update trip statuses periodically
  useEffect(() => {
    const checkTripStatuses = () => {
      setMyTrips(prev => {
        let hasChanges = false;
        const updatedTrips = { ...prev };
        
        // Check upcoming trips
        updatedTrips.upcoming = updatedTrips.upcoming.filter(trip => {
          const newStatus = getTripStatus(new Date(trip.startDate), new Date(trip.endDate));
          if (newStatus !== 'upcoming') {
            hasChanges = true;
            updatedTrips[newStatus].push({ ...trip, status: newStatus });
            return false;
          }
          return true;
        });

        // Check current trips
        updatedTrips.current = updatedTrips.current.filter(trip => {
          const newStatus = getTripStatus(new Date(trip.startDate), new Date(trip.endDate));
          if (newStatus !== 'current') {
            hasChanges = true;
            updatedTrips[newStatus].push({ ...trip, status: newStatus });
            return false;
          }
          return true;
        });
        
        return hasChanges ? updatedTrips : prev;
      });
    };

    // Check statuses when component mounts
    checkTripStatuses();
    
    // Set up daily check
    const interval = setInterval(checkTripStatuses, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadTrips = () => {
      try {
        const savedTrips = localStorage.getItem('uttarakhandTrips');
        if (savedTrips) {
          const parsed = JSON.parse(savedTrips);
          setMyTrips({
            current: Array.isArray(parsed.current) ? parsed.current : [],
            upcoming: Array.isArray(parsed.upcoming) ? parsed.upcoming : [],
            completed: Array.isArray(parsed.completed) ? parsed.completed : []
          });
        }
      } catch (e) {
        console.error('Failed to load trips', e);
      } finally {
        setIsLoadingTrips(false);
      }
    };
  
    loadTrips();
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      // Ignore events triggered by this tab
      if (e.key === 'uttarakhandTrips' && e.storageArea === localStorage) {
        try {
          const currentStorage = JSON.parse(localStorage.getItem('uttarakhandTrips') || '{}');
          if (JSON.stringify(myTrips) !== JSON.stringify(currentStorage)) {
            const updatedTrips = {
              current: Array.isArray(currentStorage.current) ? currentStorage.current : [],
              upcoming: Array.isArray(currentStorage.upcoming) ? currentStorage.upcoming : [],
              completed: Array.isArray(currentStorage.completed) ? currentStorage.completed : []
            };
            setMyTrips(updatedTrips);
          }
        } catch (error) {
          console.error('Error handling storage change', error);
        }
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [myTrips]); // Add myTrips as dependency

  const getTripStatus = (startDate, endDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (startDate > today) return 'upcoming';
    if (endDate < today) return 'completed';
    return 'current';
  };

  const deleteTrip = (tripId) => {
    // Create the updated trips object first
    const updatedTrips = {
      current: myTrips.current.filter(trip => trip.id !== tripId),
      upcoming: myTrips.upcoming.filter(trip => trip.id !== tripId),
      completed: myTrips.completed.filter(trip => trip.id !== tripId)
    };
  
    // Synchronously update localStorage FIRST
    window.localStorage.setItem('uttarakhandTrips', JSON.stringify(updatedTrips));
    
    // Then update state
    setMyTrips(updatedTrips);
  };

  const handleSaveItinerary = () => {
    if (!itinerary) return;
    
    const today = new Date();
    const tripDate = travelDate ? new Date(travelDate) : new Date();
    const tripEndDate = new Date(tripDate);
    tripEndDate.setDate(tripDate.getDate() + tripLength);
    
    const newTrip = {
      id: Date.now(),
      destination,
      itinerary,
      startDate: tripDate.toISOString().split('T')[0],
      endDate: tripEndDate.toISOString().split('T')[0],
      status: getTripStatus(tripDate, tripEndDate),
      createdAt: new Date().toISOString()
    };
    
    setMyTrips(prev => ({
      ...prev,
      [newTrip.status]: [...prev[newTrip.status], newTrip]
    }));

    setShowSavePopup(true);
    setTimeout(() => {
      setShowSavePopup(false);
    }, 3500);
  };

  const handleViewDetails = (trip) => {
    setItinerary(trip.itinerary);
    setStep(4);
    setShowMyTrips(false);
  };

  const renderMyTripsModal = () => {
    if (!showMyTrips) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Saved Trips</h2>
            <button 
              onClick={() => setShowMyTrips(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${selectedTripCategory === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedTripCategory('upcoming')}
            >
              Upcoming
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedTripCategory === 'current' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedTripCategory('current')}
            >
              Current
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedTripCategory === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setSelectedTripCategory('completed')}
            >
              Completed
            </button>
          </div>

          <div className="space-y-4">
            {myTrips[selectedTripCategory]?.length > 0 ? (
              myTrips[selectedTripCategory].map(trip => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onDelete={deleteTrip}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No {selectedTripCategory} trips found</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Rest of your existing code (uttarakhandDistricts, uttarakhandDestinations, interestOptions,
  // generateItinerary, toggleInterest, handleDestinationSearch, selectDestination, renderStep)
  const uttarakhandDistricts = [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", 
    "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", 
    "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
  ];

  const uttarakhandDestinations = [
    { id: 1, name: 'Nainital', image: 'https://www.naturetravelagency.com/uploads/1711105196best%20time%20to%20visit%20Nainita.jpg' },
    { id: 2, name: 'Rishikesh', image: 'https://media.holidify.com/images/cmsuploads/compressed/laxman-jhula-rishikesh_20241205131202.jpg' },
    { id: 3, name: 'Mussoorie', image: 'https://t.eucdn.in/tourism/lg/kempty-falls-3540012.webp' },
    { id: 4, name: 'Auli', image: 'https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/11/Things-To-Do-In-Auli-Cover-Photo-3-840x425.jpg' },
    { id: 5, name: 'Jim Corbett', image: 'https://cdn.getyourguide.com/img/tour/64997c7cc18ae.jpeg/98.jpg' },
    { id: 6, name: 'Valley of Flowers', image: 'https://t.eucdn.in/tourism/lg/valley-of-flowers-5353172.webp' },
  ];

  
  const interestOptions = [
    { id: 'attractions', name: 'Must-see attractions', icon: Star },
    { id: 'outdoors', name: 'Outdoor adventures', icon: Mountain },
    { id: 'culture', name: 'Culture & history', icon: Landmark }
  ];
  // Generate sample itinerary
  const generateItinerary = () => {
    setLoading(true);
    
        setTimeout(() => {
            // Get activities based on selected interests and destination
            const getActivities = () => {
              let activities = [];
        // Must-see attractions and Culture & history
        if (interests.includes('attractions') || interests.includes('culture')) {
            const spiritualSitesForDestination = spiritualSites.filter(
              site => site.location.toLowerCase().includes(destination.toLowerCase())
            );
            
            spiritualSitesForDestination.forEach((site, i) => {
              activities.push({
                type: 'attraction',
                name: site.name,
                description: site.description,
                time: i === 0 ? 'Morning' : i === 1 ? 'Afternoon' : 'Evening',
                duration: '2 hours',
                rating: 4.5,
                image: site.image,
                location: site.location
              });
            });
          }
        // Outdoor adventures
        if (interests.includes('outdoors')) {
            const adventureSpotsForDestination = adventureSpots.filter(
              spot => spot.location.toLowerCase().includes(destination.toLowerCase())
            );
            
            adventureSpotsForDestination.forEach((spot, i) => {
              activities.push({
                type: 'activity',
                name: spot.name,
                description: spot.description,
                time: i === 0 ? 'Morning' : i === 1 ? 'Afternoon' : 'Evening',
                duration: '3 hours',
                rating: 4.7,
                image: spot.image,
                location: spot.location
              });
            });
          }
            
              
    return activities;
  };

      // Distribute activities across days
      const allActivities = getActivities();
      const activitiesPerDay = Math.ceil(allActivities.length / tripLength);
      
      const days = Array.from({ length: tripLength }, (_, dayIndex) => {
        const dayActivities = allActivities.slice(
          dayIndex * activitiesPerDay,
          (dayIndex + 1) * activitiesPerDay
        );
        
        // Fill with default activities if not enough
            while (dayActivities.length < 3) {
                const defaultActivities = [
                    {
                      type: 'shopping',
                      name: `Explore ${destination} Local Market`,
                      description: 'Experience the vibrant local culture and shop for souvenirs',
                      time: 'Morning',
                      duration: '2 hours',
                      rating: 4.2,
                      image: 'https://dehraduntourism.co.in/images/places-to-visit/header/tibetan-market-dehradun-header-dehradun-tourism.jpg.jpg',
                      location: destination
                    },
                    {
                      type: 'activity',
                      name: `${destination} Nature & Sightseeing`,
                      description: 'Visit scenic spots and enjoy the natural beauty of the region',
                      time: 'Afternoon',
                      duration: '3 hours',
                      rating: 4.7,
                      image: uttarakhandDestinations.find(d => d.name === destination)?.image || 'https://uttarakhandtourism.gov.in/sites/default/files/2020-09/nainital-lake.jpg',
                      location: destination
                    },
                    {
                        type: 'restaurant',
                        name: `Local ${destination} Cuisine`,
                        description: 'Taste authentic regional dishes at a popular local restaurant',
                        time: 'Evening',
                        duration: '1.5 hours',
                        rating: 4.5,
                        image: 'https://www.jaypeehotels.com/blog/wp-content/uploads/2024/04/BLOG-8-2.jpg',
                        location: destination
                      }
                    ];
                  
                    dayActivities.push(defaultActivities[dayActivities.length]);
              }
              
              return {
                day: dayIndex + 1,
                activities: dayActivities
              };
            });
            
            const sampleItinerary = {
              summary: `Your ${tripLength}-day trip to ${destination}`,
              days: days,
            recommendations: [
              'Try the local specialty dish',
              'Wear comfortable shoes for walking',
              'Visit the main square in the evening',
              'Book tickets in advance for popular attractions',
            ],
          };
          
          setItinerary(sampleItinerary);
          setLoading(false);
          setStep(4); // Move to itinerary display step
        }, 1500);
      };
    
      // Handle interest toggle
      const toggleInterest = (interestId) => {
        if (interests.includes(interestId)) {
          setInterests(interests.filter(id => id !== interestId));
        } else {
          setInterests([...interests, interestId]);
        }
      };
    
      // Handle destination search with district suggestions
      const handleDestinationSearch = (value) => {
        setDestination(value);
        if (value.length > 0) {
          const filteredDistricts = uttarakhandDistricts.filter(district =>
            district.toLowerCase().includes(value.toLowerCase())
          );
          const filteredDestinations = uttarakhandDestinations.filter(dest =>
            dest.name.toLowerCase().includes(value.toLowerCase())
          );
          
          // Combine both districts and destinations in suggestions
          const combinedSuggestions = [
            ...filteredDistricts.map(district => ({ id: district, name: district, type: 'district' })),
            ...filteredDestinations.map(dest => ({ ...dest, type: 'destination' }))
          ];
          
          setSuggestions(combinedSuggestions);
        } else {
          setSuggestions([]);
        }
      };
    
      // Handle destination selection from images
      const selectDestination = (name) => {
        setDestination(name);
        setSuggestions([]);
      };
    
    
      // Render current step
      const renderStep = () => {
        switch (step) {
          case 1:
            return (
                <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Where in Uttarakhand would you like to go?</h2>
                
                 {/* Destination Search */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Destination</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="mt-2 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search Uttarakhand destinations or districts..."
                  value={destination}
                  onChange={(e) => handleDestinationSearch(e.target.value)}
                />
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 max-h-60 overflow-y-auto">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => selectDestination(item.name)}
                    >
                      {item.type === 'district' ? (
                        <>
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="font-medium">{item.name} District</span>
                        </>
                      ) : (
                        <>
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          <span>{item.name}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
                
                {/* Popular Destinations Grid */}
                <div className="mt-8">
                  <h3 className="text-md font-medium text-gray-700 mb-6">Popular Destinations in Uttarakhand</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {uttarakhandDestinations.map((dest) => (
                      <div
                        key={dest.id}
                        className={`relative rounded-lg overflow-hidden h-40 cursor-pointer ${destination === dest.name ? 'ring-2 ring-indigo-500' : ''}`}
                        onClick={() => selectDestination(dest.name)}
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                          <h3 className="text-white font-medium">{dest.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Next Button */}
                <div className="mt-6">
                  <button
                    type="button"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
                    onClick={() => setStep(2)}
                    disabled={!destination}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          
          case 2:
            return (
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Tell us about your trip</h2>
                
                {/* Trip Length */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip Length (days)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={tripLength}
                      onChange={(e) => setTripLength(parseInt(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                        <option key={days} value={days}>
                          {days} day{days !== 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Travel Date */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                  />
                </div>
                
                {/* Travel Companions */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Companions</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={travelCompanions}
                      onChange={(e) => setTravelCompanions(e.target.value)}
                    >
                      <option value="solo">Solo</option>
                      <option value="couple">Couple</option>
                      <option value="friends">Friends</option>
                      <option value="family">Family</option>
                    </select>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm flex items-center"
                    onClick={() => setStep(3)}
                  >
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          
          case 3:
            return (
              <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">How do you want to spend your time in {destination}?</h2>
                
                {/* Interests */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {interestOptions.map((interest) => {
                      const Icon = interest.icon;
                      return (
                        <button
                          key={interest.id}
                          type="button"
                          className={`flex items-center px-4 py-2 rounded-md border ${
                            interests.includes(interest.id)
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                          onClick={() => toggleInterest(interest.id)}
                        >
                          <Icon className="h-5 w-5 mr-2" />
                          {interest.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md shadow-sm"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm"
                    onClick={generateItinerary}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate Itinerary'}
                  </button>
                </div>
              </div>
            );
          
          case 4:
            return (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{itinerary.summary}</h2>
                                          
                {/* Daily Itinerary */}
                <div className="space-y-6">
                  {itinerary.days.map((day) => (
                    <div key={day.day} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Day {day.day}</h3>
                      
                      <div className="space-y-4">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                                    <img
                                src={activity.image}
                                alt={activity.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-start">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                  {activity.type === 'attraction' && <Star className="h-5 w-5 text-indigo-600" />}
                                  {activity.type === 'restaurant' && <Utensils className="h-5 w-5 text-indigo-600" />}
                                    {activity.type === 'activity' && <Mountain className="h-5 w-5 text-indigo-600" />}
                                  {activity.type === 'shopping' && <ShoppingBag className="h-5 w-5 text-indigo-600" />}
                                </div>
                                <div className="flex-grow">
                                  <h4 className="text-md font-medium text-gray-900">{activity.name}</h4>
                                  <p className="text-sm text-gray-500">{activity.description || activity.cuisine}</p>
                                  <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <span>{activity.time}</span>
                                    <span className="mx-2">•</span>
                                    <span>{activity.duration}</span>
                                    <span className="mx-2">•</span>
                                    <span>{'★'.repeat(Math.floor(activity.rating))}{'☆'.repeat(5 - Math.floor(activity.rating))}</span>
                                    <span className="mx-2">•</span>
                                    <span>{activity.price}</span>
                                  </div>
                                  {activity.location && (
                                    <div className="mt-1 flex items-center text-sm text-gray-500">
                                      <MapPin className="w-4 h-4 mr-1" />
                                    <span>{activity.location}</span>
                                  </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Recommendations */}
                {itinerary.recommendations.length > 0 && (
                  <div className="mt-6 bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-md font-medium text-indigo-800 mb-2">Recommendations</h3>
                    <ul className="list-disc list-inside text-sm text-indigo-700 space-y-1">
                      {itinerary.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Save Button */}
                <div className="mt-6">
                {showSavePopup && (
                <div className="fixed top-6 right-6 z-50 bg-white border border-green-300 shadow-lg rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                <div className="text-green-600 text-xl">✅</div>
                <div className="text-green-700 font-semibold">Saved!</div>
                </div>
                )}
    
                  <button
                    type="button"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={handleSaveItinerary}
                  >
                    Save Itinerary
                  </button>
                </div>
              </div>
            );
          
          default:
            return null;
        }
      };

  return (
    <div className="bg-green-50 py-8 px-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      {isLoadingTrips ? (
          <div className="text-center py-8">Loading your trips...</div>
        ) : (

            <>
            <div className="flex justify-between items-center gap-2 mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Uttarakhand Trip Planner</h1>
              <button
                onClick={() => setShowMyTrips(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md shadow-sm"
              >
                My Trips
              </button>
            </div>
            
            {renderStep()}
            {renderMyTripsModal()}
        
            {showSavePopup && (
              <div className="fixed top-6 right-6 z-50 bg-white border border-green-300 shadow-lg rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                <div className="text-green-600 text-xl">✅</div>
                <div className="text-green-700 font-semibold">Trip Saved!</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TripPlanner;