import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoPerson } from 'react-icons/io5';
import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Configure Axios with base URL and auth token
axios.defaults.baseURL = 'http://localhost:8000'; 
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const PeopleTable = () => {
  const [peopleData, setPeopleData] = useState([]);
  const [departments, setDepartments] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch users
        const usersResponse = await axios.get('/api/users');
        console.log('Users Response:', usersResponse.data);
        setPeopleData(Array.isArray(usersResponse.data.users) ? usersResponse.data.users : []);

        // Fetch departments
        const deptsResponse = await axios.get('/api/departments');
        console.log('Departments Response:', deptsResponse.data);
        if (Array.isArray(deptsResponse.data)) {
          const deptMap = deptsResponse.data.reduce((acc, dept) => {
            acc[dept.id] = dept.name;
            return acc;
          }, {});
          setDepartments(deptMap);
        } else {
          console.error('Departments data is not an array:', deptsResponse.data);
          setDepartments({});
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
        setPeopleData([]);
        setDepartments({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and paginate data
  const filteredData = peopleData.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      department_id: formData.get('department_id'),
    };
    try {
      const response = await axios.post('/api/users', newUser);
      console.log('New User Response:', response.data);
      setPeopleData([...peopleData, response.data.user]);
      setIsAddModalOpen(false);
      e.target.reset();
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  // Render loading or error states
  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="shadow-sm mb-6">
      {/* Header with Search and Add Button */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-900">People</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email"
                className="w-64 pl-8 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </div>
            <button
              className="px-3 py-2 bg-gray-900 text-white rounded-md flex items-center gap-2 text-sm hover:bg-gray-800"
              onClick={() => setIsAddModalOpen(true)}
            >
              <IoPerson />
              <span>Add new</span>
              <FaPlus className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-2 rounded-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="w-6 p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 text-left font-medium text-sm text-gray-600">Name</th>
                <th className="px-4 text-left font-medium text-sm text-gray-600">Email</th>
                <th className="px-4 text-left font-medium text-sm text-gray-600">Phone</th>
                <th className="px-4 text-left font-medium text-sm text-gray-600">Department</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center text-sm text-gray-700">
                    No users found.
                  </td>
                </tr>
              ) : (
                currentItems.map((person) => (
                  <tr key={person.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                        <span>{person.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{person.email}</td>
                    <td className="p-4 text-sm text-gray-600">{person.phone || 'N/A'}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {departments[person.department_id] || 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} users
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-1 border border-gray-200 rounded-md ${
                    currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="px-3 py-1 border border-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <form onSubmit={handleAddUser}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <select
                  name="role"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  name="department_id"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Department</option>
                  {Object.entries(departments).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800"
              >
                Add User
              </button>
              <button
                type="button"
                className="ml-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeopleTable;