import React, { useState, useEffect } from "react";
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
import graph from '../assets/graph.png';
import category from '../assets/category.png';
import { BsSlashSquareFill } from "react-icons/bs";
import PaymentAndIntegrations from "./PaymentAndIntegrations";
import PeopleTable from "../components/Organization/PeopleTable";
import axios from 'axios';

const OrganizationPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isManagementOpen, setIsManagementOpen] = useState(false);
  const [policyName, setPolicyName] = useState("No policy set");
  const [loadingPolicy, setLoadingPolicy] = useState(true);
  const [policyError, setPolicyError] = useState(null);

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

  // Fetch policy data
  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8000/api/policies', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        // Expecting an array with one policy or an empty array
        const policyData = Array.isArray(response.data) && response.data.length > 0 ? response.data[0] : null;
        setPolicyName(policyData ? policyData.name : 'No policy set');
        setLoadingPolicy(false);
      } catch (err) {
        setPolicyError(err.response?.data?.message || 'Failed to fetch policy');
        setPolicyName('No policy set');
        setLoadingPolicy(false);
      }
    };

    fetchPolicy();
  }, []);

  return (
    <div className="bg-appBg py-6 font-inter px-32">
      <div className="max-w-7xl mx-auto">
        {/* Overview Section */}
        <section className="mb-6">
          <h2 className="text-heading-1 mb-3">Organization</h2>
          <h2 className="text-heading-3 mb-3">Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-heading-3 font-medium mb-3 text-secondaryText">Spending Trend</h3>
              <img src={graph} alt="Spending trend" />
            </div>

            <div className="">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-heading-3 font-medium text-secondaryText">Spend by Category</h3>
                <img src={category} alt="Spend by category" />
              </div>
              <div
                className="bg-buttonPrimary p-3 rounded-lg text-white mt-2 flex justify-between"
                onClick={() => navigate('/totalexpenses')}
              >
                <div className="flex">
                  <BsSlashSquareFill />
                  <button className="text-white text-sm ml-1">Expenses and reporting</button>
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
              <span className="text-label-1-semibold text-primaryText">
                {loadingPolicy ? 'Loading...' : policyError ? 'Error loading policy' : policyName}
              </span>
              <IoArrowForward className="text-primaryText w-5 h-5" />
            </div>
          </div>
        </div>

        <TravelPolicyManagement
          isOpen={isManagementOpen}
          onClose={() => setIsManagementOpen(false)}
        />

        {/* People Section */}
        <PeopleTable />

        {/* Payment and Integrations */}
        <PaymentAndIntegrations />

        {/* Payment Details Section */}
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