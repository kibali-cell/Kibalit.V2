import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import resort from '../../assets/resort.jpg';
import api from '../../api/axiosConfig';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
    // Clear errors when user starts typing again
    if (errors[e.target.id]) {
      setErrors({...errors, [e.target.id]: ''});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error);
      
      // Handle different error scenarios
      if (error.response?.status === 401) {
        setErrors({
          general: 'Invalid email or password. Please try again.'
        });
      } else if (error.response?.status === 403) {
        setErrors({
          general: 'Your account has been locked. Please contact support.'
        });
      } else if (error.response?.data?.errors) {
        // Handle validation errors from the backend
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        // Handle specific error message from the backend
        setErrors({
          general: error.response.data.message
        });
      } else {
        // Handle network errors or unexpected issues
        setErrors({
          general: 'Unable to connect to the server. Please try again later.'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-6 gap-4 items-center justify-center h-screen w-screen">
      {/* Form Section */}
      <div className="flex-grow flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-md relative lg:basis-1/2 w-full max-w-md">
        <h1 className="text-heading-1 text-primaryText mb-6 text-center">Sign In</h1>
        
        {/* General error message */}
        {errors.general && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-sm">
            {errors.general}
          </div>
        )}
        
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
              value={formData.email}
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium ${
                errors.email ? 'border-red-500' : 'border-stroke-lightGreyBg'
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              value={formData.password}
              className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium ${
                errors.password ? 'border-red-500' : 'border-stroke-lightGreyBg'
              }`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm transition-opacity duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-80'
              }`}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
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