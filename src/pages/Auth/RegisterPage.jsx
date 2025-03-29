import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api/axiosConfig';
import resort from "../../assets/resort.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "employee",
    password: "",
    password_confirmation: ""
  });
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(null); // For success messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null); // Clear error on input change
    setSuccess(null); // Clear success on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(null); // Clear previous success
    try {
      const response = await api.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        company_name: formData.company,
        role: formData.role
      });
      localStorage.setItem("token", response.data.access_token);
      setSuccess("Registration successful! Redirecting to home...");
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      const errorMessage = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(", ")
        : error.response?.data?.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-6 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Image */}
      <div className="animate-slide-in-left lg:w-1/2 rounded-lg overflow-hidden">
        <img src={resort} alt="Resort" className="h-full w-full object-cover" />
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md relative lg:w-1/2 w-full max-w-md">
        <button className="self-start mb-4">
          <Link to="/" className="text-secondaryText text-label-2-medium hover:underline">
            ← Back
          </Link>
        </button>
        <h1 className="text-heading-1 text-primaryText mb-4 text-center">
          Create Account
        </h1>
        {error && (
          <div className="w-full p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg text-sm">
            <span className="font-semibold">Error: </span>{error}
          </div>
        )}
        {success && (
          <div className="w-full p-3 mb-4 text-green-700 bg-green-100 border border-green-400 rounded-lg text-sm">
            <span className="font-semibold">Success: </span>{success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="name" className="block text-label-2-medium text-secondaryText mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Manyo"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-label-2-medium text-secondaryText mb-2">
              Your work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@kibalit.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-label-2-medium text-secondaryText mb-2">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              placeholder="Manyo Enterprise"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-label-2-medium text-secondaryText mb-2">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            >
              <option value="employee">Employee</option>
              <option value="travel_admin">Travel Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="password" className="block text-label-2-medium text-secondaryText mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label htmlFor="password_confirmation" className="block text-label-2-medium text-secondaryText mb-2">
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="********"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <button className="w-full bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300">
            Create Account
          </button>
        </form>
        <p className="mt-4 text-label-2-medium text-secondaryText">
          Already have an account?{" "}
          <Link to="/login" className="text-primaryText hover:underline text-label-1-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;