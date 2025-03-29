import { useState, useEffect } from 'react';
import { FaArrowRight, FaEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import LanguageAndRegionModal from '../components/profilepage/LanguageModal';
import NotificationsModal from '../components/profilepage/NotificationsModal';
import PersonalDetailsModal from '../components/profilepage/PersonalDetailsModal';
import TravelPolicyModal from '../components/profilepage/TravelPolicyModal';
import EmergencyContactModal from '../components/profilepage/EmergencyContactModal';
import { RiLogoutCircleLine } from "react-icons/ri";
import api from '../api/axiosConfig';

const ProfilePage = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [userProfile, setUserProfile] = useState(null);
  const [isPersonalModal, setIsPersonalModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userResponse = await api.get('/user');
        console.log('User Data:', userResponse.data.user);
        console.log('User Roles:', userResponse.data.user.roles);
        setUserProfile(userResponse.data.user);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response?.status === 401) navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Callback to update userProfile after a successful update
  const handleProfileUpdate = (updatedUser) => {
    setUserProfile(updatedUser);
  };

  // Modal handlers
  const openDetailsModal = () => setIsPersonalModalOpen(true);
  const closeDetailsModal = () => setIsPersonalModalOpen(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openNotificationModal = () => setIsNotificationModalOpen(true);
  const closeNotificationModal = () => setIsNotificationModalOpen(false);
  const openPolicyModal = () => setIsPolicyModalOpen(true);
  const closePolicyModal = () => setIsPolicyModalOpen(false);

  const onLogout = () => navigate("/login");

  if (!userProfile) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-lg font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-white transform transition-transform duration-300 ease-in-out shadow-xl">
        <div className="h-full flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <div className="p-6 space-y-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Profile</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Profile Header */}
            <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <div className="flex-shrink-0">
                <img
                  src={userProfile.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'}
                  alt={`${userProfile.name} profile`}
                  className="w-24 h-24 rounded-full object-cover mt-2"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                <p className="text-gray-500">{userProfile.email}</p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Company: {userProfile.company?.name || 'Loading company...'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Department: {userProfile.department || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Role: {userProfile.roles?.map(role => role.name).join(', ') || 'N/A'}
                  </p>
                </div>
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
                <p><strong>Work Email:</strong> {userProfile.email}</p>
                <p><strong>Address:</strong> {userProfile.address || 'Not provided'}</p>
                <p><strong>Contact Number:</strong> {userProfile.phone || 'Not provided'}</p>
                <p><strong>Language:</strong> {userProfile.language || 'English'}</p>
              </div>
            </div>

            {/* Travel Policy */}
            <div className="bg-white rounded-lg shadow p-4 cursor-pointer">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Travel Policy</h3>
                <button onClick={openPolicyModal} className="text-gray-500 hover:text-gray-700">
                  <FaArrowRight />
                </button>
              </div>
              <p className="mt-2">Standard travel policy</p>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Preferences</h3>
                <button onClick={() => setShowModal(true)} className="text-gray-500 hover:text-gray-700">
                  <FaEdit />
                </button>
              </div>
              <div className="space-y-2">
                <p><strong>Email Notifications:</strong> {userProfile.email_notifications ? 'Enabled' : 'Disabled'}</p>
                <p><strong>Push Notifications:</strong> {userProfile.push_notifications ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Emergency Contact</h3>
                <button onClick={openContactModal} className="text-gray-500 hover:text-gray-700">
                  <FaEdit />
                </button>
              </div>
              <p>{userProfile.emergency_contact_name || 'No emergency contact specified'}</p>
              {userProfile.emergency_contact_phone && (
                <p className="mt-1">Phone: {userProfile.emergency_contact_phone}</p>
              )}
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="w-full py-3 bg-red-600 text-white rounded-lg flex justify-center items-center gap-2 mt-6 hover:bg-red-700 transition-colors"
            >
              <RiLogoutCircleLine />
              Logout
            </button>

            {/* Modals */}
            {isPersonalModal && (
              <PersonalDetailsModal 
                onClose={closeDetailsModal} 
                initialData={userProfile} 
                onUpdate={handleProfileUpdate}
              />
            )}
            {showModal && <LanguageAndRegionModal onClose={() => setShowModal(false)} />}
            {isContactModalOpen && <EmergencyContactModal onClose={closeContactModal} />}
            {isNotificationModalOpen && <NotificationsModal onClose={closeNotificationModal} />}
            {isPolicyModalOpen && <TravelPolicyModal onClose={closePolicyModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;