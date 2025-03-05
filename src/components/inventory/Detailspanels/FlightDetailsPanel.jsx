import { IoClose } from 'react-icons/io5';
import { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import FlightExtrasPanel from './FlightExtrasPanel';

const FlightDetailsPanel = ({ isOpen, onClose }) => {
  const [isExtrasOpen, setIsExtrasOpen] = useState(false);
  if (!isOpen) return null;

  const PricingCard = ({ price, type }) => (
    <div className="border rounded-lg p-4">
      <div className="text-lg font-semibold mb-2">Tsh. {price.toLocaleString()}</div>
      <div className="text-sm text-gray-600 mb-2">{type}</div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          Hand baggage included
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          1st checked bag included
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          No change fee
        </div>
        <div className="pt-2 border-t border-gray-200 space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoCloseCircleOutline className="text-red-500 w-4 h-4" />
            Non-refundable
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IoCloseCircleOutline className="text-red-500 w-4 h-4" />
            Non-refundable
          </div>
        </div>
      </div>
      <button onClick={() => setIsExtrasOpen(true)} className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
        Select
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 ">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl text-sm overflow-auto mb-10">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Flight Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <IoClose className="text-xl" />
            </button>
          </div>

          {/* Flight Time and Airline */}
          <div className="mb-6">
            <div className="text-label-1-semibold">15:45 - 17:00 (30 min)</div>
            <div className="text-sm text-gray-500">Precision Air</div>
          </div>

          {/* Flight Route Details */}
          <div className="relative mb-8 bg-appBg py-2">
            <div className="flex px-4">
              <div className="space-y-5 font-medium">
                <div>
                  <div className="font-medium">15:45 - Dar es salaam</div>
                  <div className="font-medium">Julius Nyerere Intl (DAR)</div>
                </div>

                <div className="space-y-1 mb-6">
                  <div>30 min flight</div>
                  <div>Airbus 725</div>
                  <div>Economy</div>
                </div>

                <div>
                  <div className="font-medium">17:00 - Kilimanjaro</div>
                  <div className="">Kilimanjaro Intl Airport(KLM)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Options */}
          <div className="grid grid-cols-2 gap-4">
            <PricingCard price={379000} type="Economy" />
            <PricingCard price={879000} type="Business Class" />
          </div>
        </div>
      </div>
      <FlightExtrasPanel
        isOpen={isExtrasOpen}
        onClose={() => setIsExtrasOpen(false)}
        basePrice={379000}
      />
    </div>
  );
};

export default FlightDetailsPanel;