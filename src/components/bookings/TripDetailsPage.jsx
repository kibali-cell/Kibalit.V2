import { useNavigate } from 'react-router-dom';
import { IoArrowBack, IoShareSocial } from 'react-icons/io5';
import { HiDownload } from 'react-icons/hi';
import { BsAirplane, BsBuilding } from 'react-icons/bs';

const TripDetailsPage = ({ isOpen, onClose }) => {
  const tripData = {
    title: "Client Trip To Materuni",
    travelers: [
      { name: "Thomas J Warburg", role: "Engineer" },
      { name: "Jonas Kibali Twiga", role: "Sales" }
    ],
    flight: {
      airline: "Precision Air",
      flightNo: "GE 822",
      ref: "F268X65",
      from: {
        code: "DAR",
        city: "Dar es salaam",
        time: "TUE,16 • 14:05"
      },
      to: {
        code: "KLM",
        city: "Kilimanjaro",
        time: "TUE,16 • 16:05"
      }
    },
    stay: {
      hotel: "Four Points By Sheraton",
      address: "KL201 Service Road, Arusha broadway",
      location: "Dar es salaam",
      phone: "+255 678657865",
      checkIn: {
        date: "Mon, Jun 6",
        time: "17:00"
      },
      checkOut: {
        date: "Thu, Jun 9",
        time: "11:00"
      },
      roomType: "Classic Suite",
      rooms: "02",
      bookingId: "F268X65"
    },
    pricing: {
      flight: {
        price: 300000,
        perPerson: 150000,
        travelers: 2
      },
      stay: {
        price: 600000,
        perRoom: 100000,
        nights: 3,
        rooms: 2,
        guests: 2
      },
      total: 900000
    }
  };
  
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 animate-fade-in min-h-screen bg-white md:px-32 overflow-auto pt-10 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button className="flex items-center text-primaryText" onClick={onClose}>
          <IoArrowBack className="w-6 h-6 mr-2" />
        </button>
        <h1 className="text-heading-1 text-primaryText">{tripData.title}</h1>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 border border-stroke-greyBg rounded-md">
            <IoShareSocial className="w-4 h-4" />
            <span className="text-label-1-medium">Share Trip Details</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-buttonPrimary text-white rounded-md">
            <HiDownload className="w-4 h-4" />
            <span className="text-label-1-medium">Download</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Travelers */}
        <section>
          <h2 className="text-heading-3 mb-4">Travelers</h2>
          <div className="flex space-x-4">
            {tripData.travelers.map((traveler, index) => (
              <div key={index} className="flex items-center space-x-3 bg-sectionBg p-4 rounded-md w-full">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-label-1-medium text-primaryText">{traveler.name}</p>
                  <p className="text-label-2-medium text-secondaryText">{traveler.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Itinerary */}
        <section>
          <h2 className="text-heading-3 mb-4">Travel Itinerary</h2>

          {/* Flight */}
          <div className='bg-appBg rounded-sm p-5'>
            <div className="bg-white p-6 rounded-md mb-4">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-heading-3">Flight</h3>
                <div className="flex items-center space-x-2 bg-white">
                  <span className="text-success-text bg-success-bg px-2 py-1 rounded text-label-2-medium">Confirmed</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-label-1-medium text-primaryText">{tripData.flight.airline}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div>
                      <p className="text-primaryText text-label-1-medium">{tripData.flight.from.code}</p>
                      <p className="text-secondaryText text-label-2-medium">{tripData.flight.from.city}</p>
                      <p className="text-secondaryText text-label-2-medium">{tripData.flight.from.time}</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primaryText" />
                      <div className="flex-1 border-t border-dashed border-stroke-greyBg mx-2" />
                      <BsAirplane className="w-4 h-4 text-primaryText transform rotate-90" />
                      <div className="flex-1 border-t border-dashed border-stroke-greyBg mx-2" />
                      <div className="w-2 h-2 rounded-full bg-primaryText" />
                    </div>
                    <div className="text-right">
                      <p className="text-primaryText text-label-1-medium">{tripData.flight.to.code}</p>
                      <p className="text-secondaryText text-label-2-medium">{tripData.flight.to.city}</p>
                      <p className="text-secondaryText text-label-2-medium">{tripData.flight.to.time}</p>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 text-label-2-medium text-secondaryText">
                    <span>✈ {tripData.flight.flightNo}</span>
                    <span>Ref # {tripData.flight.ref}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stay */}
            <div className="bg-white p-6 rounded-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-heading-3">Stay</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-success-text bg-success-bg px-2 py-1 rounded text-label-2-medium">Confirmed</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <BsBuilding className="w-12 h-12" />
                <div className="flex-1">
                  <h4 className="text-label-1-semibold">{tripData.stay.hotel}</h4>
                  <p className="text-label-2-medium text-secondaryText">{tripData.stay.address}</p>
                  <p className="text-label-2-medium text-secondaryText">{tripData.stay.location} | {tripData.stay.phone}</p>

                  <div className="grid grid-cols-2 gap-8 mt-4">
                    <div>
                      <p className="text-label-2-medium text-secondaryText">Check-In</p>
                      <p className="text-label-1-medium">{tripData.stay.checkIn.date}</p>
                      <p className="text-label-2-medium text-secondaryText">{tripData.stay.checkIn.time}</p>
                    </div>
                    <div>
                      <p className="text-label-2-medium text-secondaryText">Check-Out</p>
                      <p className="text-label-1-medium">{tripData.stay.checkOut.date}</p>
                      <p className="text-label-2-medium text-secondaryText">{tripData.stay.checkOut.time}</p>
                    </div>
                    <div>
                      <p className="text-label-2-medium text-secondaryText">Room Type</p>
                      <p className="text-label-1-medium">{tripData.stay.roomType}</p>
                    </div>
                    <div>
                      <p className="text-label-2-medium text-secondaryText">Rooms</p>
                      <p className="text-label-1-medium">{tripData.stay.rooms}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Breakdown */}
        <section className="bg-white rounded-md border border-stroke-lightGreyBg p-6">
          <h2 className="text-heading-3 mb-4">Price Breakdown</h2>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-1-medium flex items-center">
                  <BsAirplane className="mr-2" /> Flight to {tripData.flight.from.city} (Round Trip)
                </p>
                <p className="text-label-2-medium text-secondaryText mt-1">
                  {tripData.pricing.flight.travelers} Travelers
                </p>
                <p className="text-label-2-medium text-secondaryText">
                  Price per Traveler: Tsh. {tripData.pricing.flight.perPerson.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-label-1-medium">Tsh. {tripData.pricing.flight.price.toLocaleString()}</p>
                <span className="text-success-text bg-success-bg px-2 py-1 rounded text-label-2-medium">Paid</span>
              </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="text-label-1-medium flex items-center">
                  <BsBuilding className="mr-2" /> {tripData.pricing.stay.nights} stay in {tripData.flight.from.city}
                </p>
                <p className="text-label-2-medium text-secondaryText mt-1">
                  {tripData.pricing.stay.nights} nights, {tripData.pricing.stay.rooms} rooms, {tripData.pricing.stay.guests} Guests
                </p>
                <p className="text-label-2-medium text-secondaryText">
                  Price per room per night: Tsh. {tripData.pricing.stay.perRoom.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-label-1-medium">Tsh. {tripData.pricing.stay.price.toLocaleString()}</p>
                <span className="text-success-text bg-success-bg px-2 py-1 rounded text-label-2-medium">Paid</span>
              </div>
            </div>

            <div className="pt-4 border-t border-stroke-lightGreyBg">
              <div className="flex justify-between items-center">
                <p className="text-label-1-semibold">Total Price</p>
                <p className="text-label-1-semibold">Tsh. {tripData.pricing.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Manage Trip */}
        <section className="space-y-4">
          <h2 className="text-heading-3">Manage Trip</h2>
          <p className="text-label-1-medium text-secondaryText">
            Any trip details changes or changed your mind about going?
          </p>
          <div className="flex space-x-4">
            <button className="flex-1 py-3 text-center border border-stroke-greyBg rounded-md text-label-1-medium" onClick={()=> navigate('/booking')}>
              Cancel Trip
            </button>
            <button className="flex-1 py-3 text-center bg-buttonPrimary text-white rounded-md text-label-1-medium" onClick={()=> navigate('/booking')}>
              Change Details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TripDetailsPage;