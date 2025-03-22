import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import FilterSection from '../components/inventory/Filters/FilterSection';
import TravelForm from '../components/inventory/SearchForm/SearchForm';
import TravelList from '../components/inventory/FlightList/FlightList';

const FlightInventory = ({
  isVisible,
  onClose,
  activeTab,
  setActiveTab,
  setShowInventory,
  initialResults,
}) => {
  const [searchResults, setSearchResults] = useState(initialResults || {});
  const [formData, setFormData] = useState({
    flight: { from: '', to: '', departDate: '', returnDate: '' },
    hotel: { location: '', checkIn: '', checkOut: '', travelers: '' },
    bus: { from: '', to: '', travelDate: '', passengers: '' },
  });

  useEffect(() => {
    if (initialResults) {
      setSearchResults(initialResults);
      setShowInventory(true);
    }
  }, [initialResults, setShowInventory]);

  useEffect(() => {
    console.log('Full search results:', searchResults);
    console.log('Flight data:', searchResults.flights);
    console.log('Hotel data:', searchResults.hotels);
  }, [searchResults]);

  const mapFlightData = (apiFlight) => {
    try {
      const firstSlice = apiFlight.slices?.[0];
      const firstSegment = firstSlice?.segments?.[0];
      
      return {
        id: apiFlight.id,
        originCode: firstSlice?.origin?.iata_code || 'N/A',
        originCity: firstSlice?.origin?.city_name || 'Unknown',
        destinationCode: firstSlice?.destination?.iata_code || 'N/A',
        destinationCity: firstSlice?.destination?.city_name || 'Unknown',
        departureTime: firstSegment?.departing_at || 'N/A',
        arrivalTime: firstSegment?.arriving_at || 'N/A',
        airline: firstSegment?.marketing_carrier?.name || 'Unknown Airline',
        logo: firstSegment?.marketing_carrier?.logo || '',
        price: apiFlight.total_amount || 0,
        hasPolicy: true,
      };
    } catch (error) {
      console.error('Error mapping flight:', error);
      return null;
    }
  };

  const mapHotelData = (apiHotel) => ({
    id: apiHotel.hotelId || apiHotel.dupeId,
    name: apiHotel.name || 'Unknown Hotel',
    location: apiHotel.iataCode || 'N/A',
    price: apiHotel.price?.value || 0,
    image: apiHotel.images?.main || 'default-hotel.jpg',
    rating: apiHotel.ratings?.overallRating || 0,
    nights: 1, // Calculate based on dates if needed
    guests: 1, // Default value
    amenities: apiHotel.amenities || [],
    checkIn: formData.hotel.checkIn || 'N/A',
    checkOut: formData.hotel.checkOut || 'N/A',
  });

  // Filter valid flights and hotels
  const mappedFlights = (activeTab === 'Flights' && Array.isArray(searchResults.flights))
    ? searchResults.flights.map(mapFlightData).filter(Boolean)
    : [];

  // Update the mappedHotels calculation:
  const mappedHotels = (
    activeTab === 'Hotels' &&
    Array.isArray(searchResults.hotels)  // Check the 'hotels' property
  ) ? searchResults.hotels.map(mapHotelData) : [];

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <Navbar />
      <TravelForm
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
        onResultsFetched={(data) => {
          console.log('Raw API response:', data);
          // Normalize response structure
          const normalizedData = {
            flights: data.data?.data || data.flights || [],
            hotels: data.hotel_list?.data || data.hotels || []
          };
          setSearchResults(normalizedData);
        }}
        setShowInventory={setShowInventory}
        setFormData={setFormData}
      />
      <div className="flex p-10 bg-appBg w-full gap-10">
        <div className="w-1/3">
          <FilterSection activeTab={activeTab} />
        </div>
        <div className="w-2/3">
          <TravelList
            activeTab={activeTab}
            flightsData={mappedFlights}
            hotelsData={mappedHotels}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightInventory;