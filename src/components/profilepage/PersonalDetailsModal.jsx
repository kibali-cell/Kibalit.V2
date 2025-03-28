import React, { useState, useEffect } from 'react';
import { IoMailOutline } from 'react-icons/io5';
import { FiPhone, FiChevronDown } from 'react-icons/fi';
import api from '../../api/axiosConfig';

const PersonalDetailsModal = ({ onClose, initialData, onUpdate }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [sex, setSex] = useState('');
  const [countryOfResidence, setCountryOfResidence] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // List of countries
  const countries = [
    "Tanzania, United Republic of",
    "Kenya",
    "Uganda",
    "Rwanda",
    "Burundi",
    "Democratic Republic of the Congo",
    "South Sudan",
    "Ethiopia",
    "Somalia",
    "Djibouti",
    "Eritrea",
    "Sudan",
    "Egypt",
    "Libya",
    "Tunisia",
    "Algeria",
    "Morocco",
    "Mauritania",
    "Mali",
    "Niger",
    "Chad",
    "Central African Republic",
    "Cameroon",
    "Equatorial Guinea",
    "Gabon",
    "Republic of the Congo",
    "Angola",
    "Namibia",
    "Botswana",
    "Zimbabwe",
    "Zambia",
    "Malawi",
    "Mozambique",
    "Madagascar",
    "Comoros",
    "Seychelles",
    "Mauritius",
    "South Africa",
    "Lesotho",
    "Eswatini",
    "Nigeria",
    "Benin",
    "Togo",
    "Ghana",
    "Côte d'Ivoire",
    "Liberia",
    "Sierra Leone",
    "Guinea",
    "Guinea-Bissau",
    "Senegal",
    "The Gambia",
    "Cape Verde",
    "Burkina Faso"
  ];

  useEffect(() => {
    if (initialData) {
      const [first, ...last] = initialData.name.split(' ');
      setFirstName(first || '');
      setLastName(last.join(' ') || '');

      if (initialData.date_of_birth) {
        const [y, m, d] = initialData.date_of_birth.split('-');
        setYear(y || '');
        setMonth(m || '');
        setDay(d || '');
      }

      if (initialData.phone && initialData.phone.startsWith('+255')) {
        setContactNumber(initialData.phone.replace('+255', ''));
      } else {
        setContactNumber(initialData.phone || '');
      }

      setWorkEmail(initialData.email || '');
      setSex(initialData.sex || 'Male');
      setCountryOfResidence(initialData.address || 'Tanzania, United Republic of');
    } else {
      // Set default values if no initial data
      setCountryOfResidence('Tanzania, United Republic of');
      setSex('Male');
    }
  }, [initialData]);

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim()) {
      return "First name and last name are required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return "Please enter a valid email address.";
    }

    if (contactNumber && !/^\d{9}$/.test(contactNumber)) {
      return "Contact number must be 9 digits (e.g., 123456789).";
    }

    if (day || month || year) {
      if (!day || !month || !year) {
        return "Please provide a complete date of birth (day, month, and year).";
      }
      const d = parseInt(day, 10);
      const m = parseInt(month, 10);
      const y = parseInt(year, 10);
      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
        return "Please enter a valid date of birth.";
      }
      const date = new Date(y, m - 1, d);
      if (date > new Date() || date.getDate() !== d || date.getMonth() + 1 !== m || date.getFullYear() !== y) {
        return "Please enter a valid date of birth before today.";
      }
    }

    if (!['Male', 'Female'].includes(sex)) {
      return "Please select a valid sex (Male or Female).";
    }

    return null;
  };

  const handleSaveChanges = async () => {
    console.log('handleSaveChanges called');
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    const validationError = validateForm();
    console.log('Validation result:', validationError);
    if (validationError) {
      setError(validationError);
      setIsSaving(false);
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const phone = contactNumber ? `+255${contactNumber}` : null;
    const dateOfBirth = year && month && day ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : null;

    console.log('Making API request with data:', {
      name: fullName,
      email: workEmail,
      phone: phone,
      address: countryOfResidence,
      sex: sex,
      date_of_birth: dateOfBirth,
    });

    try {
      const response = await api.put('/profile', {
        name: fullName,
        email: workEmail,
        phone: phone,
        address: countryOfResidence,
        sex: sex,
        date_of_birth: dateOfBirth,
      });

      console.log('API response:', response.data);
      setSuccess('Profile updated successfully!');
      if (onUpdate) {
        onUpdate(response.data.user);
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Profile update failed:", error.response?.data || error);
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(", ")
        : error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (setter) => {
    if (typeof setter !== 'function') {
      console.error('handleInputChange requires a setter function');
      return;
    }

    return (event) => {
      if (!event || !event.target) {
        console.error('Invalid event object');
        return;
      }

      setter(event.target.value);
      setError(null);
      setSuccess(null);
    };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <div className="p-6 border-b border-stroke-lightGreyBg">
          <h2 className="text-heading-2 text-primaryText mb-1">Personal Details</h2>
          <p className="text-label-2-medium text-secondaryText">
            Save your details for faster trip booking
          </p>
        </div>

        <div className="flex-1 p-6">
          {error && (
            <div className="w-full p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg text-sm">
              <span className="font-semibold">Error: </span>{error}
            </div>
          )}
          {success && (
            <div className="w-full p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg text-sm">
              <span className="font-semibold">Success: </span>{success}
            </div>
          )}
          <div className="space-y-6">
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
                    onChange={handleInputChange(setFirstName)}
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
                    onChange={handleInputChange(setLastName)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
              </div>
            </div>

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
                    onChange={handleInputChange(setDay)}
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
                    onChange={handleInputChange(setMonth)}
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
                    onChange={handleInputChange(setYear)}
                    className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                  />
                </div>
              </div>
            </div>

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
                  onChange={handleInputChange(setWorkEmail)}
                  className="w-full bg-sectionBg pl-12 pr-4 py-3 rounded-md text-label-1-medium text-primaryText outline-none"
                />
              </div>
            </div>

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
                  onChange={handleInputChange(setContactNumber)}
                  className="flex-1 bg-transparent px-2 py-3 text-label-1-medium text-primaryText outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="sex" className="block text-label-1-medium text-primaryText mb-2">
                Sex
              </label>
              <div className="relative">
                <select
                  id="sex"
                  value={sex}
                  onChange={handleInputChange(setSex)}
                  className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondaryText" />
              </div>
            </div>

            <div>
              <label htmlFor="country-of-residence" className="block text-label-1-medium text-primaryText mb-2">
                Country of Residence
              </label>
              <div className="relative">
                <select
                  id="country-of-residence"
                  value={countryOfResidence}
                  onChange={handleInputChange(setCountryOfResidence)}
                  className="w-full bg-sectionBg px-4 py-3 rounded-md text-label-1-medium text-primaryText appearance-none outline-none"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondaryText" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-stroke-lightGreyBg">
          <div className="flex justify-between">
            <button
              className="px-6 py-3 text-label-1-medium text-buttonText bg-sectionBg rounded-md hover:bg-stroke-lightGreyBg transition-colors"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 text-label-1-medium text-white bg-buttonPrimary rounded-md hover:opacity-80 transition-opacity"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsModal;