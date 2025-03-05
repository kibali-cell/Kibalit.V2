import React, { useState } from 'react';
import { FaChevronDown, FaMapMarkerAlt } from 'react-icons/fa';
import { IoBedOutline } from "react-icons/io5";
import { FaRegBuilding, FaHotel,FaUmbrellaBeach } from "react-icons/fa";

const HotelsFilter = ({
  // Initial filter values
  initialFilters = {
    propertyName: '',
    priceRange: { min: '', max: '' },
    propertyTypes: [],
    reviewScores: [],
    stars: [],
    showInPolicy: false
  },
  // Callback when filters change
  onFilterChange = () => {},
  // Hotel statistics for dynamic filtering
  stats = {
    minPrice: 0,
    maxPrice: 1000000,
    availablePropertyTypes: ['hotels', 'apartments', 'rentals', 'resort'],
    availableStars: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', 'Any']
  },
  // UI customization
  className = '',
  showMapView = true,
  // Loading state
  isLoading = false
}) => {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    propertyType: true,
    reviewScore: true,
    hotelStars: true,
  });

  const [filters, setFilters] = useState(initialFilters);

  // Handle filter changes and notify parent
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Reset filters to initial state
  const clearFilters = () => {
    const resetFilters = {
      propertyName: '',
      priceRange: { min: '', max: '' },
      propertyTypes: [],
      reviewScores: [],
      stars: [],
      showInPolicy: false
    };
    handleFilterChange(resetFilters);
  };

  return (
    <div className={` bg-white p-6 space-y-6 ${className}`}>
      {/* Map View Button */}
      {showMapView && (
        <div className="bg-gray-50 p-3 rounded-lg">
          <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-700">
            <FaMapMarkerAlt />
            <span>View in a map</span>
          </button>
        </div>
      )}

      {/* Search by Property Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by Property name
        </label>
        <input
          type="text"
          placeholder="e.g Marriott"
          value={filters.propertyName}
          onChange={(e) => handleFilterChange({ ...filters, propertyName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          disabled={isLoading}
        />
      </div>

      {/* Policy Compliance Toggle */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            checked={filters.showInPolicy}
            onChange={(e) => handleFilterChange({ ...filters, showInPolicy: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300"
            disabled={isLoading}
          />
        </div>
        <label className="text-sm text-gray-600">
          Only show in-policy options
        </label>
      </div>

      {/* Clear Filters Link */}
      <div className="text-right">
        <button 
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          Clear filters
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="border-t pt-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-4"
          disabled={isLoading}
        >
          <span className="font-medium">Price per Night</span>
          <FaChevronDown className={`transform transition-transform ${
            expandedSections.price ? 'rotate-180' : ''
          }`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Minimum</label>
                <input
                  type="text"
                  placeholder={`Tsh ${stats.minPrice.toLocaleString()}`}
                  value={filters.priceRange.min}
                  onChange={(e) => handleFilterChange({
                    ...filters,
                    priceRange: { ...filters.priceRange, min: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled={isLoading}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Maximum</label>
                <input
                  type="text"
                  placeholder={`Tsh ${stats.maxPrice.toLocaleString()}`}
                  value={filters.priceRange.max}
                  onChange={(e) => handleFilterChange({
                    ...filters,
                    priceRange: { ...filters.priceRange, max: e.target.value }
                  })}
                  className="w-full p-2 border rounded-md text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Property Type Filter */}
      <div className="border-t pt-4">
        <button
          onClick={() => toggleSection('propertyType')}
          className="flex items-center justify-between w-full text-left mb-4"
          disabled={isLoading}
        >
          <span className="font-medium">Property Type</span>
          <FaChevronDown className={`transform transition-transform ${
            expandedSections.propertyType ? 'rotate-180' : ''
          }`} />
        </button>
        {expandedSections.propertyType && (
          <div className="grid grid-cols-2 gap-2">
            {stats.availablePropertyTypes.map(type => {
              const typeConfig = {
                apartments: { label: 'Apartments', icon: <FaRegBuilding /> },
                hotels: { label: 'Hotels', icon: <FaHotel /> },
                rentals: { label: 'Rentals', icon: <IoBedOutline /> },
                resort: { label: 'Resort', icon: <FaUmbrellaBeach /> }
              }[type];

              return (
                <button
                  key={type}
                  onClick={() => {
                    const newTypes = filters.propertyTypes.includes(type)
                      ? filters.propertyTypes.filter(t => t !== type)
                      : [...filters.propertyTypes, type];
                    handleFilterChange({ ...filters, propertyTypes: newTypes });
                  }}
                  className={`p-2 border rounded-md text-sm flex flex-col items-center justify-center gap-1 hover:bg-gray-50 ${
                    filters.propertyTypes.includes(type) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  disabled={isLoading}
                >
                  <span className="text-xl">{typeConfig.icon}</span>
                  <span className="text-xs">{typeConfig.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Score Filter */}
      <div className="border-t pt-4">
        <button
          onClick={() => toggleSection('reviewScore')}
          className="flex items-center justify-between w-full text-left mb-4"
          disabled={isLoading}
        >
          <span className="font-medium">Review Score</span>
          <FaChevronDown className={`transform transition-transform ${
            expandedSections.reviewScore ? 'rotate-180' : ''
          }`} />
        </button>
        {expandedSections.reviewScore && (
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Wonderful: 9+', value: '9' },
              { label: 'Very Good: 8+', value: '8' },
              { label: 'Good: 7+', value: '7' },
              { label: 'Pleasant: 5+', value: '5' },
              { label: 'Ok: 5+', value: '5' }
            ].map(score => (
              <button
                key={score.value}
                onClick={() => {
                  const newScores = filters.reviewScores.includes(score.value)
                    ? filters.reviewScores.filter(s => s !== score.value)
                    : [...filters.reviewScores, score.value];
                  handleFilterChange({ ...filters, reviewScores: newScores });
                }}
                className={`px-3 py-1 border rounded-full text-xs hover:bg-gray-50 ${
                  filters.reviewScores.includes(score.value) ? 'bg-blue-50 border-blue-200' : ''
                }`}
                disabled={isLoading}
              >
                {score.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hotel Stars Filter */}
      <div className="border-t pt-4">
        <button
          onClick={() => toggleSection('hotelStars')}
          className="flex items-center justify-between w-full text-left mb-4"
          disabled={isLoading}
        >
          <span className="font-medium">Hotel Stars</span>
          <FaChevronDown className={`transform transition-transform ${
            expandedSections.hotelStars ? 'rotate-180' : ''
          }`} />
        </button>
        {expandedSections.hotelStars && (
          <div className="flex flex-wrap gap-2">
            {stats.availableStars.map(star => (
              <button
                key={star}
                onClick={() => {
                  const newStars = filters.stars.includes(star)
                    ? filters.stars.filter(s => s !== star)
                    : [...filters.stars, star];
                  handleFilterChange({ ...filters, stars: newStars });
                }}
                className={`px-3 py-1 border rounded-full text-xs hover:bg-gray-50 ${
                  filters.stars.includes(star) ? 'bg-blue-50 border-blue-200' : ''
                }`}
                disabled={isLoading}
              >
                {star}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsFilter;