import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FaSearch, FaFilter, FaChevronDown } from 'react-icons/fa';


const ExpensesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: 'Sales',
    tripMonth: 'July'
  });

  const expensesData = [
    {
      id: 1,
      trip: 'Client trip to Dar',
      department: 'Juan Paulo - Sales & Marketing',
      destination: 'Dar es salaam',
      start: 'Jul 08',
      end: 'Jul 09',
      flights: '6,000,000',
      stays: '4,000,000',
      geo: '2.00',
      totalCost: '12,000,000'
    },
    // Additional dummy data following the same pattern...
    {
      id: 2,
      trip: 'Client trip to Dar',
      department: 'Juan Paulo - Sales & Marketing',
      destination: 'Name',
      start: 'Name',
      end: 'Name',
      flights: 'Name',
      stays: 'Name',
      geo: 'Name',
      totalCost: 'Name'
    }
  ];

  return (
    <div className="min-h-screen bg-appBg p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2 text-gray-600">
            <IoArrowBack className="text-xl" />
            <span>Travel Expenses</span>
          </button>
          <div className="flex items-center gap-3 ml-auto">
            <button className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">
              Download Select Details
            </button>
            <button className="px-4 py-2 text-sm text-white bg-black rounded flex items-center gap-2">
              <span>Export full report</span>
              <FaChevronDown className="text-sm" />
            </button>
          </div>
        </div>

        <div className="flex items-end gap-8">
          <div>
            <h1 className="text-4xl font-semibold mb-2">Tsh. 65,000,000</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Flights
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Stays
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                Ground Transit
              </span>
            </div>
          </div>
          <div className="text-right ml-auto">
            <span className="text-gray-600">2024</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded">
              <FaFilter />
              <span>Filters</span>
            </button>
            <div className="flex gap-2">
              <span className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2">
                Department: Sales <FaChevronDown />
              </span>
              <span className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2">
                Trip Start Month: July <FaChevronDown />
              </span>
            </div>
            <button className="text-red-500 text-sm">Clear filters</button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-6 p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trip</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Start</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">End</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Flights</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Stays</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Geo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((expense) => (
                <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {expense.department.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{expense.trip}</div>
                        <div className="text-sm text-gray-500">{expense.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{expense.destination}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.start}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.end}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.flights}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.stays}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.geo}</td>
                  <td className="p-4 text-sm text-gray-600">{expense.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;