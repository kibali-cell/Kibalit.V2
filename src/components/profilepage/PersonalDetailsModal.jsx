import React, { useState } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { FiPhone, FiChevronDown } from 'react-icons/fi';

const PersonalDetailsModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Manyo');
  const [day, setDay] = useState('John');
  const [month, setMonth] = useState('Manyo');
  const [year, setYear] = useState('Manyo');
  const [workEmail, setWorkEmail] = useState('john@kibalit.com');
  const [contactNumber, setContactNumber] = useState('560435675');
  const [sex, setSex] = useState('Male');
  const [countryOfResidence, setCountryOfResidence] = useState('Tanzania, United Republic of');

  const handleSaveChanges = () => {
    // Handle saving the personal details
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full  bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
      
        {/* Header */}
        <div className="p-6 border-b border-stroke-lightGreyBg">
          <h2 className="text-heading-2 text-primaryText mb-1">Personal Details</h2>
          <p className="text-label-2-medium text-secondaryText">
            Save your details for faster trip booking
          </p>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Name Fields */}
            <div>
              <span className="block text-label-1-medium text-primaryText mb-2">Name</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-label-2-medium text-primaryText mb-2">
                    First name
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-label-2-medium text-primaryText mb-2">
                    Last Name
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <span className="block text-label-1-medium text-primaryText mb-2">Date of Birth</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="day" className="block text-label-2-medium text-primaryText mb-2">
                    Day
                  </label>
                  <input
                    id="day"
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="month" className="block text-label-2-medium text-primaryText mb-2">
                    Month
                  </label>
                  <input
                    id="month"
                    type="text"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-label-2-medium text-primaryText mb-2">
                    Year
                  </label>
                  <input
                    id="year"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label htmlFor="work-email" className="block text-label-1-medium text-primaryText mb-2">
                Work email
              </label>
              <div className="relative">
                <IoMailOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondaryText" />
                <input
                  id="work-email"
                  type="email"
                  value={workEmail}
                  onChange={(e) => setWorkEmail(e.target.value)}
                  className="w-full bg-sectionBg pl-12 pr-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contact-number" className="block text-label-1-medium text-primaryText mb-2">
                Contact Number
              </label>
              <div className="relative flex items-center bg-sectionBg rounded-md">
                <FiPhone className="absolute left-4 text-secondaryText" />
                <span className="pl-12 pr-2 py-3 text-label-1-medium text-primaryText">+255</span>
                <input
                  id="contact-number"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="flex-1 bg-transparent px-2 py-3 text-label-1-medium text-primaryText outline-none"
                />
              </div>
            </div>

            {/* Sex */}
            <div>
              <label htmlFor="sex" className="block text-label-1-medium text-primaryText mb-2">
                Sex
              </label>
              <div className="relative">
                <select
                  id="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none outline-none"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondaryText" />
              </div>
            </div>

            {/* Country of Residence */}
            <div>
              <label htmlFor="country-of-residence" className="block text-label-1-medium text-primaryText mb-2">
                Country of Residence
              </label>
              <div className="relative">
                <select
                  id="country-of-residence"
                  value={countryOfResidence}
                  onChange={(e) => setCountryOfResidence(e.target.value)}
                  className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none outline-none"
                >
                  <option>Tanzania, United Republic of</option>
                  {/* Add more country options */}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondaryText" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-stroke-lightGreyBg">
          <div className="flex justify-between">
            <button
              className="px-6 py-3 text-label-1-medium text-buttonText bg-sectionBg rounded-md hover:bg-stroke-lightGreyBg transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 text-label-1-medium text-white bg-buttonPrimary rounded-md hover:opacity-80 transition-opacity"
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

export default PersonalDetailsModal;