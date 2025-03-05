import { useState } from 'react';
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import LanguageAndRegionModal from '../components/profilepage/LanguageModal';
import NotifictionsModal from '../components/profilepage/NotificationsModal';
import PersonalDetailsModal from '../components/profilepage/PersonalDetailsModal';
import TravelPolicyModal from '../components/profilepage/TravelPolicyModal';
import EmergencyContactModal from '../components/profilepage/EmergencyContactModal'
import { RiLogoutCircleLine } from "react-icons/ri";

const profile = {
  details: {
    avatar: 'https://via.placeholder.com/150',
    name: 'John Rockefeller',
    email: 'jd@stdoil.com',
    dob: 'Not Selected',
    country: 'Not Selected',
    phone: '+255 650687754',
    role: 'Travel Admin',
    gender: 'Male',
    department: 'Sales and Marketing',
    team: 'Travel Admin',
  },
  policy: {
    name: 'Standard travel policy',
    details: 'This policy outlines the standard guidelines for business travel, including expenses, lodging, and reimbursement.',
  },
  preferences: {
    language: 'English (UK)',
    currency: 'TZS',
    timeFormat: '24 Hours',
    distance: 'Metric (cm, km)',
    weight: 'Metric (kg)',
  },
  contact: {
    name: '',
    phone: '',
  },
  notifications: {
    settings: 'Choose what and how you’d like to receive your alerts.',
  },
};


const ProfilePage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [isPersonalModal, setIsPersonalModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const openDetailsModal = () => setIsPersonalModalOpen(true);
  const closeDetailsModal = () =>setIsPersonalModalOpen(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openNotificationModal = () => setIsNotificationModalOpen(true);
  const closeNotificationModal = () => setIsNotificationModalOpen(false);

  const openPolicyModal = () => setIsPolicyModalOpen(true)
  const closePolicyModal = () => setIsPolicyModalOpen(false)
  const navigate = useNavigate();


  const onLogout = () => {
    
    navigate("/login");
  };

  const handleLanguageAndRegionClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
        <div className="p-6 space-y-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <IoClose className="text-xl" />
            </button>
          </div>
      {/* Profile Header */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
      <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d99298b9b8cf108cd1cf08183dbf75d36050861e97998c08338959a6fd57154d?placeholderIfAbsent=true&apiKey=c84b773283b44fb6abde6534b0416799"
            alt="John Rockefeller profile"
            className="object-contain shrink-0 self-stretch my-auto w-24 rounded-full aspect-square"
          />
        <div>
          <h2 className="text-xl font-semibold">{profile.details.name}</h2>
          <p className="text-gray-500">{profile.details.role}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-sm text-gray-500">{profile.details.department}</p>
          <p className="font-medium">{profile.details.team}</p>
        </div>
      </div>

      {/* Personal Details */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Personal Details</h3>
          <button onClick={openDetailsModal} className="text-gray-500 hover:text-gray-700">
            <FaEdit />
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Work Email:</strong> {profile.details.email}</p>
          <p><strong>Date of Birth:</strong> {profile.details.dob || 'Not Selected'}</p>
          <p><strong>Country of Residence:</strong> {profile.details.country || 'Not Selected'}</p>
          <p><strong>Contact Number:</strong> {profile.details.phone}</p>
          <p><strong>Role:</strong> {profile.details.role}</p>
          <p><strong>Sex:</strong> {profile.details.gender}</p>
        </div>
      </div>

      {/* Travel Policy */}
      <div className="bg-white rounded-lg shadow p-4 cursor-pointer">
      <h3 className="text-lg font-semibold mb-2">Travel Policy</h3>
        <div className='flex justify-between'>
        <p>{profile.policy.name}</p>
        <button onClick={openPolicyModal} className="text-gray-500 hover:text-gray-700">
            <FaArrowRight />
          </button>
          </div>
      </div>

      {/* Preferences and Settings */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Preferences and Settings</h3>
          <button className="text-gray-500 hover:text-gray-700">
            <FaEdit onClick={handleLanguageAndRegionClick}></FaEdit>
          </button>
        </div>
        <div className="space-y-2">
          <p><strong>Language:</strong> {profile.preferences.language}</p>
          <p><strong>Currency:</strong> {profile.preferences.currency}</p>
          <p><strong>Time Format:</strong> {profile.preferences.timeFormat}</p>
          <p><strong>Distance:</strong> {profile.preferences.distance}</p>
          <p><strong>Weight:</strong> {profile.preferences.weight}</p>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={openContactModal}>
            <FaEdit />
          </button>
        </div>
        <p>{profile.contact.name || 'Add a contact person in case of emergency'}</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Notification Settings</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={openNotificationModal}>
            <FaEdit />
          </button>
        </div>
        <p>Choose what and how you'd like to receive your alerts</p>
      </div>

      {/* Logout Button */}
      <div>
      <button
        className="w-full py-3 bg-primaryText text-white rounded-lg flex justify-between px-4"
        onClick={onLogout}
      >
        Logout
        <RiLogoutCircleLine size={15}/>
      </button>
      </div>

      {/* Personal Details Modal */}
      {isPersonalModal && <PersonalDetailsModal onClose={closeDetailsModal} />}

      {/* Travel Policy Modal */}
      {isPolicyModalOpen && <TravelPolicyModal onClose={closePolicyModal} />}

      {/* Notifications Modal */}
      {isNotificationModalOpen && <NotifictionsModal onClose={closeNotificationModal} />}

      {/* Language Modal */}
      {showModal && <LanguageAndRegionModal onClose={handleCloseModal} />}

      {/* Emergency contact */}
      {isContactModalOpen && <EmergencyContactModal onClose={closeContactModal}/>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default ProfilePage;
