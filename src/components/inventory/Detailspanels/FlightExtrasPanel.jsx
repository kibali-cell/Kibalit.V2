import React, { useState } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { IoClose, IoAirplaneOutline } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import SeatSelectionPanel from "./SeatSelectionPanel";
import AddMoreFlights from "./AddMoreFlights";

const FlightExtrasPanel = ({ isOpen, onClose, basePrice = 860000 }) => {
  const [selectedBaggage, setSelectedBaggage] = useState([]);
  const [isSeatSelectOpen, setIsSeatSelectOpen] = useState(false);
  const [isMoreFlightsOpen, setIsMoreFlightOpen] = useState(false);

  if (!isOpen) return null;

  const checkedBaggageOptions = [
    { id: 1, weight: "1 Checked Baggage", price: 45000 },
    { id: 2, weight: "1 Checked Baggage", price: 45000 },
    { id: 3, weight: "1 Checked Baggage", price: 45000 },
  ];

  const carryOnOptions = [
    { id: 4, weight: "One 23kg Carry-on Baggage", price: 45000 },
    { id: 5, weight: "One 23kg Carry-on Baggage", price: 45000 },
    { id: 6, weight: "One 23kg Carry-on Baggage", price: 45000 },
  ];

  const toggleBaggage = (id) => {
    setSelectedBaggage((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const extrasCost = selectedBaggage.length * 45000;
    return basePrice + extrasCost;
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
            <h2 className="text-xl font-semibold">Extras</h2>
          </div>
        <div className="pl-10 pr-5">
          <div className="flex-1 ">
            {/* Seat Selection */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium mb-1">Seat Selection</h3>
                  <p className="text-sm text-gray-500">
                    Seats available for this flight at an extra cost
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

            {/* Baggage Section */}
            <div>
              <h3 className="font-medium mb-4">Baggage</h3>
                <div className="bg-appBg">
              {/* Checked Baggage */}
              <div className="rounded-lg px-6 py-2 ">
                <h4 className="font-medium mb-3">Checked Baggage</h4>
                <div className="space-y-2">
                  {checkedBaggageOptions.map((option) => (
                    <label key={option.id} className="flex  border rounded-md items-center bg-white px-4 py-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 "
                        checked={selectedBaggage.includes(option.id)}
                        onChange={() => toggleBaggage(option.id)}
                      />
                      <div className="flex flex-col">
                      <span className="ml-3 flex-1 text-sm">
                        {option.weight}
                      </span>
                      <span className="text-sm text-gray-600">
                        + Tsh {option.price.toLocaleString()}
                      </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Carry-on Baggage */}
              <div className=" px-6 py-4">
                <h4 className="font-medium mb-3">Carry-on Baggage</h4>
                <div className="space-y-2">
                  {carryOnOptions.map((option) => (
                    <label key={option.id} className="flex  border rounded-md items-center bg-white px-4 py-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        checked={selectedBaggage.includes(option.id)}
                        onChange={() => toggleBaggage(option.id)}
                      />
                      <div className="flex flex-col">
                      <span className="ml-3 flex-1 text-sm">
                        {option.weight}
                      </span>
                      <span className="text-sm text-gray-600">
                        + Tsh {option.price.toLocaleString()}
                      </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Total and Action Button */}
          <div className="mt-6 pt-4 ">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-gray-600">Total for flight</div>
                <div className="text-xl font-semibold">
                  Tsh {calculateTotal().toLocaleString()}
                </div>
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
      />
      <AddMoreFlights
        isOpen={isMoreFlightsOpen}
        onClose={() => setIsMoreFlightOpen(false)}
      />
    </div>
  );
};

export default FlightExtrasPanel;
