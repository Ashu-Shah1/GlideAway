import React from 'react';

const TripCard = ({ trip, onDelete, onViewDetails }) => {
    // Format dates for display with error handling
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return 'Invalid date';
        }
    };

    const startDate = formatDate(trip.startDate);
    const endDate = formatDate(trip.endDate);
  
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

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete your trip to ${trip.destination}?`)) {
            onDelete(trip.id);
        }
    };

    const handleViewDetailsClick = (e) => {
        e.stopPropagation();
        onViewDetails(trip);
    };

    return (
        <div 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleViewDetailsClick}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="font-medium text-gray-900">{trip.destination}</h4>
                    <p className="text-sm text-gray-500">
                        {startDate} - {endDate} • {trip.itinerary?.days?.length || 0} days
                    </p>
                </div>
                <button 
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    aria-label={`Delete trip to ${trip.destination}`}
                >
                    Delete
                </button>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${status.bgColor} ${status.textColor}`}>
                    {status.text}
                </span>
                <button 
                    onClick={handleViewDetailsClick}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                    View Details <span className="ml-1">→</span>
                </button>
            </div>
        </div>
    );
};

export default TripCard;