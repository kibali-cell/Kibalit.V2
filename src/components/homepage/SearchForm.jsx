import React, { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa6';
import { MdClose, MdPersonAdd } from 'react-icons/md';
import { IoLocationOutline, IoCalendarOutline, IoPeopleOutline } from 'react-icons/io5';
import api from '../../api/axiosConfig';

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

const TravelerModal = ({ isOpen, onClose, onSelect, selectedTravelers }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!isOpen) return;

      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/users', {
          params: {
            roles: ['super_admin', 'travel_admin', 'employee'], 
          },
        });

       
        const transformedUsers = response.data.users.map((user) => ({
          id: user.id,
          name: user.name,
          department: user.roles[0]?.name || 'Employee', 
          email: user.email,
        }));

        setEmployees(transformedUsers);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Travelers</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        {loading ? (
          <div className="text-center py-4">Loading users...</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
            {employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => onSelect(employee)}
                className={`p-3 rounded-md border-2 flex items-center gap-2 ${
                  selectedTravelers.some((t) => t.id === employee.id)
                    ? 'bg-gray-900 bg-black-50'
                    : 'border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {employee.name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.department}</div>
                  <div className="text-xs text-gray-400">{employee.email}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

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
  const [currency, setCurrency] = useState('KES');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEmployee = (employee) => {
    if (!travelers.some((t) => t.id === employee.id)) {
      onAddTraveler(employee);
    } else {
      onRemoveTraveler(employee.id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (activeTab === 'Hotels') {
      try {
        const response = await fetch(
          `http://localhost:8000/api/hotels/search?${new URLSearchParams({
            city_code: hotelCity.toUpperCase(),
            check_in: hotelCheckIn,
            check_out: hotelCheckOut,
            guests: travelers.length,
          })}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to search hotels');
        }
        const data = await response.json();
        onResultsFetched({ hotels: data.hotel_list?.data || data.data || data });
        setShowInventory(true);
      } catch (error) {
        console.error('Error searching hotels:', error);
        alert(error.message || 'Failed to search hotels. Please try again.');
      }
    } else {
      const formData = new FormData(e.target);
      const flightPayload = {
        flight_type: tripType.toLowerCase().replace(/\s/g, ''),
        origin: formData.get('origin')?.toUpperCase() || '',
        destination: formData.get('destination')?.toUpperCase() || '',
        departure_date: formData.get('depart') || '',
        ...(tripType === 'Return' && { return_date: formData.get('return') || null }),
        adults: travelers.length || 1,
        cabin_class: flightClass.toLowerCase() || 'economy',
        currency: currency || 'KES',
      };

      try {
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
        onResultsFetched({ flights: responseData.data?.data || responseData.data || [], travelers: travelers });
        setShowInventory(true);
      } catch (error) {
        console.error('Flight search error:', error);
        alert(error.message || 'Error searching flights');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-base font-semibold text-primaryText mb-1">Who's going?</p>
        <div className="flex items-center space-x-2 border border-stroke-lightGreyBg bg-white rounded-lg p-2">
          {travelers.map((traveler) => (
            <div
              key={traveler.id}
              className="flex items-center space-x-1 px-2 py-0.5 bg-gray-200 text-primaryText rounded-full"
            >
              <span className="text-xs font-medium">{traveler.name}</span>
              <button
                type="button"
                onClick={() => onRemoveTraveler(traveler.id)}
                className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              >
                <MdClose className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-primaryText hover:text-secondaryText transition text-xs"
          >
            <MdPersonAdd className="h-3 w-3" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'Hotels' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={hotelCity}
                onChange={(e) => setHotelCity(e.target.value)}
                placeholder="Where are you going?"
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
                placeholder="Check-in"
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
                placeholder="Check-out"
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
                value={travelers.length}
                disabled
                className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
              />
            </div>
          </div>
        ) : (
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
        )}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition font-medium"
          >
            {`Search ${activeTab}`}
          </button>
        </div>
      </form>

      <TravelerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectEmployee}
        selectedTravelers={travelers}
      />
    </div>
  );
};

export default SearchForm;