import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { IoAirplaneOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import FlightExtrasPanel from './FlightExtrasPanel';

const SeatSelectionPanel = ({ isOpen, onClose, flight, onSelectionComplete, travelers = [] }) => {
  const [travelerSeats, setTravelerSeats] = useState({});
  const [activeTraveler, setActiveTraveler] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReturn, setIsReturn] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [totalPrice, setTotalPrice] = useState(flight?.total_amount || 0);
  const [priceBreakdown, setPriceBreakdown] = useState({
    baseFlight: flight?.total_amount || 0,
    seats: 0,
    extras: 0
  });

  useEffect(() => {
    if (isOpen) {
      generateSeats();
      // Initialize traveler seats structure if not already set
      if (Object.keys(travelerSeats).length === 0 && travelers.length > 0) {
        const initialSeats = {};
        travelers.forEach(traveler => {
          initialSeats[traveler.id] = {
            outbound: null,
            return: null
          };
        });
        setTravelerSeats(initialSeats);
        setActiveTraveler(travelers[0]?.id || null);
      }
    }
  }, [isOpen, isReturn, travelers]);

  useEffect(() => {
    // Calculate seat prices for all travelers
    let seatPriceTotal = 0;
    const seatPricePerTraveler = {};
    
    Object.entries(travelerSeats).forEach(([travelerId, seatSelection]) => {
      const outboundSeat = seatSelection.outbound ? seats.find(s => s.id === seatSelection.outbound) : null;
      const returnSeat = seatSelection.return ? seats.find(s => s.id === seatSelection.return) : null;
      
      let travelerSeatPrice = 0;
      if (outboundSeat) travelerSeatPrice += outboundSeat.price || 0;
      if (returnSeat) travelerSeatPrice += returnSeat.price || 0;
      
      seatPriceTotal += travelerSeatPrice;
      seatPricePerTraveler[travelerId] = travelerSeatPrice;
    });
    
    const extrasTotal = Object.values(selectedExtras).reduce((sum, extra) => sum + (extra.price || 0), 0);
    
    // Update price breakdown
    setPriceBreakdown({
      baseFlight: flight?.total_amount || 0,
      seats: seatPriceTotal,
      extras: extrasTotal,
      perTraveler: seatPricePerTraveler
    });
    
    // Update total price
    setTotalPrice((flight?.total_amount || 0) + seatPriceTotal + extrasTotal);
  }, [travelerSeats, selectedExtras, flight?.total_amount, seats]);

  const generateSeats = () => {
    const cabinClass = flight?.slices?.[isReturn ? 1 : 0]?.segments?.[0]?.passengers?.[0]?.cabin_class_marketing_name || 'Economy';
    const rows = cabinClass === 'Economy' ? 20 : 8;
    const seatsPerRow = cabinClass === 'Economy' ? 6 : 4;
    
    const newSeats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatLetter = String.fromCharCode(64 + seat);
        const seatNumber = `${row}${seatLetter}`;
        
        const isAvailable = Math.random() > 0.3;
        
        let seatType = 'standard';
        if (cabinClass === 'Economy') {
          if (seat === 1 || seat === seatsPerRow) seatType = 'window';
          else if (seat === 2 || seat === seatsPerRow - 1) seatType = 'middle';
          else seatType = 'aisle';
        } else {
          if (seat === 1 || seat === seatsPerRow) seatType = 'window';
          else seatType = 'aisle';
        }

        newSeats.push({
          id: seatNumber,
          number: seatNumber,
          row,
          seat: seatLetter,
          type: seatType,
          available: isAvailable,
          price: calculateSeatPrice(seatType, cabinClass)
        });
      }
    }
    
    setSeats(newSeats);
    setLoading(false);
  };

  const calculateSeatPrice = (seatType, cabinClass) => {
    const basePrice = cabinClass === 'Economy' ? 15000 : 25000;
    const typeMultiplier = {
      window: 1.2,
      aisle: 1.1,
      middle: 1.0,
      standard: 1.0
    };
    return Math.round(basePrice * typeMultiplier[seatType]);
  };

  const handleSeatClick = (seat) => {
    if (!seat.available || !activeTraveler) return;
    
    setTravelerSeats(prev => {
      const newState = { ...prev };
      const flightType = isReturn ? 'return' : 'outbound';
      newState[activeTraveler] = {
        ...newState[activeTraveler],
        [flightType]: newState[activeTraveler][flightType] === seat.id ? null : seat.id
      };
      return newState;
    });
  };

  const handleConfirmSelection = () => {
    // Check if all travelers have seats selected for both directions (if round-trip)
    let allSeatsSelected = true;
    travelers.forEach(traveler => {
      const travelerSeatsSelected = travelerSeats[traveler.id];
      if (!travelerSeatsSelected) {
        allSeatsSelected = false;
        return;
      }
      
      if (!travelerSeatsSelected.outbound) {
        allSeatsSelected = false;
        return;
      }
      
      // If it's a round trip, check return seats
      if (flight.slices?.length > 1 && !travelerSeatsSelected.return) {
        allSeatsSelected = false;
        return;
      }
    });
    
    if (allSeatsSelected) {
      setIsExtrasOpen(true);
    } else {
      // Show a message or indicator that not all seats are selected
      alert("Please select seats for all travelers");
    }
  };

  const handleExtrasClose = (extras) => {
    setIsExtrasOpen(false);
    if (extras) {
      setSelectedExtras(extras);
      
      // Prepare final selection data
      const selectedData = {
        flight,
        travelerSeats: travelers.map(traveler => ({
          traveler,
          outboundSeat: seats.find(s => s.id === travelerSeats[traveler.id]?.outbound),
          returnSeat: flight.slices?.length > 1 ? seats.find(s => s.id === travelerSeats[traveler.id]?.return) : null
        })),
        extras,
        priceBreakdown,
        totalPrice
      };
      
      // Pass the complete selection data to parent
      if (onSelectionComplete) {
        onSelectionComplete(selectedData);
      }
      onClose();
    }
  };

  const isSeatSelected = (seatId) => {
    // Check if this seat is selected by any traveler for current direction
    const direction = isReturn ? 'return' : 'outbound';
    return Object.values(travelerSeats).some(ts => ts[direction] === seatId);
  };

  const isSeatSelectedByActiveTraveler = (seatId) => {
    if (!activeTraveler) return false;
    const direction = isReturn ? 'return' : 'outbound';
    return travelerSeats[activeTraveler]?.[direction] === seatId;
  };

  // Get the traveler who selected a particular seat
  const getTravelerForSeat = (seatId) => {
    const direction = isReturn ? 'return' : 'outbound';
    for (const [travelerId, seats] of Object.entries(travelerSeats)) {
      if (seats[direction] === seatId) {
        return travelers.find(t => t.id === travelerId);
      }
    }
    return null;
  };

  // Get seat details by id
  const getSeatById = (seatId) => {
    return seats.find(s => s.id === seatId);
  };

  if (!isOpen || !flight) return null;

  const currentSlice = flight.slices?.[isReturn ? 1 : 0];
  const cabinClass = currentSlice?.segments?.[0]?.passengers?.[0]?.cabin_class_marketing_name || 'Economy';
  const airline = currentSlice?.segments?.[0]?.marketing_carrier?.name || 'Airline';
  const flightNumber = currentSlice?.segments?.[0]?.marketing_carrier_flight_number || '';
  const origin = currentSlice?.segments?.[0]?.origin?.iata_code || '';
  const destination = currentSlice?.segments?.[0]?.destination?.iata_code || '';

  // Get progress info - how many travelers need seats
  const totalTravelers = travelers.length;
  const direction = isReturn ? 'return' : 'outbound';
  const seatedTravelers = Object.values(travelerSeats).filter(ts => ts[direction] !== null).length;

  return (
    <>
      <div className="fixed inset-0 bg-[#1C1C1C] bg-opacity-30 z-50">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto">
          <div className="p-6 flex flex-col">
          {/* Header */}
            <div className="flex items-center mb-6">
              <button onClick={() => onClose()} className="p-2 hover:bg-[#F5F5F5] rounded-full">
                <FaRegArrowAltCircleLeft className="text-xl text-[#1C1C1C]" />
              </button>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-[#1C1C1C]">Select Seat & Passenger</h2>
                <p className="text-sm text-[#737373]">{airline} - Flight {flightNumber}</p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mb-4">
              <div className="text-sm text-[#737373] mb-1">
                Seat selection progress: {seatedTravelers}/{totalTravelers} travelers
              </div>
              <div className="w-full bg-[#F5F5F5] rounded-full h-2">
                <div 
                  className="bg-[#1C1C1C] h-2 rounded-full" 
                  style={{ width: `${(seatedTravelers / totalTravelers) * 100}%` }}
                />
              </div>
            </div>

            {/* Flight Direction Toggle */}
            {flight.slices?.length > 1 && (
              <div className="flex gap-2 mb-4">
              <button
                  className={`px-4 py-2 rounded-md ${
                    !isReturn
                      ? 'bg-[#1C1C1C] text-white'
                      : 'bg-[#F5F5F5] text-[#374151]'
                  }`}
                  onClick={() => setIsReturn(false)}
                >
                  {origin} → {destination}
              </button>
              <button
                  className={`px-4 py-2 rounded-md ${
                    isReturn
                      ? 'bg-[#1C1C1C] text-white'
                      : 'bg-[#F5F5F5] text-[#374151]'
                  }`}
                  onClick={() => setIsReturn(true)}
                >
                  {destination} → {origin}
              </button>
            </div>
            )}

            {/* Traveler Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#1C1C1C] mb-2">Select Passenger</h3>
              {travelers.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {travelers.map((traveler) => {
                    const direction = isReturn ? 'return' : 'outbound';
                    const hasSeat = travelerSeats[traveler.id]?.[direction] !== null;
                    const selectedSeatId = travelerSeats[traveler.id]?.[direction];
                    const selectedSeat = selectedSeatId ? getSeatById(selectedSeatId) : null;
                    
                    return (
                      <button
                        key={traveler.id}
                        onClick={() => setActiveTraveler(traveler.id)}
                        className={`
                          flex items-center gap-2 p-3 rounded-md border-2
                          ${activeTraveler === traveler.id 
                            ? 'border-[#1C1C1C] bg-[#F5F5F5]' 
                            : 'border-[#EBEBEB] hover:border-[#1C1C1C]'
                          }
                          ${hasSeat ? 'bg-[#F5F5F5]' : ''}
                        `}
                      >
                        <FaUser className={`${hasSeat ? 'text-green-600' : 'text-[#1C1C1C]'}`} />
                        <div className="text-left flex-1">
                          <div className="text-sm font-medium">{traveler.name}</div>
                          <div className="text-xs text-[#737373] flex justify-between">
                            <span>{traveler.department}</span>
                            {hasSeat && (
                              <span className="text-green-600 flex items-center">
                                <span className="mr-1">✓</span>
                                <span>{selectedSeat?.number}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4 text-[#737373]">No travelers selected</div>
              )}
            </div>

            {/* Seat Map */}
            <div>
              <div className="max-w-2xl mx-auto">
                {/* Airplane Graphic */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IoAirplaneOutline className="text-3xl text-[#E6E6E6] transform rotate-90" />
                  </div>
                  <div className="h-1 bg-[#E6E6E6]"></div>
                </div>

                {/* Seat Legend */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 border-2 border-[#EBEBEB] rounded"></div>
                    <span className="text-xs text-[#737373]">Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#1C1C1C] rounded"></div>
                    <span className="text-xs text-[#737373]">Selected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#E6E6E6] rounded"></div>
                    <span className="text-xs text-[#737373]">Unavailable</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 border-2 border-[#1C1C1C] rounded"></div>
                    <span className="text-xs text-[#737373]">Window</span>
                  </div>
                </div>

                {/* Active Traveler Info */}
                {activeTraveler && (
                  <div className="mb-4 p-2 bg-[#F5F5F5] rounded-md">
                    <p className="text-sm">
                      Currently selecting for: <span className="font-medium">
                        {travelers.find(t => t.id === activeTraveler)?.name}
                      </span>
                      {isReturn ? ' (Return flight)' : ' (Outbound flight)'}
                    </p>
                  </div>
                )}

                {/* Seat Grid */}
                <div className="space-y-2">
                  {loading ? (
                    <div className="text-center py-4 text-[#737373]">Loading seats...</div>
                  ) : (
                    <div className="grid grid-cols-6 gap-1">
                      {seats.map((seat) => {
                        const isSelectedBySomeone = isSeatSelected(seat.id);
                        const isSelectedByActive = isSeatSelectedByActiveTraveler(seat.id);
                        const travelerForSeat = isSelectedBySomeone ? getTravelerForSeat(seat.id) : null;
                        
                        return (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat)}
                            className={`
                              relative w-8 h-8 rounded flex items-center justify-center text-xs font-medium
                              ${!seat.available || (isSelectedBySomeone && !isSelectedByActive) ? 'bg-[#E6E6E6] cursor-not-allowed' : ''}
                              ${isSelectedByActive ? 'bg-[#1C1C1C] text-white' : 'border-2 border-[#EBEBEB]'}
                              ${isSelectedBySomeone && !isSelectedByActive ? 'bg-blue-200' : ''}
                              ${seat.type === 'window' ? 'border-[#1C1C1C]' : ''}
                              hover:${seat.available && !isSelectedBySomeone ? 'border-[#1C1C1C]' : ''}
                            `}
                            disabled={!seat.available || (isSelectedBySomeone && !isSelectedByActive)}
                            title={travelerForSeat ? `Selected by ${travelerForSeat.name}` : ''}
                          >
                            {seat.seat}
                            {isSelectedBySomeone && !isSelectedByActive && (
                              <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-3 h-3 flex items-center justify-center" 
                                title={travelerForSeat?.name || 'Selected'}>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-[#EBEBEB]">
              <div className="flex flex-col">
                {/* Price Breakdown Section */}
                <div className="mb-3">
                  <div className="text-lg font-semibold text-[#1C1C1C] mb-2">
                    Price Breakdown
                  </div>
                  
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-sm text-[#737373]">Base flight price</div>
                    <div className="text-sm font-medium">{flight.total_currency} {priceBreakdown.baseFlight.toLocaleString()}</div>
                  </div>
                  
                  {/* Seat selection breakdown per traveler */}
                  {priceBreakdown.seats > 0 && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm text-[#737373]">Seat selection</div>
                        <div className="text-sm font-medium">{flight.total_currency} {priceBreakdown.seats.toLocaleString()}</div>
                      </div>
                      
                      {/* Per traveler breakdown */}
                      <div className="pl-4 mb-2">
                        {Object.entries(priceBreakdown.perTraveler || {}).map(([travelerId, price]) => {
                          if (price <= 0) return null;
                          const traveler = travelers.find(t => t.id === travelerId);
                          if (!traveler) return null;
                          
                          const outboundSeatId = travelerSeats[travelerId]?.outbound;
                          const returnSeatId = travelerSeats[travelerId]?.return;
                          const outboundSeat = outboundSeatId ? getSeatById(outboundSeatId) : null;
                          const returnSeat = returnSeatId ? getSeatById(returnSeatId) : null;
                          
                          return (
                            <div key={travelerId} className="flex justify-between items-center text-xs text-[#737373]">
                              <div>{traveler.name} - {outboundSeat?.number || '-'}{returnSeat ? ` / ${returnSeat.number}` : ''}</div>
                              <div>{flight.total_currency} {price.toLocaleString()}</div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {/* Extras */}
                  {priceBreakdown.extras > 0 && (
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-[#737373]">Extras</div>
                      <div className="text-sm font-medium">{flight.total_currency} {priceBreakdown.extras.toLocaleString()}</div>
                    </div>
                  )}
                  
                  {/* Total with tax */}
                  <div className="flex justify-between items-center pt-2 border-t border-[#EBEBEB]">
                    <div className="text-sm font-semibold">Total price</div>
                    <div className="text-xl font-semibold text-[#1C1C1C]">
                      {flight.total_currency} {totalPrice.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                {/* Continue Button */}
                <div className="flex justify-end mt-2">
                  <button
                    className={`px-6 py-2 rounded-md ${
                      seatedTravelers === totalTravelers
                        ? 'bg-[#1C1C1C] text-white hover:bg-opacity-90'
                        : 'bg-[#F5F5F5] text-[#737373] cursor-not-allowed'
                    }`}
                    disabled={seatedTravelers !== totalTravelers}
                    onClick={handleConfirmSelection}
                  >
                    {seatedTravelers === totalTravelers ? 'Continue to Extras' : `Select all seats (${seatedTravelers}/${totalTravelers})`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FlightExtrasPanel
        isOpen={isExtrasOpen}
        onClose={handleExtrasClose}
        flight={flight}
        travelers={travelers}
        basePrice={totalPrice}
        currentExtras={selectedExtras}
      />
    </>
  );
};

export default SeatSelectionPanel;