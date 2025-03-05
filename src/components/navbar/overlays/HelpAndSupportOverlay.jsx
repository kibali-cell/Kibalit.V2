import React from 'react';
import { X } from 'lucide-react';
import HelpPage from '../../../pages/HelpPage';

const HelpAndSupportOverlay = ({ onClose, isOpen }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end "
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full md:w-1/2 h-full  bg-white overflow-auto shadow-lg relative animate-slide-in-right">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4  p-2 pr-6 rounded-full"
          onClick={onClose}
        >
          <X size={24} className="text-gray-500" />
        </button>
        

        {/* help Page */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-1 pl-4">Help and Support</h2>
          <HelpPage />
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupportOverlay;
