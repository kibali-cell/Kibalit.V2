import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { IoAirplaneOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import FlightExtrasPanel from './FlightExtrasPanel';

const SeatSelectionPanel = ({ isOpen, onClose, flight, onSelectionComplete, travelers = [] }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReturn, setIsReturn] = useState(false);
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState({});
  const [totalPrice, setTotalPrice] = useState(flight?.total_amount || 0);

  useEffect(() => {
    if (isOpen) {
      generateSeats();
    }
  }, [isOpen, isReturn]);

  useEffect(() => {
    // Update total price whenever seat or extras change
    const seatPrice = selectedSeat ? seats.find(s => s.id === selectedSeat)?.price || 0 : 0;
    const extrasTotal = Object.values(selectedExtras).reduce((sum, extra) => sum + (extra.price || 0), 0);
    setTotalPrice(flight.total_amount + seatPrice + extrasTotal);
  }, [selectedSeat, selectedExtras, flight.total_amount, seats]);

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
    if (seat.available) {
      setSelectedSeat(selectedSeat === seat.id ? null : seat.id);
    }
  };

  const handleConfirmSelection = () => {
    if (selectedSeat && selectedTraveler) {
      setIsExtrasOpen(true);
    }
  };

  const handleExtrasClose = (extras) => {
    setIsExtrasOpen(false);
    if (extras) {
      setSelectedExtras(extras);
      
      // Prepare final selection data
      const selectedData = {
        flight,
        seat: seats.find(s => s.id === selectedSeat),
        traveler: travelers.find(t => t.id === selectedTraveler),
        extras,
        totalPrice,
        isReturn
      };
      
      // Pass the complete selection data to parent
      if (onSelectionComplete) {
        onSelectionComplete(selectedData);
      }
      onClose();
    }
  };

  if (!isOpen || !flight) return null;

  const currentSlice = flight.slices?.[isReturn ? 1 : 0];
  const cabinClass = currentSlice?.segments?.[0]?.passengers?.[0]?.cabin_class_marketing_name || 'Economy';
  const airline = currentSlice?.segments?.[0]?.marketing_carrier?.name || 'Airline';
  const flightNumber = currentSlice?.segments?.[0]?.marketing_carrier_flight_number || '';
  const origin = currentSlice?.segments?.[0]?.origin?.iata_code || '';
  const destination = currentSlice?.segments?.[0]?.destination?.iata_code || '';

  return (
    <>
      <div className="fixed inset-0 bg-[#1C1C1C] bg-opacity-30 z-50">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl">
          <div className="p-6 h-full flex flex-col">
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
                  {travelers.map((traveler) => (
                    <button
                      key={traveler.id}
                      onClick={() => setSelectedTraveler(traveler.id)}
                      className={`
                        flex items-center gap-2 p-3 rounded-md border-2
                        ${selectedTraveler === traveler.id 
                          ? 'border-[#1C1C1C] bg-[#F5F5F5]' 
                          : 'border-[#EBEBEB] hover:border-[#1C1C1C]'
                        }
                      `}
                    >
                      <FaUser className="text-[#1C1C1C]" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{traveler.name}</div>
                        <div className="text-xs text-[#737373]">{traveler.department}</div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-[#737373]">No travelers selected</div>
              )}
            </div>

            {/* Seat Map */}
            <div className="flex-1 overflow-auto">
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

                {/* Seat Grid */}
                <div className="space-y-2">
                  {loading ? (
                    <div className="text-center py-4 text-[#737373]">Loading seats...</div>
                  ) : (
                    <div className="grid grid-cols-6 gap-1">
                      {seats.map((seat) => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          className={`
                            w-8 h-8 rounded flex items-center justify-center text-xs font-medium
                            ${!seat.available ? 'bg-[#E6E6E6] cursor-not-allowed' : ''}
                            ${selectedSeat === seat.id ? 'bg-[#1C1C1C] text-white' : 'border-2 border-[#EBEBEB]'}
                            ${seat.type === 'window' ? 'border-[#1C1C1C]' : ''}
                            hover:${seat.available ? 'border-[#1C1C1C]' : ''}
                          `}
                          disabled={!seat.available}
                        >
                          {seat.seat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-[#EBEBEB]">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-[#737373]">Total Price</div>
                <div className="text-xl font-semibold text-[#1C1C1C]">
                  {flight.total_currency} {totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-[#737373] mt-1">
                  Base price: {flight.total_currency} {flight.total_amount.toLocaleString()}
                </div>
                {selectedSeat && (
                  <div className="text-sm text-[#737373]">
                    Seat selection: + {flight.total_currency} {seats.find(s => s.id === selectedSeat)?.price.toLocaleString()}
                  </div>
                )}
                {Object.keys(selectedExtras).length > 0 && (
                  <div className="text-sm text-[#737373]">
                    Extras: + {flight.total_currency} {Object.values(selectedExtras).reduce((sum, extra) => sum + (extra.price || 0), 0).toLocaleString()}
                  </div>
                )}
              </div>
              <button
                className={`px-6 py-2 rounded-md ${
                  selectedSeat && selectedTraveler
                    ? 'bg-[#1C1C1C] text-white hover:bg-opacity-90'
                    : 'bg-[#F5F5F5] text-[#737373] cursor-not-allowed'
                }`}
                disabled={!selectedSeat || !selectedTraveler}
                onClick={handleConfirmSelection}
              >
                Continue to Extras
              </button>
            </div>
          </div>
        </div>
      </div>

      <FlightExtrasPanel
        isOpen={isExtrasOpen}
        onClose={handleExtrasClose}
        flight={flight}
        basePrice={totalPrice}
        currentExtras={selectedExtras}
      />
    </>
  );
};

export default SeatSelectionPanel;