import React, { useState } from 'react';
import FlightDetailsPanel from '../Detailspanels/FlightDetailsPanel';
import HotelDetailsPanel from '../Detailspanels/HotelDetailsPanel';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';
import { flights, hotels as staticHotels } from './Data'; // Static data for flights and fallback hotels

const FlightList = ({ activeTab, hotelsData }) => {
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
      return (
        <div className="flex flex-col gap-2">
          {flights.map(flight => (
            <FlightCard 
              key={flight.id} 
              flight={flight} 
              onClick={() => handleItemClick(flight)} 
            />
          ))}
        </div>
      );
    } else if (activeTab === 'Hotels') {
      // Use the fetched hotelsData; fallback to static hotels if hotelsData is empty
      const list = hotelsData && hotelsData.length > 0 ? hotelsData : staticHotels;
      return (
        <div className="flex flex-col gap-2">
          {list.map((hotel, index) => (
            <HotelCard 
              key={`${hotel.hotelId}-${index}`} 
              hotel={hotel} 
              onClick={() => handleItemClick(hotel)} 
            />
          ))}
        </div>
      );
    } else if (activeTab === 'Buses') {
      return (
        <div className="space-y-4">
          <p>No bus data available.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      {renderList()}
      
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

export default FlightList;
