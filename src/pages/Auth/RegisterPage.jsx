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
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password, // for simplicity
        company_id: formData.company,
        role: "employee"
      });
      localStorage.setItem("token", response.data.token);
      alert("Registration successful");
      navigate("/home");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error);
      alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
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
            &#8592; Back
          </Link>
        </button>
        <h1 className="text-heading-1 text-primaryText mb-4 text-center">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label htmlFor="name" className="block text-label-2-medium text-secondaryText mb-2">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Manyo"
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
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-label-2-medium text-secondaryText mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
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
