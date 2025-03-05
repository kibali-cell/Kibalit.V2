import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { IoArrowForward } from 'react-icons/io5';
import TravelPolicyManagement from "./TravelPolicyManagement";
import graph from '../assets/graph.png'
import category from '../assets/category.png'
import { BsSlashSquareFill } from "react-icons/bs";
import PaymentAndIntegrations from "./PaymentAndIntegrations";
import PeopleTable from "../components/Organization/PeopleTable";

const OrganizationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);

  const navigate = useNavigate();

  // Sample data
  const spendingData = [
    { name: "Apr 1", value: 2.5 },
    { name: "Apr 15", value: 3.1 },
    { name: "May 1", value: 2.8 },
    { name: "May 15", value: 3.4 },
    { name: "Jun 1", value: 2.9 },
    { name: "Jun 15", value: 3.2 },
    { name: "Jul 1", value: 2.7 },
  ];

  const spendByCategory = [
    { name: "Meals", value: 1.5 },
    { name: "Travel", value: 1.2 },
    { name: "General Travel", value: 1.2 },
  ];

  const peopleData = [
    {
      name: "Veronica Kirk",
      email: "vkirk@example.com",
      role: "Admin",
      status: "Active",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "Joshua Harris",
      email: "jharris@example.com",
      role: "Manager",
      status: "Active",
      phone: "+1 (555) 987-6543",
    },
    {
      name: "Emily Chen",
      email: "echen@example.com",
      role: "Member",
      status: "Inactive",
      phone: "+1 (555) 456-7890",
    },
  ];

  

  return (
    <div className="bg-appBg py-6 font-inter px-32">
      <div className="max-w-7xl mx-auto">
        {/* Overview Section */}
        <section className="mb-6">
          <h2 className="text-heading-1 mb-3">Organization</h2>
          <h2 className="text-heading-3  mb-3">Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-heading-3 font-medium mb-3 text-secondaryText">Spending Trend</h3>
              {/* <ResponsiveContainer width="100%" height={200}>
                <LineChart data={spendingData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#4CAF50" />
                </LineChart>
              </ResponsiveContainer> */}
              <img src={graph} alt="" />
            </div>

            <div className="">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-heading-3 font-medium  text-secondaryText">Spend by Category</h3>
                <div className="">
                  {/* {spendByCategory.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                  >
                    <span className="text-gray-700 font-medium text-label-1-medium">{item.name}</span>
                    <span className="text-gray-500 font-medium text-label-1-medium">${item.value}K</span>
                  </div>
                ))} */}
                  <img src={category} alt="category" />
                </div>
              </div>
              <div className="bg-buttonPrimary p-3 rounded-lg text-white mt-2 flex justify-between" onClick={() => navigate('/totalexpenses')}>
                <div className="flex ">
              <BsSlashSquareFill /> 
                <button onClick={() => navigate('/totalexpenses')} className="text-white text-sm ml-1">Expenses and reporting</button>
                </div>
                <IoArrowForward className="text-white w-5 h-4" />
              </div>
              
            </div>
          </div>
        </section>

        {/* Policy Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="space-y-4">
            <h2 className="text-label-1-medium text-secondaryText">Your Company's travel policy</h2>

            <div
              onClick={() => setIsManagementOpen(true)}
              className="flex items-center justify-between p-4 bg-sectionBg rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="text-label-1-semibold text-primaryText">Standard travel policy</span>
              <IoArrowForward className="text-primaryText w-5 h-5" />
            </div>
          </div>
        </div>

        <TravelPolicyManagement
          isOpen={isManagementOpen}
          onClose={() => setIsManagementOpen(false)}
        />

        {/* People Section */}
        {/* <section className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-heading-2 font-semibold mb-3">People</h2>
          <div className="flex items-center justify-between mb-3">
            <div className="relative w-full max-w-md">
              <FaSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search people..."
                className="bg-gray-100 rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-label-1-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${filterActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
              onClick={() => setFilterActive(!filterActive)}
            >
              <FaFilter />
              <span className="text-label-1-medium">Filter</span>
            </button>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-tableHeaderBg">
                <th className="px-3 py-2 text-left text-label-1-medium">Name</th>
                <th className="px-3 py-2 text-left text-label-1-medium">Email</th>
                <th className="px-3 py-2 text-left text-label-1-medium">Role</th>
                <th className="px-3 py-2 text-left text-label-1-medium">Status</th>
                <th className="px-3 py-2 text-left text-label-1-medium">Phone</th>
              </tr>
            </thead>
            <tbody>
              {peopleData.map((person, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-3 py-2 text-label-1-medium">{person.name}</td>
                  <td className="px-3 py-2 text-label-1-medium">{person.email}</td>
                  <td className="px-3 py-2 text-label-1-medium">{person.role}</td>
                  <td className="px-3 py-2 text-label-1-medium">{person.status}</td>
                  <td className="px-3 py-2 text-label-1-medium">{person.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section> */}
        <PeopleTable/>

        {/* Payment Cards section */}
        {/* <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-heading-2 font-semibold mb-4">Payment Cards</h2>
          <div className="space-y-4">
            {paymentCards.map((card, index) => (
              <div
                key={index}
                className="bg-sectionBg rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                    {card.type.charAt(0)}
                  </div>
                  <span className="text-primaryText font-medium">
                    {card.type} ending in {card.last4}
                  </span>
                </div>
                <button className="bg-buttonPrimary text-buttonText px-4 py-2 rounded-md">
                  Delete
                </button>
              </div>
            ))}
            <button
              className="bg-buttonPrimary text-buttonText px-4 py-2 rounded-md flex items-center space-x-2"
              onClick={() => setShowPaymentDetails(true)}
            >
              <FaPlus />
              <span>Add a payment method</span>
            </button>
          </div>
        </div> */}

        <PaymentAndIntegrations/>
        {/* Payment Details section */}
        {showPaymentDetails && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-heading-2 font-semibold mb-4">Payment Details</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="cardHolderName"
                    className="block text-primaryText font-medium mb-2"
                  >
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    id="cardHolderName"
                    className="bg-sectionBg rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryText"
                    placeholder="JOHN J MANYO"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-primaryText font-medium mb-2"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="bg-sectionBg rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryText"
                    placeholder="1234 4567 7654 9867"
                  />
                </div>
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-primaryText font-medium mb-2"
                  >
                    Expiry Date
                  </label>
                  <select
                    id="expiryDate"
                    className="bg-sectionBg rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryText"
                  >
                    <option value="12">12</option>
                    <option value="2030">2030</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-primaryText font-medium mb-2"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="bg-sectionBg rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primaryText"
                    placeholder="433"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-buttonPrimary text-buttonText px-4 py-2 rounded-md mr-4"
                  onClick={() => setShowPaymentDetails(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-buttonPrimary text-buttonText px-4 py-2 rounded-md"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        )}
        

      </div>
    </div>
  );
};

export default OrganizationPage;