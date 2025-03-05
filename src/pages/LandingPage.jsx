import React from "react";
import { Link } from "react-router-dom";
import resort from '../assets/resort.jpg';
import travelIcon from '../assets/bro.svg';
import logo from '../assets/logo.png'

const WelcomePage = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center bg-stroke-lightGreyBg font-inter p-4 md:p-9 h-screen w-screen">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-md max-w-md mx-auto md:max-w-md">
        <div className="flex items-center justify-center mb-6">
          <img
            src={travelIcon}
            alt="Kibalit"
            className="w-[70%] max-w-[200px] h-auto object-cover"
          />
        </div>
        <div >
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="h-16 w-auto md:h-16"
                  />
                </div>
        <p className="text-label-1-medium text-secondaryText mb-4 text-center">
          Painless business travel for ambitious businesses
        </p>
        <div className="flex flex-col gap-4 w-full">
          <Link to="/login">
            <button className="w-full py-2 px-4 bg-buttonPrimary text-white rounded-sm text-label-1-semibold hover:opacity-80 transition-opacity duration-300">
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button className="w-full py-2 px-4 border border-primaryText text-primaryText rounded-sm text-label-1-semibold hover:bg-stroke-lightGreyBg transition-colors duration-300">
              Create Account
            </button>
          </Link>
        </div>
      </div>

      {/* Right Side */}
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

export default WelcomePage;