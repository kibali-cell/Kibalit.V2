import React, { useState } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa6';
import { MdClose, MdPersonAdd } from 'react-icons/md';
import { IoLocationOutline, IoCalendarOutline, IoPeopleOutline } from 'react-icons/io5';

const inputConfigs = {
  Flights: {
    fields: (tripType) => [
      {
        icon: <FaPlaneDeparture />,
        placeholder: 'From',
        type: 'text',
        name: 'origin',
        className: 'bg-appBg min-w-[200px]',
      },
      {
        icon: <FaPlaneArrival />,
        placeholder: 'To',
        type: 'text',
        name: 'destination',
        className: 'bg-appBg min-w-[200px]',
      },
      {
        icon: <IoCalendarOutline />,
        placeholder: 'Depart',
        type: 'date',
        name: 'depart',
        className: 'bg-appBg min-w-[150px]',
      },
      ...(tripType === 'Return'
        ? [
            {
              icon: <IoCalendarOutline />,
              placeholder: 'Return',
              type: 'date',
              name: 'return',
              className: 'bg-appBg min-w-[150px]',
            },
          ]
        : []),
    ],
    containerClass: 'flex flex-nowrap overflow-x-auto gap-3 pb-2',
  },
};

const InputField = ({ icon, placeholder, type = 'text', className = '', name }) => (
  <div className={`flex items-center space-x-2 border border-stroke-lightGreyBg p-2 rounded-lg ${className}`}>
    {icon && <span className="text-gray-500 text-sm">{icon}</span>}
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-sm"
    />
  </div>
);

const TravelersSection = ({ travelers = [], onAddTraveler, onRemoveTraveler }) => (
  <div>
    <p className="text-base font-semibold text-primaryText mb-1">Who's going?</p>
    <div className="flex items-center space-x-2 border border-stroke-lightGreyBg bg-white rounded-lg p-2">
      {travelers.map((traveler, index) => (
        <div key={index} className="flex items-center space-x-1 px-2 py-0.5 bg-gray-200 text-primaryText rounded-full">
          <span className="text-xs font-medium">{traveler}</span>
          <MdClose
            className="cursor-pointer text-gray-500 hover:text-red-500 transition h-3 w-3"
            onClick={() => onRemoveTraveler(traveler)}
          />
        </div>
      ))}
      <button
        onClick={onAddTraveler}
        className="flex items-center space-x-1 text-primaryText hover:text-secondaryText transition text-xs"
      >
        <MdPersonAdd className="h-3 w-3" />
        <span>Add</span>
      </button>
    </div>
  </div>
);

const SearchForm = ({
  activeTab,
  travelers,
  onAddTraveler,
  onRemoveTraveler,
  tripType,
  setTripType,
  setShowInventory,
  onResultsFetched,
  onClose,
}) => {
  const [hotelCity, setHotelCity] = useState('');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [flightClass, setFlightClass] = useState('Economy');
  const [travelerCount, setTravelerCount] = useState(1);
  const [currency, setCurrency] = useState('KES'); // Added currency state with default KES

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === 'Hotels') {
      if (!hotelCity || !hotelCheckIn || !hotelCheckOut) {
        alert('Please fill in all hotel search fields.');
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8000/api/hotels/search?${new URLSearchParams({
            city_code: hotelCity.toUpperCase(),
            check_in: hotelCheckIn,
            check_out: hotelCheckOut,
            adults: travelerCount,
          }).toString()}`
        );
        if (!response.ok) throw new Error('Failed to fetch hotels');
        const data = await response.json();
        onResultsFetched({ hotels: data.hotel_list?.data || data.data || data });
        setShowInventory(true);
      } catch (error) {
        console.error('Hotel search error:', error);
        alert('Error fetching hotels');
      }
    } else if (activeTab === 'Flights') {
      try {
        const formData = new FormData(e.target);
        const flightPayload = {
          flight_type: tripType.toLowerCase().replace(/\s/g, ''), // "oneway" or "return"
          origin: formData.get('origin')?.toUpperCase() || '',
          destination: formData.get('destination')?.toUpperCase() || '',
          departure_date: formData.get('depart') || '',
          ...(tripType === 'Return' && { return_date: formData.get('return') || null }), // Only include return_date for Return trips
          adults: travelerCount || 1,
          cabin_class: flightClass.toLowerCase() || 'economy',
          currency: currency || 'KES', // Use selected currency or default to KES
        };

        if (!flightPayload.origin || !flightPayload.destination || !flightPayload.departure_date) {
          alert('Please fill in all required flight fields');
          return;
        }

        const response = await fetch('http://localhost:8000/api/flights/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(flightPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Flight search failed');
        }

        const responseData = await response.json();
        onResultsFetched({ flights: responseData.data?.data || responseData.data || [] });
        setShowInventory(true);
      } catch (error) {
        console.error('Flight search error:', error);
        alert(error.message || 'Error searching flights');
      }
    }
  };

  const renderFormFields = () => {
    if (activeTab === 'Hotels') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoLocationOutline className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="City (e.g., NBO)"
              value={hotelCity}
              onChange={(e) => setHotelCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoCalendarOutline className="w-5 h-5" />
            </div>
            <input
              type="date"
              value={hotelCheckIn}
              onChange={(e) => setHotelCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoCalendarOutline className="w-5 h-5" />
            </div>
            <input
              type="date"
              value={hotelCheckOut}
              onChange={(e) => setHotelCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoPeopleOutline className="w-5 h-5" />
            </div>
            <input
              type="number"
              placeholder="Guests"
              min="1"
              value={travelerCount}
              onChange={(e) => setTravelerCount(parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
        </div>
      );
    }
    return (
      <div className={inputConfigs.Flights.containerClass}>
        {inputConfigs.Flights.fields(tripType).map((field, index) => (
          <InputField
            key={index}
            icon={field.icon}
            placeholder={field.placeholder}
            type={field.type}
            className={field.className}
            name={field.name}
          />
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TravelersSection travelers={travelers} onAddTraveler={onAddTraveler} onRemoveTraveler={onRemoveTraveler} />

      {activeTab === 'Flights' && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2">
            {['One way', 'Return'].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setTripType(type)}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  tripType === type ? 'bg-black text-white' : 'bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <select
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
              className="p-2 outline-none bg-white rounded-lg border border-gray-300"
            >
              {['Economy', 'Business', 'First'].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={travelerCount}
              onChange={(e) => setTravelerCount(parseInt(e.target.value) || 1)}
              className="p-2 outline-none bg-white rounded-lg border border-gray-300"
            >
              {[1, 2, 3, 4].map((t) => (
                <option key={t} value={t}>
                  {`${t} traveler${t > 1 ? 's' : ''}`}
                </option>
              ))}
            </select>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="p-2 outline-none bg-white rounded-lg border border-gray-300"
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      )}

      {renderFormFields()}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
        >
          {`Search ${activeTab}`}
        </button>
      </div>
    </form>
  );
};

export default SearchForm; 