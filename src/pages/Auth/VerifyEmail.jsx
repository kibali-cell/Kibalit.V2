import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import resort from "../../assets/resort.jpg";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/verifySuccess')
    console.log("Verification Code Submitted:", code.join(""));
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
        <div className="flex flex-col items-center">
          <div className="bg-buttonPrimary text-white p-4 rounded-full mb-4">
            📧
          </div>
          <h2 className="text-heading-2 text-primaryText mb-2">
            Check your email
          </h2>
          <p className="text-label-2-medium text-secondaryText mb-6">
            We've sent a code to the email you submitted
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center text-xl border border-stroke-lightGreyBg rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryText"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-buttonPrimary text-white text-label-1-semibold py-2 rounded-sm hover:opacity-80 transition-opacity duration-300"
          >
            Verify
          </button>
        </form>
        <div className="flex justify-between items-center w-full mt-4">
          <button className="text-label-3-medium text-secondaryText hover:underline">
            Send code again
          </button>
          <span className="text-label-3-medium text-secondaryText">04:00</span>
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

export default VerifyEmailPage;