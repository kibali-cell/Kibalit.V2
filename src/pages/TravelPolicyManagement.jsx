import { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import { IoClose, IoDocument } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { PiArrowBendDownRightThin } from 'react-icons/pi';

const TravelPolicyManagement = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('policy');
  const [policy, setPolicy] = useState({
    name: 'Standard travel policy',
    company_id: 1, // Replace with a valid company_id from your database
    flight_dynamic_pricing: true,
    flight_price_threshold_percent: 20,
    flight_max_amount: 350000,
    flight_advance_booking_days: 0,
    economy_class: 'Always allowed',
    premium_economy_class: 'Always allowed',
    business_class: 'Always allowed',
    first_class: 'Always allowed',
    hotel_dynamic_pricing: true,
    hotel_price_threshold_percent: 20,
    hotel_max_amount: 1000000,
    hotel_advance_booking_days: 0,
    hotel_max_star_rating: 3,
    id: null, // Will be set after policy creation
  });

  const [approval, setApproval] = useState({
    restriction: 'out-of-policy',
    approvers: [
      { name: 'John Kimathuka', role: 'HR' },
      { name: 'Paul Atreides', role: 'Travel manager' },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericFields = [
      'flight_price_threshold_percent',
      'flight_max_amount',
      'hotel_price_threshold_percent',
      'hotel_max_amount',
    ];
    setPolicy((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? (value ? parseInt(value.replace(/,/g, '')) : null) : value,
    }));
  };

  const handleToggleChange = (field) => {
    setPolicy((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePolicySubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to save a policy.');
        return;
      }

      const payload = {
        ...policy,
        flight_price_threshold_percent: policy.flight_dynamic_pricing ? policy.flight_price_threshold_percent : null,
        hotel_price_threshold_percent: policy.hotel_dynamic_pricing ? policy.hotel_price_threshold_percent : null,
      };

      console.log('Policy Payload:', payload); // Debug payload
      const response = await axios.post('http://localhost:8000/api/policies', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const newPolicy = response.data;
      setPolicy((prev) => ({ ...prev, id: newPolicy.id }));
      console.log('Policy created:', newPolicy);
      alert('Policy saved successfully!');
    } catch (error) {
      console.error('Error saving policy:', error.response?.data || error.message);
      alert('Failed to save policy: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleApprovalChange = (e) => {
    setApproval((prev) => ({ ...prev, restriction: e.target.value }));
  };

  const handleApprovalSubmit = async () => {
    if (!policy.id) {
      alert('Please save a policy first to associate approvals.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/approvals',
        {
          policy_id: policy.id,
          restriction: approval.restriction,
          approvers: approval.approvers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log('Approval created:', response.data);
      alert('Approvals saved successfully!');
    } catch (error) {
      console.error('Error saving approvals:', error.response?.data || error.message);
      alert('Failed to save approvals: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const CabinClassSection = () => {
    const cabinClasses = [
      { id: 'economy_class', label: 'Economy' },
      { id: 'premium_economy_class', label: 'Premium Economy' },
      { id: 'business_class', label: 'Business Class' },
      { id: 'first_class', label: 'First Class' },
    ];

    const flightOptions = [
      'Always allowed',
      '0-3 hour flights',
      '3-6 hour flights',
      '6-10 hour flights',
      '10+ hour flights',
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-3">Cabin Class</h3>
        <p className="text-label-2-medium text-secondaryText">Choose the flight search allowed for each cabin class</p>
        <div className="space-y-2">
          {cabinClasses.map(({ id, label }) => (
            <div key={id} className="border rounded-md px-4 py-1">
              <div className="flex w-full">
                <PiArrowBendDownRightThin className="w-6 h-12" />
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-secondaryText">{label}</span>
                  </div>
                  <select
                    name={id}
                    value={policy[id]}
                    onChange={handleInputChange}
                    className="pr-8 text-sm"
                  >
                    {flightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const advanceBookingOptions = [
    { value: 0, label: 'Anytime' },
    { value: 3, label: '3+ Days in advance' },
    { value: 7, label: '7+ Days in advance' },
    { value: 14, label: '14+ Days in advance' },
  ];

  const hotelStarOptions = [
    { value: 3, label: '3 stars' },
    { value: 4, label: '4 stars' },
    { value: 5, label: '5 stars' },
  ];

  const renderPolicyContent = () => (
    <div className="space-y-6">
      <div className="space-y-2 border rounded-md p-4">
        <label className="text-label-2-medium text-secondaryText">Name of your travel policy</label>
        <input
          type="text"
          name="name"
          value={policy.name}
          onChange={handleInputChange}
          className="w-full p-2 bg-sectionBg border border-stroke-lightGreyBg rounded-md"
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-heading-3">Flights</h3>
        <p className="text-label-2-medium text-secondaryText">Set rules for flight booking procedures</p>

        <div className="border rounded-md px-4 py-2 bg-stroke-lightGreyBg">
          <div className="flex items-center justify-between">
            <span className="text-label-1-medium text-secondaryText text-sm">Allow Dynamic pricing</span>
            <div
              className={`w-8 h-4 rounded-full relative cursor-pointer ${policy.flight_dynamic_pricing ? 'bg-success-text' : 'bg-gray-300'}`}
              onClick={() => handleToggleChange('flight_dynamic_pricing')}
            >
              <div
                className={`absolute top-1 w-2 h-2 bg-success-bg rounded-full ${policy.flight_dynamic_pricing ? 'right-1' : 'left-1'}`}
              />
            </div>
          </div>
          {policy.flight_dynamic_pricing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>Book flights up to</span>
                <input
                  type="number"
                  name="flight_price_threshold_percent"
                  value={policy.flight_price_threshold_percent || ''}
                  onChange={handleInputChange}
                  className="w-10 p-1 bg-white border border-stroke-lightGreyBg rounded-md"
                />
                <span className="text-label-1-medium">% above the price of similar flights</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
          <div className="flex items-center justify-between">
            <div className="gap-2">
              <span className="text-label-1-medium">The maximum is Tsh</span>
              <input
                type="number"
                name="flight_max_amount"
                value={policy.flight_max_amount || ''}
                onChange={handleInputChange}
                className="w-20 px-2 py-1 bg-white border border-stroke-lightGreyBg rounded-md"
              />
              <span className="text-label-1-medium">per flight</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md p-4 border">
          <span className="text-label-1-medium text-secondaryText">All bookings should be made</span>
          <select
            name="flight_advance_booking_days"
            value={policy.flight_advance_booking_days}
            onChange={handleInputChange}
            className="w-full p-2 border bg-stroke-lightGreyBg rounded-md"
          >
            {advanceBookingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CabinClassSection />

      <div className="space-y-4">
        <h3 className="text-heading-3">Hotels</h3>
        <p className="text-label-2-medium text-secondaryText tex-sm">Set rules for hotel booking procedures</p>

        <div className="border bg-stroke-lightGreyBg px-4 py-2 rounded-md text-sm">
          <div className="flex items-center justify-between">
            <span className="text-label-1-medium text-secondaryText">Allow Dynamic pricing</span>
            <div
              className={`w-8 h-4 rounded-full relative cursor-pointer ${policy.hotel_dynamic_pricing ? 'bg-success-text' : 'bg-gray-300'}`}
              onClick={() => handleToggleChange('hotel_dynamic_pricing')}
            >
              <div
                className={`absolute top-1 w-2 h-2 bg-success-bg rounded-full ${policy.hotel_dynamic_pricing ? 'right-1' : 'left-1'}`}
              />
            </div>
          </div>
          {policy.hotel_dynamic_pricing && (
            <div className="">
              <div className="flex items-center justify-between">
                <span className="text-label-1-medium">Book accommodation up to</span>
                <input
                  type="number"
                  name="hotel_price_threshold_percent"
                  value={policy.hotel_price_threshold_percent || ''}
                  onChange={handleInputChange}
                  className="w-10 p-2 bg-white border border-stroke-lightGreyBg rounded-md mx-1"
                />
                <span className="text-label-1-medium">% above the price of similar stays</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2 p-4 bg-stroke-lightGreyBg rounded-md">
          <div className="flex items-center justify-between">
            <div className="">
              <span className="text-label-1-medium">The maximum is Tsh</span>
              <input
                type="number"
                name="hotel_max_amount"
                value={policy.hotel_max_amount || ''}
                onChange={handleInputChange}
                className="w-24 px-2 py-1 bg-white border border-stroke-lightGreyBg rounded-md"
              />
              <span className="text-label-1-medium">per room per night</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md p-4 border">
          <span className="text-label-1-medium text-secondaryText">All bookings should be made</span>
          <select
            name="hotel_advance_booking_days"
            value={policy.hotel_advance_booking_days}
            onChange={handleInputChange}
            className="w-full p-2 border bg-stroke-lightGreyBg rounded-md"
          >
            {advanceBookingOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 rounded-md p-2 border">
          <span className="text-label-1-medium text-secondaryText">Hotel Standard not more than</span>
          <select
            name="hotel_max_star_rating"
            value={policy.hotel_max_star_rating}
            onChange={handleInputChange}
            className="w-full p-2 border bg-stroke-lightGreyBg rounded-md"
          >
            {hotelStarOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handlePolicySubmit}
        className="w-full p-3 bg-buttonPrimary text-white rounded-md text-label-1-medium"
      >
        Save Policy
      </button>
    </div>
  );

  const renderApprovalsContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-heading-3">Approval Restrictions</h3>
        <p className="text-label-2-medium text-secondaryText pt-0">Set restrictions on what needs to be approved</p>
        <div className="space-y-5 border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="restriction"
              value="none"
              checked={approval.restriction === 'none'}
              onChange={handleApprovalChange}
            />
            <label htmlFor="none" className="text-label-1-medium">
              No restrictions
            </label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users do not need approval before booking</p>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="restriction"
              value="out-of-policy"
              checked={approval.restriction === 'out-of-policy'}
              onChange={handleApprovalChange}
            />
            <label htmlFor="out-of-policy" className="text-label-1-medium">
              Required for out-of-policy bookings
            </label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users need approval for out-of-policy bookings</p>

          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="restriction"
              value="all"
              checked={approval.restriction === 'all'}
              onChange={handleApprovalChange}
            />
            <label htmlFor="all" className="text-label-1-medium">
              Required for all bookings
            </label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users must get approval for every booking</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-heading-3">Add Approvers</h3>
        <p className="text-label-2-medium text-secondaryText">Set restrictions on what needs to be approved</p>
        <div className="space-y-4">
          {approval.approvers.map((approver, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-md border border-stroke-lightGreyBg p-4">
              <div className="flex justify-between w-full">
                <span className="text-label-2-medium text-secondaryText">{index + 1}st approver</span>
                <p className="text-label-1-medium">{approver.name}</p>
                <span className="text-label-2-medium text-secondaryText">{approver.role}</span>
              </div>
              <button
                className="text-buttonText hover:bg-sectionBg p-2 rounded-full"
                onClick={() => {
                  setApproval((prev) => ({
                    ...prev,
                    approvers: prev.approvers.filter((_, i) => i !== index),
                  }));
                }}
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            className="flex items-center gap-2 text-buttonText hover:bg-sectionBg p-2 rounded-md"
            onClick={() =>
              setApproval((prev) => ({
                ...prev,
                approvers: [...prev.approvers, { name: '', role: '' }],
              }))
            }
          >
            <IoMdAdd className="w-5 h-5" />
            <span>Add Approver</span>
          </button>
        </div>
      </div>

      <button
        onClick={handleApprovalSubmit}
        className="w-full p-3 bg-buttonPrimary text-white rounded-md text-label-1-medium"
      >
        Save Approvals
      </button>
    </div>
  );

  return (
    <div
      className={`fixed top-0 right-0 w-1/2 h-screen bg-white shadow-lg z-50 ${isOpen ? 'animate-slide-in-right' : 'hidden'}`}
    >
      <div className="relative h-full">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-buttonText hover:bg-sectionBg p-2 rounded-full"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="h-full p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex gap-4 items-center justify-between">
              <div>
                <button
                  className={`pb-2 px-1 text-label-1-semibold ${activeTab === 'policy'
                    ? 'text-primaryText'
                    : 'text-secondaryText'
                    }`}
                  onClick={() => setActiveTab('policy')}
                >
                  Policy
                </button>
                <button
                  className={`pb-2 px-1 text-label-1-semibold ${activeTab === 'approvals'
                    ? 'text-primaryText'
                    : 'text-secondaryText'
                    }`}
                  onClick={() => setActiveTab('approvals')}
                >
                  Approvals
                </button>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 mr-1 text-sm border rounded-sm">
                <IoDocument />
                <p>Policy Guide</p>
              </div>
            </div>

            {activeTab === 'policy' ? renderPolicyContent() : renderApprovalsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPolicyManagement;