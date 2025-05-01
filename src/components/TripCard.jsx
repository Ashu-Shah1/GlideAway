import React from 'react';

// const TripCard = ({ trip, onDelete, onViewDetails }) => {
//   const startDate = new Date(trip.startDate).toLocaleDateString();
//   const endDate = new Date(trip.endDate).toLocaleDateString();
  
//   return (
//     <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <div>
//           <h4 className="font-medium text-gray-900">{trip.destination}</h4>
//           <p className="text-sm text-gray-500">{startDate} - {endDate}</p>
//         </div>
//         <button 
//           onClick={() => onDelete(trip.id)}
//           className="text-red-500 hover:text-red-700"
//         >
//           Delete
//         </button>
//       </div>
      
//       <div className="mt-2 flex justify-between items-center">
//         <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
//           {trip.status === 'current' ? 'Ongoing' : 
//            trip.status === 'upcoming' ? 'Upcoming' : 'Completed'}
//         </span>
//         <button 
//           onClick={() => onViewDetails(trip)}
//           className="text-sm text-indigo-600 hover:text-indigo-800"
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TripCard;

const TripCard = ({ trip, onDelete, onViewDetails }) => {
    // Format dates for display
    const startDate = new Date(trip.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const endDate = new Date(trip.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  
    // Determine status display and styling
    const statusConfig = {
      current: {
        text: 'Ongoing',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-800'
      },
      upcoming: {
        text: 'Upcoming',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-800'
      },
      completed: {
        text: 'Completed',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800'
      }
    };
  
    const status = statusConfig[trip.status] || statusConfig.upcoming;
  
    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{trip.destination}</h4>
            <p className="text-sm text-gray-500">
              {startDate} - {endDate} • {trip.itinerary?.days?.length || 0} days
            </p>
          </div>
          <button 
            onClick={() => onDelete(trip.id)}
            className="text-red-500 hover:text-red-700 text-sm"
            aria-label="Delete trip"
          >
            Delete
          </button>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${status.bgColor} ${status.textColor}`}>
            {status.text}
          </span>
          <button 
            onClick={() => onViewDetails(trip)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View Details →
          </button>
        </div>
      </div>
    );
  };
  export default TripCard;