import React, { useState } from 'react';
import { IoClose, IoDocument } from 'react-icons/io5';
import { SiQuickbooks } from "react-icons/si";
import { IoMdAdd } from 'react-icons/io';
import { ChevronDown } from 'lucide-react';
import { FaMicrosoft, FaRegMoneyBillAlt } from 'react-icons/fa';

const PaymentAndIntegrations = () => {
  const [expanded, setExpanded] = useState({
    mpesa: false,
    pesapal: false,
    quickbooks: false,
    microsoftOffice: false
  });

  return (
    <div className="space-y-8">
      {/* Payment Cards Section */}
      <div className="space-y-4 ">
        <h3 className="text-heading-3">Payment Cards</h3>

        <div className="space-y-2 bg-white rounded-md p-4">
          {/* Mpesa */}
          <div className="border-b">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => setExpanded(prev => ({ ...prev, mpesa: !prev.mpesa }))}
            >
              <div className="flex items-center gap-2">
                <FaRegMoneyBillAlt />
                <span className="text-label-1-medium">Mpesa</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondaryText" />
            </button>
          </div>

          {/* PesaPal */}
          <div className="border-b">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => setExpanded(prev => ({ ...prev, pesapal: !prev.pesapal }))}
            >
              <div className="flex items-center gap-2">
                <FaRegMoneyBillAlt />
                <span className="text-label-1-medium">PesaPal</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondaryText" />
            </button>
          </div>

          {/* Add payment method button */}
          <button className="flex bg-appBg items-center gap-2 text-buttonText hover:bg-sectionBg p-4 rounded-md w-full">
            <IoMdAdd className="w-5 h-5" />
            <span className="text-label-1-medium">Add a payment method</span>
          </button>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-heading-3">Integrations</h3>
          <p className="text-label-2-medium text-secondaryText">Connect with the tools you know and use everyday</p>
        </div>

        <div className="space-y-2 bg-white p-4 rounded-md">
          {/* QuickBooks */}
          <div className="border bg-white rounded-md">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => setExpanded(prev => ({ ...prev, quickbooks: !prev.quickbooks }))}
            >
              <div className="flex items-center gap-2">
                <SiQuickbooks/>
                <span className="text-label-1-medium">QuickBooks</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondaryText" />
            </button>
          </div>

          {/* Microsoft Office Suite */}
          <div className="border bg-white rounded-md">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => setExpanded(prev => ({ ...prev, microsoftOffice: !prev.microsoftOffice }))}
            >
              <div className="flex items-center gap-2">
                <FaMicrosoft/>
                <span className="text-label-1-medium">Microsoft Office Suite</span>
              </div>
              <ChevronDown className="w-4 h-4 text-secondaryText" />
            </button>
          </div>

          {/* Add tools button */}
          <button className="flex items-center gap-2 text-buttonText hover:bg-sectionBg p-4 rounded-md w-full bg-appBg">
            <IoMdAdd className="w-5 h-5" />
            <span className="text-label-1-medium">Add tools</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default PaymentAndIntegrations;