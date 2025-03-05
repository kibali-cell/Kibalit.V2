import { useState } from 'react';
import { IoClose, IoDocument } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { PiArrowBendDownRightThin } from "react-icons/pi";

const TravelPolicyManagement = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('policy');
  const CabinClassSection = () => {
    const cabinClasses = [
      {
        id: 'economy',
        label: 'Economy',
      },
      {
        id: 'premiumEconomy',
        label: 'Premium Economy',
      },
      {
        id: 'business',
        label: 'Business Class',
      },
      {
        id: 'firstClass',
        label: 'First Class',
      }
    ];
  
    const flightOptions = [
      'Always allowed',
      '0-3 hour flights',
      '3-6 hour flights',
      '6-10 hour flights',
      '10+ hour flights'
    ];
  
    return (
      <div className="space-y-4">
        <h3 className="text-heading-3">Cabin Class</h3>
        <p className="text-label-2-medium text-secondaryText">Choose the flight search allowed for each cabin class</p>
  
        <div className="space-y-2">
          {cabinClasses.map(({ id, label }) => (
            <div key={id} className="border rounded-md px-4 py-1">
              <div className='flex w-full'>
              <PiArrowBendDownRightThin className='w-6 h-12' />
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-secondaryText">{label}</span>
                </div>
                <select className=" pr-8  text-sm">
                  {flightOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPolicyContent = () => (
    <div className="space-y-6">
      <div className="space-y-2 border rounded-md p-4">
        <label className="text-label-2-medium text-secondaryText">Name of your travel policy</label>
        <input
          type="text"
          defaultValue="Standard travel policy"
          className="w-full p-2 bg-sectionBg border border-stroke-lightGreyBg rounded-md"
          readOnly
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-heading-3">Flights</h3>
        <p className="text-label-2-medium text-secondaryText">Set rules for flight booking procedures</p>

        <div className='border rounded-md px-4 py-2 bg-stroke-lightGreyBg'>
          <div className="flex items-center justify-between">
            <span className="text-label-1-medium text-secondaryText text-sm">Allow Dynamic pricing</span>
            <div className="w-8 h-4 bg-success-text rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-2 h-2 bg-success-bg rounded-full" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span>Book flights up to</span>
              <input
                type="text"
                defaultValue="20"
                className="w-10 p-1 bg-white border border-stroke-lightGreyBg rounded-md"
              />
              <span className="text-label-1-medium">% above the price of similar flights</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md p-4 bg-stroke-lightGreyBg">
          <div className="flex items-center justify-between">
            <div className='gap-2'>
              <span className="text-label-1-medium">The maximum is Tsh</span>
              <input
                type="text"
                defaultValue="350,000"
                className="w-20 px-2 py-1 bg-white border border-stroke-lightGreyBg rounded-md"
              />
              <span className="text-label-1-medium">per flight</span>
            </div>
            <div className="w-8 h-4 bg-success-text rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-2 h-2 bg-success-bg rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md p-4 border">
          <span className="text-label-1-medium text-secondaryText">All bookings should be made</span>
          <select className="w-full p-2 border bg-stroke-lightGreyBg rounded-md">
            <option>Anytime</option>
            <option>3+ Days in advance</option>
            <option>7+ Days in advance</option>
            <option>14+ Days in advance</option>
          </select>
        </div>
      </div>

      <CabinClassSection />

      <div className="space-y-4">
        <h3 className="text-heading-3">Hotels</h3>
        <p className="text-label-2-medium text-secondaryText tex-sm">Set rules for hotel booking procedures</p>

        <div className='border bg-stroke-lightGreyBg px-4 py-2 rounded-md text-sm'>
          <div className="flex items-center justify-between">
            <span className="text-label-1-medium text-secondaryText">Allow Dynamic pricing</span>
            <div className="w-8 h-4 bg-success-text rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-2 h-2 bg-success-bg rounded-full" />
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-between">
              <span className="text-label-1-medium">Book accommodation up to</span>
              <input
                type="text"
                defaultValue="20"
                className="w-10 p-2 bg-white border border-stroke-lightGreyBg rounded-md mx-1"
              />
              <span className="text-label-1-medium">% above the price of similar stays</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-4 bg-stroke-lightGreyBg rounded-md">
          <div className="flex items-center justify-between">
            <div className=''>
              <span className="text-label-1-medium">The maximum is Tsh</span>
              <input
                type="text"
                defaultValue="1,000,000"
                className="w-24 px-2 py-1 bg-white border border-stroke-lightGreyBg rounded-md"
              />
              <span className="text-label-1-medium">per room per night</span>
            </div>
            <div className="w-12 h-6 bg-success-text rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-4 h-4 bg-success-bg rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-md p-4 border">
          <span className="text-label-1-medium text-secondaryText">All bookings should be made</span>
          <select className="w-full p-2 border bg-stroke-lightGreyBg rounded-md">
            <option>Anytime</option>
            <option>3+ Days in advance</option>
            <option>7+ Days in advance</option>
            <option>14+ Days in advance</option>
          </select>
        </div>
        
        <div className="space-y-2 rounded-md p-2 border">
          <span className="text-label-1-medium text-secondaryText">Hotel Standard not more than</span>
          <select className="w-full p-2 border bg-stroke-lightGreyBg rounded-md">
            <option>3 stars</option>
          </select>
        </div>
      </div>

      <button className="w-full p-3 bg-buttonPrimary text-white rounded-md text-label-1-medium">
        Save Policy
      </button>
    </div>
  );

  const renderApprovalsContent = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-heading-3">Approval restrictions</h3>
        <p className="text-label-2-medium text-secondaryText pt-0">Set restrictions on what needs to be approved</p>

        <div className="space-y-5 border p-4 rounded-md">
          <div className="flex items-center gap-2">
            <input type="radio" name="approval" id="none" />
            <label htmlFor="none" className="text-label-1-medium">No restrictions</label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users do not need approval before booking</p>

          <div className="flex items-center gap-2">
            <input type="radio" name="approval" id="out-of-policy" defaultChecked />
            <label htmlFor="out-of-policy" className="text-label-1-medium">Required for out-of-policy bookings</label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users need approval for out-of-policy bookings</p>

          <div className="flex items-center gap-2">
            <input type="radio" name="approval" id="all" />
            <label htmlFor="all" className="text-label-1-medium">Required for all bookings</label>
          </div>
          <p className="text-label-2-medium text-secondaryText ml-6">Users must get approval for every booking</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-heading-3">Add Approvers</h3>
        <p className="text-label-2-medium text-secondaryText">Set restrictions on what needs to be approved</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white rounded-md border border-stroke-lightGreyBg">
            <div className='flex justify-between w-full'>
              <span className="text-label-2-medium text-secondaryText">1st approver</span>
              <p className="text-label-1-medium">John Kimathuka</p>
              <span className="text-label-2-medium text-secondaryText">HR</span>
            </div>
            <button className="text-buttonText hover:bg-sectionBg p-2 rounded-full">
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white rounded-md border border-stroke-lightGreyBg">
            <div>
              <span className="text-label-2-medium text-secondaryText">2nd approver</span>
              <p className="text-label-1-medium">Paul Atreides</p>
              <span className="text-label-2-medium text-secondaryText">Travel manager</span>
            </div>
            <button className="text-buttonText hover:bg-sectionBg p-2 rounded-full">
              <IoClose className="w-5 h-5" />
            </button>
          </div>
        </div>

        <button className="flex items-center gap-2 text-buttonText hover:bg-sectionBg p-2 rounded-md">
          <IoMdAdd className="w-5 h-5" />
          <span>Add Approver</span>
        </button>
      </div>

      <button className="w-full p-3 bg-buttonPrimary text-white rounded-md text-label-1-medium">
        Save
      </button>
    </div>
  );

  return (
    <div
      className={`fixed top-0 right-0 w-1/2 h-screen bg-white shadow-lg z-50 ${isOpen ? 'animate-slide-in-right' : 'hidden'}`}
    >
      <div className="relative h-full">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-buttonText hover:bg-sectionBg p-2 rounded-full"
        >
          <IoClose className="w-5 h-5" />
        </button>

        <div className="h-full p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex gap-4 items-center justify-between">
              <div>
                <button
                  className={`pb-2 px-1 text-label-1-semibold ${activeTab === 'policy'
                    ? 'text-primaryText'
                    : 'text-secondaryText'
                  }`}
                  onClick={() => setActiveTab('policy')}
                >
                  Policy
                </button>
                <button
                  className={`pb-2 px-1 text-label-1-semibold ${activeTab === 'approvals'
                    ? 'text-primaryText'
                    : 'text-secondaryText'
                  }`}
                  onClick={() => setActiveTab('approvals')}
                >
                  Approvals
                </button>
              </div>
              <div className='flex items-center gap-1 px-2 py-1 mr-1 text-sm border rounded-sm'>
                <IoDocument />
                <p>Policy Guide</p>
              </div>
            </div>

            {activeTab === 'policy' ? renderPolicyContent() : renderApprovalsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPolicyManagement;