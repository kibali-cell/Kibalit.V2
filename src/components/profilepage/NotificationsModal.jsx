import { useState } from 'react';
import { IoArrowBackCircleOutline } from "react-icons/io5";


const NotificationsModal = ({ onClose }) => {
  const [allowNotifications, setAllowNotifications] = useState(true);
  const [notificationChannels, setNotificationChannels] = useState([
    { type: 'Email', enabled: true },
    { type: 'Text messages', enabled: true },
    { type: 'Whatsapp', enabled: true },
  ]);

  const toggleNotificationChannel = (index) => {
    setNotificationChannels((prevChannels) => {
      const updatedChannels = [...prevChannels];
      updatedChannels[index].enabled = !updatedChannels[index].enabled;
      return updatedChannels;
    });
  };

  const toggleAllowNotifications = () => {
    setAllowNotifications((prevState) => !prevState);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-[60]">
      <div className="absolute right-0 top-0 max-h-full  bg-white transform transition-transform duration-300 ease-in-out shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 h-full w-full px-10">
      
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onClose}
            className="hover:bg-gray-100  rounded-full"
          >
            <IoArrowBackCircleOutline className="w-7 h-7 text-gray-600" />
          </button>
          <h2 className="text-gray-900 text-lg font-medium">Notifications</h2>
        </div>

        <div className="space-y-4 bg-appBg p-4 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-label-1-medium text-primaryText">Allow notifications</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={allowNotifications}
                onChange={toggleAllowNotifications}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stroke-greyBg rounded-full peer peer-focus:ring-2 peer-focus:ring-success-text peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
            </label>
          </div>
          <div>
            <span className="text-label-1-medium text-primaryText">Notification Channels</span>
            <div className="space-y-2 mt-2">
              {notificationChannels.map((channel, index) => (
                <div
                  key={channel.type}
                  className="flex items-center justify-between bg-sectionBg px-4 py-3 rounded-md"
                >
                  <span className="text-label-1-medium text-primaryText">{channel.type}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channel.enabled}
                      onChange={() => toggleNotificationChannel(index)}
                      className="sr-only peer"
                    />
                   <div className="w-11 h-6 bg-stroke-greyBg rounded-full peer peer-focus:ring-2 peer-focus:ring-success-text peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-text"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default NotificationsModal;