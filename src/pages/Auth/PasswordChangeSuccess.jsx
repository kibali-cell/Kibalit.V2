import { Link } from "react-router-dom";
import resort from '../../assets/resort.jpg'

const PasswordChangeSuccessPage = () => {
  return (
    <div className="flex bg-stroke-greyBg font-inter p-9 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Message */}
      <div
        className="w-[50%] bg-white rounded-md shadow-md p-8 flex flex-col justify-center items-center animate-slide-in-left"
      >
        <button className="self-start mb-4">
          <Link to="/" className="text-secondaryText text-label-1-medium">
            &#8592;
          </Link>
        </button>
        <div className="flex flex-col items-center">
          <div className="bg-primaryText text-white p-4 rounded-full mb-4">
            ✅
          </div>
          <h2 className="text-primaryText text-heading-2 mb-2">
            Password Changed
          </h2>
          <p className="text-secondaryText text-label-2-medium mb-6 text-center">
            Your password has been successfully changed
          </p>
        </div>
        <div className="w-full max-w-sm">
          <Link
            to="/home"
            className="block text-center bg-buttonPrimary text-white py-2 px-4 rounded-sm hover:opacity-80 transition-colors duration-300"
          >
            Continue to Home
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div
        className="lg:basis-1/2 w-full h-64 lg:h-full rounded-lg overflow-hidden animate-slide-in-right"
      >
        <img
          src={resort}
          alt="Relaxing beach resort view"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default PasswordChangeSuccessPage;