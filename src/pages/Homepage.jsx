import { useState } from "react";
import { FaPlane, FaHotel, FaBus } from "react-icons/fa6";
import SearchForm from "../components/homepage/SearchForm";
import FlightInventory from "./FlightInventory";

const HomePage = () => {
  const [travelers, setTravelers] = useState([]);
  const [tripType, setTripType] = useState("Return");
  const [activeTab, setActiveTab] = useState("Flights");
  const [showInventory, setShowInventory] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleAddTraveler = (name) => {
    setTravelers(prev => [...prev, name]);
  };

  const handleRemoveTraveler = (name) => {
    setTravelers(prev => prev.filter(traveler => traveler !== name));
  };

  const tabs = [
    { name: "Flights", icon: <FaPlane /> },
    { name: "Hotels", icon: <FaHotel /> },
    { name: "Buses", icon: <FaBus /> },
  ];

  return (
    <>
      {/* Search Form Section */}
      <div className={`flex flex-col h-full bg-stroke-lightGreyBg md:px-32 ${showInventory ? 'hidden' : ''}`}>
        <div className="w-full max-w-5xl">
          <h1 className="text-heading-1 md:text-7xl font-bold my-16">Book Your Trip</h1>
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.name
                    ? "bg-white text-primaryBg"
                    : "bg-black text-white hover:bg-gray-200"
                } ${
                  tab.name === "Flights"
                    ? "rounded-tl-lg"
                    : tab.name === "Buses"
                    ? "rounded-tr-lg"
                    : ""
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
          <div className="bg-white p-6 rounded-b-lg rounded-tr-lg">
            <SearchForm
              activeTab={activeTab}
              travelers={travelers}
              onAddTraveler={handleAddTraveler}
              onRemoveTraveler={handleRemoveTraveler}
              tripType={tripType}
              setTripType={setTripType}
              setShowInventory={setShowInventory}
              onResultsFetched={setSearchResults}
            />
          </div>
        </div>
      </div>

      {/* Flight Inventory */}
      {showInventory && (
        <FlightInventory
          isVisible={showInventory}
          onClose={() => setShowInventory(false)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setShowInventory={setShowInventory}
          initialResults={searchResults}
        />
      )}
    </>
  );
};

export default HomePage;
