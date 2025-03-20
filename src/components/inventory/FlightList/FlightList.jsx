import React, { useState } from 'react';
import FlightDetailsPanel from '../Detailspanels/FlightDetailsPanel';
import HotelDetailsPanel from '../Detailspanels/HotelDetailsPanel';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import { flights as staticFlights, hotels as staticHotels } from './Data'; // Fallback static data

const TravelList = ({ activeTab, flightsData, hotelsData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const handleClosePanel = () => {
    setShowDetails(false);
    setSelectedItem(null);
  };

  const renderList = () => {
    if (activeTab === 'Flights') {
      const list = flightsData || [];
      if (!Array.isArray(list) || list.length === 0) {
        return <div>No flights found.</div>;
      }
      return (
        <div className="flex flex-col gap-2">
          {list.map((flight, index) => (
            <FlightCard 
              key={flight.id || index} 
              flight={flight} 
              onClick={() => handleItemClick(flight)} 
            />
          ))}
        </div>
      );
    } else if (activeTab === 'Hotels') {
      const list = hotelsData || [];
      if (!Array.isArray(list) || list.length === 0) {
        return <div>No hotels found.</div>;
      }
      return (
        <div className="flex flex-col gap-2">
          {list.map((hotel, index) => (
            <HotelCard 
              key={hotel.hotelId || index} 
              hotel={hotel} 
              onClick={() => handleItemClick(hotel)} 
            />
          ))}
        </div>
      );
    } else if (activeTab === 'Buses') {
      return <div className="space-y-4"><p>No bus data available.</p></div>;
    }
    return null;
  };

  return (
    <div className="relative">
      {renderList()}
      
      {/* Conditionally render the details panel based on the active tab */}
      {activeTab === 'Flights' && (
        <FlightDetailsPanel
          isOpen={showDetails}
          onClose={handleClosePanel}
          flight={selectedItem}
        />
      )}
      
      {activeTab === 'Hotels' && (
        <HotelDetailsPanel
          isOpen={showDetails}
          onClose={handleClosePanel}
          hotel={selectedItem}
        />
      )}
    </div>
  );
};

export default TravelList;
