import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { PiSeatThin } from 'react-icons/pi';

const FlightsFilter = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    stops: true,
    price: true,
    flightClass: true,
    departureTime: true,
    arrivalTime: true,
    baggage: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => {
      const current = prev[key];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value],
      };
    });
  };

  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
  const stopOptions = ['Non-stop', 'One-stop', 'Multi-stops'];
  const classOptions = ['Economy', 'Premium Economy', 'Business', 'First Class'];
  const baggageOptions = ['Free Checked Baggage Included', 'Cabin Baggage Included', 'Extra Baggage Allowed'];

  return (
    <div className="p-4 rounded-lg space-y-4">
      {/* Search by Airline */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Search by Airline</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="e.g British Airways"
            value={filters.airlineSearch}
            onChange={(e) => setFilters(prev => ({ ...prev, airlineSearch: e.target.value }))}
            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Policy Compliance */}
      <div className="border-t pt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.onlyInPolicy}
            onChange={(e) => setFilters(prev => ({ ...prev, onlyInPolicy: e.target.checked }))}
            className="rounded border-gray-300"
          />
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
            {stopOptions.map(stop => (
              <button
                key={stop}
                onClick={() => toggleArrayFilter('selectedStops', stop)}
                className={`px-4 py-2 text-sm border rounded-md ${
                  filters.selectedStops.includes(stop) ? 'bg-blue-100' : 'hover:bg-gray-50'
                }`}
              >
                {stop}
              </button>
            ))}
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
              value={filters.priceRange.min || ''}
              onChange={(e) =>
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, min: e.target.value ? parseFloat(e.target.value) : null },
                }))
              }
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange.max || ''}
              onChange={(e) =>
                setFilters(prev => ({
                  ...prev,
                  priceRange: { ...prev.priceRange, max: e.target.value ? parseFloat(e.target.value) : null },
                }))
              }
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
            {classOptions.map(cls => (
              <button
                key={cls}
                onClick={() => toggleArrayFilter('selectedFlightClasses', cls)}
                className={`p-2 text-sm border rounded-md flex flex-col items-center justify-center gap-2 ${
                  filters.selectedFlightClasses.includes(cls) ? 'bg-blue-100' : 'hover:bg-gray-50'
                }`}
              >
                <PiSeatThin className="w-8 h-10" />
                <span>{cls}</span>
              </button>
            ))}
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
            {timeOptions.map(time => (
              <button
                key={time}
                onClick={() => toggleArrayFilter('departureTimes', time)}
                className={`p-2 text-sm border rounded-md ${
                  filters.departureTimes.includes(time) ? 'bg-blue-100' : 'hover:bg-gray-50'
                }`}
              >
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
            {timeOptions.map(time => (
              <button
                key={`arrival-${time}`}
                onClick={() => toggleArrayFilter('arrivalTimes', time)}
                className={`p-2 text-sm border rounded-md ${
                  filters.arrivalTimes.includes(time) ? 'bg-blue-100' : 'hover:bg-gray-50'
                }`}
              >
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
            {baggageOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 border rounded-sm px-2 py-1">
                <input
                  type="checkbox"
                  checked={filters.baggageOptions.includes(option)}
                  onChange={() => toggleArrayFilter('baggageOptions', option)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">{option}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightsFilter;