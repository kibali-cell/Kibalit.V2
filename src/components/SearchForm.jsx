import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../contexts/AuthContext';

const SearchForm = ({ onSearchResults }) => {
  const { isAuthenticated, getAuthToken } = useAuth();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: 1,
    cabinClass: 'ECONOMY',
    tripType: 'one_way'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isAuthenticated) {
      setError('Please login to search for flights');
      setLoading(false);
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      const searchParams = {
        origin: formData.origin,
        destination: formData.destination,
        departure_date: formData.departureDate.toISOString().split('T')[0],
        adults: parseInt(formData.passengers),
        cabin_class: formData.cabinClass,
      };

      if (formData.tripType === 'round_trip') {
        searchParams.return_date = formData.returnDate.toISOString().split('T')[0];
      }

      const response = await axios.post('http://127.0.0.1:8000/api/flights/search', searchParams, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data) {
        onSearchResults(response.data);
      }
    } catch (error) {
      console.error('Flight search error:', error);
      if (error.response) {
        setError(error.response.data?.message || 'Error searching for flights');
      } else if (error.request) {
        setError('No response received from server. Please check your connection.');
      } else {
        setError('Error making the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-full flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="one_way"
              checked={formData.tripType === 'one_way'}
              onChange={handleInputChange}
              className="mr-2"
            />
            One Way
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="round_trip"
              checked={formData.tripType === 'round_trip'}
              onChange={handleInputChange}
              className="mr-2"
            />
            Round Trip
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Enter city or airport"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleInputChange}
            placeholder="Enter city or airport"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Departure Date</label>
          <DatePicker
            selected={formData.departureDate}
            onChange={(date) => handleDateChange(date, 'departureDate')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            minDate={new Date()}
            required
          />
        </div>

        {formData.tripType === 'round_trip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Return Date</label>
            <DatePicker
              selected={formData.returnDate}
              onChange={(date) => handleDateChange(date, 'returnDate')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              minDate={formData.departureDate}
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Passengers</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleInputChange}
            min="1"
            max="9"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cabin Class</label>
          <select
            name="cabinClass"
            value={formData.cabinClass}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm; 