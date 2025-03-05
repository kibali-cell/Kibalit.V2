import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const LanguageAndRegionModal = ({ onClose }) => {
  const [language, setLanguage] = useState('Swahili');
  const [distanceUnit, setDistanceUnit] = useState('Metric (cm, km)');
  const [weightUnit, setWeightUnit] = useState('Metric (kg)');
  const [currency, setCurrency] = useState('TZS');
  const [timeFormat, setTimeFormat] = useState('24 Hours');

  const handleSaveChanges = () => {
    // Handle saving the changes
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30 z-[60] right-0 top-0 ">
      <div className="   bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 h-full w-full">

      <div className='px-10'>
        <div className="mb-8">
          <h2 className="text-heading-2 text-primaryText">Language and Region</h2>
          <p className="text-label-2-medium text-secondaryText">Set your custom preferences</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-label-1-medium text-primaryText" htmlFor="language">
              Language
            </label>
            <div className="relative">
              <select
                id="language"
                className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option>Swahili</option>
                {/* Add more language options */}
              </select>
              <FaChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-secondaryText" />
            </div>
          </div>

          <div>
            <span className="text-label-1-medium text-primaryText">Measurement Units</span>
            <div className="space-y-4">
              <div>
                <label className="text-label-2-medium text-primaryText" htmlFor="distance-unit">
                  Distance
                </label>
                <div className="relative">
                  <select
                    id="distance-unit"
                    className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-2-medium text-primaryText appearance-none"
                    value={distanceUnit}
                    onChange={(e) => setDistanceUnit(e.target.value)}
                  >
                    <option>Metric (cm, km)</option>
                    {/* Add more distance unit options */}
                  </select>
                  <FaChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-secondaryText" />
                </div>
              </div>
              <div>
                <label className="text-label-2-medium text-primaryText" htmlFor="weight-unit">
                  Weight
                </label>
                <div className="relative">
                  <select
                    id="weight-unit"
                    className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-2-medium text-primaryText appearance-none"
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                  >
                    <option>Metric (kg)</option>
                    {/* Add more weight unit options */}
                  </select>
                  <FaChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-secondaryText" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="text-label-1-medium text-primaryText" htmlFor="currency">
              Currency
            </label>
            <div className="relative">
              <select
                id="currency"
                className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>TZS</option>
                {/* Add more currency options */}
              </select>
              <FaChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-secondaryText" />
            </div>
          </div>

          <div>
            <label className="text-label-1-medium text-primaryText" htmlFor="time-format">
              Time format
            </label>
            <div className="relative">
              <select
                id="time-format"
                className="block w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none"
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <option>24 Hours</option>
                {/* Add more time format options */}
              </select>
              <FaChevronDown className="absolute top-1/2 transform -translate-y-1/2 right-4 text-secondaryText" />
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

export default LanguageAndRegionModal;