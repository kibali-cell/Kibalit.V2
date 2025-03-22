import { useState } from 'react';
import FlightDetailsPanel from '../Detailspanels/FlightDetailsPanel';
import HotelDetailsPanel from '../Detailspanels/HotelDetailsPanel';
import FlightCard from './FlightCard';
import HotelCard from './HotelCard';

const FlightList = ({ activeTab, flightsData, hotelsData }) => {
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
    switch (activeTab) {
      case 'Flights':
        return (
          <div className="flex flex-col gap-2">
            {flightsData.map(flight => (
              <FlightCard 
                key={flight.id} 
                flight={flight} 
                onClick={() => handleItemClick(flight)} 
              />
            ))}
          </div>
        );

      case 'Hotels':
        return (
          <div className="flex flex-col gap-2">
            {hotelsData.map(hotel => (
              <HotelCard 
                key={hotel.id} 
                hotel={hotel} 
                onClick={() => handleItemClick(hotel)} 
              />
            ))}
          </div>
        );

      case 'Buses':
        return (
          <div className="space-y-4">
            {/* Bus cards */}
          </div>
        );

      default:
        return null;
    }
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