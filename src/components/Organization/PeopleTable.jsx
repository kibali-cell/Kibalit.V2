import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoPerson } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';

// Configure Axios with base URL and auth token
axios.defaults.baseURL = 'http://localhost:8000'; // Adjust if your backend is on a different port
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Adjust based on where you store the token
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
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'), // 'admin' or 'employee'
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
    <div className="p-6">
      {/* Header with Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search people..."
          className="border border-gray-300 rounded-md px-3 py-2 w-1/3"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          className="px-3 py-2 bg-gray-900 text-white rounded-md flex items-center gap-2 text-sm hover:bg-gray-800"
          onClick={() => setIsAddModalOpen(true)}
        >
          <IoPerson />
          <span>Add new</span>
          <FaPlus className="text-sm" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Department</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-sm text-gray-700">
                  No users found.
                </td>
              </tr>
            ) : (
              currentItems.map((person) => (
                <tr key={person.id} className="border-t">
                  <td className="px-4 py-2 text-sm text-gray-700">{person.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{person.email}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{person.phone || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
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
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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