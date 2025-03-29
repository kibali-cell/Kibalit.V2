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

  // Calculate flight duration from ISO duration string (e.g., "PT13H7M")
  const calculateDuration = (durationString) => {
    if (!durationString) return 'N/A';
    const hours = durationString.match(/(\d+)H/)?.[1] || 0;
    const minutes = durationString.match(/(\d+)M/)?.[1] || 0;
    if (hours === 0) return `${minutes}mins`;
    return `${hours}hr ${minutes}mins`;
  };

  // Get the first slice and segment from the flight data
  const flightSlice = flight.slices?.[0];
  const flightSegment = flightSlice?.segments?.[0];

  if (!flightSegment) return null;

  const duration = calculateDuration(flightSlice.duration);

  // PricingCard component with dynamic currency
  const PricingCard = ({ price, type, currency }) => (
    <div className="border rounded-lg p-4">
      <div className="text-lg font-semibold mb-2">
        {currency || 'KES'} {price ? price.toLocaleString() : 'N/A'}
      </div>
      <div className="text-sm text-gray-600 mb-2">{type}</div>
      <div className="space-y-2 mb-4">
        {flightSegment.passengers[0].baggages.map((baggage, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {baggage.quantity}x {baggage.type === 'carry_on' ? 'Hand baggage' : 'Checked baggage'} included
          </div>
        ))}
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
              {formatTime(flightSegment.departing_at)} - {formatTime(flightSegment.arriving_at)} ({duration})
            </div>
            <div className="text-sm text-gray-500">{flightSegment.marketing_carrier.name}</div>
          </div>

          {/* Flight Route Details */}
          <div className="relative mb-8 bg-appBg py-2">
            <div className="flex px-4">
              <div className="space-y-5 font-medium">
                <div>
                  <div className="font-medium">{formatTime(flightSegment.departing_at)} - {flightSegment.origin.city_name}</div>
                  <div className="font-medium">{flightSegment.origin.iata_code}</div>
                </div>
                <div className="space-y-1 mb-6">
                  <div>{duration} flight</div>
                  <div>Flight {flightSegment.marketing_carrier_flight_number}</div>
                  <div>{flightSegment.passengers[0].cabin_class_marketing_name}</div>
                </div>
                <div>
                  <div className="font-medium">{formatTime(flightSegment.arriving_at)} - {flightSegment.destination.city_name}</div>
                  <div>{flightSegment.destination.iata_code}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 gap-4">
            <PricingCard
              price={flight.total_amount}
              type={flightSegment.passengers[0].cabin_class_marketing_name}
              currency={flight.total_currency}
            />
          </div>
        </div>
      </div>

      <FlightExtrasPanel
        isOpen={isExtrasOpen}
        onClose={() => setIsExtrasOpen(false)}
        flight={flight}
        basePrice={flight.total_amount}
      />
    </div>
  );
};

export default FlightDetailsPanel;