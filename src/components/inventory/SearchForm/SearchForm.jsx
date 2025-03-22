import { useState } from 'react';
import { IoAirplaneOutline, IoLocationOutline, IoBusOutline, IoCalendarOutline, IoPeopleOutline, IoSearchOutline, IoArrowBack } from 'react-icons/io5';
import { SlPlane } from 'react-icons/sl';
import { FaPlaneDeparture, FaPlaneArrival, FaHotel, FaBus } from 'react-icons/fa6';

const TravelForm = ({ activeTab, setActiveTab, onClose, onResultsFetched, setShowInventory, setFormData: setParentFormData }) => {
  const [formData, setFormData] = useState({
    flight: { from: '', to: '', departDate: '', returnDate: '', tripType: 'one_way', flightClass: 'Economy', travelers: 1, currency: 'KES' }, // Added currency with default KES
    hotel: { location: '', checkIn: '', checkOut: '', travelers: '' },
    bus: { from: '', to: '', travelDate: '', passengers: '' },
  });

  const tabs = [
    { id: 'Flights', icon: <SlPlane className="w-5 h-5" />, label: 'Flights' },
    { id: 'Hotels', icon: <FaHotel className="w-5 h-5" />, label: 'Hotels' },
    { id: 'Buses', icon: <IoBusOutline className="w-5 h-5" />, label: 'Buses' },
  ];

  const handleInputChange = (e, field, category) => {
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [category]: { ...prev[category], [field]: e.target.value },
      };
      setParentFormData(updatedFormData);
      return updatedFormData;
    });
  };

  const handleTripTypeChange = (tripType) => {
    setFormData((prev) => ({
      ...prev,
      flight: { ...prev.flight, tripType, returnDate: tripType === 'one_way' ? '' : prev.flight.returnDate },
    }));
  };

  const handleSearch = async () => {
    let url, method, options;
    switch (activeTab) {
      case 'Flights':
        url = 'http://localhost:8000/api/flights/search';
        method = 'POST';
        options = {
          body: JSON.stringify({
            origin: formData.flight.from.toUpperCase(),
            destination: formData.flight.to.toUpperCase(),
            departure_date: formData.flight.departDate,
            ...(formData.flight.tripType === 'return' && { return_date: formData.flight.returnDate || null }), // Only include return_date for return trips
            flight_type: formData.flight.tripType.replace('_', ''), // "oneway" or "return"
            adults: parseInt(formData.flight.travelers) || 1,
            cabin_class: formData.flight.flightClass.toLowerCase(),
            currency: formData.flight.currency || 'KES', // Use selected currency or default to KES
          }),
        };
        break;

      case 'Hotels':
        const hotelParams = new URLSearchParams({
          city_code: formData.hotel.location.toUpperCase(),
          check_in: formData.hotel.checkIn,
          check_out: formData.hotel.checkOut,
          adults: formData.hotel.travelers || 1,
        });
        url = `http://localhost:8000/api/hotels/search?${hotelParams.toString()}`;
        method = 'GET';
        options = {};
        break;

      case 'Buses':
        const busParams = new URLSearchParams({
          from: formData.bus.from,
          to: formData.bus.to,
          travel_date: formData.bus.travelDate,
          passengers: formData.bus.passengers,
        });
        url = `http://localhost:8000/api/buses/search?${busParams.toString()}`;
        method = 'GET';
        options = {};
        break;

      default:
        return;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      onResultsFetched(data);
      setShowInventory(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Flights':
        return (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => handleTripTypeChange('one_way')}
                className={`px-3 py-1.5 rounded-full text-sm ${formData.flight.tripType === 'one_way' ? 'bg-black text-white' : 'bg-gray-100'}`}
              >
                One way
              </button>
              <button
                onClick={() => handleTripTypeChange('return')}
                className={`px-3 py-1.5 rounded-full text-sm ${formData.flight.tripType === 'return' ? 'bg-black text-white' : 'bg-gray-100'}`}
              >
                Return
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                  <FaPlaneDeparture className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="From (e.g., NBO)"
                  value={formData.flight.from}
                  onChange={(e) => handleInputChange(e, 'from', 'flight')}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                  <FaPlaneArrival className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="To (e.g., MBA)"
                  value={formData.flight.to}
                  onChange={(e) => handleInputChange(e, 'to', 'flight')}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
                />
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                  <IoCalendarOutline className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  value={formData.flight.departDate}
                  onChange={(e) => handleInputChange(e, 'departDate', 'flight')}
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
                />
              </div>
              {formData.flight.tripType === 'return' && (
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                    <IoCalendarOutline className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    value={formData.flight.returnDate}
                    onChange={(e) => handleInputChange(e, 'returnDate', 'flight')}
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 'Hotels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="City Code (e.g., NBO)"
                value={formData.hotel.location}
                onChange={(e) => handleInputChange(e, 'location', 'hotel')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="date"
                value={formData.hotel.checkIn}
                onChange={(e) => handleInputChange(e, 'checkIn', 'hotel')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="date"
                value={formData.hotel.checkOut}
                onChange={(e) => handleInputChange(e, 'checkOut', 'hotel')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoPeopleOutline className="w-5 h-5" />
              </div>
              <input
                type="number"
                placeholder="Travelers"
                value={formData.hotel.travelers}
                onChange={(e) => handleInputChange(e, 'travelers', 'hotel')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );

      case 'Buses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="From"
                value={formData.bus.from}
                onChange={(e) => handleInputChange(e, 'from', 'bus')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="To"
                value={formData.bus.to}
                onChange={(e) => handleInputChange(e, 'to', 'bus')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="date"
                value={formData.bus.travelDate}
                onChange={(e) => handleInputChange(e, 'travelDate', 'bus')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoPeopleOutline className="w-5 h-5" />
              </div>
              <input
                type="number"
                placeholder="Passengers"
                value={formData.bus.passengers}
                onChange={(e) => handleInputChange(e, 'passengers', 'bus')}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-inter">
      <div className="flex">
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
          <IoArrowBack className="w-6 h-6 text-primaryText" />
        </button>
        <div className="flex gap-8 justify-center flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 ${
                activeTab === tab.id ? 'text-primaryText border-b-2 border-primaryText' : 'text-secondaryText'
              }`}
            >
              {tab.icon}
              <span className="text-label-1-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 flex items-center gap-2">
        {renderFormFields()}
        <div className="flex justify-end">
          <button
            onClick={handleSearch}
            className="bg-buttonPrimary text-white px-4 py-3 rounded-md flex items-center"
          >
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </div>
      </div>
      {activeTab === 'Flights' && (
        <div className="flex justify-end gap-4">
          <select
            value={formData.flight.flightClass}
            onChange={(e) => handleInputChange(e, 'flightClass', 'flight')}
            className="p-2 outline-none text-sm rounded-md border border-stroke-lightGreyBg"
          >
            {['Economy', 'Business', 'First Class'].map((classType) => (
              <option key={classType} value={classType}>
                {classType}
              </option>
            ))}
          </select>
          <select
            value={formData.flight.travelers}
            onChange={(e) => handleInputChange(e, 'travelers', 'flight')}
            className="p-2 outline-none text-sm rounded-md border border-stroke-lightGreyBg"
          >
            {[1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {`${num} traveler${num > 1 ? 's' : ''}`}
              </option>
            ))}
          </select>
          <select
            value={formData.flight.currency}
            onChange={(e) => handleInputChange(e, 'currency', 'flight')}
            className="p-2 outline-none text-sm rounded-md border border-stroke-lightGreyBg"
          >
            <option value="KES">KES</option>
            <option value="USD">USD</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default TravelForm;