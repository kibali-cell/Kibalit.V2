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
  const [travelers, setTravelers] = useState(initialResults?.travelers || []);

  const [formData, setFormData] = useState({
    flight: { from: '', to: '', departDate: '', returnDate: '' },
    hotel: { location: '', checkIn: '', checkOut: '', travelers: '' },
    bus: { from: '', to: '', travelDate: '', passengers: '' },
  });
  const [filters, setFilters] = useState({
    airlineSearch: '',
    onlyInPolicy: false,
    selectedStops: [],
    priceRange: { min: null, max: null },
    selectedFlightClasses: [],
    departureTimes: [],
    arrivalTimes: [],
    baggageOptions: [],
  });

  useEffect(() => {
    if (initialResults) {
      const normalizedData = Array.isArray(initialResults) 
        ? { flights: initialResults }
        : initialResults;
      setSearchResults(normalizedData);
      setTravelers(normalizedData.travelers || []);
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
      const passenger = firstSegment?.passengers?.[0];
      
      const baggages = passenger?.baggages || [];
      const hasCheckedBaggage = baggages.some(b => b.type === 'checked' && b.quantity > 0);
      const hasCarryOnBaggage = baggages.some(b => b.type === 'carry_on' && b.quantity > 0);
  
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
        currency: apiFlight.total_currency || 'KES',
        hasPolicy: apiFlight.offer_terms?.create_booking === "true",
        stops: firstSlice?.stops || 'N/A',
        cabinClass: passenger?.cabin_class_marketing_name || 'Economy',
        hasCheckedBaggage,
        hasCarryOnBaggage,
        // Keep the original data for the details panel
        originalData: apiFlight
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
    nights: 1,
    guests: 1,
    amenities: apiHotel.amenities || [],
    checkIn: formData.hotel.checkIn || 'N/A',
    checkOut: formData.hotel.checkOut || 'N/A',
  });

  // Get the flights array from the search results
  const flightsArray = Array.isArray(searchResults) ? searchResults : searchResults.flights || [];

  const mappedFlights = (activeTab === 'Flights' && Array.isArray(flightsArray))
    ? flightsArray.map(mapFlightData).filter(Boolean)
    : [];

  const mappedHotels = (activeTab === 'Hotels' && Array.isArray(searchResults.hotels))
    ? searchResults.hotels.map(mapHotelData)
    : [];

  const applyFilters = (flights, filters) => {
    return flights.filter(flight => {
      // Airline search
      if (filters.airlineSearch && !flight.airline.toLowerCase().includes(filters.airlineSearch.toLowerCase())) {
        return false;
      }

      // Policy compliance
      if (filters.onlyInPolicy && !flight.hasPolicy) {
        return false;
      }

      // Stops
      if (filters.selectedStops.length > 0) {
        let stopCategory;
        if (flight.stops === 'Non Stop') stopCategory = 'Non-stop';
        else if (flight.stops === '1 Stop') stopCategory = 'One-stop';
        else stopCategory = 'Multi-stops';
        if (!filters.selectedStops.includes(stopCategory)) return false;
      }

      // Price range
      if (filters.priceRange.min && flight.price < filters.priceRange.min) return false;
      if (filters.priceRange.max && flight.price > filters.priceRange.max) return false;

      // Flight class
      if (filters.selectedFlightClasses.length > 0 && !filters.selectedFlightClasses.includes(flight.cabinClass)) {
        return false;
      }

      // Departure time
      if (filters.departureTimes.length > 0) {
        const departureHour = new Date(flight.departureTime).getHours();
        let departureSlot;
        if (departureHour >= 5 && departureHour < 12) departureSlot = 'Morning';
        else if (departureHour >= 12 && departureHour < 17) departureSlot = 'Afternoon';
        else if (departureHour >= 17 && departureHour < 21) departureSlot = 'Evening';
        else departureSlot = 'Night';
        if (!filters.departureTimes.includes(departureSlot)) return false;
      }

      // Arrival time
      if (filters.arrivalTimes.length > 0) {
        const arrivalHour = new Date(flight.arrivalTime).getHours();
        let arrivalSlot;
        if (arrivalHour >= 5 && arrivalHour < 12) arrivalSlot = 'Morning';
        else if (arrivalHour >= 12 && arrivalHour < 17) arrivalSlot = 'Afternoon';
        else if (arrivalHour >= 17 && arrivalHour < 21) arrivalSlot = 'Evening';
        else arrivalSlot = 'Night';
        if (!filters.arrivalTimes.includes(arrivalSlot)) return false;
      }

      // Baggage
      if (filters.baggageOptions.includes('Free Checked Baggage Included') && !flight.hasCheckedBaggage) {
        return false;
      }
      if (filters.baggageOptions.includes('Cabin Baggage Included') && !flight.hasCarryOnBaggage) {
        return false;
      }

      return true;
    });
  };

  const filteredFlights = applyFilters(mappedFlights, filters);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <Navbar />
      <TravelForm
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={onClose}
        onResultsFetched={(data) => {
          console.log('Raw API response:', data);
          const normalizedData = {
            flights: data.data?.data || data.flights || [],
            hotels: data.hotel_list?.data || data.hotels || [],
            travelers: data.travelers || [],
          };
          setSearchResults(normalizedData);
          setTravelers(data.travelers || []); 
        }}
        setShowInventory={setShowInventory}
        setFormData={setFormData}
      />
      <div className="flex p-10 bg-appBg w-full gap-10">
        <div className="w-1/3">
          <FilterSection
            activeTab={activeTab}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
        <div className="w-2/3">
          <TravelList
            activeTab={activeTab}
            flightsData={filteredFlights}
            hotelsData={mappedHotels}
            travelers={travelers}
          />
        </div>
      </div>
    </div>
  );
};

export default FlightInventory;