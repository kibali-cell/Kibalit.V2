import React, { useState } from 'react';
import { IoLocationOutline, IoCalendarOutline, IoPeopleOutline, IoSearchOutline, IoArrowBack, IoBusOutline } from 'react-icons/io5';
import { SlPlane } from "react-icons/sl";
import { FaPlaneDeparture, FaPlaneArrival, FaHotel, FaBus } from "react-icons/fa6";

const TravelForm = ({
  activeTab,
  setActiveTab,
  onClose,
  onHotelsFetched,
  setShowInventory
}) => {
  const [hotelCity, setHotelCity] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState("");
  const [hotelCheckOut, setHotelCheckOut] = useState("");
  const [hotelTravelers, setHotelTravelers] = useState("1");

  const tabs = [
    { id: 'Flights', icon: <SlPlane className="w-5 h-5" />, label: 'Flights' },
    { id: 'Hotels', icon: <FaHotel className="w-5 h-5" />, label: 'Hotels' },
    { id: 'Buses', icon: <IoBusOutline className="w-5 h-5" />, label: 'Buses' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "Hotels") {
      if (!hotelCity || !hotelCheckIn || !hotelCheckOut) {
        alert("Please fill in all hotel search fields.");
        return;
      }
      try {
        const queryParams = new URLSearchParams({
          city_code: hotelCity.toUpperCase(),
          check_in: hotelCheckIn,
          check_out: hotelCheckOut,
          adults: parseInt(hotelTravelers) || 1
        });
        const response = await fetch(`http://localhost:8000/api/hotels/search?${queryParams.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        onHotelsFetched(data.hotel_list.data);
        setShowInventory(true);
      } catch (error) {
        console.error("Hotel search error:", error);
        alert("Error fetching hotels");
      }
    }
    // Add logic for other tabs here
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Flights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Flight form fields remain unchanged */}
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
                placeholder="Where to?"
                value={hotelCity}
                onChange={(e) => setHotelCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="date"
                placeholder="Check in"
                value={hotelCheckIn}
                onChange={(e) => setHotelCheckIn(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="date"
                placeholder="Check out"
                value={hotelCheckOut}
                onChange={(e) => setHotelCheckOut(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoPeopleOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Travelers"
                value={hotelTravelers}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) setHotelTravelers(value);
                }}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );

      case 'Buses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Bus form fields remain unchanged */}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-inter">
      <div className='flex'>
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
          <IoArrowBack className="w-6 h-6 text-primaryText" />
        </button>
        <div className="flex gap-8 justify-center flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 ${activeTab === tab.id
                  ? 'text-primaryText border-b-2 border-primaryText'
                  : 'text-secondaryText'
                }`}
            >
              {tab.icon}
              <span className="text-label-1-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex items-center gap-2">
        {renderFormFields()}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-buttonPrimary text-white px-4 py-3 rounded-md flex items-center"
          >
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </div>
      </form>

      {activeTab === 'Flights' && (
        <div className='flex justify-end'>
          {/* Flight options remain unchanged */}
        </div>
      )}
    </div>
  );
};

export default TravelForm;