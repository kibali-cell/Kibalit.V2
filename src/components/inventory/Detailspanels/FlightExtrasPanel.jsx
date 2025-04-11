import React, { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoAirplaneOutline } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import SeatSelectionPanel from "./SeatSelectionPanel";
import AddMoreFlights from "./AddMoreFlights";

const FlightExtrasPanel = ({ isOpen, onClose, basePrice = 0, flight, travelers = [] }) => {
  const [selectedBaggage, setSelectedBaggage] = useState([]);
  const [isSeatSelectOpen, setIsSeatSelectOpen] = useState(false);
  const [isMoreFlightsOpen, setIsMoreFlightOpen] = useState(false);

  if (!isOpen || !flight) return null;

  // Get the first slice and segment from the flight data
  const flightSlice = flight.slices?.[0];
  const flightSegment = flightSlice?.segments?.[0];
  const passenger = flightSegment?.passengers?.[0];

  // Get baggage options from the flight data
  const checkedBaggageOptions = [
    { 
      id: 'checked_1', 
      weight: "23kg Checked Baggage", 
      price: 45000,
      description: "Standard checked baggage allowance"
    },
    { 
      id: 'checked_2', 
      weight: "32kg Checked Baggage", 
      price: 65000,
      description: "Extra weight allowance"
    },
    { 
      id: 'checked_3', 
      weight: "45kg Checked Baggage", 
      price: 85000,
      description: "Maximum weight allowance"
    },
  ];

  const carryOnOptions = [
    { 
      id: 'carry_1', 
      weight: "7kg Cabin Baggage", 
      price: 25000,
      description: "Standard cabin baggage"
    },
    { 
      id: 'carry_2', 
      weight: "12kg Cabin Baggage", 
      price: 35000,
      description: "Extra cabin baggage"
    },
    { 
      id: 'carry_3', 
      weight: "15kg Cabin Baggage", 
      price: 45000,
      description: "Maximum cabin baggage"
    },
  ];

  const toggleBaggage = (id) => {
    setSelectedBaggage((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const extrasCost = selectedBaggage.reduce((total, id) => {
      const option = [...checkedBaggageOptions, ...carryOnOptions].find(opt => opt.id === id);
      return total + (option?.price || 0);
    }, 0);
    return basePrice + extrasCost;
  };

  const getSelectedBaggageDetails = () => {
    return selectedBaggage.map(id => {
      const option = [...checkedBaggageOptions, ...carryOnOptions].find(opt => opt.id === id);
      return option;
    }).filter(Boolean);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="p-6 h-full flex flex-col overflow-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaRegArrowAltCircleLeft className="text-xl" />
            </button>
            <h2 className="text-xl font-semibold ml-4">Flight Extras</h2>
          </div>

          <div className="pl-10 pr-5">
            <div className="flex-1">
              {/* Flight Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">{flightSegment?.marketing_carrier?.name}</h3>
                    <p className="text-sm text-gray-500">Flight {flightSegment?.marketing_carrier_flight_number}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{flightSlice?.origin?.iata_code} → {flightSlice?.destination?.iata_code}</p>
                    <p className="text-sm text-gray-500">{passenger?.cabin_class_marketing_name}</p>
                  </div>
                </div>
              </div>

              {/* Seat Selection */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium mb-1">Seat Selection</h3>
                    <p className="text-sm text-gray-500">
                      Choose your preferred seat for extra comfort
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 text-sm bg-white border border-primaryText rounded-md hover:bg-gray-50"
                    onClick={() => setIsSeatSelectOpen(true)}
                  >
                    Select Seat
                  </button>
                </div>
              </div>

              {/* Baggage Options */}
              <div className="space-y-6">
                {/* Checked Baggage */}
                <div>
                  <h4 className="font-medium mb-3">Checked Baggage</h4>
                  <div className="space-y-2">
                    {checkedBaggageOptions.map((option) => (
                      <label key={option.id} className="flex border rounded-md items-center bg-white px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={selectedBaggage.includes(option.id)}
                          onChange={() => toggleBaggage(option.id)}
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">{option.weight}</span>
                              <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                            <span className="text-sm font-medium">
                              + {option.price.toLocaleString()} {flight.total_currency}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Carry-on Baggage */}
                <div>
                  <h4 className="font-medium mb-3">Carry-on Baggage</h4>
                  <div className="space-y-2">
                    {carryOnOptions.map((option) => (
                      <label key={option.id} className="flex border rounded-md items-center bg-white px-4 py-3 hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          checked={selectedBaggage.includes(option.id)}
                          onChange={() => toggleBaggage(option.id)}
                        />
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-medium">{option.weight}</span>
                              <p className="text-sm text-gray-500">{option.description}</p>
                            </div>
                            <span className="text-sm font-medium">
                              + {option.price.toLocaleString()} {flight.total_currency}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Total and Action Button */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-sm text-gray-600">Total for flight</div>
                  <div className="text-xl font-semibold">
                    {flight.total_currency} {calculateTotal().toLocaleString()}
                  </div>
                  {selectedBaggage.length > 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      Includes {selectedBaggage.length} extra(s)
                    </div>
                  )}
                </div>
                <button
                  className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                  onClick={() => setIsMoreFlightOpen(true)}
                >
                  Add flight to trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SeatSelectionPanel
        isOpen={isSeatSelectOpen}
        onClose={() => setIsSeatSelectOpen(false)}
        flight={flight}
        travelers={travelers}
      />
      <AddMoreFlights
        isOpen={isMoreFlightsOpen}
        onClose={() => setIsMoreFlightOpen(false)}
      />
    </div>
  );
};

export default FlightExtrasPanel;
