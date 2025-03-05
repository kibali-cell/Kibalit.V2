import { IoAirplaneOutline, IoLocationOutline, IoBusOutline, IoCalendarOutline, IoPeopleOutline, IoSearchOutline, IoArrowBack } from 'react-icons/io5';
import { SlPlane } from "react-icons/sl";
import { FaPlaneDeparture, FaPlaneArrival, FaHotel, FaBus } from "react-icons/fa6";

const TravelForm = ({ activeTab, setActiveTab, onClose }) => {
  const tabs = [
    { id: 'Flights', icon: <SlPlane className="w-5 h-5" />, label: 'Flights' },
    { id: 'Hotels', icon: <FaHotel className="w-5 h-5" />, label: 'Hotels' },
    { id: 'Buses', icon: <IoBusOutline className="w-5 h-5" />, label: 'Buses' }
  ];

  const renderFormFields = () => {
    switch (activeTab) {
      case 'Flights':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From */}
            <div className="relative md:col-span-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <FaPlaneDeparture className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="From"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* To */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <FaPlaneArrival className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="To"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Depart date */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Depart date"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Travelers */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Return date"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );

      case 'Hotels':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="relative md:col-span-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Check-in */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Check in"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Check-out */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Check out"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Travelers */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoPeopleOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Travelers"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );

      case 'Buses':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* From */}
            <div className="relative md:col-span-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="From"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* To */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoLocationOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="To"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Date */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoCalendarOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Travel date"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
            {/* Passengers */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText">
                <IoPeopleOutline className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Passengers"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-md border border-stroke-lightGreyBg focus:outline-none focus:border-stroke-greyBg text-label-1-medium"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-inter">
      <div className='flex'>
        <button className="p-2 hover:bg-gray-100 rounded-full" onClick={onClose}>
          <IoArrowBack className="w-6 h-6 text-primaryText" />
        </button>
        {/* Navigation Tabs */}
        <div className="flex gap-8 justify-center flex-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 ${activeTab === tab.id
                  ? 'text-primaryText border-b-2 border-primaryText'
                  : 'text-secondaryText'
                }`}
            >
              {tab.icon}
              <span className="text-label-1-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Form */}
      <div className=" p-4 flex items-center gap-2">
        {renderFormFields()}
        {/* Search Button */}
        <div className="flex justify-end ">
          <button className="bg-buttonPrimary text-white px-4 py-3 rounded-md flex items-center">
            <IoSearchOutline className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Travel Options */}
      {activeTab === 'Flights' && (
        <div className='flex justify-end'>
          <select className="p-2 outline-none text-sm">
            {["Economy", "Business", "First Class"].map((classType) => (
              <option key={classType}>{classType}</option>
            ))}
          </select>
          <select className="p-2 outline-none text-sm">
            {["1 traveler", "2 travelers", "3 travelers", "4 travelers"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TravelForm;