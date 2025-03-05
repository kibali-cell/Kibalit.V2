import React from 'react';
import { FaPlaneDeparture, FaPlaneArrival, FaBus, FaLocationDot } from "react-icons/fa6";
import { MdClose, MdPersonAdd } from "react-icons/md";

// Input configurations for different tabs
const inputConfigs = {
  Flights: {
    fields: (tripType) => [
      {
        icon: <FaPlaneDeparture />,
        placeholder: "From",
        type: "text",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: <FaPlaneArrival />,
        placeholder: "To",
        type: "text",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: "🗓️",
        placeholder: "Depart",
        type: "text",
        className: "bg-appBg min-w-[150px]"
      },
      ...(tripType === "Return" ? [{
        icon: "🗓️",
        placeholder: "Return",
        type: "text",
        className: "bg-appBg min-w-[150px]"
      }] : [])
    ],
    containerClass: "flex flex-nowrap overflow-x-auto gap-3 pb-2"
  },

  Hotels: {
    fields: () => [
      {
        icon: <FaLocationDot />,
        placeholder: "Where to?",
        type: "text",
        className: "bg-appBg w-1/2"
      },
      {
        icon: "🗓️",
        placeholder: "Check-in",
        type: "text",
        className: "bg-appBg w-1/4"
      },
      {
        icon: "🗓️",
        placeholder: "Check-out",
        type: "text",
        className: "bg-appBg w-1/4"
      }
    ],
    containerClass: "flex flex-nowrap overflow-x-auto gap-3 pb-2"
  },

  Buses: {
    fields: () => [
      {
        icon: <FaBus />,
        placeholder: "From",
        type: "text",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: <FaBus />,
        placeholder: "To",
        type: "text",
        className: "bg-appBg min-w-[200px]"
      },
      {
        icon: "🗓️",
        placeholder: "Departure Date",
        type: "text",
        className: "bg-appBg min-w-[150px]"
      }
    ],
    containerClass: "flex flex-nowrap overflow-x-auto gap-3 pb-2"
  }
};

const InputField = ({ icon, placeholder, type = "text", className = "" }) => (
  <div className={`flex items-center space-x-2 border border-stroke-lightGreyBg p-2 rounded-lg  ${className}`}>
    {icon && <span className="text-gray-500 text-sm">{icon}</span>}
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-transparent focus:outline-none placeholder-gray-400 text-sm"
    />
  </div>
);

const TravelersSection = ({ travelers, onAddTraveler, onRemoveTraveler }) => (
  <div>
    <p className="text-base font-semibold text-primaryText mb-1">Who's going?</p>
    <div className="flex items-center space-x-2 border border-stroke-lightGreyBg bg-white rounded-lg p-2">
      {travelers.map((traveler, index) => (
        <div
          key={index}
          className="flex items-center space-x-1 px-2 py-0.5 bg-gray-200 text-primaryText rounded-full"
        >
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
  setShowInventory
}) => {
  const renderTravelerOptions = () => {
    const options = activeTab === "Flights"
      ? ["1 traveler", "2 travelers", "3 travelers", "4 travelers"]
      : activeTab === "Stays"
        ? ["1 guest", "2 guests", "3 guests", "4 guests"]
        : ["1 passenger", "2 passengers", "3 passengers", "4 passengers"];

    return options.map((option) => (
      <option className='outline-none' key={option} value={option.split(" ")[0] }>
        {option}
      </option>
    ));
  };

  const renderClassOptions = () => {
    if (activeTab !== "Flights") return null;
    return (
      <select className="p-2 w-full outline-none text-sm">
        {["Economy", "Business", "First Class"].map((classType) => (
          <option key={classType}>{classType}</option>
        ))}
      </select>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowInventory(true);
  };

  const currentConfig = inputConfigs[activeTab];
  const fields = currentConfig.fields(tripType);

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
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${tripType === type
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
          <select className="p-2 rounded-lg w-full md:w-32 focus:outline-none  text-sm">
            {renderTravelerOptions()}
          </select>
        </div>
      )}

      <div className={currentConfig.containerClass}>
        {fields.map((field, index) => (
          <InputField
            key={index}
            icon={field.icon}
            placeholder={field.placeholder}
            type={field.type}
            className={field.className}
          />
        ))}
      </div>

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
        >
          {`Search ${activeTab}`}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;