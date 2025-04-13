import { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Star, 
  MapPin, 
  Filter, 
  Hotel, 
  Home, 
  Castle, 
  Loader2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Users,
  Clock,
  Heart
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'https://agoda-com.p.rapidapi.com';

const HotelSearch = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState({
    autoComplete: false,
    search: false,
    details: false,
    reviews: false
  });
  const [filters, setFilters] = useState({
    priceRange: [1000, 20000],
    types: [],
    rating: null,
    stayType: 'overnight',
    amenities: []
  });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [roomPrices, setRoomPrices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Popular destinations in Uttarakhand
  const popularDestinations = [
    "Rishikesh", "Mussoorie", "Nainital", "Kedarnath", 
    "Badrinath", "Dehradun", "Auli", "Jim Corbett", "Haridwar"
  ];

  // Common amenities
  const allAmenities = [
    "WiFi", "Pool", "Spa", "Restaurant", "Parking",
    "AC", "Breakfast", "Gym", "Pet Friendly", "Mountain View"
  ];

  // Debounced auto-complete search
  const fetchSuggestions = useCallback(async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    
    try {
      setLoading(prev => ({...prev, autoComplete: true}));
      const response = await axios.get(`${API_BASE_URL}/hotels/auto-complete`, {
        params: { query }
      });
      setSuggestions(response.data.slice(0, 5)); // Limit to 5 suggestions
    } catch (error) {
      console.error("Auto-complete error:", error);
    } finally {
      setLoading(prev => ({...prev, autoComplete: false}));
    }
  }, []);

  // Main hotel search function
  const searchHotels = useCallback(async (resetPage = true) => {
    if (resetPage) setPage(1);
    
    try {
      setLoading(prev => ({...prev, search: true}));
      const endpoint = filters.stayType === 'overnight' 
        ? '/hotels/search-overnight' 
        : '/hotels/search-day-use';
      
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params: {
          query: searchTerm,
          minPrice: filters.priceRange[0],
          maxPrice: filters.priceRange[1],
          types: filters.types.join(','),
          minRating: filters.rating,
          amenities: filters.amenities.join(','),
          page: resetPage ? 1 : page,
          limit: 12
        }
      });
      
      if (resetPage) {
        setHotels(response.data.results);
      } else {
        setHotels(prev => [...prev, ...response.data.results]);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(prev => ({...prev, search: false}));
    }
  }, [searchTerm, filters, page]);

  // Fetch hotel details
  const fetchHotelDetails = useCallback(async (hotelId) => {
    try {
      setLoading(prev => ({...prev, details: true}));
      setSelectedHotel(hotelId);
      
      // Parallel API calls for better performance
      const [details, others, prices, grid] = await Promise.all([
        axios.get(`${API_BASE_URL}/hotels/details`, { params: { hotelId } }),
        axios.get(`${API_BASE_URL}/hotels/details-others`, { params: { hotelId } }),
        axios.get(`${API_BASE_URL}/hotels/room-prices`, { params: { hotelId } }),
        axios.get(`${API_BASE_URL}/hotels/room-grid`, { params: { hotelId } })
      ]);
      
      setHotelDetails({
        ...details.data,
        ...others.data,
        rooms: [...prices.data, ...grid.data]
      });
      
      // Fetch reviews separately since they might be heavy
      fetchReviews(hotelId);
    } catch (error) {
      console.error("Details fetch error:", error);
    } finally {
      setLoading(prev => ({...prev, details: false}));
    }
  }, []);

  // Fetch reviews
  const fetchReviews = async (hotelId) => {
    try {
      setLoading(prev => ({...prev, reviews: true}));
      const response = await axios.get(`${API_BASE_URL}/hotels/reviews`, {
        params: { hotelId, limit: 5 }
      });
      setReviews(response.data);
    } catch (error) {
      console.error("Reviews fetch error:", error);
    } finally {
      setLoading(prev => ({...prev, reviews: false}));
    }
  };

  // Debounce and search effects
  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm, fetchSuggestions]);

  useEffect(() => {
    searchHotels(true);
  }, [searchTerm, filters, searchHotels]);

  // Filter handlers
  const handleTypeToggle = (type) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type) 
        ? prev.types.filter(t => t !== type) 
        : [...prev.types, type]
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [1000, 20000],
      types: [],
      rating: null,
      stayType: 'overnight',
      amenities: []
    });
  };

  // Image navigation
  const nextImage = () => {
    setCurrentImageIndex(prev => 
      (prev + 1) % (hotelDetails?.images?.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? (hotelDetails?.images?.length || 1) - 1 : prev - 1
    );
  };

  // Load more hotels
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Stays in Uttarakhand</h2>
        
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by destination or hotel name..."
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {loading.autoComplete && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            </div>
          )}
          
          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setSearchTerm(suggestion.name);
                    setSuggestions([]);
                  }}
                >
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <div>
                      <p className="font-medium">{suggestion.name}</p>
                      {suggestion.type && (
                        <p className="text-xs text-gray-500">{suggestion.type}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setFilters(prev => ({...prev, stayType: 'overnight'}))}
            className={`flex items-center px-4 py-2 rounded-lg ${filters.stayType === 'overnight' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          >
            <Clock className="h-4 w-4 mr-2" />
            Overnight Stays
          </button>
          <button
            onClick={() => setFilters(prev => ({...prev, stayType: 'day-use'}))}
            className={`flex items-center px-4 py-2 rounded-lg ${filters.stayType === 'day-use' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Day Use
          </button>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center px-4 py-2 bg-gray-100 rounded-lg"
          >
            <Filter className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {/* Popular destinations */}
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Popular in Uttarakhand:</h3>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map(destination => (
              <button
                key={destination}
                onClick={() => setSearchTerm(destination)}
                className={`px-3 py-1 rounded-full text-sm flex items-center ${searchTerm === destination ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <MapPin className="h-4 w-4 mr-1" />
                {destination}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar - Left */}
        <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Reset All
              </button>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
              </label>
              <div className="px-2">
                <input
                  type="range"
                  min="500"
                  max="30000"
                  step="500"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="500"
                  max="30000"
                  step="500"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
            </div>
            
            {/* Property Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => handleTypeToggle('hotel')}
                  className={`flex items-center w-full px-3 py-2 rounded-lg border ${filters.types.includes('hotel') ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                >
                  <Hotel className="h-4 w-4 mr-2" />
                  <span>Hotels</span>
                </button>
                <button
                  onClick={() => handleTypeToggle('airbnb')}
                  className={`flex items-center w-full px-3 py-2 rounded-lg border ${filters.types.includes('airbnb') ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span>Airbnb</span>
                </button>
                <button
                  onClick={() => handleTypeToggle('homestay')}
                  className={`flex items-center w-full px-3 py-2 rounded-lg border ${filters.types.includes('homestay') ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                >
                  <Home className="h-4 w-4 mr-2" />
                  <span>Homestay</span>
                </button>
                <button
                  onClick={() => handleTypeToggle('resort')}
                  className={`flex items-center w-full px-3 py-2 rounded-lg border ${filters.types.includes('resort') ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
                >
                  <Castle className="h-4 w-4 mr-2" />
                  <span>Resorts</span>
                </button>
              </div>
            </div>
            
            {/* Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilters(prev => ({
                      ...prev,
                      rating: prev.rating === star ? null : star
                    }))}
                    className={`p-2 rounded-full ${filters.rating && star <= filters.rating ? 'bg-yellow-100 text-yellow-500' : 'bg-gray-100 text-gray-400'}`}
                  >
                    <Star className="h-5 w-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="space-y-2">
                {allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${filters.amenities.includes(amenity) ? 'bg-indigo-50 text-indigo-700' : 'bg-white'}`}
                  >
                    <span className="w-5 h-5 mr-2 border rounded-sm flex items-center justify-center">
                      {filters.amenities.includes(amenity) && (
                        <span className="w-3 h-3 bg-indigo-600 rounded-sm"></span>
                      )}
                    </span>
                    {amenity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Hotel Results - Right */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {loading.search ? 'Searching...' : `${hotels.length} ${filters.stayType === 'overnight' ? 'Stays' : 'Day Use Options'} Found`}
            </h3>
            <div className="text-sm text-gray-500">
              {filters.types.length > 0 && (
                <span className="mr-2">
                  Types: {filters.types.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')}
                </span>
              )}
              {filters.rating && (
                <span>
                  Rating: {filters.rating}+ <Star className="inline h-4 w-4 fill-yellow-400 text-yellow-400" />
                </span>
              )}
            </div>
          </div>
          
          {loading.search ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : hotels.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map(hotel => (
                  <HotelCard 
                    key={hotel.id}
                    hotel={hotel}
                    stayType={filters.stayType}
                    onClick={() => fetchHotelDetails(hotel.id)}
                  />
                ))}
              </div>
              
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadMore}
                    disabled={loading.search}
                    className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center"
                  >
                    {loading.search ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : 'Load More'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-gray-500 mb-4">No properties found matching your criteria</p>
              <button 
                onClick={resetFilters}
                className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center mx-auto"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {loading.details ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
              </div>
            ) : (
              <>
                {/* Modal Header */}
                <div className="sticky top-0 bg-white z-10 border-b p-4 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">{hotelDetails?.name}</h3>
                  <button
                    onClick={() => setSelectedHotel(null)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6">
                  {/* Image Gallery */}
                  {hotelDetails?.images?.length > 0 && (
                    <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
                      <img
                        src={hotelDetails.images[currentImageIndex]}
                        alt={hotelDetails.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {hotelDetails.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full mr-4">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">{hotelDetails?.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-1" />
                          {hotelDetails?.location}
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-semibold mb-2">About this property</h4>
                      <p className="text-gray-700 mb-4">{hotelDetails?.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {hotelDetails?.amenities?.slice(0, 6).map((amenity, i) => (
                          <div key={i} className="flex items-center">
                            <span className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                            </span>
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Show all amenities
                      </button>
                    </div>
                    
                    {/* Booking Card */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-fit sticky top-4">
                      <h4 className="text-xl font-bold text-gray-800 mb-4">Price Details</h4>
                      
                      <div className="space-y-4 mb-6">
                        {hotelDetails?.rooms?.slice(0, 3).map((room, i) => (
                          <div key={i} className="border-b border-gray-200 pb-4">
                            <h5 className="font-medium">{room.type}</h5>
                            <div className="flex justify-between items-center mt-2">
                              <div>
                                <p className="text-2xl font-bold">₹{room.price.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{room.mealPlan || 'Room only'}</p>
                              </div>
                              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                                Book Now
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium">
                        View All Room Options
                      </button>
                    </div>
                  </div>
                  
                  {/* Reviews */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4">Guest Reviews</h4>
                    
                    {loading.reviews ? (
                      <div className="flex justify-center">
                        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                      </div>
                    ) : reviews.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviews.map((review, i) => (
                          <div key={i} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                              <div>
                                <p className="font-medium">{review.author}</p>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No reviews yet</p>
                    )}
                    
                    {reviews.length > 0 && (
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium mt-4">
                        See all reviews
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Hotel Card Component
const HotelCard = ({ hotel, stayType, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{hotel.rating}</span>
        </div>
        {stayType === 'day-use' && (
          <div className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs">
            Day Use
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{hotel.name}</h3>
        <p className="text-gray-600 mb-2 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {hotel.location}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-indigo-600">₹{hotel.price.toLocaleString()}</span>
            <span className="text-xs text-gray-500 ml-1">per {stayType === 'overnight' ? 'night' : 'day'}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle quick book
            }}
            className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
          >
            Quick Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelSearch;