import { Link, useNavigate } from "react-router-dom";
import resort from "../../assets/resort.jpg";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/resetSuccess')
    console.log("Password reset");
  };

  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-9 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Form */}
      <div className="animate-slide-in-left lg:w-1/2 bg-white rounded-lg shadow-md p-8 flex flex-col justify-center items-center">
        <button className="self-start mb-4">
          <Link to="/" className="text-secondaryText text-2xl">
            &#8592;
          </Link>
        </button>
        <h2 className="text-heading-2 text-primaryText mb-2">
          Reset Password
        </h2>
        <p className="text-label-2-medium text-secondaryText mb-6">
          Please enter a new password below
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <div>
            <label className="block text-label-2-medium text-secondaryText mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
            />
          </div>
          <div>
            <label className="block text-label-2-medium text-secondaryText mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText text-label-1-medium"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300"
          >
            Reset Password
          </button>
        </form>
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

export default ResetPasswordPage;