import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import resort from "../../assets/resort.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verify')
    console.log("Email submitted:", email);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-stroke-greyBg font-inter p-6 gap-4 items-center justify-center h-screen w-screen">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-md relative lg:w-1/2 w-full max-w-md">
        <h2 className="text-heading-1 text-primaryText mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-label-2-medium text-secondaryText mb-2"
            >
              Your work email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johng@kibalt.com"
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
        <p className="mt-4 text-label-2-medium text-secondaryText">
          Remember Password?{" "}
          <Link to="/login" className="text-primaryText hover:underline text-label-1-semibold">
            Sign in
          </Link>
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="mt-4 bg-buttonPrimary text-white text-label-1-semibold py-2 px-4 rounded-sm hover:opacity-80 transition-opacity duration-300"
        >
          Back to Sign In
        </button>
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

export default ForgotPassword;