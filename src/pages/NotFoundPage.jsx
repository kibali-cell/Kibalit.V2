import { Link } from "react-router-dom";
import resort from "../assets/resort.jpg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-9 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Error Message */}
      <div className="animate-slide-in-left lg:w-1/2 bg-white rounded-lg shadow-md p-8 flex flex-col justify-center items-center text-center">
        <div className="bg-warning-bg text-warning-text p-6 rounded-full mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h1 className="text-heading-1 text-primaryText mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-label-1-medium text-secondaryText mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="space-y-4 w-full max-w-sm">
          <Link
            to="/"
            className="block text-center bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300"
          >
            Go to Home Page
          </Link>
          <Link
            to="/contact"
            className="block text-center border border-primaryText text-primaryText text-label-1-semibold py-2 rounded-sm hover:bg-stroke-lightGreyBg transition-colors duration-300"
          >
            Contact Support
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
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

export default NotFoundPage;