import { useState } from 'react';
import { MdFlightTakeoff, MdHotel, MdDirectionsBus, MdLocationOn } from 'react-icons/md';
import { IoIosAirplane } from 'react-icons/io';
import CheckOutPanel from './CheckoutPanel';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';

const AddMoreFlights = ({ isOpen, onClose, flight, travelers }) => {
  const [openCheckoutPanel, setOpenCheckoutPanel] = useState(false);

  if (!isOpen) return null;

  // Function to format dates like "TUE,16 • 14:05"
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const weekday = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
    const day = date.getDate();
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${weekday},${day} • ${time}`;
  };

  // Calculate flight duration in "Xhr Ymins" format
  const calculateDuration = () => {
    if (!flightSegment.departing_at || !flightSegment.arriving_at) return 'N/A';
    const departTime = new Date(flightSegment.departing_at);
    const arriveTime = new Date(flightSegment.arriving_at);
    const diffMs = arriveTime - departTime;
    const totalMinutes = Math.round(diffMs / 60000);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes}mins`;
    return `${hours}hr ${minutes}mins`;
  };

  // Check if flight data is available
  if (!flight || !flight.slices || !flight.slices[0] || !flight.slices[0].segments || !flight.slices[0].segments[0]) {
    return <div>No flight data available</div>;
  }

  // Extract flight details
  const flightSlice = flight.slices[0];
  const flightSegment = flightSlice.segments[0];
  const airline = flightSegment.marketing_carrier?.name || 'Unknown Airline';
  const airlineLogo = flightSegment.marketing_carrier?.logo || 'https://via.placeholder.com/20';
  const flightNumber = flightSegment.marketing_carrier_flight_number || 'Unknown';
  const originCode = flightSlice.origin?.iata_code || 'UNK';
  const originName = flightSlice.origin?.name || 'Unknown';
  const destinationCode = flightSlice.destination?.iata_code || 'UNK';
  const destinationName = flightSlice.destination?.name || 'Unknown';
  const departureTime = formatDate(flightSegment.departing_at);
  const arrivalTime = formatDate(flightSegment.arriving_at);
  const isReturnTrip = flight.slices.length > 1;

  // Extract city name from destination
  const getDestinationCity = () => {
    if (flightSlice.destination?.city) {
      return flightSlice.destination.city;
    }
    const airportName = destinationName;
    let cityName = airportName
      .replace(/\b(international|airport|regional|municipal|metropolitan)\b/gi, '')
      .trim()
      .replace(/,\s*$/, '')
      .trim();
    return cityName || destinationName;
  };

  const destinationCity = getDestinationCity();

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-6 pb-12 font-inter">
        {/* Header */}
        <div className="flex items-center mb-8 relative">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <FaRegArrowAltCircleLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-semibold text-gray-900">Client Trip To {destinationCity}</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Services */}
          <section className="mb-10">
            <h3 className="text-base font-medium text-gray-900 mb-4">Add other service</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 p-4 border border-gray-200 rounded-lg justify-center">
              <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 rounded-md text-gray-900 transition">
                <MdFlightTakeoff className="w-5 h-5" />
                <span>Flights</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 rounded-md text-gray-900 transition">
                <MdHotel className="w-5 h-5" />
                <span>Hotels</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 rounded-md text-gray-900 transition">
                <MdDirectionsBus className="w-5 h-5" />
                <span>Buses</span>
              </button>
            </div>
          </section>

          {/* Travelers */}
          <section className="mb-10">
            <h3 className="text-base font-medium text-gray-900 mb-4">Travelers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {travelers.map((traveler) => (
                <div
                  key={traveler.id}
                  className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                >
                  <img
                    src={traveler.avatar || '/api/placeholder/40/40'}
                    alt={traveler.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{traveler.name}</div>
                    {traveler.type && <div className="text-sm text-gray-500">{traveler.type}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Travel Itinerary */}
          <section className="mb-10">
            <h3 className="text-base font-medium text-gray-900 mb-4">Travel Itinerary</h3>

            {/* Flight */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="text-base font-medium text-gray-900">Flight</div>
                <div className="text-sm text-gray-500">{flightNumber}</div>
              </div>

              <div className="mb-6 flex items-center gap-2">
                <img
                  src={airlineLogo}
                  alt={`${airline} logo`}
                  className="w-6 h-6 object-contain"
                />
                <div className="font-medium text-gray-900">{airline}</div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-xl font-medium text-gray-900">{originCode}</div>
                  <div className="text-sm text-gray-500">{originName}</div>
                  <div className="text-sm text-gray-500 mt-1">{departureTime}</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
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
                <div className="text-center">
                  <div className="text-xl font-medium text-gray-900">{destinationCode}</div>
                  <div className="text-sm text-gray-500">{destinationName}</div>
                  <div className="text-sm text-gray-500 mt-1">{arrivalTime}</div>
                </div>
              </div>
            </div>

            {/* Stay */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="text-base font-medium text-gray-900 mb-4">Stay</div>
              <div>
                <div className="font-medium text-gray-900 mb-1">Four Points By Sheraton</div>
                <div className="text-sm text-gray-500 mb-6 flex items-start gap-1">
                  <MdLocationOn className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    KL201 Service Road, Arusha broadway<br />
                    Dar es salaam • +255 678657865
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm text-gray-500">Check-In</div>
                    <div className="text-gray-900 font-medium">Mon, Jun 6</div>
                    <div className="text-sm text-gray-500">17:00</div>
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm text-gray-500">Check-Out</div>
                    <div className="text-gray-900 font-medium">Thu, Jun 9</div>
                    <div className="text-sm text-gray-500">11:00</div>
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm text-gray-500">Booking ID</div>
                    <div className="text-gray-900 font-medium">F268X65</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm text-gray-500">Room Type</div>
                    <div className="text-gray-900 font-medium">Classic Suite</div>
                  </div>
                  <div className="bg-white p-3 rounded-md">
                    <div className="text-sm text-gray-500">Rooms</div>
                    <div className="text-gray-900 font-medium">02</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Confirmation Section */}
          <section className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-sm text-gray-500">Total price of trip</div>
                <div className="text-2xl font-semibold text-gray-900 mt-1">
                  {flight.total_currency} {flight.total_amount.toLocaleString()}
                </div>
              </div>
            </div>
            <button
              className="w-full bg-gray-900 text-white py-3.5 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              onClick={() => setOpenCheckoutPanel(true)}
            >
              Continue
            </button>
            <div className="text-center text-sm text-gray-500 mt-3">
              You won't be charged yet
            </div>
          </section>
        </div>
      </div>

      <CheckOutPanel
        isOpen={openCheckoutPanel}
        onClose={() => setOpenCheckoutPanel(false)}
      />
    </div>
  );
};

export default AddMoreFlights;