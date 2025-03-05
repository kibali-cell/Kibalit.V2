import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import resort from '../../assets/resort.jpg';
import api from '../../api/axiosConfig';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error);
      alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-6 gap-4 items-center justify-center h-screen w-screen">
      {/* Form Section */}
      <div className="flex-grow flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-md relative lg:basis-1/2 w-full max-w-md">
        <h1 className="text-heading-1 text-primaryText mb-6 text-center">Sign In</h1>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label 
              htmlFor="email" 
              className="block text-label-2-medium text-secondaryText mb-2"
            >
              Your work email
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@kibalit.com"
              aria-label="Enter your work email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div>
            <label 
              htmlFor="password" 
              className="block text-label-2-medium text-secondaryText mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              aria-label="Enter your password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
              required
            />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              className="w-full bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300"
            >
              Sign In
            </button>
            <Link 
              to="/forgotpassword" 
              className="text-primaryText text-label-2-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-label-2-medium text-secondaryText mb-4">Or Sign In with</p>
          <div className="flex justify-center space-x-6">
            {[ 
              { Icon: FaGoogle, color: 'text-[#DB4437]' },
              { Icon: FaApple, color: 'text-[#000000]' },
              { Icon: FaFacebookF, color: 'text-[#4267B2]' }
            ].map(({ Icon, color }, index) => (
              <a
                key={index}
                href="#"
                className={`${color} hover:opacity-80 transition-opacity duration-300`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-label-2-medium text-secondaryText">
            Don't have an account?{' '}
            <Link to="/register" className="text-primaryText hover:underline text-label-1-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="animate-slide-in-right lg:basis-1/2 w-full h-64 lg:h-full rounded-lg overflow-hidden">
        <img
          src={resort}
          alt="Relaxing beach resort view"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LandingPage;
