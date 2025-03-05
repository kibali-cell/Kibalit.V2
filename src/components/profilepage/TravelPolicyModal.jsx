import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TravelPolicyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full  bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 w-full">
      
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
            <h3 className="text-label-1-medium text-primaryText">Standard travel policy</h3>
          </div>

          {/* Flights Section */}
          <div className="space-y-4">
            <h3 className="text-heading-3 text-primaryText">Flights</h3>

            {/* Maximum Amount */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center gap-2">
                <span className="text-label-2-medium text-secondaryText">The maximum is</span>
                <span className="text-label-1-medium text-primaryText">Tsh</span>
                <span className="text-label-1-medium text-primaryText">350,000</span>
                <span className="text-label-2-medium text-secondaryText">per flight</span>
              </div>
            </div>

            {/* Booking Time */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <span className="text-label-2-medium text-secondaryText block mb-2">
                All bookings should be made
              </span>
              <span className="text-label-1-medium text-primaryText">
                7+ Days in advance
              </span>
            </div>

            {/* Cabin Class */}
            <div className="space-y-4">
              <h3 className="text-heading-3 text-primaryText">Cabin Class</h3>
              <div className="space-y-2">
                {[
                  'Business Class',
                  'Premium Economy',
                  'Economy',
                  'First Class'
                ].map((cabin) => (
                  <div 
                    key={cabin} 
                    className="flex items-center justify-between border rounded-md p-4"
                  >
                    <span className="text-label-1-medium text-primaryText">{cabin}</span>
                    <span className="text-label-2-medium text-secondaryText">Always allowed</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hotels Section */}
          <div className="space-y-4">
            <h3 className="text-heading-3 text-primaryText">Hotels</h3>
            <p className="text-label-2-medium text-secondaryText">
              Hotel booking limitations
            </p>

            {/* Maximum Amount */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center gap-2">
                <span className="text-label-2-medium text-secondaryText">The maximum is</span>
                <span className="text-label-1-medium text-primaryText">Tsh</span>
                <span className="text-label-1-medium text-primaryText">350,000</span>
                <span className="text-label-2-medium text-secondaryText">per night</span>
              </div>
            </div>

            {/* Booking Time */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <span className="text-label-2-medium text-secondaryText block mb-2">
                All bookings should be made
              </span>
              <span className="text-label-1-medium text-primaryText">
                7+ Days in advance
              </span>
            </div>

            {/* Hotel Standard */}
            <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
              <div className="flex items-center justify-between">
                <span className="text-label-2-medium text-secondaryText">
                  Hotel Standard not more than
                </span>
                <span className="text-label-1-medium text-primaryText">
                  3 Stars
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