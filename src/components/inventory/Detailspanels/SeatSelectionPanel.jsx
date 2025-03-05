import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbUser } from 'react-icons/tb';
import seats from "../../../assets/seats.png"
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const SeatSelectionPanel = ({ isOpen, onClose }) => {
  const [selectedDirection, setSelectedDirection] = useState('DAR-NBO');
  const [selectedSeats, setSelectedSeats] = useState({
    'John Manyo': 'BE',
    'Jane Manyo': '--'
  });

  if (!isOpen) return null;

  const passengers = [
    { name: 'John Manyo', seat: selectedSeats['John Manyo'] },
    { name: 'Jane Manyo', seat: selectedSeats['Jane Manyo'] }
  ];


  return (
    <div className="fixed inset-0 bg-black/30 z-50">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-xl animate-slide-in-right overflow-auto">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 mb-3">
            <div className="flex  items-center">
              <button onClick={onClose} className="p-2 hover:bg-sectionBg rounded-full">
                <FaRegArrowAltCircleLeft className="w-6 h-6" />
              </button>
              <h2 className="text-heading-3 text-primaryText">Choose Flight Seat</h2>
            </div>
            {/* Flight Direction Toggle */}
            <div className="flex gap-2 pl-10">
              <button
                className={`px-4 py-2 rounded-sm text-label-2-medium ${selectedDirection === 'DAR-NBO'
                  ? 'bg-buttonPrimary text-white'
                  : 'bg-sectionBg text-buttonText'
                  }`}
                onClick={() => setSelectedDirection('DAR-NBO')}
              >
                🛫 DAR - NBO
              </button>
              <button
                className={`px-4 py-2 rounded-sm text-label-2-medium ${selectedDirection === 'NBO-DAR'
                  ? 'bg-buttonPrimary text-white'
                  : 'bg-sectionBg text-buttonText'
                  }`}
                onClick={() => setSelectedDirection('NBO-DAR')}
              >
                🛫 NBO - DAR
              </button>
            </div>

          </div>

          <div className="flex pl-12 pr-5 ">

            <div className='flex flex-col'>
              {/* Flight Info */}
              <div>
                <div className="text-label-2-medium text-secondaryText mb-1">Flight #1</div>
                <div className="text-label-1-medium text-primaryText">
                  Dar es salaam (DAR) - Nairobi (NBO)
                </div>
              </div>

              {/* Passenger List */}
              <div className="">
                {passengers.map(passenger => (
                  <div key={passenger.name} className="flex justify-between items-center py-3 border-b border-stroke-lightGreyBg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sectionBg rounded-full">
                        <TbUser className="w-4 h-4 text-secondaryText" />
                      </div>
                      <span className="text-label-1-medium text-primaryText">{passenger.name}</span>
                    </div>
                    <div className="text-label-2-medium text-secondaryText">
                      Seat: <span className="text-label-2-medium text-primaryText">{passenger.seat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Seat Grid */}
            <div className="ml-10 ">
              {/* Column Headers */}
              <div className='w-auto'>
                <img src={seats} className='' />
              </div>

              {/* Legend */}
              <div className="mt-6 flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-buttonPrimary rounded-sm"></div>
                  <span className="text-label-2-medium text-secondaryText">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-stroke-lightGreyBg rounded-sm"></div>
                  <span className="text-label-2-medium text-secondaryText">Not Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
        <div className="px-6 py-4 border-t border-stroke-lightGreyBg mt-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-label-2-medium text-secondaryText">Additional Price</div>
              <div className="text-heading-3 text-primaryText">Tsh 75,000</div>
            </div>
            <button
              className="px-6 py-2 bg-buttonPrimary text-white rounded-md hover:bg-opacity-90 text-label-1-medium"
              onClick={onClose}
            >
              Confirm Seat Selection
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>

  );
};

export default SeatSelectionPanel;