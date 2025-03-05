import { Link } from "react-router-dom";
import resort from "../../assets/resort.jpg";

const VerificationSuccessPage = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-9 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Message */}
      <div className="animate-slide-in-left lg:w-1/2 bg-white rounded-lg shadow-md p-8 flex flex-col justify-center items-center">
        <button className="self-start mb-4">
          <Link to="/" className="text-secondaryText text-2xl">
            &#8592;
          </Link>
        </button>
        <div className="flex flex-col items-center">
          <div className="bg-buttonPrimary text-white p-4 rounded-full mb-4">
            ✅
          </div>
          <h2 className="text-heading-2 text-primaryText mb-2">
            Verified
          </h2>
          <p className="text-label-2-medium text-secondaryText mb-6">
            You can now login or change your password
          </p>
        </div>
        <div className="space-y-4 w-full max-w-sm">
          <Link
            to="/home"
            className="block text-center bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300"
          >
            Continue to Home
          </Link>
          <Link
            to="/resetPassword"
            className="block text-center border border-primaryText text-primaryText text-label-1-semibold py-2 rounded-sm hover:bg-stroke-lightGreyBg transition-colors duration-300"
          >
            Reset Password
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

export default VerificationSuccessPage;