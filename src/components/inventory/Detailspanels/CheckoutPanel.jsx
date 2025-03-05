import { MdFlightTakeoff, MdHotel, MdDirectionsBus, MdLocationOn } from 'react-icons/md';
import { IoMdCheckmark } from "react-icons/io";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import TripDetailsPage from "../../bookings/TripDetailsPage";
import { useState } from 'react';

const CheckOutPanel = ({ isOpen, onClose }) => {
  const travelers = [
    { id: 1, name: 'Thomas J Warburg', type: 'Engineer', avatar: '' },
    { id: 2, name: 'Jonas Kibali Twiga', type: 'Sales', avatar: '/api/placeholder/40/40' }
  ];

  const [openTripDetails, setOpenTripDetails] = useState(false)

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="w-full px-32 pt-5 font-inter mb-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 relative">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FaRegArrowAltCircleLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-heading-2 text-gray-900">Client Trip To Materuni</h1>
          </div>
        </div>

        
        <div className='px-10'>
        {/* Services */}
        <div className="mb-8">
          <h3 className="text-label-1-medium mb-4">Add other service</h3>
          <div className="flex gap-4 p-4 border border-gray-200 rounded-lg justify-center">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded text-gray-900">
              <MdFlightTakeoff className="w-5 h-5" />
              <span>Flights</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded text-gray-900">
              <MdHotel className="w-5 h-5" />
              <span>Hotels</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded text-gray-900">
              <MdDirectionsBus className="w-5 h-5" />
              <span>Buses</span>
            </button>
          </div>
        </div>

        {/* Travelers */}
        <div className="mb-8">
          <h3 className="text-label-1-medium mb-4">Travelers</h3>
          <div className="grid grid-cols-2 gap-4">
            {travelers.map(traveler => (
              <div key={traveler.id} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <img
                  src={traveler.avatar}
                  alt={traveler.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-900">{traveler.name}</div>
                  <div className="text-sm text-gray-500">{traveler.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Itinerary */}
        <div className="mb-8">
          <h3 className="text-label-1-medium mb-4">Travel Itinerary</h3>

          {/* Flight */}
          <div className="bg-gray-50 rounded-lg p-6 mb-4">
            <div className="text-label-1-medium mb-4">Flight</div>
            <div className="mb-4">
              <div className="font-medium text-gray-900">Precision Air</div>
            </div>

            <div className="flex items-center gap-8 mb-4">
              <div>
                <div className="font-medium text-gray-900">DAR</div>
                <div className="text-sm text-gray-500">Dar es salaam</div>
                <div className="text-sm text-gray-500">TUE,16 • 14:05</div>
              </div>
              <div className="flex-1 border-t border-dashed border-gray-300 relative">
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-gray-400 rounded-full -mt-1"></div>
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-400 rounded-full -mt-1"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">KLM</div>
                <div className="text-sm text-gray-500">Kilimanjaro</div>
                <div className="text-sm text-gray-500">TUE,16 • 16:05</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <div>GE 822</div>
              <div>Ref # F268X65</div>
            </div>
          </div>

          {/* Stay */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-label-1-medium mb-4">Stay</div>
            <div>
              <div className="font-medium text-gray-900 mb-1">Four Points By Sheraton</div>
              <div className="text-sm text-gray-500 mb-4 flex items-start gap-1">
                <MdLocationOn className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  KL201 Service Road, Arusha broadway<br />
                  Dar es salaam • +255 678657865
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Check-In</div>
                  <div className="text-gray-900">Mon, Jun 6</div>
                  <div className="text-sm text-gray-500">17:00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Check-Out</div>
                  <div className="text-gray-900">Thu, Jun 9</div>
                  <div className="text-sm text-gray-500">11:00</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Booking ID</div>
                  <div className="text-gray-900">F268X65</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Room Type</div>
                  <div className="text-gray-900">Classic Suite</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Rooms</div>
                  <div className="text-gray-900">02</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="border border-gray-200 rounded-lg p-6">
          {/* Payment Method Selector */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">Pay with</label>
            <div className="relative">
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 appearance-none pr-10 text-gray-900">
                <option>NMB VISA Card</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mb-6">
            <h3 className="text-label-1-medium mb-4">Price Breakdown</h3>

            {/* Flight Details */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MdFlightTakeoff className="w-4 h-4" />
                  <span className="font-medium">Flight to Dar es salaam (Round Trip)</span>
                </div>
                <div className="text-sm text-gray-500 ml-6">2 Travelers</div>
                <div className="text-sm text-gray-500 ml-6">Price per Traveler: Tsh. 150,000</div>
              </div>
              <div className="font-medium">Tsh. 300,000</div>
            </div>

            {/* Hotel Stay Details */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MdHotel className="w-4 h-4" />
                  <span className="font-medium">1 stay in Dar es salaam</span>
                </div>
                <div className="text-sm text-gray-500 ml-6">3 nights, 2 rooms, 2 Guests</div>
                <div className="text-sm text-gray-500 ml-6">Price per room per night: Tsh. 100,000</div>
              </div>
              <div className="font-medium">Tsh. 600,000</div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="font-medium">Total Price</div>
              <div className="font-medium">Tsh. 900,000</div>
            </div>
          </div>

          {/* Approval Notice */}
          <div className="mb-6">
            <div className="font-medium mb-1">This trip doesn't need approval</div>
            <div className="text-sm text-gray-500">Confirm the payment to book the trip now</div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mb-4" onClick={()=> setOpenTripDetails(true)}>
            Confirm Payment
          </button>

          {/* Terms Agreement */}
          <div className="flex items-start gap-2">
            <div className="mt-1">
              <IoMdCheckmark className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-sm text-gray-600">
              By clicking this, I agree to Kibali's{' '}
              <a href="#" className="underline">Terms & Conditions</a>{' '}
              and{' '}
              <a href="#" className="underline">Privacy Policy</a>
            </div>
          </div>
        </div>
        </div>

      </div>

      <TripDetailsPage
        isOpen={openTripDetails}
        onClose={()=> setOpenTripDetails(false)}
      />
    </div>
  );
};

export default CheckOutPanel;