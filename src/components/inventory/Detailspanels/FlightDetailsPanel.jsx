import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import FlightExtrasPanel from './FlightExtrasPanel';

const FlightDetailsPanel = ({ isOpen, onClose, flight }) => {
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);

  // Log flight prop for debugging
  useEffect(() => {
    console.log('FlightDetailsPanel flight prop:', flight);
  }, [flight]);

  if (!isOpen || !flight) return null;

  // Helper function to format ISO date strings to readable time (e.g., "10:00")
  const formatTime = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate flight duration in "Xhr Ymins" format
  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return 'N/A';
    const departTime = new Date(departure);
    const arriveTime = new Date(arrival);
    const diffMs = arriveTime - departTime;
    const totalMinutes = Math.round(diffMs / 60000); // Total minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours === 0 ? `${minutes}mins` : `${hours}hr ${minutes}mins`;
  };

  const duration = calculateDuration(flight.departureTime, flight.arrivalTime);

  // PricingCard component with dynamic currency
  const PricingCard = ({ price, type, currency }) => (
    <div className="border rounded-lg p-4">
      <div className="text-lg font-semibold mb-2">
        {currency || 'KES'} {price ? price.toLocaleString() : 'N/A'}
      </div>
      <div className="text-sm text-gray-600 mb-2">{type}</div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Hand baggage included
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          1st checked bag included
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          No change fee
        </div>
        <div className="pt-2 border-t border-gray-200 space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoCloseCircleOutline className="text-red-500 w-4 h-4" />
            Non-refundable
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoCloseCircleOutline className="text-red-500 w-4 h-4" />
            Non-refundable
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsExtrasOpen(true)}
        className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      >
        Select
      </button>
    </div>
  );

  // Define cabin classes with multipliers (placeholder until API provides real data)
  const cabinClasses = [
    { type: 'Economy', multiplier: 1 },
    { type: 'Business Class', multiplier: 1.5 },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl text-sm overflow-auto mb-10">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Flight Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Flight Time and Airline */}
          <div className="mb-6">
            <div className="text-label-1-semibold">
              {formatTime(flight.departureTime)} - {formatTime(flight.arrivalTime)} ({duration})
            </div>
            <div className="text-sm text-gray-500">{flight.airline || 'Unknown Airline'}</div>
          </div>

          {/* Flight Route Details */}
          <div className="relative mb-8 bg-appBg py-2">
            <div className="flex px-4">
              <div className="space-y-5 font-medium">
                <div>
                  <div className="font-medium">{formatTime(flight.departureTime)} - {flight.originCity}</div>
                  <div className="font-medium">{flight.originCode}</div>
                </div>
                <div className="space-y-1 mb-6">
                  <div>{duration} flight</div>
                  <div>Airbus 725</div> {/* Replace with flight.aircraft if available */}
                  <div>Economy</div>
                </div>
                <div>
                  <div className="font-medium">{formatTime(flight.arrivalTime)} - {flight.destinationCity}</div>
                  <div>{flight.destinationCode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 gap-4">
            {cabinClasses.map((cabin) => (
              <PricingCard
                key={cabin.type}
                price={flight.price * cabin.multiplier}
                type={cabin.type}
                currency={flight.currency}
              />
            ))}
          </div>
        </div>
      </div>
      <FlightExtrasPanel
        isOpen={isExtrasOpen}
        onClose={() => setIsExtrasOpen(false)}
        basePrice={flight.price || 0}
      />
    </div>
  );
};

export default FlightDetailsPanel;