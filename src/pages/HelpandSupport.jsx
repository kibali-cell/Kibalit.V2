import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Help and Support</h2>
        <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
          Policy Guides
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-600">Change Details</span>
          </div>
          <span className="text-gray-400 text-sm">Solved</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Cancel Trip</span>
          </div>
          <span className="text-gray-400 text-sm">Resolved: Approval</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Add Luggage</span>
          </div>
          <span className="text-gray-400 text-sm">Cancelled</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Change Details</span>
          </div>
          <span className="text-gray-400 text-sm">Rejected</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
            <span className="text-gray-600">Add Luggage</span>
          </div>
          <span className="text-gray-400 text-sm">Cancelled</span>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">
            Cancelling trip
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">
            Modifying trip details
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">
            Add Luggage
          </button>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none">
            Request Policy Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;