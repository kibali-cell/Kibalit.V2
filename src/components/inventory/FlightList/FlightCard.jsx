import { IoIosAirplane } from 'react-icons/io';

const FlightCard = ({ flight, onClick }) => {
  // Helper function to format ISO date strings to readable time (e.g., "10:00")
  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate flight duration in "Xhr Ymins" format
  const calculateDuration = () => {
    if (!flight.departureTime || !flight.arrivalTime) return 'N/A';
    const departTime = new Date(flight.departureTime);
    const arriveTime = new Date(flight.arrivalTime);
    const diffMs = arriveTime - departTime;
    const totalMinutes = Math.round(diffMs / 60000); // Total minutes

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes}mins`; // e.g., "45mins"
    return `${hours}hr ${minutes}mins`; // e.g., "1hr 56mins"
  };

  // Check if this is a return trip (more than one slice)
  const isReturnTrip = flight.slices && flight.slices.length > 1;

  // Assume flight.logo is provided by the API or mapped data; fallback to a default if not available
  const airlineLogo = flight.logo || 'https://via.placeholder.com/20'; // Default placeholder logo

  return (
    <div
      className="bg-white p-4 rounded-sm shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        {/* Departure Details */}
        <div className="flex flex-col">
          <div className="text-lg font-bold">{flight.originCode || 'N/A'}</div>
          <div className="text-sm text-gray-600">{flight.originCity || 'Unknown'}</div>
          <div className="text-sm text-gray-500">{formatTime(flight.departureTime)}</div>
          <div className="text-sm text-gray-600 mt-2 flex items-center gap-1">
            <img
              src={airlineLogo}
              alt={`${flight.airline} logo`}
              className="w-5 h-5 object-contain"
            />
            <span>{flight.airline || 'Unknown Airline'}</span>
          </div>
        </div>

        {/* Flight Path Graphic */}
        <div className="flex-1 flex items-center justify-center h-24">
          <div className="w-full flex flex-col items-center justify-center p-12">
            <div className="w-full flex items-center justify-center">
              <div className="h-px flex-1 border-t-2 border-dashed border-gray-300"></div>
              <div className="mx-2 text-gray-400 relative">
                <IoIosAirplane className="-rotate-45" />
                {isReturnTrip && (
                  <span className="absolute -top-2 -right-2 text-xs text-blue-500">↔</span>
                )}
              </div>
              <div className="h-px flex-1 border-t-2 border-dashed border-gray-300"></div>
            </div>
            <span className="text-xs text-gray-500 mt-2">{calculateDuration()}</span>
          </div>
        </div>

        {/* Arrival Details */}
        <div className="flex flex-col items-end">
          <div className="text-lg font-bold">{flight.destinationCode || 'N/A'}</div>
          <div className="text-sm text-gray-600">{flight.destinationCity || 'Unknown'}</div>
          <div className="text-sm text-gray-500">{formatTime(flight.arrivalTime)}</div>
          <div className="flex gap-2 mt-2 items-center">
            {flight.hasPolicy && (
              <span className="px-2 py-1 text-xs rounded-full bg-purple-50 text-purple-600 border border-purple-200">
                Policy
              </span>
            )}
            <span className="px-2 py-1 text-xs rounded-full bg-gray-900 text-white">
              Ksh {flight.price ? flight.price.toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;