import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaStar, FaMapMarkerAlt, FaBed, FaMoneyBillWave, FaCalendarAlt,
  FaSearch, FaUser, FaHotel, FaFilter, FaTimes
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";

const HotelPage = () => {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    arrivalDate: new Date().toISOString().split('T')[0],
    departureDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    adults: 2,
    children: 0,
    rooms: 1
  });
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    rating: 0,
    amenities: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState({});

  // Normalize image URLs
  const normalizeImageUrl = (url) => {
    if (!url) return null;
    
    // Fix common URL patterns
    if (url.includes('square50')) return url.replace('square50', 'square600');
    if (url.includes('square6000')) return url.replace('square6000', 'square600');
    if (url.includes('square200')) return url.replace('square200', 'square600');
    
    // If URL doesn't match any pattern but has known domain
    if (url.includes('bstatic.com')) {
      return url.replace(/\/(square|max)\d+/, '/square600');
    }
    
    return url;
  };

  // Preload images when hotels data changes
  useEffect(() => {
    if (hotels.length > 0) {
      const imageUrls = hotels.flatMap(hotel => 
        hotel.property?.photoUrls?.map(url => normalizeImageUrl(url)).filter(url => url) || []
      );
      
      const preload = async () => {
        const loaded = {};
        await Promise.all(imageUrls.map(url => {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              loaded[url] = true;
              resolve();
            };
            img.onerror = () => {
              // Try with a different size if the first attempt fails
              const fallbackUrl = url.includes('square600') 
                ? url.replace('square600', 'square300')
                : url;
              const fallbackImg = new Image();
              fallbackImg.src = fallbackUrl;
              fallbackImg.onload = () => {
                loaded[fallbackUrl] = true;
                resolve();
              };
              fallbackImg.onerror = () => resolve();
            };
          });
        }));
        setPreloadedImages(loaded);
      };
      
      preload();
    }
  }, [hotels]);

  // Apply filters when hotels or filters change
  useEffect(() => {
    if (hotels.length > 0) {
      const filtered = hotels.filter(hotel => {
        const price = hotel.property?.priceBreakdown?.grossPrice?.value || 0;
        const rating = hotel.property?.reviewScore || 0;
        
        return (
          price >= filters.priceRange[0] &&
          price <= filters.priceRange[1] &&
          rating >= filters.rating
        );
      });
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels([]);
    }
  }, [hotels, filters]);

  const ImageWithFallback = ({ src, alt, className }) => {
    const getFallbackImage = () => {
      return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNDAwIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiPkhvdGVsIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    };
    
    const [imgSrc, setImgSrc] = useState(getFallbackImage());
    const [imageLoading, setImageLoading] = useState(true);

    useEffect(() => {
      if (!src) {
        setImageLoading(false);
        return;
      }

      const url = normalizeImageUrl(src);
      if (!url) {
        setImageLoading(false);
        return;
      }

      setImageLoading(true);
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setImgSrc(url);
        setImageLoading(false);
      };
      img.onerror = () => {
        // Try fallback size
        const fallbackUrl = url.includes('square600') 
          ? url.replace('square600', 'square300')
          : url;
        const fallbackImg = new Image();
        fallbackImg.src = fallbackUrl;
        fallbackImg.onload = () => {
          setImgSrc(fallbackUrl);
          setImageLoading(false);
        };
        fallbackImg.onerror = () => {
          setImgSrc(getFallbackImage());
          setImageLoading(false);
        };
      };
    }, [src]);

    return (
      <div className="relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-xl"></div>
        )}
        <img
          src={imgSrc}
          alt={alt}
          className={`${className} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
        />
      </div>
    );
  };

  const fetchHotels = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setHotels([]);
    setPreloadedImages({});

    try {
      const destRes = await axios.get(
        "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
        {
          params: { query: city },
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": "980b26d263mshae216a32f98a796p1286f8jsn12966135627d",
          },
        }
      );

      const destination = destRes.data?.data[0];
      if (!destination) {
        setError("City not found. Try another location.");
        setLoading(false);
        return;
      }

      const hotelRes = await axios.get(
        "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels",
        {
          params: {
            dest_id: destination.dest_id,
            search_type: destination.search_type,
            adults: searchParams.adults,
            children_age: Array(searchParams.children).fill(0).join(','),
            room_qty: searchParams.rooms,
            arrival_date: searchParams.arrivalDate,
            departure_date: searchParams.departureDate,
            page_number: 1,
            languagecode: "en-us",
            currency_code: "INR"
          },
          headers: {
            "x-rapidapi-host": "booking-com15.p.rapidapi.com",
            "x-rapidapi-key": "980b26d263mshae216a32f98a796p1286f8jsn12966135627d",
          },
        }
      );

      const hotelList = hotelRes.data?.data?.hotels || [];
      setHotels(hotelList);
      
      if (hotelList.length === 0) {
        setError("No hotels found. Try different dates or location.");
      }
    } catch (err) {
      console.error("Hotel search error:", err);
      setError("Failed to load hotels. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const parseHotelDetails = (hotel) => {
    const parts = hotel.accessibilityLabel?.split('\n')?.filter(p => p.trim()) || [];
    return {
      name: parts[0]?.split('.')[0]?.trim() || hotel.property?.name || "Unnamed Hotel",
      rating: hotel.property?.reviewScore || 0,
      reviewCount: hotel.property?.reviewCount || 0,
      location: parts[1]?.trim() || "Location not specified",
      roomType: parts[2]?.trim() || "Room details not available",
      price: hotel.property?.priceBreakdown?.grossPrice?.value || 0,
      priceDisplay: parts[3]?.trim() || "Price not available",
      taxes: parts[4]?.trim() || "",
      currency: hotel.property?.priceBreakdown?.grossPrice?.currency || "INR"
    };
  };

  const handlePriceChange = (min, max) => {
    setFilters({...filters, priceRange: [min, max]});
  };

  const handleRatingChange = (rating) => {
    setFilters({...filters, rating});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl mb-8">Discover the best hotels at amazing prices</p>
          
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City or Hotel"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium text-gray-800 bg-white"
                  />
                </div>
              </div>
              
              {/* Dates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={searchParams.arrivalDate}
                    onChange={(e) => setSearchParams({...searchParams, arrivalDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={searchParams.departureDate}
                    onChange={(e) => setSearchParams({...searchParams, departureDate: e.target.value})}
                    min={searchParams.arrivalDate}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>
              </div>
              
              {/* Guests & Search Button */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests & Rooms</label>
                <div className="flex gap-2 flex-grow">
                  <div className="relative flex-1">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <select
                      value={searchParams.adults}
                      onChange={(e) => setSearchParams({...searchParams, adults: parseInt(e.target.value)})}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Adult' : 'Adults'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={fetchHotels}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <FaSearch className="mr-2" />
                    )}
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Searching for hotels...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {filteredHotels.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar - Mobile */}
            <div className="md:hidden">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
              >
                <FaFilter /> Filters
              </button>
              
              {showFilters && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold">Filters</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <FaTimes />
                    </button>
                  </div>
                  <FilterSection 
                    filters={filters} 
                    onPriceChange={handlePriceChange} 
                    onRatingChange={handleRatingChange} 
                  />
                </div>
              )}
            </div>
            
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-md sticky top-4">
                <h3 className="font-bold text-lg mb-4">Filters</h3>
                <FilterSection 
                  filters={filters} 
                  onPriceChange={handlePriceChange} 
                  onRatingChange={handleRatingChange} 
                />
              </div>
            </div>
            
            {/* Hotels List */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredHotels.length} Hotels in {city}
                </h2>
                <div className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
                  {new Date(searchParams.arrivalDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                  {new Date(searchParams.departureDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' • '}
                  {searchParams.adults} {searchParams.adults === 1 ? 'Adult' : 'Adults'}
                  {' • '}
                  {searchParams.rooms} {searchParams.rooms === 1 ? 'Room' : 'Rooms'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredHotels.map((hotel) => {
                  const details = parseHotelDetails(hotel);
                  
                  return (
                    <div key={hotel.hotel_id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={hotel.property?.photoUrls?.[0]}
                          alt={details.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
                          <FaStar className="mr-1" />
                          {details.rating.toFixed(1)}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{details.name}</h3>
                        
                        <div className="flex items-start text-gray-600 mb-2">
                          <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{details.location}</span>
                        </div>
                        
                        <div className="flex items-start text-gray-600 mb-3">
                          <FaBed className="mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm">{details.roomType}</span>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-green-600 font-medium">
                              <FaMoneyBillWave className="mr-2" />
                              {details.priceDisplay}
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-500">
                              <IoIosTime className="mr-1" />
                              {hotel.property?.checkin?.fromTime || '12:00'} - {hotel.property?.checkout?.untilTime || '10:00'}
                            </div>
                          </div>
                          
                          {details.taxes && (
                            <div className="text-xs text-gray-500 mt-1">
                              +{details.taxes}
                            </div>
                          )}
                        </div>
                        
                        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center">
                          <FaHotel className="mr-2" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          !loading && !error && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">Find your perfect stay</h3>
              <p className="text-gray-600">Search for hotels in your desired location</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const FilterSection = ({ filters, onPriceChange, onRatingChange }) => {
  const priceMarks = {
    0: '₹0',
    10000: '₹10k',
    20000: '₹20k',
    30000: '₹30k',
    40000: '₹40k',
    50000: '₹50k+'
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="px-2">
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => onPriceChange(filters.priceRange[0], e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            {Object.entries(priceMarks).map(([value, label]) => (
              <span key={value}>{label}</span>
            ))}
          </div>
          <div className="text-sm mt-2">
            Selected: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Minimum Rating</h4>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star)}
              className={`px-3 py-1 rounded-full ${filters.rating >= star ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {star} <FaStar className="inline ml-1" />
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Amenities</h4>
        <div className="space-y-2">
          {['Free WiFi', 'Pool', 'Gym', 'Parking', 'Restaurant'].map(amenity => (
            <label key={amenity} className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2 rounded text-blue-600 focus:ring-blue-500"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelPage;