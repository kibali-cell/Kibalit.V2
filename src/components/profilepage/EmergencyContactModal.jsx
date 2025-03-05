import { useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const EmergencyContactModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSaveChanges = () => {
    // Handle saving the emergency contact information
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full  bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 h-full w-full">
      
        <div className="flex items-start gap-3 mb-6">
          <button
            onClick={onClose}
            className="hover:bg-gray-100  rounded-full "
          >
            <IoArrowBackCircleOutline className="w-7 h-7 text-gray-600" />
          </button>
          <div className='flex flex-col justify-end'>
            <h2 className="text-heading-2 text-primaryText mb-4">Emergency Contact</h2>
            <p className="text-label-2-medium text-secondaryText mb-6">
              Add a contact person in case of emergency
            </p></div>
        </div>

        <div className='bg-appBg p-4 mx-10 rounded-sm py-8'>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-label-1-medium text-primaryText">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText"
            />
          </div>
          <div>
            <label htmlFor="phone-number" className="text-label-1-medium text-primaryText">
              Phone Number
            </label>
            <div className="flex items-center bg-sectionBg rounded-md">
              <span className="px-4 py-3 text-label-1-medium text-primaryText">+255</span>
              <input
                id="phone-number"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="text-label-1-medium text-buttonText bg-sectionBg px-4 py-3 rounded-md hover:bg-stroke-lightGreyBg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-label-1-medium text-white bg-buttonPrimary px-4 py-3 rounded-md hover:bg-opacity-80"
            onClick={handleSaveChanges}
          >
            Save changes
          </button>
        </div>
        </div>
      </div>
      
    </div>
  );
};

export default EmergencyContactModal;