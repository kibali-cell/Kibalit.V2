import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { MdPersonAdd } from 'react-icons/md';

const TravelerModal = ({ isOpen, onClose, travelers, onAddTraveler, onRemoveTraveler }) => {
  const [newTravelerName, setNewTravelerName] = useState('');

  if (!isOpen) return null;

  const handleAddTraveler = () => {
    if (newTravelerName.trim()) {
      onAddTraveler(newTravelerName.trim());
      setNewTravelerName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-heading-2 text-primaryText">Add Travelers</h2>
          <button 
            onClick={onClose}
            className="text-buttonText hover:bg-sectionBg p-2 rounded-full"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>

        {/* Add new traveler */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={newTravelerName}
            onChange={(e) => setNewTravelerName(e.target.value)}
            placeholder="Enter traveler name"
            className="flex-1 p-2 border border-stroke-greyBg rounded-md focus:outline-none focus:border-buttonPrimary"
          />
          <button
            onClick={handleAddTraveler}
            className="flex items-center space-x-1 px-4 py-2 bg-buttonPrimary text-white rounded-md hover:bg-opacity-90"
          >
            <MdPersonAdd className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Travelers list */}
        <div className="space-y-3">
          {travelers.map((traveler, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-sectionBg rounded-md">
              <span className="text-label-1-medium text-primaryText">{traveler}</span>
              <button
                onClick={() => onRemoveTraveler(traveler)}
                className="text-red-500 hover:text-red-600"
              >
                <IoClose className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelerModal; 