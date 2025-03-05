import { useState, useEffect } from "react";
import { IoSearch, IoOptionsOutline, IoInformationCircleOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi";
import { BiChevronDown, BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
import { IoLocationOutline, IoCarOutline } from "react-icons/io5";
import TripDetailsPage from "../components/bookings/TripDetailsPage";

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openActionMenu, setOpenActionMenu] = useState(null);

  const [openTripDetails, setOpenTripDetails] = useState(false)

  useEffect(() => {
    const fetchBookings = async () => {
      const fakeData = [
        {
          month: "November",
          trips: [
            {
              id: 1,
              date: "Wed",
              day: "26",
              title: "Client Trip to Dar",
              location: "Dar es salaam",
              status: "pending",
              hasTransport: true,
              needsAttention: true
            },
            {
              id: 2,
              date: "Wed",
              day: "26",
              title: "Client Trip to Dar",
              location: "Dar es salaam",
              status: "completed",
              hasTransport: true
            },
            {
              id: 3,
              date: "Wed",
              day: "26",
              title: "Client Trip to Dar",
              location: "Dar es salaam",
              status: "pending",
              hasTransport: true,
              needsAttention: true
            }
          ],
        },
        {
          month: "October",
          trips: [
            {
              id: 4,
              date: "Wed",
              day: "26",
              title: "Client Trip to Dar",
              location: "Dar es salaam",
              status: "completed",
              hasTransport: true
            },
          ],
        },
      ];
      setBookings(fakeData);
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.map((month) => ({
    ...month,
    trips: month.trips.filter(
      (trip) =>
        (activeTab === "all" || 
         (activeTab === "pending" && trip.status === "pending") ||
         (activeTab === "past" && trip.status === "completed")) &&
        trip.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  const handleClickOutside = (event) => {
    if (!event.target.closest('.action-menu')) {
      setOpenActionMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-appBg md:px-32 py-6">
      <div className="mb-8">
        <h1 className="text-heading-1 text-primaryText mb-1">Bookings</h1>
        <p className="text-label-1-medium text-secondaryText">
          Take a look at your company's trip bookings and resolve any pending issues
        </p>
      </div>

      <div className=" rounded-lg">
        <div className="flex justify-between mb-6">
          {/* Tabs */}
          <div className="flex space-x-2 bg-stroke-lightGreyBg px-2 py-1 rounded-md text-sm">
            {[
              { id: "all", label: "All trips" },
              { id: "pending", label: "Pending" },
              { id: "past", label: "Past" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 rounded-md text-label-1-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white text-primaryText shadow-sm"
                    : "text-secondaryText hover:bg-white/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-2 bg-white rounded-md border-0 text-label-1-medium w-[200px] focus:outline-none placeholder:text-secondaryText"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText w-4 h-4" />
            </div>
            <button className="flex items-center space-x-2 py-2 px-4  rounded-md text-label-1-medium text-primaryText">
              <IoOptionsOutline className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.map((month, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-heading-3 text-primaryText font-medium mb-4">
              {month.month}
            </h2>
            <div className="space-y-2">
              {month.trips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex justify-between items-center bg-white px-4 py-2 rounded-md"
                >
                  <div className="flex items-center space-x-4 bord">
                    {/* Date */}
                    <div className="w-12 text-center border-r">
                      <div className="text-label-2-medium text-secondaryText">{trip.date}</div>
                      <div className="text-heading-3 text-primaryText">{trip.day}</div>
                    </div>
                    
                    {/* Trip Details */}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-label-1-medium text-primaryText">{trip.title}</h3>
                        {trip.needsAttention && (
                          <IoInformationCircleOutline className="w-4 h-4 text-warning-text" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-label-2-medium text-secondaryText">
                        <div className="flex items-center space-x-1">
                          <IoLocationOutline className="w-4 h-4" />
                          <span>{trip.location}</span>
                        </div>
                        {trip.hasTransport && (
                          <div className="flex items-center space-x-1">
                            <IoCarOutline className="w-4 h-4" />
                            <span>Transport</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative action-menu">
                    
                    {trip.status === "pending" ? (
                      <div>
                        <button
                          onClick={() => setOpenActionMenu(openActionMenu === trip.id ? null : trip.id)}
                          className="flex items-center space-x-2 py-2 px-4 bg-stroke-lightGreyBg text-primaryText rounded-md text-label-1-medium"
                        >
                          <span>Actions</span>
                          <BiChevronDown size={16}/>
                        </button>
                        {openActionMenu === trip.id && (
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <button className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-sectionBg">
                              <TiTick className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-sectionBg">
                              <BiEdit className="w-4 h-4" />
                              <span>Edit</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-sectionBg">
                              <MdOutlineClose className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-sectionBg">
                              <HiOutlineEye className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <button className="flex items-center space-x-2 text-label-1-medium text-secondaryText"
                        onClick={()=> setOpenTripDetails(true)}
                      >
                        <HiOutlineEye className="w-4 h-4" />
                        <span>View all</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TripDetailsPage
        isOpen={openTripDetails}
        onClose={()=> setOpenTripDetails(false)}
      />
    </div>
  );
};

export default BookingPage;