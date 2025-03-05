import React from 'react';

function PaymentDetails() {
  return (
    <div className="bg-appBg">
      <div className="px-16 py-12 flex flex-col items-center gap-4">
        <h2 className="text-heading-1 text-primaryText font-bold">Payment Details</h2>
        <p className="text-label-1-medium text-secondaryText">
          Fill your card details and save for faster payment next time
        </p>
      </div>
      <div className="px-16 py-8">
        <div className="flex items-center gap-4">
          <label className="text-label-1-medium text-secondaryText">Card Holder Name</label>
          <input type="text" className="border border-stroke-greyBg rounded-md px-4 py-2 w-full" placeholder="JOHN J MANYO" />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-label-1-medium text-secondaryText">Card Number</label>
          <div className="flex-1">
            <input type="text" className="border border-stroke-greyBg rounded-md px-4 py-2 w-full" placeholder="1234 4567 7654 9867" />
            <div className="flex gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-stroke-greyBg"></div>
              <div className="w-2 h-2 rounded-full bg-stroke-greyBg"></div>
              <div className="w-2 h-2 rounded-full bg-stroke-greyBg"></div>
              <div className="w-2 h-2 rounded-full bg-stroke-greyBg"></div>
              <div className="w-2 h-2 rounded-full bg-stroke-greyBg"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <label className="text-label-1-medium text-secondaryText">Expiry Date</label>
            <div className="flex gap-4">
              <input type="text" className="border border-stroke-greyBg rounded-md px-4 py-2 w-24" placeholder="12" />
              <input type="text" className="border border-stroke-greyBg rounded-md px-4 py-2 w-24" placeholder="2030" />
            </div>
          </div>
          <div className="flex items-center">
            <label className="text-label-1-medium text-secondaryText">CVV</label>
            <input type="text" className="border border-stroke-greyBg rounded-md px-4 py-2 w-24" placeholder="433" />
          </div>
        </div>
      </div>
      <div className="flex justify-end px-16 py-8">
        <button className="bg-buttonPrimary text-white px-4 py-2 rounded-md">Close</button>
        <button className="bg-buttonPrimary text-white px-4 py-2 rounded-md ml-4">Save Card</button>
      </div>
    </div>
  );
}

export default PaymentDetails;