import React, { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import logo from './logo.png'
import HelpAndSupportOverlay from "./overlays/HelpAndSupportOverlay";
import ProfilePage from '../../pages/ProfilePage';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    if (isProfileOpen || isHelpOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isProfileOpen, isHelpOpen]);

  return (
    <>
      <nav className="bg-white shadow-sm py-1 px-6 flex justify-between items-center sticky top-0 z-50 border-b  h-[10%]">
        {/* Logo */}
        <div >
          <img 
            src={logo} 
            alt="Logo" 
            className="h-16 w-auto md:h-16"
            onClick={()=>navigate('/')}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 font-inter font-semibold">
          <Link
            to="/home"
            className="text-primaryText hover:text-secondaryText transition-colors"
          >
            Home
          </Link>
          <Link
            to="/booking"
            className="text-primaryText hover:text-secondaryText transition-colors"
          >
            Bookings
          </Link>
          <Link
            to="/organization"
            className="text-primaryText hover:text-secondaryText transition-colors"
          >
            Company
          </Link>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="text-primaryText hover:text-secondaryText transition-colors"
          >
            Help
          </button>
          <button
            onClick={() => setIsProfileOpen(true)}
            className="relative w-10 h-10 bg-primaryText rounded-full flex items-center justify-center text-white hover:bg-opacity-90"
          >
            <User size={18} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-secondaryText hover:text-primaryText transition-colors"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg py-6 px-4 space-y-4 md:hidden z-40">
            {/* Mobile menu items... */}
          </div>
        )}
      </nav>

      {/* Profile Page */}
      {isProfileOpen && (
        <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      )}

      {/* Help Overlay */}
      {isHelpOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={() => setIsHelpOpen(false)} />
          <HelpAndSupportOverlay
            onClose={() => setIsHelpOpen(false)}
            isOpen={isHelpOpen}
          />
        </>
      )}
    </>
  );
};

export default Navbar;