import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import SearchForm from '../components/homepage/SearchForm';
import FilterSection from '../components/inventory/Filters/FilterSection';
import TravelList from '../components/inventory/FlightList/FlightList';

const FlightInventory = ({
  isVisible,
  onClose,
  activeTab,
  setActiveTab,
  setShowInventory,
  initialResults
}) => {
  // Initialize searchResults as an object since the API response is an object with a 'data' key
  const [searchResults, setSearchResults] = useState(initialResults || {});

  // Update searchResults and show inventory when initialResults changes
  useEffect(() => {
    if (initialResults) {
      setSearchResults(initialResults);
      setShowInventory(true);
    }
  }, [initialResults, setShowInventory]);

  // Log searchResults for debugging
  useEffect(() => {
    console.log("Search Results Updated:", searchResults);
  }, [searchResults]);

  // Function to map raw API flight data to the format expected by FlightCard
  const mapFlightData = (apiFlight) => {
    const firstSlice = apiFlight.slices[0];
    const firstSegment = firstSlice.segments[0];
    return {
      originCode: firstSlice.origin.iata_code,
      originCity: firstSlice.origin.city_name,
      destinationCode: firstSlice.destination.iata_code,
      destinationCity: firstSlice.destination.city_name,
      departureTime: firstSegment.departing_at,
      arrivalTime: firstSegment.arriving_at,
      airline: firstSegment.marketing_carrier.name,
      price: apiFlight.total_amount,
      hasPolicy: true
    };
  };

  // Map the flight data from searchResults.data, default to empty array if not available
  const mappedFlights = searchResults && searchResults.data ? searchResults.data.map(mapFlightData) : [];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <Navbar />
      <SearchForm
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
        onResultsFetched={(data) => setSearchResults(data)}
        setShowInventory={setShowInventory}
      />
      <div className="flex p-10 bg-appBg w-full gap-10">
        <div className="w-1/3">
          <FilterSection activeTab={activeTab} />
        </div>
        <div className="w-2/3">
          <TravelList
            activeTab={activeTab}
            flightsData={activeTab === 'Flights' ? mappedFlights : []}
            hotelsData={activeTab === 'Hotels' ? searchResults?.data || [] : []}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightInventory;