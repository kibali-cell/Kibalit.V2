import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const TravelPolicyModal = ({ onClose }) => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping for advance booking days to display text
  const advanceBookingOptions = {
    0: 'Anytime',
    3: '3+ Days in advance',
    7: '7+ Days in advance',
    14: '14+ Days in advance',
  };

  // Mapping for star ratings to display text
  const hotelStarOptions = {
    3: '3 Stars',
    4: '4 Stars',
    5: '5 Stars',
  };

  // Fetch policy data when modal opens
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8000/api/policies', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        // Assuming the API returns a single policy or an array with one policy
        const policyData = Array.isArray(response.data) ? response.data[0] : response.data;
        setPolicy(policyData);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch policy');
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-[60] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-[60] flex items-center justify-center">
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-heading-2 text-primaryText">Error</h2>
          <p className="text-label-2-medium text-secondaryText">{error || 'No policy found'}</p>
          <button
            onClick={onClose}
            className="mt-4 p-2 bg-buttonPrimary text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 w-full sm:w-3/4 md:w-1/2">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-buttonText hover:bg-sectionBg p-2 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-heading-2 text-primaryText">Travel policy</h2>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Policy Name */}
          <div className="space-y-2 border rounded-md p-4">
            <h3 className="text-label-1-medium text-primaryText">{policy.name}</h3>
          </div>

          {/* Flights Section */}
          <div className="space-y-4">
            <h3 className="text-heading-3 text-primaryText">Flights</h3>

            {/* Maximum Amount */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center gap-2">
                <span className="text-label-2-medium text-secondaryText">The maximum is</span>
                <span className="text-label-1-medium text-primaryText">Tsh</span>
                <span className="text-label-1-medium text-primaryText">
                  {policy.flight_max_amount?.toLocaleString() || 'Not set'}
                </span>
                <span className="text-label-2-medium text-secondaryText">per flight</span>
              </div>
            </div>

            {/* Booking Time */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <span className="text-label-2-medium text-secondaryText block mb-2">
                All bookings should be made
              </span>
              <span className="text-label-1-medium text-primaryText">
                {advanceBookingOptions[policy.flight_advance_booking_days] || 'Not set'}
              </span>
            </div>

            {/* Cabin Class */}
            <div className="space-y-4">
              <h3 className="text-heading-3 text-primaryText">Cabin Class</h3>
              <div className="space-y-2">
                {[
                  { key: 'business_class', label: 'Business Class' },
                  { key: 'premium_economy_class', label: 'Premium Economy' },
                  { key: 'economy_class', label: 'Economy' },
                  { key: 'first_class', label: 'First Class' },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border rounded-md p-4"
                  >
                    <span className="text-label-1-medium text-primaryText">{label}</span>
                    <span className="text-label-2-medium text-secondaryText">
                      {policy[key] || 'Not set'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hotels Section */}
          <div className="space-y-4">
            <h3 className="text-heading-3 text-primaryText">Hotels</h3>
            <p className="text-label-2-medium text-secondaryText">Hotel booking limitations</p>

            {/* Maximum Amount */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center gap-2">
                <span className="text-label-2-medium text-secondaryText">The maximum is</span>
                <span className="text-label-1-medium text-primaryText">Tsh</span>
                <span className="text-label-1-medium text-primaryText">
                  {policy.hotel_max_amount?.toLocaleString() || 'Not set'}
                </span>
                <span className="text-label-2-medium text-secondaryText">per night</span>
              </div>
            </div>

            {/* Booking Time */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <span className="text-label-2-medium text-secondaryText block mb-2">
                All bookings should be made
              </span>
              <span className="text-label-1-medium text-primaryText">
                {advanceBookingOptions[policy.hotel_advance_booking_days] || 'Not set'}
              </span>
            </div>

            {/* Hotel Standard */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center justify-between">
                <span className="text-label-2-medium text-secondaryText">
                  Hotel Standard not more than
                </span>
                <span className="text-label-1-medium text-primaryText">
                  {hotelStarOptions[policy.hotel_max_star_rating] || 'Not set'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPolicyModal;