import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { PiSeatThin } from "react-icons/pi";

const FlightsFilter = () => {
  const [expandedSections, setExpandedSections] = useState({
    stops: true,
    price: true,
    flightClass: true,
    departureTime: true,
    arrivalTime: true,
    baggage: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  return (
    <>
      <div className="p-4 rounded-lg space-y-4">
        {/* Search by Airline */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Airline
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g Precision"
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Policy Compliance */}
        <div className="border-t pt-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-600">Only show in-policy options</span>
          </label>
        </div>

        {/* Stops */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('stops')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Stops</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.stops ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.stops && (
            <div className="space-x-2">
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">Non-stop</button>
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">One-stop</button>
              <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">Multi-stops</button>
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Price per Flight</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.price && (
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 px-3 py-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 px-3 py-2 border rounded-md"
              />
            </div>
          )}
        </div>

        {/* Flight Class */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('flightClass')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Flight Class</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.flightClass ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.flightClass && (
            <div className="grid grid-cols-2 gap-2">
              <button className="p-2 text-sm border rounded-md hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                <PiSeatThin className="w-8 h-10" />
                <span>Economy</span>
              </button>
              <button className="p-2 text-sm border rounded-md hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                <PiSeatThin className="w-8 h-10" />
                <span>Premium Economy</span>
              </button>
              <button className="p-2 text-sm border rounded-md hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                <PiSeatThin className="w-8 h-10" />
                <span>Business</span>
              </button>
              <button className="p-2 text-sm border rounded-md hover:bg-gray-50 flex flex-col items-center justify-center gap-2">
                <PiSeatThin className="w-8 h-10" />
                <span>First Class</span>
              </button>
            </div>
          )}
        </div>

        {/* Departing Time */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('departureTime')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Departing Time</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.departureTime ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.departureTime && (
            <div className="flex gap-2">
              {timeOptions.map((time) => (
                <button key={time} className="p-2 text-sm border rounded-md hover:bg-gray-50">
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Arrival Time */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('arrivalTime')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Arrival Time</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.arrivalTime ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.arrivalTime && (
            <div className="flex gap-2">
              {timeOptions.map((time) => (
                <button key={`arrival-${time}`} className="p-2 text-sm border rounded-md hover:bg-gray-50">
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Baggage */}
        <div className="border-t pt-4">
          <button
            onClick={() => toggleSection('baggage')}
            className="flex items-center justify-between w-full text-left mb-2"
          >
            <span className="font-medium">Baggage</span>
            <FaChevronDown className={`transform transition-transform ${expandedSections.baggage ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.baggage && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 border rounded-sm px-2 py-1">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Free Checked Baggage Included</span>
              </label>
              <label className="flex items-center space-x-2 border rounded-sm px-2 py-1">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Cabin Baggage Included</span>
              </label>
              <label className="flex items-center space-x-2 border rounded-sm px-2 py-1">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Extra Baggage Allowed</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlightsFilter;