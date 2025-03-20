import React, { useState } from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaBus, FaLocationDot } from "react-icons/fa6";
import { MdClose, MdPersonAdd } from "react-icons/md";
import { IoLocationOutline, IoCalendarOutline, IoPeopleOutline } from 'react-icons/io5';

// Input configurations for each tab
const inputConfigs = {
  Flights: {
    fields: (tripType) => [
      {
        icon: <FaPlaneDeparture />,
        placeholder: "From",
        type: "text",
        name: "origin",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: <FaPlaneArrival />,
        placeholder: "To",
        type: "text",
        name: "destination",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: <IoCalendarOutline />,
        placeholder: "Depart",
        type: "date", // Changed to "date"
        name: "depart",
        className: "bg-appBg min-w-[150px]"
      },
      ...(tripType === "Return"
        ? [
            {
              icon: <IoCalendarOutline />,
              placeholder: "Return",
              type: "date", // Changed to "date"
              name: "return",
              className: "bg-appBg min-w-[150px]"
            }
          ]
        : [])
    ],
    containerClass: "flex flex-nowrap overflow-x-auto gap-3 pb-2"
  },
  // ... other tabs
};

const InputField = ({ icon, placeholder, type = "text", className = "", name }) => (
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
          <MdClose className="cursor-pointer text-gray-500 hover:text-red-500 transition h-3 w-3" onClick={() => onRemoveTraveler(traveler)} />
        </div>
      ))}
      <button onClick={onAddTraveler} className="flex items-center space-x-1 text-primaryText hover:text-secondaryText transition text-xs">
        <MdPersonAdd className="h-3 w-3" />
        <span>Add</span>
      </button>
    </div>
  </div>
);

const renderTravelerOptions = () => {
  const options = ["1 traveler", "2 travelers", "3 travelers", "4 travelers"];
  return options.map((option) => (
    <option key={option} value={option.split(" ")[0]}>
      {option}
    </option>
  ));
};

const renderClassOptions = () => {
  // Only applicable for Flights
  return (
    <select className="p-2 w-full outline-none text-sm">
      {["Economy", "Business", "First Class"].map((classType) => (
        <option key={classType}>{classType}</option>
      ))}
    </select>
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
  onResultsFetched, // renamed callback prop
  onClose
}) => {
  // Controlled states for Hotels tab
  const [hotelCity, setHotelCity] = useState("");
  const [hotelCheckIn, setHotelCheckIn] = useState("");
  const [hotelCheckOut, setHotelCheckOut] = useState("");

  const currentConfig = inputConfigs[activeTab];

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
          adults: 1,
          cabin_class: "economy",
          currency: "USD"
        });
        const response = await fetch(`http://localhost:8000/api/hotels/search?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hotels");
        }
        const data = await response.json();
        onResultsFetched(data.hotel_list.data);
        setShowInventory(true);
      } catch (error) {
        console.error("Hotel search error:", error);
        alert("Error fetching hotels");
      }
    } else if (activeTab === "Flights") {
      // For flights, extract values from the form using FormData
      const formData = new FormData(e.target);
      // Standardize flight type so that "One way" becomes "oneway" and "Return" becomes "return"
      const standardizedTripType = tripType.toLowerCase().replace(/\s/g, '');
      const flightPayload = {
        flight_type: standardizedTripType, // "oneway" or "return"
        origin: formData.get("origin")?.toUpperCase() || "",
        destination: formData.get("destination")?.toUpperCase() || "",
        departure_date: formData.get("depart") || "",
        return_date: standardizedTripType === "return" ? formData.get("return") : null,
        adults: 1,
        cabin_class: "economy",
        currency: "USD"
      };

      if (!flightPayload.origin || !flightPayload.destination || !flightPayload.departure_date) {
        alert("Please fill in all flight search fields.");
        return;
      }
      
      try {
        console.log("Flight Payload:", flightPayload);
        const response = await fetch("http://localhost:8000/api/flights/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(flightPayload)
        });
        if (!response.ok) {
          throw new Error("Failed to search flights");
        }
        const data = await response.json();
        onResultsFetched(data.data);
        setShowInventory(true);
      } catch (error) {
        console.error("Flight search error:", error);
        alert("Error searching flights");
      }
    } else {
      setShowInventory(true);
    }
  };

  const renderFormFields = () => {
    if (activeTab === "Hotels") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative md:col-span-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoLocationOutline className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Where to?"
              value={hotelCity}
              onChange={(e) => setHotelCity(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          {/* Check-in */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoCalendarOutline className="w-5 h-5" />
            </div>
            <input
              type="date"
              placeholder="Check in"
              value={hotelCheckIn}
              onChange={(e) => setHotelCheckIn(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          {/* Check-out */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoCalendarOutline className="w-5 h-5" />
            </div>
            <input
              type="date"
              placeholder="Check out"
              value={hotelCheckOut}
              onChange={(e) => setHotelCheckOut(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
            />
          </div>
          {/* Travelers (uncontrolled) */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <IoPeopleOutline className="w-5 h-5" />
            </div>
            <input
              type="number"
              placeholder="Travelers"
              defaultValue={1}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-gray-300 focus:outline-none"
              min="1"
            />
          </div>
        </div>
      );
    }
    // For Flights and Buses, use inputConfigs fields
    return (
      <div className={currentConfig.containerClass}>
        {currentConfig.fields(tripType).map((field, index) => (
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
      <TravelersSection
        travelers={travelers}
        onAddTraveler={onAddTraveler}
        onRemoveTraveler={onRemoveTraveler}
      />

      {activeTab === "Flights" && (
        <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 md:space-x-3">
          <div className="flex space-x-2">
            {["One way", "Return"].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setTripType(type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  tripType === type
                    ? "bg-black text-white"
                    : "bg-gray-200 text-primaryText hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 w-full md:w-auto">
            <select className="p-2 w-full md:w-32 text-sm">
              {renderTravelerOptions()}
            </select>
            {renderClassOptions()}
          </div>
        </div>
      )}

      {activeTab !== "Flights" && (
        <div className="flex justify-end">
          <select className="p-2 rounded-lg w-full md:w-32 focus:outline-none text-sm">
            {renderTravelerOptions()}
          </select>
        </div>
      )}

      {renderFormFields()}

      <div className="flex justify-end mt-3">
        <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm">
          {`Search ${activeTab}`}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
