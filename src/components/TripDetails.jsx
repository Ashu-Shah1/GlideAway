import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";



const TripDetails = () => {
  const { state } = useLocation();
  const trip = state?.trip;
  const navigate = useNavigate();

  if (!trip) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>No trip data found. Please select a trip from your trips list.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2" /> Back to My Trips
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {trip.destination} Trip
      </h1>
      <p className="text-gray-600 mb-6">
        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
      </p>

      <div className="space-y-6">
        {trip.itinerary?.days?.map((day) => (
          <div key={day.day} className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Day {day.day}</h2>
            
            <div className="space-y-4">
              {day.activities.map((activity, idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium">{activity.name}</h3>
                    <p className="text-gray-600">{activity.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {activity.time}
                      </span>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {activity.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
      
    </div>
  );
};

export default TripDetails;